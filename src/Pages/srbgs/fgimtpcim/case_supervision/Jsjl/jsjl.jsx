import React from "react";
import { Form, Input, Row, Col, Button, DatePicker,Cascader,Select,Table, Modal, Card,Icon} from 'antd';
import {parseTime, disabledDate} from "../../../../../asset/srbgs/js/common";
import {getUnlockRecordShow ,getExportUnlockRecord} from "../../../../../Service/srbgs/fgimtpcim/server";
import {SelectGroup} from "../../../../../Components";
const FormItem = Form.Item;

require('./jsjl.css');

class Jsjl extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            jsjlTableLoading:false,
            inquiryLoading:false,
            downAndUp: false,
            pageSize: 5,//每页条数
            pageNum: 1,//当前页码
            totalRecord: "",
            inquiryData: {},
        }
    }

    // 解锁记录列表查询 请求
    async handleGetUnlockRecordShow(parent){
        let data = await getUnlockRecordShow(parent);
        this.setState({
            jsjllistTable:data.responseData.dataList,
            totalRecord: data.responseData.totalRecord,
            jsjlTableLoading:false,
            inquiryLoading:false
        })
    }

    // 查询 和 导出
    handle(callback,e) {
        event.returnValue = false;
        let data; 
        this.props.form.validateFields((errors,values) => {
            data = {
                sqr:(values.sqr == undefined ? '': values.sqr),
                startTime: parseTime(values.startTime),
                endTime: parseTime(values.endTime),
                jsdw: (values.jsdw == undefined ? '': values.jsdw),
            };
        })

        if(callback == 'handleSubmit'){
            data.pageNum = this.state.pageNum;
            data.pageSize = this.state.pageSize;
            this.setState({
                inquiryData:data,
                inquiryLoading:true,
                jsjlTableLoading:true,
            })
            this.handleGetUnlockRecordShow(data);
        }else if(callback == 'handleExport'){
            getExportUnlockRecord(
                '?ajbh='+data.startTime+
                '&endTime='+data.endTime+
                '&sqr='+data.sqr+
                '&jsdw='+data.jsdw
            )

        }
    }

    // 区划下拉框的 Value
    handleZoningCode(test,e){
        for(var key in e) {
            if (key == "xzqhOnly") {
                this.props.form.setFieldsValue({
                    "jsdw": e[key]
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
            { title: '序号', dataIndex: 'iD', key: 'iD' },
            { title: '申请部门', dataIndex: 'jSDW', key: 'jSDW'},
            { title: '解锁时间', dataIndex: 'jSSJ', key: 'jSSJ' },
            { title: '申请人', dataIndex: 'SQR', key: 'SQR'}
        ];

        const pagination = {
            _this: this,
            total: this.state.totalRecord,
            pageSize: this.state.pageSize,
            onChange(current) {
                let postData = this._this.state.inquiryData;
                postData.pageSize = this._this.state.pageSize;
                postData.pageNum = current;
                this._this.handleGetUnlockRecordShow(postData);
                this._this.setState({
                    jsjlTableLoading: false,
                })
            },
        };

        return(
            <div>
                <div className="formBox">
                    <div className='formTitle'>
                        解锁记录
                        <p className={`downAndUp ${this.state.downAndUp ? 'rotate' : ''}`} onClick={this.downAndUpHandel.bind(this)}></p>
                    </div>
                    <div className={`formConten ${this.state.downAndUp ? 'up' : ''}`}>
                        <Form horizontal className="ant-advanced-search-form">
                            <Row gutter={16}>
                                <Col sm={7}>
                                    <FormItem
                                        label="申请人"
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                    >
                                        <Input size="default" {...getFieldProps('sqr')} />
                                    </FormItem>
                                </Col>
                                <Col sm={9}>
                                    <FormItem
                                        label="解锁单位"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                    >
                                        {/* <Input size="default" {...getFieldProps('jsdw')} /> */}
                                        <SelectGroup sign="xzqhOnly"  {...getFieldProps('jsdw')}  handleZoningCode={this.handleZoningCode.bind(this,'xzqhOnly')}></SelectGroup>
                                    </FormItem>
                                </Col>
                                <Col sm={8}>
                                    <FormItem
                                        label="解锁时间"
                                        labelCol={{ span: 6 }}
                                    >
                                        <Col span="8">
                                            <DatePicker {...getFieldProps('startTime')} disabledDate={disabledDate}/>
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8">
                                            <DatePicker {...getFieldProps('endTime')} disabledDate={disabledDate}/>
                                        </Col>
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
                           dataSource={this.state.jsjllistTable}
                           loading={this.state.jsjlTableLoading}
                           pagination={pagination}
                           className="table"
                    />
                </div>
            </div>
        )
    }
}

Jsjl = Form.create()(Jsjl);

export default Jsjl