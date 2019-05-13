import React from "react";
import {Row, Col, Form, Input,DatePicker,Cascader,Button } from "antd";
import { getSysEnteringQuery } from '../../../../../Service/srbgs/fgimtpcim/server';
import { parseTime, FromsIframe, disabledDate} from '../../../../../asset/srbgs/js/common';
import FreeScrollBar from 'react-free-scrollbar';
import { SelectGroup} from "../../../../../Components";
import axios  from "axios";

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

require('./xtyyqkb.css')

class Xtyyqkb extends React.Component{
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
            FromsIframe( // 县：xtyyqkbXian.ureport.xml   县以上：xtyyqkbSSG.ureport.xml
                'http://localhost:9999/srbgs/ureport/preview?_u=file:'+ (window.sessionStorage.getItem('assigningCode') == "3" ?  'xtyyqkbXian.ureport.xml' : 'xtyyqkbSSG.ureport.xml') +'&tjdw='+ values.tjdw
                + '&log='+ parseTime(values.log) 
                + '&logEnd='+ parseTime(values.logEnd)
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
                    "tjdw": e[key]
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

        const columns = [
            { title: '涉案对象', dataIndex: 'caseName', key: 'caseName'},
            { title: '处理情况', dataIndex: 'caseArea', key: 'caseArea' },
            { title: '处理时间', dataIndex: 'caseRole', key: 'caseRole' },
            { title: '处理单位', dataIndex: 'caseProperty', key: 'caseProperty' }
        ];
        return(
            <div>
                <div className="formBox">
                    <div className="formTitle">
                        系统应用情况表
                        <p className={`downAndUp ${this.state.downAndUp ? 'rotate' : ''}`} onClick={this.downAndUpHandel.bind(this)}></p>
                    </div>
                    <div className={`formConten ${this.state.downAndUp ? 'up' : ''}`}>
                        <Form horizontal className="ant-advanced-search-form" onSubmit={this.handleSubmit.bind(this)}>
                            <Row gutter={16}>
                                <Col sm={12}>
                                    <FormItem label="登录时间"  labelCol={{ span: 8 }} >
                                        <Col span="6">
                                            <FormItem >
                                                <DatePicker {...getFieldProps('log')} disabledDate={disabledDate}/>
                                            </FormItem>
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="6">
                                            <FormItem>
                                                <DatePicker {...getFieldProps('logEnd')}  disabledDate={disabledDate} />
                                            </FormItem>
                                        </Col>
                                    </FormItem>
                                </Col>
                                <Col sm={12}>
                                    <FormItem  label="统计单位"  labelCol={{ span: 8 }}  wrapperCol={{ span: 14 }} required>
                                        {/* <Input  {...getFieldProps('tjdw')} /> */}
                                        <SelectGroup sign="xzqhOnly"  {...getFieldProps('tjdw')}  handleZoningCode={this.handleZoningCode.bind(this,'xzqhOnly')}></SelectGroup>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} offset={12} style={{ textAlign: 'right' }}>
                                    <Button type="primary"  htmlType="submit" onClick={this.handleSubmit.bind(this)}>查询</Button>
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

Xtyyqkb = Form.create()(Xtyyqkb);

export default Xtyyqkb