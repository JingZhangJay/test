import React from 'react';
import ReactDom from 'react-dom';
import {hashHistory, Link} from "react-router";
import {Button, Form, Input,message,Steps,Modal} from "antd";
import {checkMessageCode, getVerificationCode} from "../../../../Service/sp/ua/server";
const FormItem = Form.Item;
const Step = Steps.Step;
const createForm = Form.create;
const confirm=Modal.confirm;
import style from './editTelephone.css'
function noop() {
    return false;
}


class EditTelephone extends React.Component {
    constructor(props){
        super(props)
        this.state={
            codeNum: '',
            telephone:'',
            title:''
        }
    }
    getCode(){
        this.axiosVerificationCode();

    }
    /**
     * 获取验证码
     */
    async axiosVerificationCode() {
        let codeNum = await getVerificationCode('messageCode');
        this.setState({ codeNum: codeNum },()=>{
            message.success(this.state.codeNum)
        });

    }

    componentWillMount() {
        let {telephone,title}=this.props.location.query;
        if(telephone){
            this.setState({
                telephone: telephone,
                title:title
            })
        }else{
            confirm({
                title: '您还未获取手机号!',
                onOk() {
                    hashHistory.push({pathname:'/about',state:sessionStorage.getItem('systemId')})
                },
            });
        }
    }

    handleSubmit(){
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('Submit!!!');
            this.axiosTestTele(values)
        });

    }

    async axiosTestTele(value){
        let data=await checkMessageCode(value);
        let {title}=this.state;
        if(data.status == 200){
            message.success(data.description);
            if(title==='手机'){
                hashHistory.push({pathname:'/about/sp/ua/editTele1',state:sessionStorage.getItem('systemId')})
            }else{
                hashHistory.push({pathname:'/about/sp/ua/editEmail',state:sessionStorage.getItem('systemId')})
            }

        }else{
            message.error(data.description);
        }
    }
    render() {
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
        const {title}=this.state;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 13 }
        };
        const ValidateProps = getFieldProps("messageCode", {
            rules: [{ required: true, message: "请填写验证码!" }],
        });
        return (
            <div className="userInfo">
                <div>
                    <Steps className='long-step'>
                        <Step status="process" title="验证身份"  />
                        <Step status="wait" title={'修改'+title} />
                        <Step status="wait" title="完成" />
                    </Steps>
                </div>
                <div className='form-position'>
                    <Form horizontal form={this.props.form}>
                        <FormItem {...formItemLayout} label='手机号'  hasFeedback>
                            <p className="ant-form-text" id="codeNum"> {this.state.telephone}</p>
                        </FormItem>

                        <FormItem labelCol={{ span: 5 }}
                                  wrapperCol={{ span: 13 }}
                                  label="手机验证码"
                                  hasFeedback>
                            <Input
                                {...ValidateProps}
                                type="text"
                                autoComplete="off"
                                maxLength="6"
                                placeholder="请输入手机验证码"
                                onContextMenu={noop}
                                onPaste={noop}
                                onCopy={noop}
                                onCut={noop}
                                style={{width:150}}
                            />
                            <Button type="primary"  onClick={this.getCode.bind(this)} >获取验证码</Button>
                        </FormItem>
                        <FormItem wrapperCol={{ span: 15, offset: 5 }}>
                            <Button type="primary" size='large' style={{ marginTop: 0 }} onClick={this.handleSubmit.bind(this)}>提交</Button>
                        </FormItem>
                    </Form>
                </div>

                </div>

        );
    }
}

EditTelephone = createForm()(EditTelephone);
export default EditTelephone;