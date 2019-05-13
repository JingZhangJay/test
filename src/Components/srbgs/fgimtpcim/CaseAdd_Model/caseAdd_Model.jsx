import React from "react";
import { Form, Input, Row, Col, Modal,Cascader,DatePicker,Button,Select,Checkbox,message } from 'antd';
import {detailShowModal,parseTime} from "../../../../asset/srbgs/js/common";
import { getCaseInfoAdd } from "../../../../Service/srbgs/fgimtpcim/server";
import qs from "qs";

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
require('./caseAdd_Model.css');


class CaseAdd_Model extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            addNewData:{},
            checkedBoxData : [
                {
                sign: "ajxz",
                children: [
                    {checked: false, label: '非医学需要鉴定胎儿性别', value: '570' },
                    {checked: false, label: '非法终止妊娠', value: '571'},
                    {checked: false, label: '“两非”中介', value: '572'},
                    {checked: false, label: '出售相关药品', value: '574'},
                    {checked: false, label: '溺弃女婴', value: '575'},
                    {checked: false, label: '其他', value: '576'},
                    ]
                },{
                    sign: "jdfs",
                    children: [
                        {checked: false, label: 'B超', value: '593' },
                        {checked: false, label: '母血鉴定', value: '594' },
                        {checked: false, label: '羊水穿刺', value: '595' },
                        {checked: false, label: '绒毛取样', value: '596' },
                        {checked: false, label: '其他', value: '597' }]
                }
            ],
            checkbox1: [],
            ajxzCheckBox:[],
            jdfsCheckBox:[],
        }
    }

    // 新增案件信息 请求
    async handleGetCaseInfoAdd(params){
        let data = await getCaseInfoAdd (params)
        console.log(data)
        if(data.code == '999999'){
            message.error('数据提交失败');
        }else {
            message.success('数据提交成功');
        }
    }

    // checkBox 重构 
    onChangeCheckbox(sign, e) {
        let {checkedBoxData} = this.state;
        checkedBoxData.forEach(item => {
            if(item.sign == sign){
                item.children.forEach(item => {
                    if(item.value == e.target.value){
                        item.checked = e.target.checked
                    }
                })
            }
        })
        this.setState({
            checkedBoxData: checkedBoxData
        })
    }



    addCaseInfo(){
        event.returnValue = false;
        let NewData,
        ajxzCheckBox = [], jdfsCheckBox = [];
        this.props.form.validateFields((errors,values) => {
            if (!!errors) {
                return;
            }
            NewData = values;
            NewData.afsj = parseTime(values.afsj);
            NewData.lasj = parseTime(values.lasj);
        })

        const {checkedBoxData} = this.state;
        checkedBoxData.forEach(item=>{
           if(item.sign == 'ajxz') {
               item.children.forEach(el => {
                   if(el.checked){
                       ajxzCheckBox.push(el.value)
                   }
               })
           }else if(item.sign == 'jdfs'){
               item.children.forEach(el => {
                   if(el.checked){
                       jdfsCheckBox.push(el.value)
                   }
               })
            }
        })

        NewData.ajxz = ajxzCheckBox;
        NewData.jdfs = jdfsCheckBox;
        NewData.bajg = window.sessionStorage.getItem('zoningCode');
        NewData.lajg = window.sessionStorage.getItem('zoningCode');
 
        this.handleGetCaseInfoAdd(NewData); 
      
        this.props.CaseAddHandle() // 关闭弹框
    }


    handleCancel(){
        let {checkedBoxData} = this.state;
        checkedBoxData.forEach(item => { 
            item.children.forEach(item => {
                if(item.checked) item.checked = false;
            })
        }) 
        this.setState({
            checkedBoxData:checkedBoxData,
        })
        let data = this.props.form.getFieldsValue();

        for(var key in data){
            this.props.form.setFieldsValue({
                [key]: ""
            })
        }

        this.props.CaseAddHandle();
        this.props.form.resetFields();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.reviseData != this.props.reviseData){
            console.log("==============>",nextProps.reviseData,nextProps, this.props);
            this.props.form.setFieldsValue({
                'ajmc': nextProps.reviseData.ajmc,
                'lasj': nextProps.reviseData.lasj,
                'afsj': nextProps.reviseData.afsj,
                'lyfs': nextProps.reviseData.lyfs,
                'afdd': nextProps.reviseData.afdd,
                'aqjj': nextProps.reviseData.aqjj,
                'cbr': nextProps.reviseData.cbr,
                'spr': nextProps.reviseData.spr,
                'aqbz': nextProps.reviseData.aqbz,
            })
        }
    }
    render(){
        const { getFieldProps } = this.props.form;

        const {checkedBoxData} = this.state;

        const loopCheckBox = (data,sign) => data.map(item => {
            return (
                <Checkbox value={item.value} checked={item.checked} onChange={this.onChangeCheckbox.bind(this, sign)} style={{marginTop: 5}}>{item.label}</Checkbox>
            )
        })

        // 新增案件 录入校验
        const nameProps = getFieldProps('ajmc', { // 案件名称
            rules: [
                { required: true, message: '请您必须填 ！！！' },
            ],
        });

        const lasjProps = getFieldProps('lasj', {
            rules: [
                { required: true, message: '请您必须填 ！！！' },
            ],
        });

        const afsjProps = getFieldProps('afsj', {
            rules: [
                { required: true, message: '请您必须填 ！！！' },
            ],
        });

        return(
            <div className="caseInfo_Model">
                <Modal title="案件信息添加" visible={this.props.visible} Submit={this.addCaseInfo.bind(this)} width="54%"
                       onOk={this.addCaseInfo.bind(this)}
                       onCancel={this.handleCancel.bind(this)}
                       maskClosable={false}
                >

                    <Form horizontal>
                        <FormItem
                            id="control-input"
                            label="案件名称"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                            hasFeedback
                        >
                            <Input size="small" {...nameProps}/>
                        </FormItem>

                        <Row gutter={24}>
                            <Col sm={8}>
                                <FormItem
                                    label="立案时间"
                                    labelCol={{ span: 12 }}
                                    wrapperCol={{ span: 12 }}
                                    hasFeedback
                                >
                                    <DatePicker  size="small" {...lasjProps}/>
                                </FormItem>
                            </Col>
                            <Col sm={8}>
                                <FormItem
                                    label="案发时间"
                                    labelCol={{ span: 12 }}
                                    wrapperCol={{ span: 12 }}
                                    hasFeedback
                                >
                                    <DatePicker  size="small" {...afsjProps} />
                                </FormItem>
                            </Col>
                            <Col sm={8}>
                                <FormItem
                                    label="案件来源方式"
                                    labelCol={{ span: 12 }}
                                    wrapperCol={{ span: 12 }}
                                    hasFeedback
                                >
                                    <Select {...getFieldProps('lyfs')} size="small">
                                        <Option value="555">来电</Option>
                                        <Option value="556">来人</Option>
                                        <Option value="557">来信</Option>
                                        <Option value="558">批转件</Option>
                                        <Option value="559">网上件</Option>
                                        <Option value="560">请示件</Option>
                                        <Option value="561">群众举报</Option>
                                        <Option value="562">孕情监控发现</Option>
                                        <Option value="563">检查发现</Option>
                                        <Option value="564">计生系统举报</Option>
                                        <Option value="565">乡镇举报</Option>
                                        <Option value="566">相关部门移交</Option>
                                        <Option value="567">协助相关办理</Option>
                                        <Option value="568">其他</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>

                        <FormItem
                            id="control-input"
                            label="案件性质"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                            hasFeedback
                        >
                            {/*<CheckboxGroup  onChange={this.onChange.bind(this)}  options={ajxzCheack1} value={this.state.checkbox1}/>*/}

                            {loopCheckBox(checkedBoxData[0].children,checkedBoxData[0].sign)}
                        </FormItem>

                        <FormItem
                            id="control-input"
                            label="鉴定方式"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                            hasFeedback
                        >
                            {loopCheckBox(checkedBoxData[1].children,checkedBoxData[1].sign)}
                            {/*<CheckboxGroup {...getFieldProps('jdfs')}/>*/}
                        </FormItem>

                        <FormItem
                            id="control-textarea"
                            label="案发地点"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                            hasFeedback
                        >
                            {/*<Cascader options={this.state.placeOptions} placeholder="请选择地区" {...getFieldProps('afdd')}/>*/}
                            <Input placeholder="请选择地区" {...getFieldProps('afdd')}/>
                        </FormItem>

                        <FormItem
                            id="control-textarea"
                            label="案情简介"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                            hasFeedback
                        >
                            <Input type="textarea" id="control-textarea" rows="3" {...getFieldProps('aqjj')} />
                        </FormItem>

                        <Row gutter={24}>
                            <Col sm={12}>
                                <FormItem
                                    id="control-input"
                                    label="办案人"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 14 }}
                                    hasFeedback
                                >
                                    <Input size="small" {...getFieldProps('cbr')}/>
                                </FormItem>
                            </Col>
                            <Col sm={12}>
                                <FormItem
                                    id="control-input"
                                    label="审批人"
                                    labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 14 }}
                                    hasFeedback
                                >
                                    <Input size="small" {...getFieldProps('spr')}/>
                                </FormItem>
                            </Col>
                        </Row>
                        <FormItem
                            id="control-textarea"
                            label="案件备注"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                            hasFeedback
                        >
                            <Input type="textarea" id="control-textarea" rows="3" size="small"  {...getFieldProps('aqbz')} />
                        </FormItem>
                    </Form>
                </Modal>


            </div>
        )
    }
}

CaseAdd_Model = Form.create()(CaseAdd_Model);

export default CaseAdd_Model;