import React from "react";
import {Row, Col, Form, Input,DatePicker,Cascader,Button,Select} from "antd";
import { parseTime, FromsIframe} from '../../../../../asset/srbgs/js/common';
import FreeScrollBar from 'react-free-scrollbar';
import { SelectGroup} from "../../../../../Components";
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

require('./qyxzb.css')

class Qyxzb extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            downAndUp: false,
        }
    }
  
    // 查询
    handleSubmit(e){
        e.preventDefault();  
        this.props.form.validateFields((errors,values)=>{
            if (!!errors) {
                return;
            }
            FromsIframe(  // 县：qyxzbXian.ureport.xml  县以上：qyxzbSSG.ureport.xml
                'http://10.1.92.2:6150/ureport/preview?_u=file:'+(window.sessionStorage.getItem('assigningCode') == "3" ? 'qyxzbXian.ureport.xml' : 'qyxzbSSG.ureport.xml')+'&sqsj='+ parseTime(values.sqsj)
                + '&sqsjEnd='+ parseTime(values.sqsjEnd) 
                + '&jssj='+ parseTime(values.jssj)
                + '&jssjEnd='+ parseTime(values.jssjEnd)
                + '&xzfw='+ values.xzfw
                + '&xzlx='+ values.xzlx
                + '&type='+ values.type
                + '&badw='+ values.badw
                + '&tjr='+ window.sessionStorage.getItem('zoningCode')
            )  
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
            }
        }
    }

    // 收起 搜素框
    downAndUpHandel(){
        // document.getElementsByClassName('formConten')[0].className='formConten up'
        let {downAndUp} = this.state;
        this.setState({
            downAndUp: !downAndUp
        })
    }

    render(){
        const { getFieldProps } = this.props.form;
        const textareaProps = getFieldProps('xzlx', {
            rules: [
                { required: true, message: '请选择 ！' },
            ],
        });
        const typeProps = getFieldProps('type', {
            rules: [
                { required: true, message: '请选择 ！' },
            ],
        });
        return(
            <div>
                <div className="formBox">
                    <div className="formTitle">
                        区域协作关系表
                        <p className={`downAndUp ${this.state.downAndUp ? 'rotate' : ''}`} onClick={this.downAndUpHandel.bind(this)}></p>
                    </div>
                    <div className={`formConten ${this.state.downAndUp ? 'up' : ''}`}>
                        <Form horizontal className="ant-advanced-search-form" onSubmit={this.handleSubmit.bind(this)}>
                            <Row gutter={16}>
                                <Col sm={7}>
                                    <FormItem
                                        label="协作类型"
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        hasFeedback
                                        required
                                    >
                                        <Select  {...textareaProps}>
                                            <Option value="2">协办</Option>
                                            <Option value="1">移交</Option>
                                        </Select>
                                    </FormItem>
                                    <FormItem
                                        label="协作范围"
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        hasFeedback
                                        help
                                    >
                                        <Select {...getFieldProps('xzfw')}>
                                            <Option value="">全部</Option>
                                            <Option value="2">跨省</Option>
                                            <Option value="1">跨市</Option>
                                        </Select>
                                    </FormItem> 
                                </Col>
                                <Col sm={8}>
                                    <FormItem
                                        label="申请时间"
                                        labelCol={{ span: 6 }} 
                                        hasFeedback
                                    >
                                        <Col span="8"> 
                                            <DatePicker {...getFieldProps('sqsj')} /> 
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8"> 
                                            <DatePicker {...getFieldProps('sqsjEnd')}/> 
                                        </Col>
                                    </FormItem>
                                    <FormItem
                                        label="接收时间"
                                        labelCol={{ span: 6 }} 
                                        hasFeedback
                                    >
                                        <Col span="8">
                                            <FormItem >
                                                <DatePicker {...getFieldProps('jssj')} />
                                            </FormItem>
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8">
                                            <FormItem>
                                                <DatePicker {...getFieldProps('jssjEnd')}/>
                                            </FormItem>
                                        </Col>
                                    </FormItem>
                                   
                                </Col>
                                <Col sm={9}>
                                    <FormItem
                                        label="办案单位"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                        required
                                    >
                                         {/* <Input placeholder="请选择地区"  {...getFieldProps('badw')}/> */}
                                         <SelectGroup sign="xzqhOnly"  {...getFieldProps('badw')}  handleZoningCode={this.handleZoningCode.bind(this,'xzqhOnly')}></SelectGroup>
                                    </FormItem>
                                    <FormItem
                                        label="申请状态"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                        required
                                        style={{display: (window.sessionStorage.getItem('assigningCode') == '3' ? 'block' : 'none')}}
                                    >
                                         <Select {...typeProps}>
                                            <Option value="1">发出申请</Option>
                                            <Option value="2">接收申请</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} offset={12} style={{ textAlign: 'right' }}>
                                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this)}>查询</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
                <div className="queryResults">
                    <div id="FromsIframeBox"> 
                        <FreeScrollBar
                        className="example"
                        autohide={true}
                        fixed={true}
                        start={'right'} 
                        onScrollbarScrollTimeout={100}> 
                            <iframe id='FromsIframe' src="" frameborder="0"   scrolling="no" width="100%" height="100%" frameborder="0" allowTransparency="true"></iframe>      
                        </FreeScrollBar>
                    </div>
                </div>
            </div>
        )
    }
}

Qyxzb = Form.create()(Qyxzb);

export default Qyxzb