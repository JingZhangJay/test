import React from "react"; 
import { Form, Input, Row, Col, Button, DatePicker,Cascader,Select,Table, Modal, Card,Icon,RangePicker,Checkbox,message} from 'antd';
import { getCaseInfoList,  getCaseDetail, getSqajxbFiles, getCaseObjectList} from "../../../../../Service/srbgs/fgimtpcim/server";
import { detailShowModal, parseTime} from "../../../../../asset/srbgs/js/common";
import { CaseInfo_Model,SelectGroup } from "../../../../../Components"; 

const FormItem = Form.Item;
const Option = Select.Option;

require('./fqajxb.css');
    
class Fqajxb extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            qqxbVisible: false,
            wjajDetailVisible: false,
            caseObjectVisible: false,
            caseFilesVisible: false,
            wjajTableLoading:false,
            inquiryLoading:false,
            wjajlistTable:[],
            wjajDetailData:{},
            downAndUp: false,
            pageSize: 5,//每页条数
            pageNum: 1,//当前页码
            totalRecord: "",
            inquiryData: {},
        }
    }
 
     // 查询 请求
    async handelGetCaseManage(parent){
        let data = await getCaseInfoList(parent); 
        if( data.code == '000000' ){ 
            this.setState({ 
                wjajlistTable:data.responseData.dataList,
                totalRecord:data.responseData.totalRecord,
                wjajTableLoading:false,
                inquiryLoading:false,

            })
        }else{
            message.error('数据请求异常');
            this.setState({
                wjajTableLoading:false,
                inquiryLoading:false,
            })
        } 
    }

    // 查看案件详情 请求
    async handleGetCaseDetail(params){
        let data = await getCaseDetail(params);
        this.setState({
            wjajDetailData: data.responseData,
            wjajDetailVisible: true,
        });
    }

    // 获取案件材料列表
    async handelGetSqajxbFiles(params){
        let data = await getSqajxbFiles(params);
        if(data.code == '000000'){ 
            this.setState({
                caseFilesData:data.responseData,
                caseFilesVisible: true 
            }) 
        }else{
            message.error('请求数据失败')
        }
    }

    // 获取涉案对象列表
    async handelGetCaseObjectList(params){
        let data = await getCaseObjectList(params);
        if(data.code == '000000'){
            console.log(data.responseData)
            this.setState({
                caseObjectData:data.responseData,
                caseObjectVisible: true
            }) 
        }else{
            message.error('请求数据失败')
        }
    }

    // 查询
    inquiry(e){
        let data;
        this.props.form.validateFields((errors,values) => { 
            data = {
                ajbh:(values.zbajbh == undefined ? '': values.zbajbh),
                lasj: parseTime(values.lasj),
                lasjEnd: parseTime(values.lasjEnd),
                afsj:  parseTime(values.afsj),
                afsjEnd:  parseTime(values.afsjEnd),
                ajxz: (values.ajxz == undefined ? '': values.ajxz),
                afdd:(values.afdd == undefined ? '': values.afdd),
                badw: (values.lajg == undefined ? '': values.lajg),
                ajzt:'',
                lyfs: (values.xxly == undefined ? '': values.xxly),
                pageNum: this.state.pageNum,
                pageSize: this.state.pageSize,
            };
        });
        this.setState({
            inquiryData:data,
            inquiryLoading:true,
            wjajTableLoading:true,
        })
        this.handelGetCaseManage(data)
    }

    // 查看案件详情
    detailShowModal (e){
        detailShowModal(e, this, this.handleGetCaseDetail);
    }

    // 获取案件详情 的 取消 按钮
    detailHandle(e) {
        this.setState({
            wjajDetailVisible:false,
        })
    }  

    // 请求协办
    qqxbShow(e){ 
        this.props.form.setFieldsValue({
            'ajmc':e.currentTarget.parentNode.parentNode.childNodes[1].innerText
        })

        this.setState({
            qqxbAjbh:e.currentTarget.parentNode.parentNode.childNodes[0].innerText
        })
        let data = {
            id:e.currentTarget.innerText,

        }
        this.setState({
            qqxbVisible:true
        })
    }

    // 请求协办弹框隐藏
    qqxbOk(){
        alert('确定')
        let data = {};
        // this.setState({
        //     qqxbVisible: false
        // })
    }

    // 请求协办弹框隐藏
    qqxbHide(){
        this.setState({
            qqxbVisible: false
        })
    }

    // 显示案件材料弹框
    caseFiles(e){
        this.handelGetSqajxbFiles(this.state.qqxbAjbh);
        
    }

    // 显示涉案对象弹框
    caseObject(){ 
        this.handelGetCaseObjectList(this.state.qqxbAjbh);
    }


    // 隐藏案件材料弹框
    caseFilesHide(){
        this.setState({
            caseFilesVisible: false
        })
    }

    // 隐藏案件对象弹框
    caseObjectHide(){
        this.setState({
            caseObjectVisible: false
        }) 
    }

    // 下载案件材料
    Download(e){
        alert('下载')
        // window.location.href = 'baseURL/ajgl/action/downloadAjcl?cflj='
    }


    // 区划下拉框的 Value
    handleZoningCode(test,e){
        for(var key in e){
            if(key == "xzqhAll"){
                this.props.form.setFieldsValue({
                    "lajg": e[key]
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
        const { getFieldProps} = this.props.form;

        let clbhs = '',
            clmcs = '',
            dxmcs = '',
            dxbhs = '';
        const columns = [
            { title: '案件编号', dataIndex: 'ajbh', key: 'ajbh'},
            { title: '案件名称', dataIndex: 'ajmc', key: 'ajmc',render: (text) => <a href="javascript:;" onClick={this.detailShowModal.bind(this)}>{text}</a> },
            { title: '案件性质', dataIndex: 'ajxz_mc', key: 'ajxz_mc' },
            { title: '立案时间', dataIndex: 'lasj', key: 'lasj' },
            { title: '立案机关', dataIndex: '', key: '',render: (text) => <span>立案机关</span> },
            { title: '案件级别', dataIndex: 'ajjb', key: 'ajjb' },
            { title: '操作', dataIndex: 'id', key: 'id' ,render:()=> <a href="javascript:;" onClick={this.qqxbShow.bind(this)}>请求协办</a>}
        ];

        const columns1 = [ 
            { title: '材料名称', dataIndex: 'clmc', key: 'clmc' },
            { title: '材料类别', dataIndex: 'cllxmc', key: 'cllxmc' },
            // { title: '材料格式', dataIndex: 'wjlx', key: 'wjlx' },
            { title: '标签', dataIndex: '', key: '' },  
            { title: '文件格式', dataIndex: 'wjlx', key: 'wjlx' },
            { title: '大小', dataIndex: 'wjdx', key: 'wjdx' },
            { title: '操作', dataIndex: '', key: '' ,render:()=><a href="javascript:;" onClick={this.Download.bind(this)}>下载</a>}
        ];

        const columns2 = [ 
            { title: '对象名称', dataIndex: 'dxmc', key: 'dxmc' },
            { title: '涉案性质', dataIndex: 'saxz', key: 'saxz' },
            { title: '涉案身份', dataIndex: 'sasf', key: 'sasf' },
            { title: '证件号码', dataIndex: 'zjhm', key: 'zjhm' },
            { title: '管理地', dataIndex: 'hjd', key: 'hjd' },
            { title: '联系电话', dataIndex: 'lxdh', key: 'lxdh' }
        ];
        
        // 通过 rowSelection 对象表明需要行选择
        const rowSelection = {   
            onSelect(record, selected, selectedRows,event) {   
                // event.stopPropagation()
                selectedRows.map((data)=>{ 
                    clbhs += data.cllxmc + ",";
                    console.log(clbhs); 
                    
                })
            },
            onSelectAll(selected, selectedRows, changeRows,e){  
                // e.stopPropagation()
                selectedRows.map((data)=>{
                    console.log(data.cllxmc)
                    console.log(data.clbh)
                })
            }
        };

        const rowSelection2 = {   
            onSelect(record, selected, selectedRows,e){  
                // e.stopPropagation()
                selectedRows.map((data)=>{
                    console.log(data.dxmc)
                    console.log(data.dxbh)
                })
            },
            onSelectAll(selected, selectedRows, changeRows,e) {  
                // e.stopPropagation()
                selectedRows.map((data)=>{
                    console.log(data.dxmc)
                    console.log(data.dxbh)
                })
            }
        };

        // 表格 分页
        const pagination = {
            _this: this,
            total: this.state.totalRecord,
            pageSize: this.state.pageSize,
            onChange(current) {
                let postData = this._this.state.inquiryData;
                postData.pageSize = this._this.state.pageSize;
                postData.pageNum = current;
                this._this.handelGetCaseManage(postData)
            },
        };

        const disabledDate = function (current) {
            // can not select days after today
            return current && current.getTime() > Date.now();
        };

        return(
            <div>
                <div className="formBox">
                    <div className="formTitle">
                        发起案件协办
                        <p className={`downAndUp ${this.state.downAndUp ? 'rotate' : ''}`} onClick={this.downAndUpHandel.bind(this)}></p>
                    </div>
                   <div className={`formConten ${this.state.downAndUp ? 'up' : ''}`}>
                        <Form horizontal className="ant-advanced-search-form">
                            <Row>
                               <Col span={7}>
                                    <FormItem
                                        label="主办案件编号"
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        hasFeedback
                                    >
                                        <Input size="default" {...getFieldProps('zbajbh')}/>
                                    </FormItem>
                                    <FormItem
                                        label="案件性质"
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        hasFeedback
                                        help
                                    >
                                        <Select  {...getFieldProps('ajxz')}>
                                            <Option value="570">非医学需要鉴定胎儿性别</Option>
                                            <Option value="571">非法终止妊娠</Option>
                                            <Option value="572">“两非”中介</Option>
                                            <Option value="574">出售相关药品</Option>
                                            <Option value="575">溺弃女婴</Option>
                                            <Option value="576">其他</Option>
                                        </Select>
                                    </FormItem> 
                                </Col>
                                 <Col span={8}>
                                    <FormItem
                                        label="立案时间"
                                        labelCol={{ span: 6 }} 
                                        hasFeedback
                                    >
                                        <Col span="8">
                                            <FormItem >
                                                <DatePicker  {...getFieldProps('lasj')} disabledDate={disabledDate}/>
                                            </FormItem>
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8">
                                            <FormItem>
                                                <DatePicker  {...getFieldProps('lasjEnd')} disabledDate={disabledDate}/>
                                            </FormItem>
                                        </Col>
                                    </FormItem>

                                    <FormItem
                                        label="信息来源"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 17 }}
                                        hasFeedback
                                    >
                                        <Select   {...getFieldProps('xxly')}>
                                            <Option value="">请选择</Option>
                                            <Option value="555">来电</Option>
                                            <Option value="556">来人</Option>
                                            <Option value="557">来信</Option>
                                            <Option value="558">批转件</Option>
                                            <Option value="559">网上件</Option>
                                            <Option value="560">请示件</Option>
                                        </Select>
                                    </FormItem> 
                                </Col>
                                <Col span={9}> 
                                    <FormItem
                                        label="案发时间"
                                        labelCol={{ span: 6 }}
                                        hasFeedback
                                        help
                                    >
                                       <Col span="8">
                                            <FormItem >
                                                <DatePicker  {...getFieldProps('afsj')} disabledDate={disabledDate} />
                                            </FormItem>
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8">
                                            <FormItem>
                                                <DatePicker {...getFieldProps('afsjEnd')} disabledDate={disabledDate} />
                                            </FormItem>
                                        </Col>
                                    </FormItem>

                                    <FormItem
                                        label="立案机关"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 17 }}
                                        hasFeedback
                                    >
                                        {/* <Input  {...getFieldProps('lajg')}/> */}
                                        <SelectGroup sign="xzqhAll" offset='1' {...getFieldProps('lajg')} handleZoningCode={this.handleZoningCode.bind(this,'xzqhAll')} ></SelectGroup>
                                    
                                    </FormItem> 
                                </Col>  
                            </Row>
                            <Row offset={24}>
                                <FormItem
                                        label="案发地点"
                                        labelCol={{ span: 3}}
                                        wrapperCol={{ span: 18 }}
                                        hasFeedback
                                    >
                                        {/* <Input type="text"  {...getFieldProps('afdd')}/> */}
                                        <SelectGroup sign="xzqhAllSix" offset='1' {...getFieldProps('afdd')} handleZoningCode={this.handleZoningCode.bind(this,'xzqhAllSix')} ></SelectGroup>
                                </FormItem>
                            </Row>
                            <Row>
                                <Col span={12} offset={12} style={{ textAlign: 'right' }}>
                                    <Button type="primary" loading={this.state.inquiryLoading} htmlType="submit" onClick={this.inquiry.bind(this)}>查询</Button> 
                                </Col>
                            </Row>
                        </Form> 
                    </div>  
                </div>
                <div className="queryResults">
                    <Table columns={columns}
                           dataSource={this.state.wjajlistTable}
                           className="table"
                           rowKey="id"
                           pagination={pagination}
                    />
                </div>  

                {/* 请求协办 */}
                <Modal title="请求协办" visible={this.state.qqxbVisible} onCancel={this.qqxbHide.bind(this)} onOk={this.qqxbOk.bind(this)} width="54%">
                    <Form>
                        <FormItem
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                            label="案件名称">
                            <Input  {...getFieldProps('ajmc')}/>
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                            label="协办单位">
                            {/* <Input  {...getFieldProps('xbdw')}/> */}
                            <SelectGroup sign="xzqhAllSix"  {...getFieldProps('xbdw')}  handleZoningCode={this.handleZoningCode.bind(this,'xzqhAllSix')}></SelectGroup>
                                    
                        </FormItem>
                        <FormItem 
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                            label="协办要求">
                            <Input type="textarea"  rows="3"  {...getFieldProps('xbyq')} />
                        </FormItem>
                        <FormItem 
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                            label="是否对协办单位公开立案信息">
                            <Select  {...getFieldProps('sfgk')}>
                                <Option value="1">公开</Option>
                                <Option value="0">不公开</Option>
                            </Select>
                        </FormItem>
                        <FormItem 
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                            label="选择案件材料、涉案对象"> 
                            <Button type="ghost" onClick={this.caseFiles.bind(this)}>
                                <Icon type="upload" />选择案件材料
                            </Button> 
                            <Button type="ghost" onClick={this.caseObject.bind(this)}>
                                <Icon type="upload" /> 选择案件对象
                            </Button> 
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                            label="选择的案件材料">
                            <Input disabled={true}  {...getFieldProps('selectCaseFiles')}/>
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                            label="选择的涉案对象">
                            <Input disabled={true}  {...getFieldProps('selectCaseObject')}/>
                        </FormItem>
                    </Form>
                </Modal>

                {/* 选择案件材料 */}
                <Modal title="选择案件材料" width="54%" visible={this.state.caseFilesVisible} onCancel={this.caseFilesHide.bind(this)} onOk={this.caseFilesHide.bind(this)}>
                     <Table columns={columns1}  dataSource={this.state.caseFilesData}   className="table" rowSelection={rowSelection} />
                </Modal>

                {/* 选择涉案对象 */}
                <Modal title="选择涉案对象" width="54%" visible={this.state.caseObjectVisible} onCancel={this.caseObjectHide.bind(this)} onOk={this.caseObjectHide.bind(this)}>
                    <Table columns={columns2}  dataSource={this.state.caseObjectData}   className="table" rowSelection={rowSelection2} />
                </Modal>

                {/* 案件详情 */}
                <CaseInfo_Model visible={this.state.wjajDetailVisible} data={this.state.wjajDetailData} detailShowModal={this.detailShowModal.bind(this)} detailHandle={this.detailHandle.bind(this)} />
            </div>
        )
    }
}

Fqajxb = Form.create()(Fqajxb);

export default Fqajxb