import React from 'react';
import {Form,Button,Row,Col,Select,Cascader,Table,Input,DatePicker,Modal} from 'antd';
import { CaseInfo_Model,CaseTeamwork_Model,CaseFile_Model,CaseBljd_Model,CaseEnd_Model, CaseCancel_Model,SelectGroup} from "../../../../../Components";
import {
    getCaseCloseReport,
    getCaseDetail,
    getCaseFile,
    getCaseInfoList,
    getCaseInfoFile,
    getCaseProgressListShow,
    getCaseRelatedCooperation,
    getCaseProgressCancel
} from '../../../../../Service/srbgs/fgimtpcim/server';
import {caseEndFile, detailShowModal, parseTime, disabledDate} from "../../../../../asset/srbgs/js/common";

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

require('./yjaj.css');

class Yjaj extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
            visible: false,
            inquiryLoading:false,
            yjajTableLoading:false,
            yjajDetailVisible:false,
            visible_xbaj:false,
            yjajDetailData:{},
            bljdModalVisible:false,
            bljdList:{},
            caseFileVisible:false,
            caseEndVisible:false,
            data_caseFile: {0: [], 1: [], 2: []},
            data_caseEnd:{},
            caseCancelVisible:false,
            data_caseCancel:{},
            caseCancelData:{'ajbh':'','ajmc':''},
            bljdAjbh: '',  
            downAndUp: false,
            pageSize: 5,//每页条数
            pageNum: 1,//当前页码
            totalRecord: "",
            inquiryData: {},
        }
    }

    // 已结案件列表查询 请求
    async handleGetCaseInfoList(parent){
        let data = await getCaseInfoList(parent);
        this.setState({
            yjajlistTable:data.responseData.dataList,
            totalRecord: data.responseData.totalRecord,
            yjajTableLoading:false,
            inquiryLoading:false
        })
    }
 
    // 查看案件详情 请求
    async handleGetCaseDetail(params){
        let data = await getCaseDetail(params);
        this.setState({
            yjajDetailData: data.responseData,
            yjajDetailVisible: true,
        });
    }

    // 查看案件协办 请求
    async handleGetCaseRelatedCooperation(params){
        let data = await getCaseRelatedCooperation(params);
        this.setState({
            data_xbaj: data.responseData,
            visible_xbaj : true,
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

    // 查看结案报告 请求
    async handleGetCaseEnd(params){
        let data = await getCaseCloseReport(params);
        this.setState({
            data_caseEnd:data.responseData,
            caseEndVisible:true
        })
    }


    // 查询 和 导出
    handle(callback,e) {
        event.returnValue = false;
        let data;
        // console.log("===========get", this.props.form.getFieldsValue());

        this.props.form.validateFields((errors,values) => {
            // console.log("==========>values", values);
            data = {
                ajbh:(values.ajbh == undefined ? '': values.ajbh), 
                ajxz: (values.ajxz == undefined ? '': values.ajxz),
                afdd:(values.afdd == undefined ? '': values.afdd),
                badw: (values.badw == undefined ? '': values.badw),
                lasj: parseTime(values.lasj),
                lasjEnd: parseTime(values.lasjEnd),
                afsj: parseTime(values.afsj),
                afsjEnd: parseTime(values.afsjEnd),
                ajzt:'902'
            };
        })

        if(callback == 'handleSubmit'){
            // console.log("=======>", data.badw);
            data.pageNum = this.state.pageNum;
            data.pageSize = this.state.pageSize;
            this.setState({
                inquiryData:data,
                inquiryLoading:true,
                yjajTableLoading:true,
            })
            this.handleGetCaseInfoList(data);
        }else if(callback == 'handleExport'){
            getCaseInfoFile(
                    '?ajbh='+data.ajbh+
                    '&ajxz='+data.ajxz+
                    '&afsj='+data.afsj+
                    '&afsjEnd='+data.afsjEnd+
                    '&lasj='+data.lasj+
                    '&lasjEnd='+data.lasjEnd+
                    '&afdd='+data.afdd+
                    '&badw='+data.badw+
                    '&ajzt='+'902'
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
            yjajDetailVisible:false,
            data:""
        })
    }

    // 已结案件 查看协办
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

    // 办理进度
    handleBljd(e){
        let data = {
            ajbh:e.currentTarget.parentNode.parentNode.childNodes[0].innerText,
            pageNum:1,
            pageSize:100
        };
        this.setState({
            bljdAjbh:e.currentTarget.parentNode.parentNode.childNodes[0].innerText,
        })
        this.handleGetCaseProgressListShow(data)
    }

    // 办理进度 的 取消 按钮
    bljdHandle(e){
        this.setState({
            bljdModalVisible:false
        })
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

    // 查看结案报告
    handleCaseEnd(e){
        e.preventDefault();
        let thisAjbh = e.currentTarget.parentNode.parentNode.parentNode.childNodes[0].innerText;
        this.handleGetCaseEnd(thisAjbh)
    }

    // 获取结案报告的 取消 按钮
    CaseEndHandle() {
        this.setState({
            caseEndVisible:false,
        })
    }

    // 提交案件注销详情
    caseCancel(e){  
        this.setState({
            caseCancelData:{
                ajbh: e.currentTarget.parentNode.parentNode.parentNode.childNodes[0].innerText,
                ajmc: e.currentTarget.parentNode.parentNode.parentNode.childNodes[1].innerText,
            },
            caseCancelVisible:true
        })
        
    }

    // 提交案件注销申请 关闭
    caseCancelHandle(){ 
        this.setState({
            caseCancelVisible:false
        })
    }
  
    // 区划下拉框的 Value
    handleZoningCode(test,e){
        for(var key in e){
            if(key == "xzqhOnly"){
                this.props.form.setFieldsValue({
                    "badw": e[key]
                })
            }else if(key == "xzqhAllSix"){
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
    render(){
        const { getFieldProps } = this.props.form;

        const columns = [
            {
            title: '案件编号',
            dataIndex: 'ajbh',
            key: 'ajbh',
            }, {
                title: '案件名称',
                dataIndex: 'ajmc',
                key: 'ajmc',
                render: (test)=> <a href="javascript:;" onClick={this.detailShowModal.bind(this)}>{test}</a>
            }, {
                title: '案件性质',
                dataIndex: 'ajxz_mc',
                key: 'ajxz_mc',
            }, {
                title: '立案时间',
                dataIndex: 'lasj',
                key: 'lasj',
            }, {
                title: '案件级别',
                dataIndex: 'ajjb',
                key: 'ajjb',
            }, {
                title: '协办案件',
                dataIndex: 'xbajs',
                key: 'xbajs',
                render:(test)=> <a href="javascript:;" onClick={this.handleXbaj.bind(this)} disabled={test == '1'? false : true}>查看</a>
            }, {
                title: '办案进度',
                dataIndex: '',
                key: '',
                render:()=> <a href="javascript:;" onClick={this.handleBljd.bind(this)}>查看</a>
            }, {
                title: '案件材料',
                dataIndex: '',
                key: '',
                render:()=> <a href="javascript:;" onClick={this.handleCaseFile.bind(this)}>查看</a>
            }, {
                title: '操作',
                dataIndex: 'address',
                key: 'address',
                render:()=> <div> <a href="javascript:;" onClick={this.handleCaseEnd.bind(this)}>结案报告</a>   <a href="javascript:;" onClick={this.caseCancel.bind(this)}>注销</a> </div>
            }
        ];

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

        return(
            <div className="yjaj-style">
                <div className="formBox">
                    <div className="formTitle">
                        已结案件
                        <p className={`downAndUp ${this.state.downAndUp ? 'rotate' : ''}`} onClick={this.downAndUpHandel.bind(this)}></p>
                    </div>
                    <div className={`formConten ${this.state.downAndUp ? 'up' : ''}`}>
                        <Form  className="ant-advanced-search-form" >
                            <Row gutter={16}>
                                <Col sm={7}>
                                    <FormItem
                                        label="案件编号"
                                        labelCol={{span:8}}
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
                                        help
                                    >
                                        <Select  {...getFieldProps('ajxz')} size="default" >
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
                                        label="办案单位"
                                        labelCol={{span: 6}}
                                        wrapperCol={{span: 18}}
                                    >
                                        <SelectGroup sign="xzqhOnly"  {...getFieldProps('badw')}  handleZoningCode={this.handleZoningCode.bind(this,'xzqhOnly')}></SelectGroup>
                                        {/* <Cascader options={this.state.areaData} placeholder="请选择地区"/> */}
                                    </FormItem>

                                    <FormItem
                                        label="立案时间"
                                        labelCol={{ span: 6 }}
                                        hasFeedback
                                        help
                                    >
                                        <Col span="8">
                                            <FormItem >
                                                <DatePicker {...getFieldProps('lasj')} disabledDate={disabledDate}/>
                                            </FormItem>
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8">
                                            <FormItem>
                                                <DatePicker {...getFieldProps('lasjEnd')} disabledDate={disabledDate}/>
                                            </FormItem>
                                        </Col>
                                    </FormItem>

                                </Col>
                                <Col sm={8}> 
                                    <FormItem
                                        label="案发时间"
                                        labelCol={{ span: 6 }}
                                        hasFeedback
                                        help
                                    >
                                        <Col span="8">
                                            <FormItem >
                                                <DatePicker {...getFieldProps('afsj')} />
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
                            <Row gutter={72}>
                                <FormItem
                                    label="案发地点"
                                    labelCol={{span: 2}}
                                    wrapperCol={{span: 18}}
                                >
                                    <SelectGroup sign="xzqhAllSix" offset='1' {...getFieldProps('afdd')} handleZoningCode={this.handleZoningCode.bind(this,'xzqhAllSix')} ></SelectGroup>
                                    {/* <Cascader options={this.state.areaData}  {...getFieldProps('afdd')} /> */}
                                    
                                </FormItem>
                            </Row>
                            <Row>
                                <Col span={12} offset={12} style={{ textAlign: 'right' }}>
                                    <Button type="primary" htmlType="submit"  onClick={this.handle.bind(this,'handleSubmit')} loading={this.state.inquiryLoading}>查询</Button>
                                    <Button onClick={this.handle.bind(this,'handleExport')} >导出</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
                <div className="queryResults">
                    <Table columns={columns}
                           dataSource={this.state.yjajlistTable}
                           loading={this.state.yjajTableLoading}
                           pagination={pagination} className="table" />
                </div>

                {/* 案件详情 */}
                <CaseInfo_Model visible={this.state.yjajDetailVisible} data={this.state.yjajDetailData} detailShowModal={this.detailShowModal.bind(this)} detailHandle={this.detailHandle.bind(this)} />

                {/* 案件协办 */}
                <CaseTeamwork_Model dataSource={this.state.data_xbaj} visible={this.state.visible_xbaj} cancelHandle={this.xbajModel.bind(this)}/>

                {/* 案件办理进度 */}
                <CaseBljd_Model visible={this.state.bljdModalVisible} data={this.state.bljdList} cancelHandle={this.bljdHandle.bind(this)} addBtnVisible="none"/>

                {/* 案件材料 */}
                <CaseFile_Model visible={this.state.caseFileVisible} data={this.state.data_caseFile} CaseFileHandle={this.CaseFileHandle.bind(this)} addBtnVisible="none"/>

                {/* 查看结案报告 */}
                <CaseEnd_Model visible={this.state.caseEndVisible} data={this.state.data_caseEnd} CaseEndHandle={this.CaseEndHandle.bind(this)}/>

                {/* 提交案件注销申请 */}
                <CaseCancel_Model visible={this.state.caseCancelVisible}  caseCancelHandle={this.caseCancelHandle.bind(this)} caseCancelData={this.state.caseCancelData}/>
            </div>
        )
    }
}

Yjaj = Form.create()(Yjaj);

export default Yjaj;