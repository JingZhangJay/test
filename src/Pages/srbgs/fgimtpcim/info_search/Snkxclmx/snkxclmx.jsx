import React from 'react';
import { Form, Input, Row, Col, Button, DatePicker,Cascader,Select,Table, Modal, Card,Icon} from 'antd';
import { parseTime, FromsIframe} from '../../../../../asset/srbgs/js/common';
import FreeScrollBar from 'react-free-scrollbar';
import {SelectGroup} from '../../../../../Components/index' 
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

require('./snkxclmx.css'); 

class Snkxclmx extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            downAndUp: false,
        }
    }

    handleSubmit(e) {
        e.preventDefault(); 
        this.props.form.validateFields((error,values)=>{   
            FromsIframe( 
                'http://10.1.92.2:6150/baseURLureport/preview?_u=file:xiezuo.ureport.xml&bajg='+ values.bajg
                + '&lasj_start='+ parseTime( values.lasj_start)
                + '&lasj_end='+ parseTime(values.lasj_end)
                + '&jasj_start='+ parseTime(values.jasj_start)
                + '&jasj_end='+ parseTime(values.jasj_end)
                + '&xblx='+'0'
            ) 
        })
    }

    // 区划下拉框的 Value
    handleZoningCode(test,e){
        console.log(test, e);
        for(var key in e) {
            if (key == "xzqhOnly") {
                this.props.form.setFieldsValue({
                    "bajg": e[key]
                })
            }
        }
    }

    // 时间选择
    parseTime1(time){
        let newTime = time.replace(time,'-');
        console.log(newTime)
    }

    // 收起 搜素框
    downAndUpHandel(){
        let {downAndUp} = this.state;
        this.setState({
            downAndUp: !downAndUp
        })
    }

    componentWillMount(){
        //console.log(this.props.location)//传递过来的所有参数
        console.log(this.props.location.state)//val值
        this.props.form.setFieldsValue({
            lasj_start: this.props.location.state.lasj_start,
            lasj_end: this.props.location.state.lasj_end,
            jasj_start: this.props.location.state.jasj_start,
            jasj_end: this.props.location.state.jasj_end,
        })
    }
    render(){
        const { getFieldProps } = this.props.form;

        const disabledDate = function (current) {
            return current && current.getTime() > Date.now();
        };

        return(
            <div>
                <div className="formBox">
                    <div className="formTitle">
                        市内跨县处理
                        <p className={`downAndUp ${this.state.downAndUp ? 'rotate' : ''}`} onClick={this.downAndUpHandel.bind(this)}></p>
                    </div>
                    <div className={`formConten ${this.state.downAndUp ? 'up' : ''}`}>
                        <Form horizontal className="ant-advanced-search-form" onSubmit={this.handleSubmit.bind(this)}>
                            <Row>
                                <Col sm={8}>
                                    <FormItem label="立案时间" labelCol={{ span: 6 }} >
                                        <Col span="8">
                                            <DatePicker {...getFieldProps('lasj_start')} disabledDate={disabledDate} />
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8"> 
                                            <DatePicker {...getFieldProps('lasj_end')} disabledDate={disabledDate}/>
                                        </Col>
                                    </FormItem>
                                </Col>
                                <Col sm={8}>
                                    <FormItem label="结案时间" labelCol={{ span: 6 }} >
                                        <Col span="8"> 
                                            <DatePicker {...getFieldProps('jasj_start')} disabledDate={disabledDate} />
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8"> 
                                            <DatePicker {...getFieldProps('jasj_end')} disabledDate={disabledDate} />
                                        </Col>
                                    </FormItem>
                                </Col>
                                <Col sm={8}>
                                    <FormItem label="办案单位" labelCol={{ span: 6 }}  wrapperCol={{ span: 18 }}>
                                        {/* <Input {...getFieldProps('bajg')} placeholder="请选择地区" /> */}
                                        <SelectGroup sign="xzqhOnly" offset='1' {...getFieldProps('bajg')} handleZoningCode={this.handleZoningCode.bind(this,'xzqhOnly')} ></SelectGroup>
                                 
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

Snkxclmx = Form.create()(Snkxclmx);

export default Snkxclmx;