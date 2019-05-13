import React from 'react';
import {Form,Button,Row,Col,Select,DatePicker,Cascader,Table,Modal,Upload,Icon,Radio,Checkbox,Input, message } from 'antd';
import { CaseInfo_Model,CaseTeamwork_Model,CaseFile_Model,CaseBljd_Model,SagrAdd_Model,SadwAdd_Model,CaseEnd_Model,SelectGroup,CaseAdd_Model} from "../../../../../Components"; 
import {
    getCaseInfoList,
    getCaseDetail,
    getCaseRelatedCooperation,
    getCaseFile,
    getCaseProgressListShow, 
    getCaseProgressCancel,
    getCaseInfoFile,
    getCaseObjectList,
    getCaseObjectInfo,  
    getCaseClosingInfoAdd,
    getCaseManageExport
} from '../../../../../Service/srbgs/fgimtpcim/server';
import {detailShowModal, parseTime } from "../../../../../asset/srbgs/js/common"

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option

require('./wjaj.css');
 

class Wjaj extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            caseFileAdd:false,
            inquiryLoading:false,
            wjajTableLoading:false,
            wjajDetailVisible: false,
            wjajReviseVisible: false,
            wjajDetailData:{},
            visible_xbaj:false,
            data_xbaj:'',
            caseFileVisible:false,
            data_caseFile: {0: [], 1: [], 2: []},
            bljdModalVisible:false,
            bljdList:{},
            objectInvolvedVisible: false,
            SagrAddVisible: false,
            SadwAddVisible: false,
            SaAjbh:'',
            caseEndVisible: false,
            data_caseEnd:'',
            caseObjectInfoData:{
                "ajbh":"",
                "xm":"",
                "sasf_mc":"",
                "mz":"",
                "zjhm":"",
                "whcd":"",
                "hjd_mc":"",
                "lxdh":"",
                "saxz_mc":"",
                "zyzg":"",
                "gzdw":"",
                "xb":"",
                "zzmm":"",
                "img":"", 
                "bz":"", 
                "saxz":"", 
                "sfyx":"", 
                "sasf_dm":"", 
                "sagrbh":"",
            },
            key: false,
            downAndUp: false,
            caseAddVisible: false,
            pageSize: 5,//每页条数
            pageNum: 1,//当前页码
            totalRecord: "",
            inquiryData: {},
            caseAddBtnVisible: false,
            clickSf:'',
            reviseData:{},
        }
    }

    // 查看案件详情 请求
    async handleGetCaseDetail(params,test){
        let data = await getCaseDetail(params);
        if(test !== 'ajxg'){
            this.setState({
                wjajDetailData: data.responseData,
                wjajDetailVisible: true,
            });
        }else{
            this.setState({
                caseAddVisible: true,
                reviseData:  data.responseData,
            });
        }

    }

    // 查看案件协办 请求
    async handleGetCaseRelatedCooperation(params){
        let data = await getCaseRelatedCooperation(params);
        this.setState({
            data_xbaj: data.responseData,
            visible_xbaj : true,
        });
    }

    // 未结案件列表查询 请求
    async handleGetCaseInfoList(parent){
        let data = await getCaseInfoList(parent); 
        if( data.code == '000000' ){ 
            this.setState({ 
                wjajlistTable:data.responseData.dataList,
                totalRecord: data.responseData.totalRecord,
                wjajTableLoading:false,
                inquiryLoading:false
            })
        }else{
            message.error('数据请求异常');
            this.state({
                wjajTableLoading:false,
                inquiryLoading:false
            })
        } 
    }

    // 未结案件列表导出 请求
    // async handleGetCaseInfoFile(parent){
    //     let data = await getCaseInfoFile(parent);
    //
    //     console.log(data)
    // }

    // 查看案件材料 请求
    async handleGetCaseFile(params){
        let caseFileDom = '';
        let caseFileObj = {};
        let arr = [];
        let data = await getCaseFile(params);
        let caseFile = (data.responseData).map(function (item1,index1,input) {
            arr = []
            item1.forEach(function (item2,index2) {
                arr.push({ num:item2.num,cllxmc:item2.cllxmc, ajbh:item2.ajbh,cllx:item2.cllx})
            })
            caseFileObj[index1] = arr;
        })
        this.setState({
            data_caseFile: caseFileObj,
            caseFileVisible : true,
        });
    }

    // 办理进度 请求
    async handleGetCaseProgressListShow (params){
        let data = await getCaseProgressListShow(params);
        this.setState({
            bljdList:data.responseData.dataList,
            bljdModalVisible:true
        })
    }

    // 案件注销申请 请求
    async handleGetCaseProgressCancel(params){
        let data = await getCaseProgressCancel(params); 
        if(data.code == '000000'){
            message.success('案件注销申请成功！');
            this.setState({
                caseCancelVisible: false
            })
        }else{
            message.error('案件注销申请失败！')
        }
    }

    // 查看涉案对象列表
    async handleGetCaseObjectList(params){
        let data = await getCaseObjectList (params);
        if(data.code == '000000'){
            this.setState({
                caseObjectListData:data.responseData,
                objectInvolvedVisible:true
            })
        }else{
            message.error('数据获取失败')
        }
    }

    // 查看涉案对象详细信息
    async handleGetCaseObjectInfo(params){
        let data = await getCaseObjectInfo(params)
        console.log(data)
        if(data.code == '000000'){
            console.log(data.responseData)
            this.setState({
                caseObjectInfoData:data.responseData,
                SagrAddVisible:true
            })
        }else{
            message.error('数据获取失败')
        } 
    }
  
    // 结案信息录入 请求
    async handleGetCaseClosingInfoAdd(params){
        let data = await getCaseClosingInfoAdd(params);
        if(data.code == '000000'){
            message.success('结案信息录入成功！')
        }else{
            message.error('结案信息录入失败！')
        }
    }
    // 查询 和 导出
    handle(callback,e) {
        event.returnValue = false;
        let data; 
        this.props.form.validateFields((errors,values) => { 
            data = {
                ajbh:(values.ajbh == undefined ? '': values.ajbh),
                lasj: parseTime(values.lasj),
                lasjEnd: parseTime(values.lasjEnd),
                afsj:  parseTime(values.afsj),
                afsjEnd:  parseTime(values.afsjEnd),
                ajxz: (values.ajxz == undefined ? '': values.ajxz),
                afdd:(values.afdd == undefined ? '': values.afdd),
                badw: (values.badw == undefined ? '': values.badw),
                ajzt:'901'
            };
        })

        if(callback == 'handleSubmit'){
            data.pageNum = this.state.pageNum;
            data.pageSize = this.state.pageSize;
            this.setState({
                inquiryData:data,
                inquiryLoading:true,
                wjajTableLoading:true,
            })
            this.handleGetCaseInfoList(data);
        }else if(callback == 'handleExport'){
            getCaseManageExport(
                    '?ajbh='+data.ajbh+
                    '&ajxz='+data.ajxz+
                    '&afsj='+data.afsj+
                    '&lasj='+data.lasj+
                    '&afdd='+data.afdd+
                    '&badw='+data.badw+
                    '&ajzt='+'901'
            )
        }
    }

    // 查看案件详情
    detailShowModal (e){
        detailShowModal(e, this, this.handleGetCaseDetail);
    }

    // 获取案件详情 的 取消 按钮
    detailHandle(e) {
        this.setState({
            wjajDetailVisible: false,
        })
    }

    // 未结案件 查看协办
    handleXbaj(e){
        e.preventDefault();
        let thisAjbh = e.currentTarget.parentNode.parentNode.childNodes[0].innerText;
        this.handleGetCaseRelatedCooperation(thisAjbh)
    }

    //  查看协办案件 model 的隐藏
    xbajModel(){
        this.setState({
            visible_xbaj : false,
            data_xbaj:""
        });
    }

    // 查看案件材料
    handleCaseFile(e){
        e.preventDefault();
        let thisAjbh = e.currentTarget.parentNode.parentNode.childNodes[0].innerText;
        this.handleGetCaseFile(thisAjbh)
    }

    // 查看案件材料 取消 按钮
    CaseFileHandle(e) {
        this.setState({
            caseFileVisible:false,
        })
    }

    // 办理进度
    handleBljd(e){
        let data = {
            ajbh:e.currentTarget.parentNode.parentNode.childNodes[0].innerText,
            pageNum:1,
            pageSize:100
        };
        this.setState({
            ajbh:e.currentTarget.parentNode.parentNode.childNodes[0].innerText,
        })
        this.handleGetCaseProgressListShow(data)
    }

    // 办理进度 的 取消 按钮
    bljdHandle(e){
        this.setState({
            bljdModalVisible:false
        })
    }

    // 案件修改
    caseInfoRevise(e){
        e.preventDefault();
        let params = e.currentTarget.parentNode.parentNode.parentNode.childNodes[0].innerText;
        this.handleGetCaseDetail(params,'ajxg')
    }

    // 提交案件注销 
    caseCancel(e){    
        this.props.form.setFieldsValue({
            caseCancel_ajmc:  e.currentTarget.parentNode.parentNode.parentNode.childNodes[1].innerText,
        })
        this.setState({
            caseCancelVisible:true,
            caseCancelAjbh: e.currentTarget.parentNode.parentNode.parentNode.childNodes[0].innerText, 
        })
     
    }
    // 提交案件注销 确认
    caseCancelOk(){
        let data;
        this.props.form.validateFields((error,values)=>{
            data = {
                ajbh: this.state.caseCancelAjbh,
                zxyy: values.caseCancel_zxyy,
                sqdw: window.sessionStorage.getItem('zoningCode')
            }  
        });
       
        this.handleGetCaseProgressCancel(data)
    }

    // 提交案件注销申请 关闭
    caseCancelHandle(){ 
        this.setState({
            caseCancelVisible:false
        })
    }

    // 提交案件注销申请 数据
    receiveData(data){
        alert('提交案件注销详情 数据');
        this.setState({
            zxyy:data.zxyy
        })
    }

     // 涉案对象
     handleObjectInvolved(e){
        e.preventDefault();
        let thisAjbh = e.currentTarget.parentNode.parentNode.childNodes[0].innerText;
        this.setState({
            SaAjbh:thisAjbh
        })
        this.handleGetCaseObjectList(thisAjbh)
    }

    // 涉案对象 的 取消 按钮
    objectInvolvedHandle(){
        this.setState({
            objectInvolvedVisible:false
        })
    }

    // 涉案对象 的详情展示
    handleObjectDetail(e){
        let data = {
            ajbh:this.state.caseObjectListData[0].ajbh,
            sf:e.currentTarget.parentNode.parentNode.childNodes[5].innerText,
            dxbh:e.currentTarget.parentNode.parentNode.childNodes[3].innerText,
        };
        this.handleGetCaseObjectInfo(data)
    }

    // 涉案个人添加
    sagrAdd(){
        this.setState({
            SagrAddVisible:true
        })

    }

    // 涉案个人添加 的 取消 按钮
    sagrAddHandle(){
        this.setState({
            SagrAddVisible:false
        })
    }

    // 涉案单位添加
    sadwAdd(){
        this.setState({
            SadwAddVisible:true
        })
    }

    // 涉案单位添加 的 取消 按钮
    sadwAddHandle(){
        this.setState({
            SadwAddVisible:false
        });
    }

    // 涉案对象 修改
    sadxRevise(e){
        let thisNodeName =  e.currentTarget.parentNode.parentNode.parentNode.childNodes[5].innerText;
        console.log(thisNodeName)
        let data = {
            ajbh:this.state.caseObjectListData[0].ajbh,
            sf: thisNodeName,
            dxbh:e.currentTarget.parentNode.parentNode.parentNode.childNodes[3].innerText,
        };
        if( thisNodeName == '个人'){
            // this.handleGetCaseIndividualRevise();
            console.log(this.state.SaAjbh)
            this.setState({
                clickSf:'修改',
                SagrAddVisible:true,
                sf: thisNodeName,
            })
            this.handleGetCaseObjectInfo(data);
        }else if( thisNodeName  == '单位'){
            this.handleGetCaseObjectInfo(data);
            this.setState({
                SadwAddVisible:true,
                clickSf:'修改',
                sf: thisNodeName,
            })
        }
    }

    // 涉案对象列表 删除
    sadxDel(e){
        let data = {
            ajbh:this.state.caseObjectListData[0].ajbh,
            sf:e.currentTarget.parentNode.parentNode.parentNode.childNodes[5].innerText,
            sadxbh:this.state.caseObjectListData[0].dxbh,
        }

        console.log(data)
        console.log(e)
        this.handleGetCaseDelect(data)
    } 

    // 结案信息录入
    handleCaseEnd(e){ 
        this.props.form.setFieldsValue({
            'caseEnd_ajbh': e.currentTarget.parentNode.parentNode.childNodes[0].innerText,
            'caseEnd_ajxz': e.currentTarget.parentNode.parentNode.childNodes[2].innerText,
            'caseEnd_bajg': '当前用户',
            'caseEnd_lasj': e.currentTarget.parentNode.parentNode.childNodes[3].innerText,
        })
        this.setState({
            caseEndVisible: true,
        }); 
       
    }

    // 结案信息 取消
    CaseEndCancel(e){
        this.setState({
            caseEndVisible: false,
        })
        
    }

    // 结案信息 确认
    CaseEndOk(e){
        let data;
        this.props.form.validateFields((error,values)=>{
                data = {
                    ajbh: values.caseEnd_ajbh,
                    aqjj: values.caseEnd_aqjj, 
                    jasj: parseTime(values.caseEnd_jasj),
                    zxqk: values.caseEnd_zxqk, 
                    cbr: values.caseEnd_bar,
                    spr: values.caseEnd_spr,
                    badw: window.sessionStorage.getItem('zoningCode'),
                }
        })
        this.handleGetCaseClosingInfoAdd(data)
    }

    // 区划下拉框的 Value
    handleZoningCode(test,e){
        console.log(test, e);
        for(var key in e) {
            if (key == "xzqhOnly") {
                this.props.form.setFieldsValue({
                    "badw": e[key]
                })
            } else if (key == "xzqhAllSix") {
                this.props.form.setFieldsValue({
                    "afdd": e[key]
                })
            }
        }
    } 

    // 收起 搜素框
    downAndUpHandel(){ 
        let {downAndUp} = this.state; 
        this.setState({
            downAndUp: !downAndUp
        })
    }

    // 新增案件信息
    HandlecaseAdd(){
        this.setState({
            caseAddVisible:true
        });
    }

    // 新增案件信息的 取消 按钮
    caseAddHandle(){
        this.setState({
            caseAddVisible:false
        })
    }

    // 新增案件信息 数据
    NewCaseInfo(data){
        this.handleGetCaseInfoAdd(data)
    }

    componentWillMount(){
        let {caseAddBtnVisible} = this.state;

        if( window.sessionStorage.getItem('assigningCode') == '2'|| window.sessionStorage.getItem('assigningCode') == '3'){
            this.setState({
                caseAddBtnVisible: !caseAddBtnVisible
            })
        }
    }
    render() {

        const { getFieldProps } = this.props.form;

        const columns = [
            { title: '涉案对象', dataIndex: 'sadx', key: 'sadx'},
            { title: '处理情况', dataIndex: 'clqk', key: 'clqk'},
            { title: '处理时间', dataIndex: 'clsj', key: 'clsj'},
            { title: '处理单位', dataIndex: 'cldw', key: 'cldw'}, 
        ]
        const wjajColumn = [
            {
                title: '案件编号',
                dataIndex: 'ajbh',
                key: 'ajbh',
            }, 
            {
                title: '案件名称',
                dataIndex: 'ajmc',
                key: 'ajmc',
                render: (text) => <a href="javascript:;" onClick={this.detailShowModal.bind(this)}>{text}</a>
            },
            {
                title: '案件性质',
                dataIndex: 'ajxz_mc',
                key: 'ajxz_mc',
            }, 
            {
                title: '立案时间',
                dataIndex: 'lasj',
                key: 'lasj',
            }, 
            {
                title: '案件级别',
                dataIndex: 'ajjb',
                key: 'ajjb',
            },
            {
                title: '协办案件',
                dataIndex: 'xbajs',
                key: 'xbajs',
                render: (test) => <a href="javascript:;"  onClick={this.handleXbaj.bind(this)}  disabled={test == '1'? false : true}>查看</a>
            }, 
            {
                title: '涉案对象',
                dataIndex: '',
                key: '',
                render: () => <a href="javascript:;" onClick={this.handleObjectInvolved.bind(this)}>查看</a>
            }, 
            {
                title: '案件材料',
                dataIndex: '',
                key: '',
                render: () => <a href="javascript:;" onClick={this.handleCaseFile.bind(this)}>查看</a>
            }, 
            {
                title: '办理进度',
                dataIndex: '',
                key: '',
                render: () => <a href="javascript:;" onClick={this.handleBljd.bind(this)}>查看</a>
            }, 
            {
                title: '结案信息',
                dataIndex: '',
                key: '',
                render: () => <a href="javascript:;"  onClick={this.handleCaseEnd.bind(this)}>录入</a>
            },
            {
                title: '操作',
                dataIndex: '',
                key: '',
                render: () =>
                    <div>
                        <a href="javascript:;" onClick={this.caseInfoRevise.bind(this)}>修改</a>
                        &nbsp; &nbsp;
                        <a href="javascript:;" onClick={this.caseCancel.bind(this)}>注销</a>
                    </div>
            }
        ];
 

        const columns_sadxAdd = [
            { title: '对象名称', dataIndex: 'dxmc', key: 'dxmc', render:(text)=> <a href="javascript:;" onClick={this.handleObjectDetail.bind(this)}>{text}</a>},
            { title: '户籍（管理）地', dataIndex: 'hjd', key: 'hjd'},
            { title: '涉案身份', dataIndex: 'sasf', key: 'sasf' },
            { title: '对象编号', dataIndex: 'dxbh', key: 'dxbh',filterDropdownVisible:false, visible:false},
            { title: '涉案性质', dataIndex: 'saxz', key: 'saxz' },
            { title: '身份', dataIndex: 'sf', key: 'sf' },
            { title: '证件号码', dataIndex: 'zjhm', key: 'zjhm' },
            { title: '处理信息', dataIndex: '', key: '' ,render: ()=> <a href='javascript:;'>处理</a>},
            { title: '操作', dataIndex: '', key: '' ,render: ()=>  <div><a href="javascript:;" onClick={this.sadxRevise.bind(this)}>修改</a> <a href="javascript:;"onClick={this.sadxDel.bind(this)}>删除</a></div>}
        ]

        const pagination = {
            _this: this,
            total: this.state.totalRecord,
            pageSize: this.state.pageSize,
            onChange(current) {
                let postData = this._this.state.inquiryData;
                postData.pageSize = this._this.state.pageSize;
                postData.pageNum = current;
                this._this.handleGetCaseInfoList(postData);
                this._this.setState({
                    yjajTableLoading: false,
                })
            },
        };

        return (
            <div>
                <div className="formBox">
                    <div className="formTitle">
                        未结案件
                        <p className={`downAndUp ${this.state.downAndUp ? 'rotate' : ''}`} onClick={this.downAndUpHandel.bind(this)}></p>
                    </div>
                    <div className={`formConten ${this.state.downAndUp ? 'up' : ''}`}>
                        <Form horizontal className="ant-advanced-search-form">
                            <Row gutter={16}>
                                <Col sm={7}>
                                    <FormItem
                                        label="案件编号"
                                        labelCol={{span: 8}}
                                        wrapperCol={{span: 16}}
                                        hasFeedback
                                    >
                                        <Input placeholder="请输入搜索名称" size="default"  {...getFieldProps('ajbh')}/>
                                    </FormItem>
                                    <FormItem
                                        label="案件性质"
                                        labelCol={{span: 8}}
                                        wrapperCol={{span: 16}}
                                        hasFeedback 
                                    >
                                        <Select  {...getFieldProps('ajxz')}>
                                            <Option value="">全部</Option>
                                            <Option value="570">非医学需要鉴定胎儿性别</Option>
                                            <Option value="571">非法终止妊娠</Option>
                                            <Option value="572">“两非”中介</Option>
                                            <Option value="574">出售相关药品</Option>
                                            <Option value="575">溺弃女婴</Option>
                                            <Option value="576">其他</Option>
                                        </Select>
                                    </FormItem>

                                </Col>
                                <Col sm={9}>
                                    <FormItem
                                        label="立案时间"
                                        labelCol={{span: 6}}
                                        hasFeedback
                                    >
                                        <Col span="8">
                                            <FormItem >
                                                <DatePicker {...getFieldProps('lasj')}/>
                                            </FormItem>
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8">
                                            <FormItem>
                                                <DatePicker {...getFieldProps('lasjEnd')}/>
                                            </FormItem>
                                        </Col>
                                    </FormItem>
                                     
                                    <FormItem
                                        label="办案单位"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }} 
                                    >
                                        {/* <Cascader options={this.state.areaData} {...getFieldProps('badw')} /> */}
                                        <SelectGroup sign="xzqhOnly"  {...getFieldProps('badw')}  handleZoningCode={this.handleZoningCode.bind(this,'xzqhOnly')}></SelectGroup>
                                    </FormItem> 

                                </Col>
                                <Col sm={8}>

                                    <FormItem
                                        label="案发时间"
                                        labelCol={{span: 6}}
                                        hasFeedback
                                        help
                                    >
                                        <Col span="8">
                                            <FormItem >
                                                <DatePicker {...getFieldProps('afsj')}/>
                                            </FormItem>
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8">
                                            <FormItem>
                                                <DatePicker {...getFieldProps('afsjEnd')}/>
                                            </FormItem>
                                        </Col>
                                    </FormItem> 
                                </Col>
                            </Row>
                            <Row  gutter={24}>
                                <Col> 
                                    <FormItem
                                        label="案发地点"
                                        labelCol={{span: 3}}
                                        wrapperCol={{span: 18}}
                                        hasFeedback
                                    >
                                        {/* <Cascader options={this.state.areaData} {...getFieldProps('afdd')} /> */}
                                        <SelectGroup sign="xzqhAllSix"  {...getFieldProps('afdd')}  handleZoningCode={this.handleZoningCode.bind(this,'xzqhAllSix')}></SelectGroup>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} style={{ textAlign: 'left' }}>
                                    <Button type="dashed" style={{marginLeft:'2%',display: (this.state.caseAddBtnVisible == false ? 'none' : 'block')}} className="caseAdd" onClick={this.HandlecaseAdd.bind(this)}>
                                        <Icon type="plus-circle" />
                                        新增案件
                                    </Button>
                                </Col>
                                <Col span={12} style={{textAlign: 'right'}}>
                                    <Button type="primary" htmlType="submit" loading={this.state.inquiryLoading}
                                            onClick={this.handle.bind(this,'handleSubmit')}>查询</Button>

                                    <Button onClick={this.handle.bind(this,'handleExport')} >导出</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>

                <div className="queryResults">
                    <Table columns={wjajColumn}
                           dataSource={this.state.wjajlistTable}
                           className="table"
                           rowKey="id"
                           loading={this.state.wjajTableLoading}
                           pagination={pagination}
                    />
                </div>

 
                {/* 案件详情  */}
                <CaseInfo_Model visible={this.state.wjajDetailVisible} data={this.state.wjajDetailData} detailShowModal={this.detailShowModal.bind(this)} detailHandle={this.detailHandle.bind(this)} />

                {/* 案件协办 */}
                <CaseTeamwork_Model dataSource={this.state.data_xbaj} visible={this.state.visible_xbaj} cancelHandle={this.xbajModel.bind(this)}/>

                {/* 案件材料 */}
                <CaseFile_Model visible={this.state.caseFileVisible} data={this.state.data_caseFile} CaseFileHandle={this.CaseFileHandle.bind(this)}/>
 
                {/* 案件办理进度 */}
                <CaseBljd_Model visible={this.state.bljdModalVisible} data={this.state.bljdList} cancelHandle={this.bljdHandle.bind(this)}/>

                {/* 添加涉案列表 */}
                <Modal title="新增/修改涉案对象" visible={this.state.objectInvolvedVisible}  width="60%"
                    onOk={this.objectInvolvedHandle.bind(this)} onCancel={this.objectInvolvedHandle.bind(this)} >
                    <Row style={{marginBottom:16}}>
                        <Col sm={12} style={{ textAlign: 'center' }}>
                            <Button type="primary" onClick={this.sagrAdd.bind(this)}>  <Icon type="plus-circle" /> 添加涉案个人</Button>
                        </Col>
                        <Col sm={12} style={{ textAlign: 'center' }}>
                            <Button onClick={this.sadwAdd.bind(this)}>  <Icon type="plus-circle" /> 添加涉案单位</Button>
                        </Col>  
                    </Row>
                    <Table columns={columns_sadxAdd}
                           dataSource={this.state.caseObjectListData}
                           className="table"
                           pagination={{pageSize:5}} />
                </Modal>

                {/* 添加涉案个人 */}
                <SagrAdd_Model visible={this.state.SagrAddVisible}  SagrAddHandle={this.sagrAddHandle.bind(this)} SaAjbh = {this.state.SaAjbh} SagrData={this.state.caseObjectInfoData} />

                {/* 添加涉案单位 */}
                <SadwAdd_Model visible={this.state.SadwAddVisible}  SaAjbh = {this.state.SaAjbh} SadwAddHandle={this.sadwAddHandle.bind(this)} />
                
                {/* 结案信息录入 */}
                <Modal title="结案信息录入" visible={this.state.caseEndVisible} width="54%"
                       onOk={this.CaseEndOk.bind(this)} onCancel={this.CaseEndCancel.bind(this)}
                >
                    <FormItem
                        label="案件编号"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Input disabled size="size" {...getFieldProps('caseEnd_ajbh')}/>
                    </FormItem> 
                    <FormItem
                        label="案件性质"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Input size="size"{...getFieldProps('caseEnd_ajxz')}/>
                    </FormItem>
                    <FormItem
                        label="办案机关"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Input size="size" {...getFieldProps('caseEnd_bajg')}/>
                    </FormItem>
                    <FormItem
                        label="立案时间"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Input size="size" {...getFieldProps('caseEnd_lasj')}/>
                    </FormItem>
                    <FormItem
                        label="案情简介"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Input type="textarea" id="control-textarea" rows="3" {...getFieldProps('caseEnd_aqjj')} />
                    </FormItem>
                    <FormItem
                        label="处理决定"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Table columns={columns}  
                        // dataSource={} 
                        className="caseOverTable" pagination={false}/>
                    </FormItem>
                    <FormItem
                        label="执行情况"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Input type="textarea" id="control-textarea" rows="3"  {...getFieldProps('caseEnd_zxqk')} />
                    </FormItem>
                    <FormItem
                        label="结案时间"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    > 
                        <DatePicker {...getFieldProps('caseEnd_jasj')}/>
                    </FormItem>
                    <FormItem
                        label="办案人"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    > 
                       <Input size="size"  {...getFieldProps('caseEnd_bar')} />
                    </FormItem>
                    <FormItem
                        label="审批人"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Input size="size" {...getFieldProps('caseEnd_spr')} />
                    </FormItem>
                </Modal>
                
                {/* 案件注销 */}
                <Modal title="案件注销" visible={this.state.caseCancelVisible} 
                    onCancel={this.caseCancelHandle.bind(this)}
                    onOk={this.caseCancelOk.bind(this)}
                    >
                    <FormItem
                        label="案件名称"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    > 
                       <Input size="size"  {...getFieldProps('caseCancel_ajmc')} />
                    </FormItem> 
                    <FormItem
                        label="注销原因"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    > 
                       <Input size="size" type="textarea" row={3} {...getFieldProps('caseCancel_zxyy')} />
                    </FormItem>
                </Modal>

                 {/* 新增案件信息 */}
                 <CaseAdd_Model visible={this.state.caseAddVisible} CaseAddHandle={this.caseAddHandle.bind(this)} reviseData={this.state.reviseData}/>
 
                </div>
        )
    }
}

Wjaj = Form.create()(Wjaj);

export default Wjaj