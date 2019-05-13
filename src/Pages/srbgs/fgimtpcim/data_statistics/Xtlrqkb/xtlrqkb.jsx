import React from "react";
import {Row, Col, Form, Input,DatePicker,Cascader,Button } from "antd";
import { parseTime, FromsIframe, disabledDate} from '../../../../../asset/srbgs/js/common';
import FreeScrollBar from 'react-free-scrollbar';
import { SelectGroup} from "../../../../../Components";

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

require("./xtlrqkb.css")

class Xtlrqkb extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            downAndUp: false,
        }
    }

    // 查询
    handleSubmit(e) {
        e.preventDefault();  
        this.props.form.validateFields((error,values)=>{  
            FromsIframe(  // 县：xtlrqkbXian.ureport.xml  县以上：xtlrqkbSSG.ureport.xml
                'http://10.1.92.2:6150/ureport/preview?_u=file:'+ (window.sessionStorage.getItem('assigningCode') == "3" ?  'xtlrqkbXian.ureport.xml' : 'xtlrqkbSSG.ureport.xml') +'&lasj='+ parseTime(values.lasj)
                + '&lasjEnd='+ parseTime(values.lasjEnd) 
                + '&lalrsj='+ parseTime(values.lalrsj)
                + '&lalrsjEnd='+ parseTime(values.lalrsjEnd)
                + '&jasj='+ parseTime(values.jasj)
                + '&jasjEnd='+ parseTime(values.jasjEnd)
                + '&jalrsj='+ parseTime(values.jalrsj)
                + '&jalrsjEnd='+ parseTime(values.jalrsjEnd)
                + '&badw='+ values.badw
                + '&tjr='+ window.sessionStorage.getItem('zoningCode')
            )  
        }); 
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
        return(
            <div>
                <div className="formBox">
                    <div className="formTitle">
                        系统录入情况表
                        <p className={`downAndUp ${this.state.downAndUp ? 'rotate' : ''}`} onClick={this.downAndUpHandel.bind(this)}></p>
                    </div>
                    <div className={`formConten ${this.state.downAndUp ? 'up' : ''}`}>
                        <Form horizontal className="ant-advanced-search-form" onSubmit={this.handleSubmit.bind(this)}>
                            <Row gutter={16}>
                                <Col sm={8}>
                                    <FormItem
                                        label="立案时间"
                                        labelCol={{ span: 6 }} 
                                        hasFeedback
                                    > 
                                        <Col span="8"> 
                                            <DatePicker {...getFieldProps('lasj')} disabledDate={disabledDate} />
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8"> 
                                            <DatePicker {...getFieldProps('lasjEnd')}disabledDate={disabledDate} />
                                        </Col>
                                    </FormItem>
                                    <FormItem
                                        label="结案时间"
                                        labelCol={{ span: 6 }}
                                        hasFeedback
                                        help
                                    >
                                       <Col span="8">
                                            <DatePicker {...getFieldProps('jasj')} disabledDate={disabledDate} />
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8">
                                            <DatePicker {...getFieldProps('jasjEnd')} disabledDate={disabledDate} />
                                        </Col>
                                    </FormItem>

                                </Col>
                                <Col sm={8}>
                                    <FormItem
                                        label="立案录入时间"
                                        labelCol={{ span: 6 }} 
                                        hasFeedback
                                    >
                                        <Col span="8"> 
                                            <DatePicker {...getFieldProps('lalrsj')} disabledDate={disabledDate} />
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8"> 
                                            <DatePicker {...getFieldProps('lalrsjEnd')} disabledDate={disabledDate} />
                                        </Col>
                                    </FormItem>
                                    <FormItem
                                        label="结案录入时间"
                                        labelCol={{ span: 6 }} 
                                        hasFeedback
                                    >
                                        <Col span="8">
                                            <FormItem >
                                                <DatePicker {...getFieldProps('jalrsj')} disabledDate={disabledDate} />
                                            </FormItem>
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8">
                                            <FormItem>
                                                <DatePicker {...getFieldProps('jalrsjEnd')} disabledDate={disabledDate} />
                                            </FormItem>
                                        </Col>
                                    </FormItem>
                                </Col>
                                <Col sm={8}>
                                    <FormItem
                                        label="办案单位"
                                        labelCol={{ span: 5 }}
                                        wrapperCol={{ span: 19 }}
                                        required
                                    >
                                        {/* <Input placeholder="请选择地区"  {...getFieldProps('badw')}/> */}
                                        <SelectGroup sign="xzqhOnly"  {...getFieldProps('badw')}  handleZoningCode={this.handleZoningCode.bind(this,'xzqhOnly')}></SelectGroup>
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

Xtlrqkb = Form.create()(Xtlrqkb);

export default Xtlrqkb