import React from 'react';
import { hashHistory, Link } from "react-router";
import { Form, Input, Row, Col, Button, DatePicker,Cascader,Select,Table, Modal, Card,Icon, message} from 'antd';
import {parseTime, disabledDate, detailShowModal} from "../../../../../asset/srbgs/js/common";
import {
    getFilingApplicationShow,
    getSelectAjspDetailInfo,
    getCaseFile,
    getInsertLaspResult,
    getRequestFilingResultExport,
    getCaseDetail
} from "../../../../../Service/srbgs/fgimtpcim/server";
import {CaseFile_Model, SelectGroup, CaseInfo_Model} from "../../../../../Components/index"
const FormItem = Form.Item;
const Option = Select.Option;
require('./lasp.css');

const tableData1 = [
    {
        key: 1, caseId: 'A3707051903040101',caseName: '案件名称', caseArea: '申请立案单位',caseRole:'锁定对象单位',caseProperty:'上报时间',
        Role:'上报对像',IDnumber:'详细比对',state:''
    },
    {
        key: 2, caseId: 'A3707051903040101',caseName: '案件名称', caseArea: '申请立案单位',caseRole:'锁定对象单位',caseProperty:'上报时间',
        Role:'上报对像',IDnumber:'详细比对',state:' '
    }
];

class Lasp  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            inquiryLoading:false,
            laspTableLoading:false,
            exportLoading:true, 
            lasplistTable:[], 
            contrastVisible: false,
            contrastTableData1:[],
            contrastTableData2:[], 
            caseFileVisible:false,
            data_caseFile: {0: [], 1: [], 2: []},
            operateVisible: false,
            operateAjmc:'',
            detailVisible: false,
            detailData:{},
            contrastData:[
                {
                    ajmc:''
                },
                {
                    ajmc:''
                }
            ],
            pageSize: 5,//每页条数
            pageNum: 1,//当前页码
            totalRecord: "",
            inquiryData: {},
        }
    }

    // 已结案件列表查询 请求
    async handleGetFilingApplicationShow(params){
        console.log(params)
        let data = await getFilingApplicationShow(params);
        if(data.code == '000000'){
            this.setState({
                lasplistTable:data.responseData.dataList,
                totalRecord: data.responseData.totalRecord,
                laspTableLoading:false,
                inquiryLoading:false
            })
        }else{
            message.error("数据获取失败！");
            this.setState({
                laspTableLoading:false,
                inquiryLoading:false
            })
        } 
    }

    // 对比案件信息 请求
    async handleGetSelectAjspDetailInfo(params){
        let data = await getSelectAjspDetailInfo(params);
        if(data.code == '000000'){
            console.log(data)
            this.setState({
                contrastData:data.responseData,
                contrastTableData1: data.responseData[0].sadxList,
                contrastTableData2: data.responseData[1].sadxList,
                contrastVisible: true,
            })
        }else{
            message.error('数据请求失败！');
            this.setState({ 
                contrastVisible: false,
            })
        }
    }

    // 查看案件详情 请求
    async handleGetCaseDetail(params){
        let data = await getCaseDetail(params);
        if(data.code == '000000'){
            this.setState({
                detailData: data.responseData,
                detailVisible: true,
            });
        }else{
            message.error('数据获取失败')
        }
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
        if(data.code == '000000'){
            this.setState({
                data_caseFile: caseFileObj,
                caseFileVisible : true,
            });
        }else{
            message.error('数据获取失败')
        }
       
    }

    // 立案审批
    async handleGetInsertLaspResult(params){ 
        let data = await getInsertLaspResult(params);
        if(data.code == '000000'){
            message.success('审批操作成功！');
            this.setState({
                operateVisible: false,
            })
        }else{
            message.error('审批操作失败！')
        }
    }

    // 查询 和 导出
    handle(callback,e) {
        event.returnValue = false;
        let data; 
        this.props.form.validateFields((errors,values) => { 
            data = {
                ajbh:(values.ajbh == undefined ? '': values.ajbh),
                sbsj: parseTime(values.sbsj),
                sbsjEnd: parseTime(values.sbsjEnd),
                sadx:(values.sadx == undefined ? '': values.sadx),
                sfsp:(values.sfsp == undefined ? '': values.sfsp),
                sbdw:(values.sbdw == undefined ? '': values.sbdw),
                spdw: window.sessionStorage.getItem('zoningCode'),
            };
            this.setState({
                inquiryData:data
            })
        })

        if(callback == 'handleSubmit'){
            data.pageNum = this.state.pageNum;
            data.pageSize = this.state.pageSize;;
            this.setState({
                inquiryLoading:true,
                laspTableLoading:true,
            })
            this.handleGetFilingApplicationShow(data);
        }else if(callback == 'handleExport'){
            getRequestFilingResultExport(
                '?ajbh='+ data.ajbh +
                '&sbsj='+ data.sbsj +
                '&sbsjEnd='+ data.sbsjEnd +
                '&sadx='+ data.sadx +
                '&sfsp='+ data.sfsp +
                '&sbdw='+ data.sbdw +
                '&spdw='+ data.spdw
            )
        }
    }

    // 查看案件详情
    detailShowModal (e){
        e.preventDefault();
        // let thisAjbh = e.currentTarget.parentNode.parentNode.childNodes[0].innerText;
        // this.handleGetCaseDetail(thisAjbh);
        detailShowModal(e, this, this.handleGetCaseDetail);
    }

    // 获取案件详情 的 取消 按钮
    detailHandle(e) {
        this.setState({
            detailVisible:false,
            data:""
        })
    }

    // 案件对比按钮 
    contrastHandel(text,e){
       let data = {
            najbh:e.currentTarget.parentNode.parentNode.childNodes[0].innerText,
            oajbh:text
       }
       this.handleGetSelectAjspDetailInfo(data)
    }
  
    // 详细对比 取消弹框
    contrastCancel(e){
        this.setState({
            contrastVisible: false,
        })
    }

    // 案件材料
    caseFileHandel(text){ 
        this.handleGetCaseFile(text);
    }

    // 查看案件材料 取消 按钮
    CaseFileHandle(e) {;
        this.setState({
            caseFileVisible:false,
            data:""
        })
    }

    // 操作
    operateHandel(text,e){
        this.setState({
            operateVisible: true,
            operateAjmc: e.currentTarget.parentNode.parentNode.childNodes[1].innerText, 
        })
        this.props.form.setFieldsValue({
            operateId: text
        })
    }

    //  操作 确认
    operateOk(e){ 
        let data;
        this.props.form.validateFields((error,values)=>{
          data = {
            id: values.operateId,
            state: values.state,
            spms: values.spsm,
            spdw: window.sessionStorage.getItem('zoningCode'),
          }
        })
        this.handleGetInsertLaspResult(data) 
    }

    //  操作 取消
    operateCancel(){
        this.setState({
            operateVisible: false,
        }) 
    }

    // 区划下拉框的 Value
    handleZoningCode(test,e){
        console.log(test, e);
        for(var key in e) {
            if (key == "xzqhOnly") {
                this.props.form.setFieldsValue({
                    "sbdw": e[key]
                })
            }
        }
    }

    // 收起 搜素框
    downAndUpHandel(){
        // document.getElementsByClassName('formConten')[0].className='formConten up'
        let {downAndUp} = this.state;
        this.setState({
            downAndUp: !downAndUp
        })
    }
    render() {
        const { getFieldProps  } = this.props.form;

        const columns1 = [
            { title: '案件编号', dataIndex: 'najbh', key: 'najbh'},
            { title: '案件名称', dataIndex: 'najmc', key: 'najmc',render: (text) => <a href="javascript:;"  onClick={ this.detailShowModal.bind(this)}>{text}</a> },
            { title: '审批状态', dataIndex: 'state', key: 'state' },
            { title: '申请立案单位', dataIndex: 'nbadw_mc', key: 'nbadw_mc' },
            { title: '锁定对象单位', dataIndex: 'obadw_mc', key: 'obadw_mc' },
            { title: '上报时间', dataIndex: 'sqsj', key: 'sqsj' },
            { title: '上报对象', dataIndex: 'sadxmc', key: 'sadxmc' },
            { title: '详细比对', dataIndex: 'oajbh', key: 'oajbh',render:(text)=> <a href='javascript:;' onClick={this.contrastHandel.bind(this,text)}>对比</a>},
            { title: '操作', dataIndex: 'id', key: 'id' ,render:(text,e)=> <a href='javascript:;' disabled={e.state == '待审批' ? false : true}  onClick={this.operateHandel.bind(this,text)}>操作</a> }
        ];

        const columns2 = [
            { title: '对象名称', dataIndex: 'dxmc', key: 'dxmc'},
            { title: '户籍(管理)地', dataIndex: 'hjd', key: 'hjd' },
            { title: '涉案身份', dataIndex: 'sasf', key: 'sasf' },
            { title: '涉案性质', dataIndex: 'saxz', key: 'saxz' },
            { title: '身份', dataIndex: 'sf', key: 'sf' }, 
            { title: '证件号码', dataIndex: 'zjhm', key: 'zjhm'},
            { title: '当前状态', dataIndex: 'dqzt', key: 'dqzt'}
        ]
        const DefaultValue = getFieldProps('sfsp', 
            {initialValue :'1' || undefined}
        )

        const pagination = {
            _this: this,
            total: this.state.totalRecord,
            pageSize: this.state.pageSize,
            onChange(current) {
                let postData = this._this.state.inquiryData;
                postData.pageSize = this._this.state.pageSize;
                postData.pageNum = current;
                this._this.handleGetFilingApplicationShow(postData);
                this._this.setState({
                    laspTableLoading: false,
                })
            },
        };

        return (
            <div>
                <div className="formBox">
                    <div className="formTitle">
                        立案审批
                        <p className={`downAndUp ${this.state.downAndUp ? 'rotate' : ''}`} onClick={this.downAndUpHandel.bind(this)}></p>
                    </div>
                    <div className={`formConten ${this.state.downAndUp ? 'up' : ''}`}>
                        <Form horizontal className="ant-advanced-search-form">
                            <Row gutter={16}>
                                <Col sm={8}>
                                    <FormItem
                                        label="案件编号"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 17 }}
                                        hasFeedback
                                    >
                                        <Input placeholder="请输入搜索名称" size="default"  {...getFieldProps('ajbh')}/>
                                    </FormItem>
                                    <FormItem
                                        label="上报时间"
                                        labelCol={{ span: 6 }}
                                        hasFeedback
                                        help
                                    >
                                        <Col span="8">
                                            <FormItem >
                                                <DatePicker {...getFieldProps('sbsj')} disabledDate={disabledDate}/>
                                            </FormItem>
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8">
                                            <FormItem>
                                                <DatePicker {...getFieldProps('sbsjEnd')} disabledDate={disabledDate}/>
                                            </FormItem>
                                        </Col>
                                    </FormItem>
                                </Col>
                                <Col sm={9}>
                                    <FormItem
                                        label="涉案对象"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                        hasFeedback
                                    >
                                        <Input placeholder="请输入搜索名称" size="default" {...getFieldProps('sadx')}/>
                                    </FormItem>

                                    <FormItem
                                        label="上报单位"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }} 
                                    >
                                        {/* <Input   {...getFieldProps('sbdw')} /> */}
                                        <SelectGroup sign="xzqhOnly"  {...getFieldProps('sbdw')}  handleZoningCode={this.handleZoningCode.bind(this,'xzqhOnly')}></SelectGroup>
                                    </FormItem>


                                </Col>
                                <Col sm={7}>
                                    <FormItem
                                        label="是否审批"
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        hasFeedback
                                        help
                                    >
                                        <Select {...DefaultValue}>
                                            <Option value="1">未审批</Option>
                                            <Option value="2">已审批</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
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
                    <Table columns={columns1}
                           dataSource={this.state.lasplistTable}
                           className="table"
                           loading={this.state.laspTableLoading}
                           pagination={pagination}
                    />
                </div>

                {/* 对比案件详情 */}
                <Modal title="对比案件信息" visible={this.state.contrastVisible}    
                    onOk={this.contrastCancel.bind(this)}
                    onCancel={this.contrastCancel.bind(this)}
                    width='72%'
                    >
                    <Row>
                        <Col sm={12}>
                            <p style={{textAlign:"center",color:'red',fontWeight:'bold'}}>锁定涉案对象的案件信息</p>
                            <FormItem  
                                label="案件名称"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 14 }}>
                                <Input value={this.state.contrastData[0].ajmc}/>
                            </FormItem>
                            <FormItem  
                                label="立案机关"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 14 }}>
                                <Input value={this.state.contrastData[0].lajg_mc}/>
                            </FormItem>
                            <FormItem  
                                label="案件来源方式"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 14 }}>
                                <Input value={this.state.contrastData[0].lyfs}/>
                            </FormItem>
                            <FormItem  
                                label="立案时间"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 14 }}>
                                <Input value={this.state.contrastData[0].lasj}/>
                            </FormItem>
                            <FormItem  
                                label="案发地点"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 14 }}>
                                <Input value={this.state.contrastData[0].afdd_mc}/>
                            </FormItem>
                            <FormItem  
                                label="案发时间"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 14 }}>
                                <Input value={this.state.contrastData[0].afsj}/>
                            </FormItem>
                            <FormItem  
                                label="案件性质"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 14 }}>
                                <Input  value={this.state.contrastData[0].ajxz_mc}/>
                            </FormItem>
                            <FormItem  
                                label="立案人"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 14 }}>
                                <Input value={this.state.contrastData[0].lar}/>
                            </FormItem>
                            <FormItem  
                                label="审批人"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 14 }}>
                                <Input value={this.state.contrastData[0].spr}/>
                            </FormItem>
                            <FormItem  
                                label="承办人"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 14 }}>
                                <Input value={this.state.contrastData[0].cbr}/>
                            </FormItem>
                            <Table columns={columns2}
                                dataSource={this.state.contrastTableData1}
                                className="table"  
                            />
                            <FormItem  
                                label="案情简介"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 14 }}>
                                <Input type="textarea" rows={3} value={this.state.contrastData[0].aqjj}/>
                            </FormItem>
                            <FormItem  
                                label="案件材料"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 14 }}>
                                <Button onClick={this.caseFileHandel.bind(this,this.state.contrastData[0].ajbh)}>查看</Button>
                            </FormItem>
                        </Col>
                        <Col sm={12}>
                            <p style={{textAlign:"center",color:'red',fontWeight:'bold'}}>申请立案的案件信息</p>
                            <FormItem  
                                label="案件名称"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 14 }}>
                                <Input value={this.state.contrastData[1].ajmc}/>
                            </FormItem>
                            <FormItem  
                                label="立案机关"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 14 }}>
                                <Input value={this.state.contrastData[1].lajg_mc}/>
                            </FormItem>
                            <FormItem  
                                label="案件来源方式"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 14 }}>
                                <Input value={this.state.contrastData[1].lyfs}/>
                            </FormItem>
                            <FormItem  
                                label="立案时间"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 14 }}>
                                <Input value={this.state.contrastData[1].lasj}/>
                            </FormItem>
                            <FormItem  
                                label="案发地点"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 14 }}>
                                <Input value={this.state.contrastData[1].afdd_mc}/>
                            </FormItem>
                            <FormItem  
                                label="案发时间"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 14 }}>
                                <Input value={this.state.contrastData[1].afsj}/>
                            </FormItem>
                            <FormItem  
                                label="案件性质"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 14 }}>
                                <Input  value={this.state.contrastData[1].ajxz_mc}/>
                            </FormItem>
                            <FormItem  
                                label="立案人"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 14 }}>
                                <Input value={this.state.contrastData[1].lar}/>
                            </FormItem>
                            <FormItem  
                                label="审批人"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 14 }}>
                                <Input value={this.state.contrastData[1].spr}/>
                            </FormItem>
                            <FormItem  
                                label="承办人"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 14 }}>
                                <Input value={this.state.contrastData[1].cbr}/>
                            </FormItem>
                            <Table columns={columns2}
                                dataSource={this.state.contrastTableData2}
                                className="table"  
                            />
                             <FormItem  
                                label="案情简介"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 14 }}>
                                <Input type="textarea" rows={3} value={this.state.contrastData[1].aqjj}/>
                            </FormItem>
                             <FormItem  
                                label="案件材料"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 14 }}>
                                <Button onClick={this.caseFileHandel.bind(this,this.state.contrastData[1].ajbh)}>查看</Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Modal>

                {/* 对比案件详情 */}
                <Modal title="立案审批操作" visible={this.state.operateVisible}    
                    onOk={this.operateOk.bind(this)}
                    onCancel={this.operateCancel.bind(this)}
                    width='54%'
                    >
                    <Input type="hidden" {...getFieldProps('operateId')}/>
                    <FormItem  
                        label="案件名称"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}>
                        <Input value={this.state.operateAjmc}/>
                    </FormItem>

                    <FormItem  
                        label="审批意见"
                        labelCol={{ span: 4 }}  
                        wrapperCol={{ span: 18 }}
                        >
                        <Select {...getFieldProps('state')} style={{width:'100%'}}>
                            <Option value=''>请选择</Option>
                            <Option value='1'>批准</Option>
                            <Option value='2'>拒绝</Option>
                        </Select>
                    </FormItem>

                    <FormItem  
                        label="审批说明"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}>
                         <Input type="textarea" rows={3} {...getFieldProps('spsm')}/>
                    </FormItem>
                </Modal>

                 {/* 案件材料 */}
                 <CaseFile_Model visible={this.state.caseFileVisible} data={this.state.data_caseFile} CaseFileHandle={this.CaseFileHandle.bind(this)} addBtnVisible='none'/>

                {/*  查看案件信息详情  */}
                <CaseInfo_Model visible={this.state.detailVisible} data={this.state.detailData} detailShowModal={this.detailShowModal.bind(this)} detailHandle={this.detailHandle.bind(this)} />

            </div>
        )
    }
}

Lasp = Form.create()(Lasp);

export default Lasp
