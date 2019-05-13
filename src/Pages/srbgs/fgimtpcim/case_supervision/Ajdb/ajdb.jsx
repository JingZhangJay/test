import React from "react";
import { Form, Input, Row, Col, Button, DatePicker,Cascader,Select,Table, Modal, Card,Icon, message} from 'antd';
import {parseTime} from "../../../../../asset/srbgs/js/common";
import {getAjdbList,getSuperviseInfoDetailShow,getExportDbxxList} from "../../../../../Service/srbgs/fgimtpcim/server";
import { SelectGroup} from "../../../../../Components"; 
const FormItem = Form.Item;

require("./ajdb.css");

class Ajdb extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            inquiryLoading:false,
            ajdbTableLoading:false,
            downAndUp: false,
            pageSize: 5,//每页条数
            pageNum: 1,//当前页码
            totalRecord: "",
            inquiryData: {},
        }
    }
    // 已结案件列表查询 请求
    async handleGetAjdbList(parent){
        let data = await getAjdbList(parent);
        if(data.code == '000000'){
            this.setState({
                ajdblistTable:data.responseData.dataList,
                totalRecord: data.responseData.totalRecord,
                inquiryLoading:false,
                ajdbTableLoading:false
            })
        }else{
            message.error('数据请求失败！');
            this.setState({ 
                inquiryLoading:false,
                ajdbTableLoading:false
            })
        }
    }


    // 查询 和 导出
    handle(callback,e) {
        event.returnValue = false;
        let data; 
        this.props.form.validateFields((errors,values) => {
            data = {
                AJBH: values.AJBH,
                AJMC: values.AJMC,
                DBLX: values.DBLX,
                DBDW: values.AFDW,
             };
        })

        if(callback == 'handleSubmit'){
            data.pageNum = this.state.pageNum;
            data.pageSize = this.state.pageSize;
            this.setState({
                inquiryData:data,
                inquiryLoading:true,
                ajdbTableLoading:true,
            })
            this.handleGetAjdbList(data);
        }else if(callback == 'handleExport'){
            getExportDbxxList(
                '?AJBH='+ data.AJBH +
                '&AJMC='+ data.AJMC +
                '&DBLX='+ data.DBLX +
                '&DBDW='+ data.DBDW
            )
        }
    }

    // 区划下拉框的 Value
    handleZoningCode(test,e){
        console.log(test, e);
        for(var key in e) {
            if (key == "xzqhOnly") {
                this.props.form.setFieldsValue({
                    "AFDW": e[key]
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

        // 查询结果 Table 数据
        const columns1 = [ 
            { title: '案件编号', dataIndex: 'AJBH', key: 'AJBH'},
            { title: '案件名称', dataIndex: 'AJMC', key: 'AJMC',render: (text) => <a href="javascript:;" >{text}</a>},
            { title: '主板案件编号', dataIndex: 'jszt', key: 'jszt'},
            { title: '申请单位', dataIndex: 'sqdw', key: 'sqdw' },
            { title: '申请时间', dataIndex: 'sqsj', key: 'sqsj' },
            { title: '接收状态', dataIndex: 'jszt', key: 'jszt' },
            { title: '应答单位', dataIndex: 'DBLX_MC', key: 'DBLX_MC' },
            { title: '应答时间', dataIndex: 'dbrq', key: 'dbrq' },
            { title: '督办', dataIndex: 'DBBH', key: 'DBBH'},
            { title: '详情查看', dataIndex: '', key: '',render:()=> <a href="javascript:;">查看</a>},
        ];

        const pagination = {
            _this: this,
            total: this.state.totalRecord,
            pageSize: this.state.pageSize,
            onChange(current) {
                let postData = this._this.state.inquiryData;
                postData.pageSize = this._this.state.pageSize;
                postData.pageNum = current;
                this._this.handleGetAjdbList(postData);
                this._this.setState({
                    ajdbTableLoading: false,
                })
            },
        };

        return(
            <div>
                <div className="formBox">
                    <div className="formTitle">
                        案件督办
                        <p className={`downAndUp ${this.state.downAndUp ? 'rotate' : ''}`} onClick={this.downAndUpHandel.bind(this)}></p>
                    </div>
                    <div className={`formConten ${this.state.downAndUp ? 'up' : ''}`}>
                        <Form horizontal className="ant-advanced-search-form">
                            <Row gutter={16}>
                                <Col sm={1}></Col>
                                <Col sm={10}>
                                    <FormItem
                                        label="案件编号"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                        hasFeedback
                                    >
                                        <Input placeholder="请输入搜索名称" size="default"  {...getFieldProps('AJBH')}/>
                                    </FormItem>
                                    <FormItem
                                        label="督办类型"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                        hasFeedback
                                        help >
                                         <Select {...getFieldProps('DBLX')}>
                                             <Option value="632">协办不应答</Option>
                                             <Option value="633">协办连续拒绝两次以上</Option>
                                             <Option value="634">未按时上报进度</Option>
                                         </Select>
                                    </FormItem>
                                </Col> 
                                <Col sm={10}>
                                    <FormItem
                                        label="案件名称"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                        hasFeedback
                                    >
                                        <Input placeholder="请输入案件名称" size="default" {...getFieldProps('AJMC')}/>
                                    </FormItem>

                                    <FormItem
                                        label="案发单位"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                    > 
                                        <SelectGroup sign="xzqhOnly"  {...getFieldProps('AFDW')}  handleZoningCode={this.handleZoningCode.bind(this,'xzqhOnly')}></SelectGroup>
                                        {/* <Input {...getFieldProps('AFDW')} /> */}
                                    </FormItem>
                                </Col> 
                                <Col sm={1}></Col>
                            </Row>
                            <Row>
                                <Col span={12} offset={12} style={{ textAlign: 'right' }}> 
                                    <Button type="primary" onClick={this.handle.bind(this,'handleSubmit')} loading={this.state.inquiryLoading}>查询</Button>
                                    <Button onClick={this.handle.bind(this,'handleExport')} loading={this.state.exportLoading} >导出</Button>
                                
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
                <div className="queryResults">
                    <Table columns={columns1}
                           loading = {this.state.ajdbTableLoading}
                           dataSource={this.state.ajdblistTable}
                           className="table"
                           pagination={ pagination }
                    />
                </div>


                {/* 督办内容 */}
                <Modal title="查看督办信息" visible={this.state.visible}
                    //    onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                       >
                    <FormItem
                        label="案件名称"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Input  value="案件名称"/>
                    </FormItem>
                    <FormItem
                        label="督办类型"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Input  value="及时督办"/>
                    </FormItem>
                    <FormItem
                        label="督办发出单位"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Input value="河北省邢台市"/>
                    </FormItem>
                    <FormItem
                        label="操作说明"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Input type="textarea" id="control-textarea" rows="3" value="请抓紧时间结案" />
                    </FormItem>
                </Modal>
            </div>
        )
    }
}

Ajdb = Form.create()(Ajdb);

export default Ajdb