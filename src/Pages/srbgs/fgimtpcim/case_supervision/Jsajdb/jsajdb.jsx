import React from "react";
import { Form, Input, Row, Col, Button, DatePicker,Cascader,Select,Table, Modal, Card,Icon, message} from 'antd';
import {parseTime,disabledDate} from "../../../../../asset/srbgs/js/common";
import {getExportJsAjdb ,getSelectJsAjdb} from "../../../../../Service/srbgs/fgimtpcim/server";
import {SelectGroup} from "../../../../../Components";
const FormItem = Form.Item;

require('./jsajdb.css');


class jsajdb extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            jsajdbTableLoading:false,
            inquiryLoading:false,
            jsajdbTable:[],
            inquiryData:{},
            ajdbsmVisible: false,
            ajdbsmData:[
                {
                    dbbh:'',
                    ajbh:'',
                    dbdw_mc:'',
                    dblx_mc:'',
                    dbrq:'', 
                    dbsm:'', 
                }
            ],
            ajsmBadw:"",
            downAndUp: false,
            pageSize: 5,//每页条数
            pageNum: 1,//当前页码
            totalRecord: "",
        }
    }

    // 接收案件督办列表查询 请求
    async handleGetSelectJsAjdb(parent,ele){
        let data = await getSelectJsAjdb(parent);
        if(ele == ''){
            if( data.code == '000000'){
                this.setState({
                    jsajdbTable:data.responseData.dataList,
                    totalRecord: data.responseData.totalRecord,
                    jsajdbTableLoading:false,
                    inquiryLoading:false,
                })
            }else{
                message.error('数据查询失败！')
            }
        }else if(ele == '详情'){
            if( data.code == '000000'){
                this.setState({
                    ajdbsmData:data.responseData.dataList, 
                    ajdbsmVisible: true,
                })
            }else{
                message.error('数据查询失败！')
            }
        }
       
        
    }
 
    
   // 查询 和 导出
    inquiry(callback,e) {
        event.returnValue = false;
        let data; 
        this.props.form.validateFields((errors,values) => { 
            data = {
                ajbh:(values.ajbh == undefined ? '': values.ajbh),
                startTime: parseTime(values.startTime),
                endTime: parseTime(values.endTime),
                ajmc: (values.ajmc == undefined ? '': values.ajmc),
                dblx:(values.dblx == undefined ? '': values.dblx),
                badw: (values.badw == undefined ? '': values.badw), 
            };

            this.setState({
               ajsmBadw: data.badw 
            })
        })

        if(callback == 'handleSubmit'){
            data.pageNum = this.state.pageNum;
            data.pageSize = this.state.pageSize;
            this.setState({
                inquiryLoading:true,
                jsajdbTableLoading:true,
                inquiryData: data
            })
            this.handleGetSelectJsAjdb(data,'');
        }else if(callback == 'handleExport'){
            getExportJsAjdb(
                '?ajbh='+this.state.inquiryData.ajbh+
                '&startTime='+this.state.inquiryData.startTime +
                '&endTime='+this.state.inquiryData.endTime+
                '&ajmc='+this.state.inquiryData.ajmc+
                '&dblx='+this.state.inquiryData.dblx+
                '&badw='+this.state.inquiryData.badw
            )
        }
    }

    dbsmShow(test,e){
        let data = {
            id: test,
            badw: this.state.ajsmBadw,
            pageNum: '1',
            pageSize: '10',
        }
        this.handleGetSelectJsAjdb(data,'详情');

        this.setState({
            ajdbsmVisible: true,
        })
    }

    ajdbsmCancel(){
        this.setState({
            ajdbsmVisible: false,
        })
    }

    // 区划下拉框的 Value
    handleZoningCode(test,e){
        // console.log(test, e);
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
            { title: '督办序号', dataIndex: 'dbbh', key: 'dbbh' },
            { title: '案件编号', dataIndex: 'ajbh', key: 'ajbh'},
            { title: '案件名称', dataIndex: 'ajmc', key: 'ajmc' },
            { title: '接收单位', dataIndex: 'jsdw_mc', key: 'jsdw_mc' },
            { title: '督办时间', dataIndex: 'dbrq', key: 'dbrq'},
            { title: '督办类型', dataIndex: 'dblx_mc', key: 'dblx_mc'},
            { title: '督办说明', dataIndex: 'id', key: 'dbsm',render:(test)=> <a href="javascript:;" onClick={this.dbsmShow.bind(this)}>查看</a> }, 
        ];

        const pagination = {
            _this: this,
            total: this.state.totalRecord,
            pageSize: this.state.pageSize,
            onChange(current) {
                let postData = this._this.state.inquiryData;
                postData.pageSize = this._this.state.pageSize;
                postData.pageNum = current;
                this._this.handleGetSelectJsAjdb(postData,'');
                this._this.setState({
                    jsajdbTableLoading: false,
                })
            },
        };
        return(
            <div>
                <div className="formBox">
                    <div className='formTitle'>
                        接收案件督办
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
                                        label="督办单位"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                    > 
                                        <SelectGroup sign="xzqhOnly"  {...getFieldProps('badw')}  handleZoningCode={this.handleZoningCode.bind(this,'xzqhOnly')}></SelectGroup>
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
                                       <Select  {...getFieldProps('dblx')} size='default'>
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
                                    <Button type="primary" htmlType="submit"  onClick={this.inquiry.bind(this,'handleSubmit')} loading={this.state.inquiryLoading}>查询</Button>
                                     <Button onClick={this.inquiry.bind(this,'handleExport')} >导出</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
                <div className="queryResults">
                    <Table columns={columns1}
                           dataSource={this.state.jsajdbTable}
                           loading={this.state.jsajdbTableLoading}
                           pagination={pagination}
                           className="table"
                    />
                </div>

                <Modal title="案件督办说明" visible={this.state.ajdbsmVisible} width="54%"
                    onCancel={this.ajdbsmCancel.bind(this)}
                    onOk={this.ajdbsmCancel.bind(this)}
                    >
                    <FormItem
                         label="督办编号"    
                         labelCol={{ span: 4 }}
                         wrapperCol={{ span: 18 }}
                         hasFeedback
                         help
                    >
                        <Input value={this.state.ajdbsmData[0].dbbh}/>
                    </FormItem>
                    <FormItem
                         label="案件编号"    
                         labelCol={{ span: 4 }}
                         wrapperCol={{ span: 18 }}
                         hasFeedback
                         help
                    >
                        <Input value={this.state.ajdbsmData[0].ajbh}/>
                    </FormItem>
                    <FormItem
                         label="督办单位"    
                         labelCol={{ span: 4 }}
                         wrapperCol={{ span: 18 }}
                         hasFeedback
                         help
                    >
                        <Input value={this.state.ajdbsmData[0].dbdw_mc}/>
                    </FormItem>
                    <FormItem
                         label="督办类型"    
                         labelCol={{ span: 4 }}
                         wrapperCol={{ span: 18 }}
                         hasFeedback
                         help
                    >
                        <Input value={this.state.ajdbsmData[0].dblx_mc}/>
                    </FormItem>
                    <FormItem
                         label="督办日期"    
                         labelCol={{ span: 4 }}
                         wrapperCol={{ span: 18 }}
                         hasFeedback
                         help
                    >
                        <Input value={this.state.ajdbsmData[0].dbrq}/>
                    </FormItem>
                    <FormItem
                         label="督办说明"    
                         labelCol={{ span: 4 }}
                         wrapperCol={{ span: 18 }}
                         hasFeedback
                         help
                    >
                        <Input type="textarea" value={this.state.ajdbsmData[0].dbsm} rows={3}/>
                    </FormItem>
                </Modal>
            </div>
        )
    }
}

jsajdb = Form.create()(jsajdb);

export default jsajdb