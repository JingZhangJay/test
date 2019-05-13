import React from 'react';
import {Form,Button,Row,Col,DatePicker,Cascader, Input } from 'antd';
import { parseTime, FromsIframe, disabledDate} from '../../../../../asset/srbgs/js/common';
import FreeScrollBar from 'react-free-scrollbar';
import { SelectGroup} from "../../../../../Components";

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

require('./yyglqkb.css');

class Yyglqkb extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            downAndUp: false,
            visible: false,
        }
    }

    // 查询
    handleSubmit(e){  
        this.props.form.validateFields((error,values)=>{  
            FromsIframe(  // 县以上: yyglqkbSSG.ureport.xml
                'http://10.1.92.2:6150/ureport/preview?_u=file:yyglqkbSSG.ureport.xml&logStart='+ parseTime(values.logStart)
                + '&logEnd='+ parseTime(values.logEnd) 
                + '&tjdw='+ values.tjdw
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
        return(
            <div>
                <div className="formBox">
                    <div className="formTitle">
                        应用管理情况表
                        <p className={`downAndUp ${this.state.downAndUp ? 'rotate' : ''}`} onClick={this.downAndUpHandel.bind(this)}></p>
                    </div>
                    <div className={`formConten ${this.state.downAndUp ? 'up' : ''}`}>
                        <Form horizontal onSubmit={this.handleSubmit}  className="ant-advanced-search-form" >
                            <Row>
                                <Col span="9">
                                    <FormItem label="统计时间" labelCol={{ span: 6 }}   wrapperCol={{ span: 18 }}>  
                                        <Col span="11"> 
                                            <DatePicker {...getFieldProps('logStart')} disabledDate={disabledDate}/>
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="11"> 
                                            <DatePicker {...getFieldProps('logEnd')} disabledDate={disabledDate}/>
                                        </Col>  
                                    </FormItem> 
                                </Col>
                                <Col span="9"> 
                                    <FormItem label="统计单位" labelCol={{ span: 6 }}  wrapperCol={{ span: 18 }}>
                                        {/* <Input {...getFieldProps('tjdw')} placeholder="请选择地区" /> */} 
                                        <SelectGroup sign="xzqhOnly"  {...getFieldProps('tjdw')}  handleZoningCode={this.handleZoningCode.bind(this,'xzqhOnly')}></SelectGroup>
                                    </FormItem>
                                    
                                </Col>
                                <Col span="6">
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

Yyglqkb = Form.create()(Yyglqkb);

export default Yyglqkb;