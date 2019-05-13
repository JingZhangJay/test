import React from "react";
import {Form,Button,Row,Col,DatePicker,Cascader } from 'antd';
import {parseTime, disabledDate} from '../../../../../asset/srbgs/js/common'
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
require("./cljgmx.css");

class Cljgmx extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            downAndUp: false,
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.props.form)
        console.log('收到表单值：', this.props.form.getFieldsValue());
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
                        处理结果明细
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
                                            <DatePicker {...getFieldProps('lasj')} /> 
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8"> 
                                            <DatePicker {...getFieldProps('lasjEnd')}/> 
                                        </Col> 
                                    </FormItem>
                                    <FormItem
                                        label="结案时间"
                                        labelCol={{ span: 6 }}
                                        hasFeedback
                                        help
                                    >
                                         <Col span="8"> 
                                            <DatePicker {...getFieldProps('jasj')} /> 
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8"> 
                                            <DatePicker {...getFieldProps('jasjEnd')}/> 
                                        </Col> 
                                    </FormItem>
                                </Col>
                                <Col sm={8}>

                                    <FormItem
                                        label="立案录入时间"
                                        labelCol={{ span: 9 }}
                                        wrapperCol={{ span: 14 }}
                                        hasFeedback
                                    >
                                        <RangePicker />
                                    </FormItem>

                                    <FormItem
                                        label="结案录入时间"
                                        labelCol={{ span: 9 }}
                                        wrapperCol={{ span: 14 }}
                                        hasFeedback
                                    >
                                        <RangePicker />
                                    </FormItem>
                                </Col>
                                <Col sm={8}>
                                    <FormItem
                                        label="办案单位"
                                        labelCol={{ span: 9 }}
                                        wrapperCol={{ span: 14 }}
                                        hasFeedback
                                    >
                                        <Cascader options={this.state.areaData} {...getFieldProps('unitAreaData')} />
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
            </div>
        )
    }
}

Cljgmx = Form.create()(Cljgmx)

export default Cljgmx;