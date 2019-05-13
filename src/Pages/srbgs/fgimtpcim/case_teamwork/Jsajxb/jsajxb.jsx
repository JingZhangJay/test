import React from "react";
import { Form, Input, Row, Col, Button, DatePicker,Cascader,Select,Table, Model , Card,Icon,RangePicker, Modal, message} from 'antd';
import {getAjxbList, getCaseDetail, getCaseFile} from "../../../../../Service/srbgs/fgimtpcim/server";
import {detailShowModal ,parseTime} from "../../../../../asset/srbgs/js/common";
import { CaseFile_Model,SelectGroup,CaseInfo_Model} from "../../../../../Components";
const FormItem = Form.Item;
const Option = Select.Option;

require('./jsajxb.css');

const tableData1 = [
    {
        key: 1, name: '对象名称',address: '户籍（管理地）', degree: '涉案身份',property:'涉案性质',Id:'身份',
        number:'证件号码',file:'涉案对象材料',status:'当前状态'
    }
];

class Jsajxb extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            JsajxbTableData: [],
            inquiryLoading: false, 
            JsajxbLoading: false, 
            caseFileVisible:false,
            data_caseFile: {0: [], 1: [], 2: []},
            downAndUp: false,
            pageSize: 5,//每页条数
            pageNum: 1,//当前页码
            totalRecord: "",
            inquiryData: {},
            detailVisible: false,
            detailData:{},
        }
    }

    // 查询 请求
    async handerGetAjxbList(params){
        let data = await getAjxbList(params);
        if(data.code == '000000'){ 
            this.setState({
                JsajxbLoading: false,
                inquiryLoading: false,
                totalRecord: data.responseData.totalRecord,
                JsajxbTableData: data.responseData.dataList,
            })
        }else{
            message.error('数据请求失败');
            this.setState({ 
                JsajxbLoading: false,
                inquiryLoading: false,
            })
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

    // 查询
    inquiry(e){
        let data;
        this.props.form.validateFields((errors,values) => {
            data = {
                ajbh: values.ajbh,
                ajmc: values.ajmc,
                sqzt: values.sqzt,
                sqrq_start: parseTime(values.start),
                sqrq_end: parseTime(values.end),
                sqdw: values.sqdw
            }
        })

        data.pageNum = this.state.pageNum;
        data.pageSize = this.state.pageSize;
        this.setState({
            inquiryData:data,
            inquiryLoading:true,
            JsajxbLoading:true,
        })
        this.handerGetAjxbList(data);  
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

    // 查看案件材料
    handleCaseFile(e){
        e.preventDefault();
        let thisAjbh = e.currentTarget.parentNode.parentNode.childNodes[0].innerText;
        this.handleGetCaseFile(thisAjbh)
    }

    // 查看案件材料 取消 按钮
    CaseFileHandle(e) {;
        this.setState({
            caseFileVisible:false,
            data:""
        })
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
    render(){ 
        const { getFieldProps } = this.props.form;

        const columns = [
            { title: '案件编号', dataIndex: 'ajbh', key: 'ajbh'},
            { title: '案件名称', dataIndex: 'ajmc', key: 'ajmc',render: (text) => <a href="javascript:;"  onClick={ this.detailShowModal.bind(this)}>{text}</a>},
            { title: '申请名称', dataIndex: 'sqsm', key: 'sqsm' },
            { title: '申请时间', dataIndex: 'sqrq', key: 'sqrq' },
            { title: '协办要求', dataIndex: 'xbyq', key: 'xbyq' },
            { title: '协办对象', dataIndex: 'target', key: 'target',render:()=> <a href="javascript:;">查看</a> },
            { title: '协办材料', dataIndex: '', key: '',render:()=> <a href="javascript:;"  onClick={this.handleCaseFile.bind(this)}>查看</a> },
            { title: '申请状态', dataIndex: 'sqzt', key: 'sqzt',render:(text)=>{if(text == '1'){return '已接收'}else if(text == '2'){return '已拒绝'}}},
            { title: '操作', dataIndex: '', key: '' ,render:()=> <a href="javascript:;" disabled>不可操作</a> },
        ];

        const columns1 = [
            { title: '对象名称', dataIndex: 'name', key: 'name'},
            { title: '户籍（管理地）', dataIndex: 'address', key: 'address' },
            { title: '涉案身份', dataIndex: 'degree', key: 'degree' },
            { title: '涉案性质', dataIndex: 'property', key: 'property' },
            { title: '身份', dataIndex: 'Id', key: 'Id' },
            { title: '证件号码', dataIndex: 'number', key: 'number'},
            { title: '当前状态', dataIndex: 'status', key: 'status'},
            { title: '涉案对象材料', dataIndex: 'file', key: 'file' },
        ];

        const pagination = {
            _this: this,
            defaultCurrent:1,
            total: this.state.totalRecord,
            pageSize: this.state.pageSize,
            onChange(current) {
                let postData = this._this.state.inquiryData;
                postData.pageSize = this._this.state.pageSize;
                postData.pageNum = current;
                this._this.handerGetAjxbList(postData)
            },
        };


        const disabledDate = function (current) {
            return current && current.getTime() > Date.now();
        };
        return(
            <div>
                <div className="formBox">
                    <div className="formTitle">
                        接收案件协办
                        <p className={`downAndUp ${this.state.downAndUp ? 'rotate' : ''}`} onClick={this.downAndUpHandel.bind(this)}></p>
                    </div>
                    <div className={`formConten ${this.state.downAndUp ? 'up' : ''}`}>
                        <Form horizontal className="ant-advanced-search-form">
                            <Row gutter={16}>
                                <Col sm={7}>
                                    <FormItem
                                        label="案件编号"
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        hasFeedback
                                    >
                                        <Input size="default" {...getFieldProps('ajbh')}/>
                                    </FormItem>
                                    <FormItem
                                        label="申请状态"
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        hasFeedback
                                        help
                                    >
                                        <Select size="default" {...getFieldProps('sqzt')}>
                                            <Option value="0">申请中</Option>
                                            <Option value="1">已接收</Option>
                                            <Option value="2">已拒绝</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col sm={9}>
                                    <FormItem
                                        label="案件名称"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                        hasFeedback
                                    >
                                       <Input size="default" {...getFieldProps('ajmc')}/>
                                    </FormItem>

                                    <FormItem
                                        label="申请单位"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                        hasFeedback
                                    >
                                        {/* <Input {...getFieldProps('sqdw')}/> */}
                                        <SelectGroup sign="xzqhAll" {...getFieldProps('sqdw')} handleZoningCode={this.handleZoningCode.bind(this,'xzqhAll')} ></SelectGroup>
                                    </FormItem>
                                </Col>
                                <Col sm={8}>

                                    <FormItem
                                        label="申请时间"
                                        labelCol={{ span: 6 }}
                                        hasFeedback
                                        help
                                    >
                                        <Col span="8">
                                            <FormItem >
                                                <DatePicker {...getFieldProps('start')} disabledDate={disabledDate}/>
                                            </FormItem>
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8">
                                            <FormItem>
                                                <DatePicker {...getFieldProps('end')} disabledDate={disabledDate}/>
                                            </FormItem>
                                        </Col>
                                    </FormItem>
                                </Col>
                            </Row> 
                            <Row>
                                <Col span={12} offset={12} style={{ textAlign: 'right' }}>
                                    <Button type="primary" htmlType="submit" loading={this.state.inquiryLoading} onClick={this.inquiry.bind(this)} >查询</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
                <div className="queryResults">
                    <Table columns={columns}
                           dataSource={this.state.JsajxbTableData}
                           className="table"
                           loading = {this.state.JsajxbLoading}
                           pagination={pagination}
                    />
                </div>

                {/* 协办案件  案件对象 */}
                <Modal>
                    <Table columns={columns1}  dataSource={tableData1} className="table"/>
                </Modal>

                {/* 案件材料 */}
                <CaseFile_Model visible={this.state.caseFileVisible} data={this.state.data_caseFile} CaseFileHandle={this.CaseFileHandle.bind(this)}/>

                {/*  查看案件信息详情  */}
                <CaseInfo_Model visible={this.state.detailVisible} data={this.state.detailData} detailShowModal={this.detailShowModal.bind(this)} detailHandle={this.detailHandle.bind(this)} />

            </div>
        )
    }
}

Jsajxb = Form.create()(Jsajxb);

export default Jsajxb;