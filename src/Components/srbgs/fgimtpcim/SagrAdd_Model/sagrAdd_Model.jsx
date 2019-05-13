import React from "react";
import { Form, Input, Row, Col,Select,Table, Modal,Cascader,Upload,Button,Icon,Checkbox, message} from 'antd';
import { getCaseIndividualAdd } from "../../../../Service/srbgs/fgimtpcim/server";
const FormItem = Form.Item;
const Option = Select.Option;
require('./sagrAdd_Model.css');

class SagrAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    // 添加涉案个人  请求 
    async handleGetCaseIndividualAdd(params){
        let dataInfo = await getCaseIndividualAdd(params);
        console.log(dataInfo);
        if(dataInfo.code == '000000'){
            message.success(dataInfo.message);
            this.props.SagrAddHandle();
        }else{
            message.error(dataInfo.message)
        }
    }

    // 添加涉案个人
    addSagr(text,e){
        if(text == '修改'){
            let data;
            let formImg = new FormData()
            this.props.form.validateFields((errors,values)=>{
                formImg.append("file", values.img.file.originFileObj);
                data = {
                    ajbh: this.props.SaAjbh,
                    xm: values.xm,
                    sasf_dm: values.sagrsf,
                    saxz: values.saxz,
                    zyzg: values.zyzg,
                    mz: values.mz,
                    gzdw: values.gzdw,
                    zjhm: values.zjhm,
                    xb: values.xb,
                    whcd: values.whcd,
                    zzmm: values.zzmm,
                    bz: values.bz,
                    hjd: values.hjd,
                    lrdw: window.sessionStorage.getItem('zoningCode')
                };
                data = JSON.stringify(data);
                formImg.append("data", data);
            });
            this.handleGetCaseIndividualAdd(formImg);
        } else {
            this.props.SagrAddHandle();
            this.props.form.resetFields();
        }
    }


    // 取消弹框
    handleCancel(){
        this.props.form.resetFields();
        this.props.SagrAddHandle(); 
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.SagrData != this.props.SagrData){
            this.props.form.setFieldsValue({
                xm: nextProps.SagrData.xm,
                saxz: nextProps.SagrData.saxz,
                sasf_dm: nextProps.SagrData.sasf_dm,
                mz: nextProps.SagrData.mz,
                zjhm: nextProps.SagrData.zjhm,
                hjd_mc: nextProps.SagrData.hjd_mc,
                whcd: nextProps.SagrData.whcd,
                lxdh: nextProps.SagrData.lxdh,
                zyzg: nextProps.SagrData.zyzg,
                gzdw: nextProps.SagrData.gzdw,
                xb: nextProps.SagrData.xb,
                zzmm: nextProps.SagrData.zzmm,
                img: nextProps.SagrData.img,
                bz: nextProps.SagrData.bz
            })
        }
    }
    render(){
        const { getFieldProps} = this.props.form;

        return(
            <div>
                <Modal title="浏览涉案对象信息"  visible={this.props.visible} Submit={this.addSagr.bind(this)}
                       onOk={this.addSagr.bind(this,this.props.clickSf)} width="54%"
                       onCancel={this.handleCancel.bind(this)} >
                    <Form horizontal className="ant-advanced-search-form">
                        <Row>
                            <Col span={8}>
                                <FormItem
                                    label="姓名"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 15}}
                                    hasFeedback
                                >
                                    <Input type="text" {...getFieldProps('xm')}/>
                                </FormItem>
                                <FormItem
                                    label="涉案身份"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 15}}
                                    hasFeedback
                                >
                                    <Select  {...getFieldProps('sasf_dm')}>
                                        <Option value="583">育龄群众</Option>
                                        <Option value="587">公办医疗机构义务人员</Option>
                                        <Option value="588">民办医疗机构义务人员</Option>
                                        <Option value="589">计生服务机构医务人员</Option>
                                        <Option value="590">游医</Option>
                                    </Select>
                                </FormItem>
                                <FormItem
                                    label="民族"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 15}}
                                    hasFeedback
                                >
                                    <Select {...getFieldProps('mz')} >
                                        <Option value="170">汉族</Option>
                                        <Option value="172">回族</Option>
                                        <Option value="171">蒙古族</Option>
                                    </Select>
                                </FormItem>
                                <FormItem
                                    label="身份证号"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 15}}
                                    hasFeedback
                                >
                                    <Input {...getFieldProps('zjhm')}/>
                                </FormItem>
                                <FormItem
                                    label="文化程度"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 15}}
                                    hasFeedback
                                >
                                    <Select {...getFieldProps('whcd')} >
                                        <Option value='273'>研究生及以上</Option>
                                        <Option value='274'>大学本科</Option>
                                        <Option value="275">大学专科和专科学校</Option>
                                        <Option value="276">中等专业学校或中等技术学校</Option>
                                        <Option value="277">技工学校</Option>
                                        <Option value="278">高中</Option>
                                        <Option value='279'>初中</Option>
                                        <Option value='280'>小学</Option>
                                        <Option value='281'>文盲或半文盲</Option>
                                    </Select>
                                </FormItem>
                                <FormItem
                                    label="户籍地"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 15}}
                                    hasFeedback
                                >
                                    <Input {...getFieldProps('hjd_mc')}/>
                                    {/*<Cascader options={this.state.areaData} placeholder="请选择地区"  {...getFieldProps('hjd')}  />*/}
                                </FormItem>
                                <FormItem
                                    label="联系电话"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 15}}
                                    hasFeedback
                                >
                                    <Input {...getFieldProps('lxdh')} />
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="涉案性质"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 15}}
                                    hasFeedback
                                >
                                    <Select {...getFieldProps('saxz')}>
                                        <Option value="570">非医学需要鉴定胎儿性别</Option>
                                        <Option value="571">非法终止妊娠</Option>
                                        <Option value="572">“两非”中介</Option>
                                        <Option value="574">出售相关药品</Option>
                                        <Option value="575">溺弃女婴</Option>
                                        <Option value="576">其他</Option>
                                    </Select>
                                </FormItem>
                                <FormItem
                                    label="执业资格"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 15}}
                                    hasFeedback
                                >
                                    <Select {...getFieldProps('zyzg')} >
                                        <Option value='732'>执业医师证书</Option>
                                        <Option value='733'>执业助理医师证书</Option>
                                        <Option value='734'>医师资格证书</Option>
                                        <Option value='735'>护士执业证书</Option>
                                        <Option value='736'>乡村医生执业证</Option>
                                        <Option value='737'>母婴保健技术考核合格证</Option>
                                        <Option value='738'>其他</Option>
                                    </Select>
                                </FormItem>
                                <FormItem
                                    label="工作单位"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 15}}
                                    hasFeedback
                                >
                                    <Input {...getFieldProps('gzdw')} />
                                </FormItem>
                                <FormItem
                                    label="性别"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 15}}
                                    hasFeedback
                                >
                                    <Select {...getFieldProps('xb')}>
                                        <Option value='341'>男</Option>
                                        <Option value='342'>女</Option>
                                    </Select>
                                </FormItem>
                                <FormItem
                                    label="政治面貌"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 15}}
                                    hasFeedback
                                >
                                    <Select {...getFieldProps('zzmm')}>
                                        <Option value="310">中共党员</Option>
                                        <Option value="311">中共预备党员</Option>
                                        <Option value="312">共青团员</Option>
                                        <Option value="313">民革会员</Option>
                                        <Option value="314">民盟盟员</Option>
                                        <Option value="315">民建盟员</Option>
                                        <Option value="316">民进会员</Option>
                                        <Option value="317">农工党党员</Option>
                                        <Option value="318">致工党党员</Option>
                                        <Option value="319">九三学社社员</Option>
                                        <Option value="320">台盟盟员</Option>
                                        <Option value="321">无党派民主人士</Option>
                                        <Option value="322">群众</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span={8}>

                                <Upload  {...getFieldProps('img')}>
                                    <img alt="example" width="100%" style={{height:'100px'}}/>
                                    <Button type="ghost">
                                        <Icon type="upload" /> 点击上传
                                    </Button>
                                </Upload> 
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <FormItem
                                    label="备注"
                                    labelCol={{span: 4}}
                                    wrapperCol={{span: 18}}
                                >
                                    <Input type="textarea" placeholder="" rows={4} {...getFieldProps('bz')} />
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        )
    }
}

SagrAdd = Form.create()(SagrAdd);

export default SagrAdd;