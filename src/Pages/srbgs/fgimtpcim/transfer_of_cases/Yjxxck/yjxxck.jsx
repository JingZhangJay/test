import React from "react";
import { Form, Input, Row, Col, Button, DatePicker,Cascader,Select,Table, Modal, Card,Icon,message} from 'antd';
import {parseTime} from "../../../../../asset/srbgs/js/common";
import {getTransferInfoShow, getCancelAjyj} from "../../../../../Service/srbgs/fgimtpcim/server";
import {SelectGroup} from "../../../../../Components";
const FormItem = Form.Item;

require('./yjxxck.css');

const tableData = [
    {
        key: 1, number: '案件编号',name: '案件名称', unit1: '移交单位',unit2:'接收单位',cancel:'撤销申请',
        starts:'移交状态'
    }
];

class Yjxxck extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            yjxxckTableLoading: false,
            inquiryLoading: false,
            yjxxckTableData: [],
            downAndUp: false,
        }
    }
    // 查询移交信息列表 请求
    async handleGetTransferInfoShow(params){
        let data = await getTransferInfoShow(params)
        if (data.code == '000000') {
            this.setState({
                yjxxckTableData:data.responseData.dataList,
                yjxxckTableLoading:false,
                inquiryLoading:false
            })
        }else{
            message.error('数据获取失败');
            this.setState({
                yjxxckTableData:[],
                yjxxckTableLoading:false,
                inquiryLoading:false
            })
        }
    }

    // 查询移交信息列表 请求
    async handleGetCancelAjyj(params){
        let data = await getCancelAjyj(params)
        if (data.code == '000000') {
            message.success('撤销申请成功！');
        }else{
            message.error('撤销申请失败！'); 
        }
    }


    // 查询
    handle(e) {
        event.returnValue = false;
        let data; 
        this.props.form.validateFields((errors,values) => { 
            data = {
                ajbh:(values.ajbh == undefined ? '': values.ajbh),
                ajmc:(values.ajmc == undefined ? '': values.ajmc),
                sqsj: parseTime(values.sqsj),
                sqsjEnd: parseTime(values.sqsjEnd),
                yjzt: (values.yjzt == undefined ? '': values.yjzt),
                yjdw: (values.yjdw == undefined ? '': values.yjdw),
                badw: '370201000000000',
            };
        })

        data.pageNum = '1';
        data.pageSize = '10';
        this.setState({
            inquiryLoading:true,
            yjxxckTableLoading:true,
        })
        this.handleGetTransferInfoShow(data); 
    }

    // 撤销申请
    cancel(e){
        let data = {
            ajbh: e.currentTarget.parentNode.parentNode.childNodes[0].innerText,
            badw:'370201000000000'
        }
        this.handleGetCancelAjyj(data)
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
            { title: '案件名称', dataIndex: 'ajmc', key: 'ajmc' },
            { title: '移交单位', dataIndex: 'sqdw', key: 'sqdw' },
            { title: '接收单位', dataIndex: 'jsdw', key: 'jsdw' },  
            { title: '撤销申请', dataIndex: 'yjzt', key: '',render:(test)=> <a href="javascript:;" onClick={this.cancel.bind(this)} disabled={test == '待处理'? true : false}>撤销申请</a> },
            { title: '移交状态', dataIndex: 'yjzt', key: 'yjzt' },
        ];
        return(
            <div>
                <div className="formBox">
                    <div className="formTitle">
                        移交信息查看
                        <p className={`downAndUp ${this.state.downAndUp ? 'rotate' : ''}`} onClick={this.downAndUpHandel.bind(this)}></p>
                    </div>
                    <div className={`formConten ${this.state.downAndUp ? 'up' : ''}`}>
                        <Form horizontal className="ant-advanced-search-form" >
                            <Row gutter={16}>
                                <Col sm={7}>
                                    <FormItem
                                        label="案件编号"
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        hasFeedbackx
                                    >
                                        <Input placeholder="请输入搜索名称" size="default" {...getFieldProps('ajbh')}/>
                                    </FormItem>
                                    <FormItem
                                        label="案件状态"
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        hasFeedback
                                        help
                                    >
                                        <Select {...getFieldProps('yjzt')}>
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
                                        <Input {...getFieldProps('ajmc')}/>
                                    </FormItem>

                                    <FormItem
                                        label="移交单位"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }} 
                                    >
                                        {/* <Cascader {...getFieldProps('yjdw')}/> */}
                                        <SelectGroup sign="xzqhAll" offset='1' {...getFieldProps('yjdw')} handleZoningCode={this.handleZoningCode.bind(this,'xzqhAll')} ></SelectGroup>
                                    </FormItem>
                                </Col>
                                <Col sm={8}>
                                    <FormItem
                                        label="移交时间"
                                        labelCol={{ span: 6 }}
                                        help
                                    >
                                        <Col span="8">
                                            <FormItem >
                                                <DatePicker {...getFieldProps('yjsj')}/>
                                            </FormItem>
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8">
                                            <FormItem>
                                                <DatePicker {...getFieldProps('yjsjEnd')}/>
                                            </FormItem>
                                        </Col>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} offset={12} style={{ textAlign: 'right' }}>
                                    <Button type="primary" htmlType="submit"  onClick={this.handle.bind(this)} loading={this.state.inquiryLoading}>查询</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
                <div className="queryResults">
                    <Table columns={columns}
                           loading={this.state.yjxxckTableLoading}
                           dataSource={this.state.yjxxckTableData}
                           className="table"
                    />
                </div>
            </div>
        )
    }
}

Yjxxck = Form.create()(Yjxxck);

export default Yjxxck;