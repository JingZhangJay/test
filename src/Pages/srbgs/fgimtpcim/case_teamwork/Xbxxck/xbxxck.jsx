import React from "react";
import { Form, Input, Row, Col, Button, DatePicker,Cascader,Select,Table, Modal, Card,Icon,RangePicker, message} from 'antd';
import {getCaseDetail, getcreatedAjxbList, getreviewAjxb} from "../../../../../Service/srbgs/fgimtpcim/server"
import {detailShowModal, parseTime} from "../../../../../asset/srbgs/js/common"
import {SelectGroup, CaseInfo_Model } from "../../../../../Components"

const FormItem = Form.Item;
const Option= Select.Option;
require('./xbxxck.css');

class Xbxxck extends React.Component{
    constructor (props){
        super(props)
        this.state = {
            xbxxckTabData:[],
            inquiryLoading:false, 
            xbxxckTabLoading:false, 
            xbCancelVisible: false,
            xbxxSqzt:'',
            downAndUp: false,
            pageSize: 5,//每页条数
            pageNum: 1,//当前页码
            totalRecord: "",
            inquiryData: {},
            detailVisible: false,
            detailData:{},
        }
    }

    // 查询与导出 请求
    async handelGetcreatedAjxbList(params){
        let data = await getcreatedAjxbList(params);
        if(data.code == '000000'){
            this.setState({
                xbxxckTabData: data.responseData.dataList,
                totalRecord: data.responseData.totalRecord,
                inquiryLoading:false, 
                xbxxckTabLoading:false, 
            })
        }else{
            message.error('查询数据失败！')
            this.setState({
                inquiryLoading:false, 
                xbxxckTabLoading:false, 
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


    // 撤销协办 请求
    async handelGetreviewAjxb(params){
        let data = await getreviewAjxb(params);
        if(data.code == '000000'){
            message.success('请求成功！')
            this.setState({ 
                xbCancelVisible: false
            })
        }else{
            message.error('请求失败！') 
        }
    }


    // 查询
    inquiry(text,e){
        let data ;
        this.props.form.validateFields((error,values)=>{
            data = {
                zbajbh:values.zbajbh,
                sqzt:values.sqzt,
                xbajbh:values.xbajbh,
                xbdw:values.xbdw,
                sqrq_start: parseTime(values.sqrq_start),
                sqrq_end: parseTime(values.sqrq_end),
            }
        })

        if(text == 'inquiry'){
            data.pageNum = this.state.pageNum,
            data.pageSize = this.state.pageSize,
            this.setState({
                inquiryData:data,
                inquiryLoading: true, 
                xbxxckTabLoading: true, 
            })
            this.handelGetcreatedAjxbList(data)
        } 
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

    // 撤销协办 打开
    xbModal(text,e){ 
        this.props.form.setFieldsValue({
            'ajmc':e.currentTarget.parentNode.parentNode.childNodes[1].innerText,
            'id':text, 
            'sqzt_value':e.currentTarget.parentNode.parentNode.childNodes[6].childNodes[0].getAttribute('value'),
        })
        this.setState({
            xbCancelVisible: true,  
        })
    }

    // 关闭撤销协办 弹框
    xbCancel (){
        this.setState({
            xbCancelVisible: false
        })
    }

    // 撤销协办 确认
    xbCancelOk(e){
        let data;
        this.props.form.validateFields((error,values)=>{
            data = {
                id: values.id,
                sqzt: values.sqzt_value,
                cxsm: values.cxsm,
            }
        })
        this.handelGetreviewAjxb(data)
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
            { title: '申请时间', dataIndex: 'sqrq', key: 'sqrq' },
            { title: '接收/拒绝时间', dataIndex: 'jsrq', key: 'jsrq' },
            { title: '协办单位', dataIndex: 'jsdw_mc', key: 'jsdw_mc' },
            { title: '撤销协办', dataIndex: 'id', key: 'id' ,render:(text,e)=> <a href="javascript:;" onClick={this.xbModal.bind(this,text)} disabled = { e.sqzt == '0'? false : true } >查看</a> },
            { title: '申请状态', dataIndex: 'sqzt', key: 'sqzt',render:(text)=>{if(text == '1'){return <span value="1">已接收</span> }else if(text == '2'){return <span value="2">已拒绝</span>}else if(text == '0'){return <span value="0">请求中</span>}}},
        ];

        const disabledDate = function (current) {
            return current && current.getTime() > Date.now();
        };

        const pagination = {
            _this: this,
            total: this.state.totalRecord,
            pageSize: this.state.pageSize,
            onChange(current) {
                let postData = this._this.state.inquiryData;
                postData.pageSize = this._this.state.pageSize;
                postData.pageNum = current;
                this._this.handelGetcreatedAjxbList(postData)
            },
        };
        return(
            <div>
                <div className="formBox">
                    <div className="formTitle">
                        协办信息查看
                        <p className={`downAndUp ${this.state.downAndUp ? 'rotate' : ''}`} onClick={this.downAndUpHandel.bind(this)}></p>
                    </div>
                    <div className={`formConten ${this.state.downAndUp ? 'up' : ''}`}>
                        <Form horizontal className="ant-advanced-search-form">
                            <Row gutter={16}>
                                <Col sm={7}>
                                    <FormItem
                                        label="主办案件编号"
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        hasFeedback
                                    >
                                        <Input placeholder="请输入搜索名称" size="default" {...getFieldProps('zbajbh')}/>
                                    </FormItem>
                                    <FormItem
                                        label="申请状态"
                                        labelCol={{ span: 8 }} 
                                        wrapperCol={{ span: 16 }}   
                                        hasFeedback 
                                    >
                                        <Select {...getFieldProps('sqzt')}>
                                            <Option value='0'>申请中</Option>
                                            <Option value='1'>已接收</Option>
                                            <Option value='2'>已拒绝</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col sm={9}>
                                    <FormItem
                                        label="协办案件编号"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                        hasFeedback
                                    >
                                        <Input {...getFieldProps('xbajbh')}/>
                                    </FormItem>

                                    <FormItem
                                        label="协办单位"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                        hasFeedback
                                    >
                                        {/* <Input {...getFieldProps('xbdw')}/> */}
                                        <SelectGroup sign="xzqhAll" offset='1' {...getFieldProps('xbdw')} handleZoningCode={this.handleZoningCode.bind(this,'xzqhAll')} ></SelectGroup>
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
                                                <DatePicker {...getFieldProps('sqrq_start')} disabledDate={disabledDate}/>
                                            </FormItem>
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8">
                                            <FormItem>
                                                <DatePicker  {...getFieldProps('sqrq_end')} disabledDate={disabledDate}/>
                                            </FormItem>
                                        </Col>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} offset={12} style={{ textAlign: 'right' }}>
                                    <Button type="primary" htmlType="submit" onClick={this.inquiry.bind(this,'inquiry')} loading={this.state.inquiryLoading}>查询</Button> 
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
                <div className="queryResults">
                    <Table columns={columns}
                           dataSource={this.state.xbxxckTabData}
                           className="table"
                           loading={this.state.xbxxckTabLoading}
                           pagination={ pagination }
                    />
                </div>

                <Modal title="协办撤销" visible={this.state.xbCancelVisible}
                    onCancel={this.xbCancel.bind(this)}
                    onOk = {this.xbCancelOk.bind(this)}
                    > 
                    <Input {...getFieldProps('id')} type='hidden' /> 
                    <Input  {...getFieldProps('sqzt_value')} type='hidden' /> 
                    <FormItem label="案件名称"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}    
                        >
                        <Input {...getFieldProps('ajmc')} disabled/>
                    </FormItem>  
                    <FormItem label="撤销说明"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}    
                        >
                        <Input type="textarea" rows={5} {...getFieldProps('cxsm')} />
                    </FormItem>
                </Modal>


                {/*  查看案件信息详情  */}
                <CaseInfo_Model visible={this.state.detailVisible} data={this.state.detailData} detailShowModal={this.detailShowModal.bind(this)} detailHandle={this.detailHandle.bind(this)} />

            </div>
        )
    }
}

Xbxxck = Form.create()(Xbxxck);

export default Xbxxck