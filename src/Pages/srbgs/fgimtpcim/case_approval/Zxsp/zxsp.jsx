import React from 'react';
import { hashHistory, Link } from "react-router";
import { Form, Input, Row, Col, Button, DatePicker,Cascader,Select,Table, Modal, message ,muccess} from 'antd';
import {parseTime,detailShowModal,disabledDate} from "../../../../../asset/srbgs/js/common";
import {getCancellationRequestShow, getCaseDetail, getApproveLogoutApproval, getRequestCancelResultExport} from "../../../../../Service/srbgs/fgimtpcim/server";
import { CaseInfo_Model,SelectGroup} from "../../../../../Components"; 
const FormItem = Form.Item;
const Option = Select.Option;

require('./zxsp.css');
 

class Zxsp  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            inquiryLoading:false,
            laspTableLoading:false,
            lasplistTable:[],
            detailVisible: false,
            detailData:{},
            cancelVisible: false,
            cancelCauseVisible: false,
            data: {},
            pageSize: 5,//每页条数
            pageNum: 1,//当前页码
            totalRecord: "",
            inquiryData: {},
        }
    }

    // 注销案件查询 请求
    async handleGetCancellationRequestShow(parent){
        let data = await getCancellationRequestShow(parent);
        if(data.code == '000000'){
            this.setState({
                lasplistTable:data.responseData.dataList,
                totalRecord: data.responseData.totalRecord,
                laspTableLoading:false,
                inquiryLoading:false
            })
        }else{
            muccess.error('数据请求失败')
            this.setState({
                laspTableLoading:false,
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

    // 注销案件审批 请求
    async handleGetApproveLogoutApproval(params){
        let data = await getApproveLogoutApproval(params);
        if(data.code == '000000'){
            message.success('审批提交成功！')
            this.setState({
                cancelVisible:false
            })
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
                ajbh:(values.ajbh == undefined ? '': values.ajbh),
                sqsj: parseTime(values.sqsj),
                sqsjEnd: parseTime(values.sqsjEnd),
                badw:(values.badw == undefined ? '': values.badw),
                state: (values.sfsp == undefined ? '': values.sfsp),
            };


        if(callback == 'handleSubmit'){
            data.pageNum = this.state.pageNum;
            data.pageSize = this.state.pageSize;
            this.setState({
                inquiryLoading:true,
                laspTableLoading:true,
            })
            this.handleGetCancellationRequestShow(data);
        }else if(callback == 'handleExport'){
            getRequestCancelResultExport(
                '?ajbh='+ (values.ajbh == undefined ? '': values.ajbh) +
                '&sqsj='+ parseTime(values.sqsj)+
                '&sqsjEnd='+ parseTime(values.sqsjEnd)+
                '&badw='+ (values.badw == undefined ? '': values.badw)+
                '&state='+ (values.sfsp == undefined ? '': values.sfsp)
             )
        }

        })
    }

    // 审批
    approve(text,e){ 
        this.setState({
            cancelVisible: true,
            data:{
                id: text,
                ajbh: e.currentTarget.parentNode.parentNode.childNodes[0].innerText

            }
        })
        this.props.form.setFieldsValue({
            caseName:e.currentTarget.parentNode.parentNode.childNodes[1].innerText
        })
    }

    // 隐藏 取消 注销审批弹框
    cancelOk(){
        let data;
        this.props.form.validateFields((error,values) => {
            data = {
                id: this.state.data.id,
                ajbh: this.state.data.ajbh,
                state: values.opinion,
                spnr: values.cause,
                badw: window.sessionStorage.getItem('zoningCode')
            } 
        }) 
        this.handleGetApproveLogoutApproval(data);
    }
    

    // 隐藏 取消 注销审批弹框
    cancelCancel(){
        this.setState({
            cancelVisible: false,
        })
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

    // 新增案件信息的 取消 按钮
    caseAddHandle(){
        this.setState({
            caseAddVisible:false
        })
    }

    // 收起 搜素框
    downAndUpHandel(){ 
        let {downAndUp} = this.state; 
        this.setState({
            downAndUp: !downAndUp
        })
    } 

    // 注销原因 Modal show
    cancelCauseShow(text,e){
        this.props.form.setFieldsValue({
            causeCaseName: e.currentTarget.parentNode.parentNode.childNodes[1].innerText,
            applyUnit: e.currentTarget.parentNode.parentNode.childNodes[2].innerText,
            cancelCause: text,
        })

        this.setState({
            cancelCauseVisible: true,
        });
    }

    cancelCauseCancel(){
        this.setState({
            cancelCauseVisible: false,
        })
    }
    render() {
        const { getFieldProps } = this.props.form;

        const columns1 = [
            { title: '案件编号', dataIndex: 'ajbh', key: 'ajbh'},
            { title: '案件名称', dataIndex: 'ajmc', key: 'ajmc',render:(text)=><a  onClick={ this.detailShowModal.bind(this)} href='javascript:;'>{text}</a> },
            { title: '申请单位', dataIndex: 'sqdw_mc', key: 'sqdw_mc' }, 
            { title: '申请时间', dataIndex: 'sqsj', key: 'sqsj' },
            { title: '申请状态', dataIndex: 'state', key: 'state' },
            { title: '申请原因', dataIndex: 'sqyy', key: 'sqyy',render:(text)=><a href='javascript:;' onClick={this.cancelCauseShow.bind(this,text)} >{text}</a> },
            { title: '操作', dataIndex: 'id', key: 'id',render:(text)=> <a href='javascript:;' onClick={this.approve.bind(this,text)}>注销审批</a> }
        ];

        const DefaultValue = getFieldProps('sfsp', 
            {initialValue :'1' || undefined}
        );

        const pagination = {
            _this: this,
            total: this.state.totalRecord,
            pageSize: this.state.pageSize,
            onChange(current) {
                console.log(this._this.state.totalRecord)
                let postData = {};
                postData.pageSize = this._this.state.pageSize;
                postData.pageNum = current;
                this._this.handleGetCancellationRequestShow(postData);
                this._this.setState({
                    laspTableLoading: false
                })
            },
        };
        return (
            <div>
                <div className="formBox">
                    <div className="formTitle">
                        注销审批
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
                                                <DatePicker {...getFieldProps('sqsj')} disabledDate={disabledDate} />
                                            </FormItem>
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8">
                                            <FormItem>
                                                <DatePicker {...getFieldProps('sqsjEnd')} disabledDate={disabledDate} />
                                            </FormItem>
                                        </Col>
                                    </FormItem>
                                </Col> 
                                <Col sm={10}> 
                                    <FormItem
                                        label="上报单位"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }} 
                                    >
                                        {/* <Cascader options={this.state.areaData}  {...getFieldProps('badw')} /> */}
                                        <SelectGroup sign="xzqhOnly"  {...getFieldProps('badw')}  handleZoningCode={this.handleZoningCode.bind(this,'xzqhOnly')}></SelectGroup>
                                    </FormItem>
                                    <FormItem
                                        label="是否审批"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                        hasFeedback
                                        help
                                    >
                                        <Select {...DefaultValue} >
                                            <Option value="1">未审批</Option>
                                            <Option value="2">已审批</Option>
                                        </Select>
                                    </FormItem> 
                                </Col> 
                                <Col sm={1}></Col>
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

                {/* 注销审批 */}
                <Modal title="注销审批" visible={this.state.cancelVisible}  
                        onCancel={this.cancelCancel.bind(this)}
                        onOk={this.cancelOk.bind(this)}
                    >
                    <Form>
                        <FormItem
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                            label='案件名称'>
                                <Input  {...getFieldProps('caseName')}/> 
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                            label='审批意见'>
                                <Select defaultValue="1"  {...getFieldProps('opinion')} >
                                    <Option value="1">同意</Option>
                                    <Option value="2">拒绝</Option>
                                </Select>
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                            label='批示意见'>
                                <Input type="textarea" rows="3" {...getFieldProps('cause')}/>
                        </FormItem>
                    </Form>
                </Modal>

                <Modal title='注销原因' visible={this.state.cancelCauseVisible}  onCancel={this.cancelCauseCancel.bind(this)}
                       onOk={this.cancelCauseCancel.bind(this)}>
                    <FormItem
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                        label='案件名称'>
                        <Input  {...getFieldProps('causeCaseName')}/>
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                        label='申请单位'>
                        <Input  {...getFieldProps('applyUnit')}/>
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                        label='申请说明'>
                        <Input type="textarea" rows="3" {...getFieldProps('cancelCause')}/>
                    </FormItem>
                </Modal>

                 {/*  查看案件信息详情    */}
                 <CaseInfo_Model visible={this.state.detailVisible} data={this.state.detailData} detailShowModal={this.detailShowModal.bind(this)} detailHandle={this.detailHandle.bind(this)} />

            </div>
        )
    }
}

Zxsp = Form.create()(Zxsp);

export default Zxsp
