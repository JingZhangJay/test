import React from "react";
import { Form, Input, Row, Col, Button, DatePicker,Cascader,Select,Table, Modal, Card,Icon,message} from 'antd';
import {getCaseDetail, getObjectsBlist,getObjectsBlistExport} from "../../../../../Service/srbgs/fgimtpcim/server";
import {SelectGroup, CaseInfo_Model} from '../../../../../Components/index'
const FormItem = Form.Item;
const Option = Select.Option;
require("./sadxhmd.css")

class Sadwhmd extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            inquiryLoading:false,
            sadwhmdTableLoading:false,
            detailVisible: false,
            detailData:{},
        }
    }

    // 案件列表查询 请求
    async handleGetObjectsBlist(parent){
        let data = await getObjectsBlist(parent);
        if(data.code == '000000'){
            this.setState({
                sadwhmdListTable:data.responseData,
                sadwhmdTableLoading:false,
                inquiryLoading:false
            })
        }else{
            this.setState({
                sadwhmdTableLoading:false,
                inquiryLoading:false
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

    // 查询 和 导出
    handle(callback,e) {
        event.returnValue = false;
        let data;
        this.props.form.validateFields((errors,values) => {
            data = {
                hjd:(values.hjd == undefined ? '': values.hjd),
                sadxmc: (values.sadxmc == undefined ? '': values.sadxmc),
                zjhm:(values.zjhm == undefined ? '': values.zjhm),
                sf:'1'
            };
        })

        if(callback == 'handleSubmit'){
            this.setState({
                inquiryLoading:true,
                sadwhmdTableLoading:true,
            })
            this.handleGetObjectsBlist(data);
        }else if(callback == 'handleExport'){
            getObjectsBlistExport(
                '?hjd=' + data.hjd +
                '&sadxmc=' + data.sadxmc +
                '&zjhm=' + data.zjhm +
                '&sf=1'
            )
        }
    }

    // 查看案件详情
    detailShowModal (e){
        e.preventDefault();
        let thisAjbh = e.currentTarget.parentNode.parentNode.childNodes[3].innerText;
        this.handleGetCaseDetail(thisAjbh);
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
        console.log(test, e);
        for(var key in e) {
            if (key == "xzqhAllSix") {
                this.props.form.setFieldsValue({
                    "hjd": e[key]
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
    render () {
        const { getFieldProps } = this.props.form;

        const columns = [
            { title: '证件号码', dataIndex: 'zjhm', key: 'caseName'},
            { title: '涉案单位名称', dataIndex: 'dxmc', key: 'dxmc' },
            { title: '管理地', dataIndex: 'hjd', key: 'hjd' },
            { title: '案件编号', dataIndex: 'ajbh', key: 'ajbh' },
            { title: '案件名称', dataIndex: 'ajmc', key: 'ajmc',render: (text) => <a href="javascript:;"  onClick={ this.detailShowModal.bind(this)}>{text}</a>},
            { title: '涉案性质', dataIndex: 'saxz', key: 'saxz' },
            { title: '涉案身份', dataIndex: 'sasf', key: 'sasf' },
            { title: '添加时间', dataIndex: 'lrsj', key: 'lrsj' },
        ];

        return(
            <div>
                <div className="formBox">
                    <div className="formTitle">
                        涉案对象黑名单
                        <p className={`downAndUp ${this.state.downAndUp ? 'rotate' : ''}`} onClick={this.downAndUpHandel.bind(this)}></p>
                    </div>
                    <div className={`formConten ${this.state.downAndUp ? 'up' : ''}`}>
                        <Form horizontal className="ant-advanced-search-form" >
                            <Row>
                                <Col sm={8}>
                                    <FormItem
                                        label="查询类型" 
                                        hasFeedback
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                    >
                                        <Select {...getFieldProps('grade')} width="100%" size="default">
                                            <Option value="证件号码查询">证件号码查询</Option>
                                            <Option value="户籍地和名称查询">户籍地和名称查询</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col sm={8}>
                                    
                                    <FormItem
                                        label="姓名" 
                                        hasFeedback
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                        help
                                    >
                                        <Input placeholder="请输入姓名" {...getFieldProps('sadxmc')}/>
                                    </FormItem> 
                                   

                                    {/* <FormItem
                                        label="户籍地"
                                        labelCol={{ span: 9 }}
                                        wrapperCol={{ span: 14 }}
                                        hasFeedback
                                    >
                                        <Cascader options={this.state.areaData} {...getFieldProps('area')} /> 
                                    </FormItem> */}
                                </Col>
                                <Col sm={8}>
                                    <FormItem
                                        label="证件号码" 
                                        hasFeedback
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                    >
                                        <Input placeholder="请输入证件号码" {...getFieldProps('zjhm')}/>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row offset={24}>
                                <FormItem
                                        label="户籍地"
                                        labelCol={{ span: 2}}
                                        wrapperCol={{ span: 18 }}
                                        hasFeedback
                                    > 
                                    <SelectGroup sign="xzqhAllSix" offset='1' {...getFieldProps('hjd')} handleZoningCode={this.handleZoningCode.bind(this,'xzqhAllSix')} ></SelectGroup>
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
                    <Table columns={columns} dataSource={this.state.sadwhmdListTable}  loading={this.state.sadwhmdTableLoading} pagination={{pageSize:5}} />
                </div>

                {/*  查看案件信息详情  */}
                <CaseInfo_Model visible={this.state.detailVisible} data={this.state.detailData} detailShowModal={this.detailShowModal.bind(this)} detailHandle={this.detailHandle.bind(this)} />

            </div>
        )
    }
}

Sadwhmd = Form.create()(Sadwhmd);

export default Sadwhmd;