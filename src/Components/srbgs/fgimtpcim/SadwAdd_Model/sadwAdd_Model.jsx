import React from 'react';
import {Form,Row,Col,Select,DatePicker,Cascader,Modal,Icon,Input,message } from 'antd';
import { getCaseUnitAdd } from "../../../../Service/srbgs/fgimtpcim/server";
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

require("./sadwAdd_Model.css");

class SadwAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    // 添加涉案单位 请求
    async handleGetCaseUnitAdd(params){
        console.log(params)
        let data = await getCaseUnitAdd(params)
        if(data.code == '000000'){
            message.success(dataInfo.message);
            this.props.SadwAddHandle(); // 关闭弹框
            this.props.from.resetFields();
        }else {
            message.error(dataInfo.message);
        }
    }

  
    addSadw(){
        event.returnValue = false;
        let data;
        this.props.form.validateFields((errors,values) => {
            data = values;
        })
        data.ajgl = this.props.saAjgl;
        data.lrdw = window.sessionStorage.getItem('zoningCode');
        this.handleGetCaseUnitAdd(data);
    }

    handleCancel(){
        this.props.SadwAddHandle();
        this.props.form.resetFields();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.SadwData != this.props.SadwData){
            this.props.form.setFieldsValue({
                sadwmc: nextProps.SadwData.sadwmc,
                frdb: nextProps.SadwData.frdb,
                frdbsfz: nextProps.SadwData.frdbsfz,
                saxz: nextProps.SadwData.saxz,
                frdbsfz: nextProps.SadwData.frdbsfz,
                zjlx: nextProps.SadwData.zjlx,
                lxr: nextProps.SadwData.lxr,
                sasf_dm: nextProps.SadwData.sasf_dm,
                zjhm: nextProps.SadwData.zjhm,
                lxdh: nextProps.SadwData.lxdh,
                gld: nextProps.SadwData.gld_mc,
                xxdz: nextProps.SadwData.xxdz,
                bz: nextProps.SadwData.bz,
            })
        }
    }

    render(){
        const {getFieldProps} = this.props.form;
        return(
            <div>
                <Modal title="涉案单位信息卡" visible={this.props.visible}Submit={this.addSadw.bind(this)} width="54%"
                       onOk={this.addSadw.bind(this)}
                       onCancel={this.handleCancel.bind(this)} >
                    <Form horizontal className="ant-advanced-search-form">
                        <Row>
                            <Col span={8}>
                                <FormItem
                                    label="单位名称"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 14}}
                                    hasFeedback
                                >
                                    <Input size="default"  {...getFieldProps('sadwmc')}/>
                                </FormItem>
                                <FormItem
                                    label="法人代表"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 14}}
                                    hasFeedback
                                >
                                    <Input size="default" {...getFieldProps('frdb')} />
                                </FormItem>
                                <FormItem
                                    label="法人身份证"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 14}}
                                    hasFeedback
                                >
                                    <Input size="default" {...getFieldProps('frdbsfz')}/>
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="涉案性质"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 14}}
                                    hasFeedback
                                >
                                    <Select {...getFieldProps('saxz')} size="default">
                                        <Option value="570">非医学需要鉴定胎儿性别</Option>
                                        <Option value="571">非法终止妊娠</Option>
                                        <Option value="572">“两非”中介</Option>
                                        <Option value="574">出售相关药品</Option>
                                        <Option value="575">溺弃女婴</Option>
                                        <Option value="576">其他</Option>
                                    </Select>
                                </FormItem>
                                <FormItem
                                    label="证件类型"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 14}}
                                    hasFeedback
                                >
                                    <Select {...getFieldProps('zjlx')} size="default">
                                        <Option value="910">组织机构代码</Option>
                                        <Option value="911">营业执照编码</Option>
                                        <Option value="912">税务登记代码</Option>
                                        <Option value="913">其他</Option>
                                    </Select>
                                </FormItem>
                                <FormItem
                                    label="联系人"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 14}}
                                    hasFeedback
                                >
                                    <Input size="default" {...getFieldProps('lxr')} />
                                </FormItem>

                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="涉案单位身份"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 14}}
                                    hasFeedback
                                >
                                    <Select {...getFieldProps('sasf_dm')} size="default">
                                        <Option value="584">公办医疗机构</Option>
                                        <Option value="585">民办医疗机构</Option>
                                        <Option value="586">妇幼保健机构（含计生服务机构）</Option>
                                        <Option value="591">出售相关药品药店</Option>
                                    </Select>
                                </FormItem>
                                <FormItem
                                    label="证件号码"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 14}}
                                    hasFeedback
                                >
                                    <Input placeholder="请输入搜索名称" size="default"   {...getFieldProps('zjhm')}/>
                                </FormItem>
                                <FormItem
                                    label="联系电话"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 14}}
                                    hasFeedback
                                >
                                    <Input placeholder="请输入搜索名称" size="default" {...getFieldProps('lxdh')} />
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem
                                    label="管理地"
                                >
                                    <Input {...getFieldProps('gld')} />
                                    {/*<Cascader options={this.state.areaData} {...getFieldProps('gld')} size="default"/>*/}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="详细地址"
                                >
                                    <Input {...getFieldProps('xxdz')} />
                                    {/*<Cascader options={this.state.areaData} {...getFieldProps('xxdz')} size="default" />*/}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <FormItem
                                    label="备注"
                                >
                                    <Input type="textarea" rows={3}  {...getFieldProps('bz')} size="default" />
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        )
    }
}

SadwAdd = Form.create()(SadwAdd);

export default SadwAdd