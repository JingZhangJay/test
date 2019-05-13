import React from 'react';
import {Form, Table, Cascader, Button, Select, Row, Col, DatePicker, message} from 'antd';
import {getCaseDetail, getYjchaxun} from '../../../../../Service/srbgs/fgimtpcim/server';
import {SelectGroup, CaseInfo_Model } from '../../../../../Components/index';
import {detailShowModal, disabledDate, parseTime} from '../../../../../asset/srbgs/js/common'

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

require('./yjxxck.css');

const tableData = [
    {
        key: 1, caseId: 'A3707051903040101',caseName: '奎文瑞金门诊部',caseRole:'主办案件编号',emitTime:'发出日期',receiveTime:'接收日期'
    },
    {
        key: 2, caseId: 'A3707051903040101',caseName: '张淑珍',caseRole:'主办案件编号',emitTime:'发出日期',receiveTime:'接收日期'
    }
];
class Yjxxck extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            yjchaxun:[],
            visible: false,
            loading: false,
            tableLoading: false,
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
    async handleGetYjchaxun(params){
        let data = await getYjchaxun(params);
        if(data.code == '000000'){
            this.setState({
                yjchaxun: data.responseData.dataList,
                totalRecord: data.responseData.totalRecord,
                loading: false,
                tableLoading: false, 
            })
        }else{
            message.error('查询数据失败！');
            this.setState({
                loading: false,
                tableLoading: false,
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

    // 查询
    inquiry(e){
        let data;
        this.props.form.validateFields((errors,values) => {
            data = {
                 sqrq_start: parseTime(values.sqrq_start),
                 sqrq_end: parseTime(values.sqrq_end),
                 cxlx: values.cxlx,
                 jsrq_start: parseTime(values.jsrq_start),
                 jsrq_end:parseTime(values.jsrq_end),
                 sqdw: values.sqdw,
                 jsdw: values.jsdw,
                 sqzt: values.sqzt,
            }
        })
        data.pageNum = this.state.pageNum;
        data.pageSize =  this.state.pageSize;
        this.setState({
            inquiryData:data,
            loading: true,
            tableLoading: true,
        })
        this.handleGetYjchaxun(data)
    }

    // 查看案件详情
    detailShowModal (e){
        e.preventDefault();
        detailShowModal(e, this, this.handleGetCaseDetail);
    }

    // 获取案件详情 的 取消 按钮
    detailHandle(e) {
        this.setState({
            detailVisible:false,
            data:""
        })
    }

    // 区划下拉框的 Value
    handleZoningCode(test,e){
        for(var key in e) {
            if (key == "xzqhAll") {
                console.log('e ====> ',e)
                console.log('e[key] ====> ',e[key])
                this.props.form.setFieldsValue({
                    "sqdw": e[key],
                    "jsdw": e[key],
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

        const columns  = [
            { title: '案件编号', dataIndex: 'AJBH', key: 'AJBH'},
            { title: '案件名称', dataIndex: 'AJMC', key: 'AJMC' ,render: (text) => <a href="javascript:;"  onClick={ this.detailShowModal.bind(this)}>{text}</a>},
            { title: '主办案件编号', dataIndex: 'ZBAJ_BH', key: 'ZBAJ_BH' },
            { title: '发出日期', dataIndex: 'SQRQ', key: 'SQRQ' },
            { title: '接收日期', dataIndex: 'JSRQ', key: 'JSRQ' }
        ];

        const pagination = {
            _this: this,
            total: this.state.totalRecord,
            pageSize: this.state.pageSize,
            onChange(current) {
                let postData = this._this.state.inquiryData;
                postData.pageSize = this._this.state.pageSize;
                postData.pageNum = current;
                this._this.handleGetYjchaxun(postData);
                this._this.setState({
                    tableLoading: false,
                })
            },
        };

        return(
            <div>
                <div className="formBox">
                    <div className="formTitle">
                        移交信息查看
                        <p className={`downAndUp ${this.state.downAndUp ? 'rotate' : ''}`} onClick={this.downAndUpHandel.bind(this)}></p>
                    </div>
                    <div className={`formConten ${this.state.downAndUp ? 'up' : ''}`}>
                        <Form horizontal className="ant-advanced-search-form" onSubmit={this.inquiry.bind(this)}>
                            <Row gutter={16}>
                                <Col sm={8}>
                                    <FormItem
                                        label="发起日期"
                                        labelCol={{ span: 6 }} 
                                        hasFeedback
                                    >
                                        <Col span="8"> 
                                            <DatePicker {...getFieldProps('sqrq_start')} disabledDate={disabledDate} />
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8"> 
                                            <DatePicker {...getFieldProps('sqrq_end')} disabledDate={disabledDate} />
                                        </Col>
                                    </FormItem>
                                    <FormItem
                                        label="接收时间"
                                        labelCol={{ span: 6 }} 
                                        hasFeedback
                                        help
                                    >
                                        <Col span="8"> 
                                            <DatePicker {...getFieldProps('jsrq_start')} disabledDate={disabledDate} />
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8"> 
                                            <DatePicker {...getFieldProps('jsrq_end')} disabledDate={disabledDate} />
                                        </Col>
                                    </FormItem>
                                </Col>
                                <Col sm={7}>
                                    <FormItem
                                        label="查询类型"
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        hasFeedback
                                    >
                                        <Select {...getFieldProps('cxlx')}>
                                            <Option value="2">移交</Option>
                                            <Option value="1">协办</Option>
                                        </Select>
                                    </FormItem>

                                    <FormItem
                                        label="接收类型"
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        hasFeedback
                                    >
                                        <Select {...getFieldProps('sqzt')}>
                                            <Option value="0">申请中</Option>
                                            <Option value="1">已接收</Option>
                                            <Option value="2">已拒绝</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col sm={9}>

                                    <FormItem
                                        label="发出单位"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                    >
                                        {/* <Cascader options={this.state.areaData} {...getFieldProps('unitAreaData')} /> */}
                                        <SelectGroup sign="xzqhAll"  {...getFieldProps('sqdw')}  handleZoningCode={this.handleZoningCode.bind(this,'xzqhAll')}></SelectGroup>
                                    </FormItem>

                                    <FormItem
                                        label="接收单位"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                    >
                                        {/* <Cascader options={this.state.areaData} {...getFieldProps('unitAreaData')} /> */}
                                        <SelectGroup sign="xzqhAll"  {...getFieldProps('jsdw')}  handleZoningCode={this.handleZoningCode.bind(this,'xzqhAll')}></SelectGroup>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} offset={12} style={{ textAlign: 'right' }}>
                                    <Button type="primary" onClick={this.inquiry.bind(this)} loading={this.state.loading}>查询</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
                <div className="queryResults">
                    <Table columns={columns}
                           dataSource={this.state.yjchaxun}
                           className="table"
                           loading={this.state.tableLoading}
                           pagination ={pagination}
                    />
                </div>

                {/*  查看案件信息详情  */}
                <CaseInfo_Model visible={this.state.detailVisible} data={this.state.detailData} detailShowModal={this.detailShowModal.bind(this)} detailHandle={this.detailHandle.bind(this)} />

            </div>
        )
    }
}

Yjxxck = Form.create()(Yjxxck);

export default Yjxxck;