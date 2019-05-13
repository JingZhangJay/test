import React from 'react';
import { Form, Input, Row, Col, Button, DatePicker,Cascader,Select,Table, Modal, Card,Icon,message,Spin,Alert } from 'antd';
import {parseTime,detailShowModal,disabledDate} from "../../../../../asset/srbgs/js/common";
import {getSuperviseInfoListShow,getSuperviseInfoExport,getCaseDetail,getSuperviseInfoDetailShow} from "../../../../../Service/srbgs/fgimtpcim/server"
import { CaseInfo_Model,SelectGroup} from "../../../../../Components";
const FormItem = Form.Item;

require('./dbxx.css');

class Dbxx extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            inquiryLoading: false,
            ddxxTableLoading: false,
            SpinVisible: false,
            dbxxDetailVisible: false,
            dbxxDetailData: {},
            dbxxVisible: false,
            dbxxContentDetaVisible: false,
            dbxxlistTable:[],
            dbxxDetail:[],
            downAndUp: false,
            pageSize: 5,//每页条数
            pageNum: 1,//当前页码
            totalRecord: "",
            inquiryData: {},
        }
    }

    // 督办信息查询 请求
    async handelGetSuperviseInfoListShow(params){
        let data = await getSuperviseInfoListShow(params);
        if (data.code == '000000'){
            this.setState({ 
                dbxxlistTable:data.responseData.dataList,
                totalRecord: data.responseData.totalRecord,
                ddxxTableLoading:false,
                inquiryLoading:false
            })
        }else {
            message.error('数据请求失败')
            this.setState({
                ddxxTableLoading:false,
                inquiryLoading:false
            })
        }

    }

    // 查看案件详情 请求
    async handleGetCaseDetail(params){
        let data = await getCaseDetail(params);
        if(data.code == '000000'){
            this.setState({
                dbxxDetailData: data.responseData,
                dbxxDetailVisible: true,
            })
        }else{
            message.error('数据获取失败')
        } 
    } 

    // 查看督办详细信息内容 请求
    async handleGetdbxxDetail(params){
        let data = await getSuperviseInfoListShow(params);
        if(data.code == '000000'){
            this.setState({
                dbxxDetail: data.responseData.dataList[0],
                dbxxVisible:true,
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
                AJBH:(values.ajbh == undefined ? '': values.ajbh),
                startTime: parseTime(values.startTime),
                endTime: parseTime(values.endTime),
                AJMC: (values.ajmc == undefined ? '': values.ajmc),
                DBLX:(values.DBLX_DM == undefined ? '': values.DBLX_DM),
                BDBW: (values.bdbdw == undefined ? '': values.bdbdw),
                DBDW: window.sessionStorage.getItem('zoningCode')
            };
        })

        if(callback == 'handleSubmit'){
            data.pageNum = this.state.pageNum;
            data.pageSize = this.state.pageSize;
            this.setState({
                inquiryLoading:true,
                ddxxTableLoading:true,
                inquiryData:data
            })
            this.handelGetSuperviseInfoListShow(data);
        }else if(callback == 'handleExport'){
            getSuperviseInfoExport(
                '?AJBH='+this.state.inquiryData.AJBH+
                '&DBSJ='+this.state.inquiryData.DBSJ +
                '&DBSJ='+this.state.inquiryData.DBSJ+
                '&AJMC='+this.state.inquiryData.AJMC+
                '&DBLX_DM='+this.state.inquiryData.DBLX_DM+
                '&BDBW='+this.state.inquiryData.BDBW+
                '&DBDW='+this.state.inquiryData.DBDW
            )
        }
    }

     // 查看案件详情
    detailShowModal (e){  
        e.preventDefault();
        let params = e.currentTarget.parentNode.parentNode.childNodes[1].innerText;
        this.handleGetCaseDetail(params)
    }


    // 获取案件详情 的 取消 按钮
    detailHandle(e) {
        this.setState({
            dbxxDetailVisible:false
        })
    }

    // 督办信息查看
    dbxxShowModal(e){ 
        let data;
        this.props.form.validateFields((errors,values) => { 
            data = {
                AJBH: e.currentTarget.parentNode.parentNode.childNodes[1].innerText,
                BDBW: (values.bdbdw == undefined ? '': values.bdbdw),
               
            }
        }) 
        data.DBDW = window.sessionStorage.getItem('zoningCode');
        data.pageNum ='1';
        data.pageSize='10';
        this.handleGetdbxxDetail(data) 
        
    }
    
    // 督办信息查看 取消 弹框
    dbxxHideModal(){
        this.setState({
            dbxxVisible:false
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

        const columns1 = [
            { title: '督办序号', dataIndex: 'dbbh', key: 'dbbh'},
            { title: '案件编号', dataIndex: 'ajbh', key: 'ajbh'},
            { title: '案件名称', dataIndex: 'ajmc', key: 'ajmc' ,render: (text) => <a href="javascript:;"  onClick={ this.detailShowModal.bind(this)} >{text}</a>},
            { title: '案件状态', dataIndex: 'ajzt', key: 'ajzt' },
            { title: '督办时间', dataIndex: 'dbrq', key: 'dbrq' },
            { title: '督办类型', dataIndex: 'dblx_mc', key: 'dblx_mc' },
            { title: '督办内容', dataIndex: 'dbsm', key: 'dbsm' ,render: (text) => <a href="javascript:;"  onClick={ this.dbxxShowModal.bind(this)} >{text}</a>},
        ];

        const pagination = {
            _this: this,
            total: this.state.totalRecord,
            pageSize: this.state.pageSize,
            onChange(current) {
                let postData = this._this.state.inquiryData;
                postData.pageSize = this._this.state.pageSize;
                postData.pageNum = current;
                this._this.handelGetSuperviseInfoListShow(postData);
                this._this.setState({
                    ddxxTableLoading: false,
                })
            },
        };

        return(
            <div>
                <div className="formBox">
                    <div className="formTitle">
                        督办信息
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
                                        <Input size="default"  {...getFieldProps('ajbh')}/>
                                    </FormItem>
                                    <FormItem
                                        label="督办时间"
                                        labelCol={{ span: 6 }}
                                        hasFeedback
                                        help
                                    >
                                        <Col span="8">
                                            <DatePicker  {...getFieldProps('startTime')} disabledDate={disabledDate}/>
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8">
                                            <DatePicker  {...getFieldProps('endTime')} disabledDate={disabledDate}/>
                                        </Col>
                                    </FormItem>
                                </Col>
                                <Col sm={9}>
                                    <FormItem
                                          label="案件名称"
                                          labelCol={{ span: 6 }}
                                          wrapperCol={{ span: 18 }}
                                          hasFeedback
                                    >
                                        <Input size="default" {...getFieldProps('ajmc')} />
                                    </FormItem>

                                    <FormItem
                                        label="被督办单位"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                        hasFeedback
                                    > 
                                        <SelectGroup sign="xzqhOnly"  {...getFieldProps('bdbdw')}  handleZoningCode={this.handleZoningCode.bind(this,'bdbdw')}></SelectGroup>
                                    </FormItem>


                                </Col>
                                <Col sm={7}> 
                                    <FormItem
                                        label="督办类型"    
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        hasFeedback
                                        help
                                    > 
                                       <Select  {...getFieldProps('DBLX_DM')}>
                                           <Option value="631">超时未结案</Option>
                                           <Option value="632">协办不配合</Option>
                                           <Option value="633">协办拒绝两次以上</Option>
                                           <Option value="634">未按时上报进度</Option>
                                           <Option value="635">重点案件</Option>
                                           <Option value="636">及时督办</Option>
                                           <Option value="637">退回存疑</Option>
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
                           dataSource={this.state.dbxxlistTable}
                           className="table"
                           loading = {this.state.ddxxTableLoading}
                           pagination={pagination}
                    />
                </div>

                {/*<div className="ExportLoadingBox">*/}
                    {/*<Spin visible={this.state.SpinVisible} className="ExportLoading" size="large" style={{width:'6.25vw',height:'6.25vw'}}/>*/}
                    {/*<div>*/}
                        {/*<Spin tip="正在读取数据..." />*/}
                    {/*</div>*/}
                {/*</div>*/}

                {/* 查看督办信息 */}
                <Modal title="查看督办信息" visible={this.state.dbxxVisible} width="54%"
                    onOk={this.dbxxHideModal.bind(this)}
                    onCancel={this.dbxxHideModal.bind(this)}
                    >
                    <FormItem
                        label="案件名称"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Input value={this.state.dbxxDetail.ajmc}/>
                    </FormItem>
                    <FormItem
                        label="督办类型"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Input value={this.state.dbxxDetail.dblx_mc}/>
                    </FormItem>
                    <FormItem
                        label="督办发出单位"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Input value={this.state.dbxxDetail.dbdw_mc}/>
                    </FormItem>
                    <FormItem
                        label="操作说明"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Input value={this.state.dbxxDetail.dbsm} type="textarea" rows="3" />
                    </FormItem> 
                </Modal>

                {/*  查看案件信息详情    */}
                <CaseInfo_Model visible={this.state.dbxxDetailVisible} data={this.state.dbxxDetailData} detailShowModal={this.detailShowModal.bind(this)} detailHandle={this.detailHandle.bind(this)} />
                 
            </div>

        )
    }
}

Dbxx = Form.create()(Dbxx);

export default Dbxx