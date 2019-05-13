import React from 'react';
import ReactDom from 'react-dom';
import {hashHistory, Link} from "react-router";
import {Button, Form, Input,message,Steps,Modal} from "antd";
import {updateTelephone, getVerificationCode} from "../../../../Service/sp/ua/server";
const FormItem = Form.Item;
const Step = Steps.Step;
const createForm = Form.create;
const confirm=Modal.confirm;

function noop() {
    return false;
}


class EditTelephone1 extends React.Component {
    constructor(props){
        super(props)
        this.state={
            codeNum: '',
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

    }

    handleSubmit(){
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('Submit!!!');
            this.axiosUpdateTele(values)
        });
    }

    async axiosUpdateTele(value){
        let data=await updateTelephone(value);
        if(data.status == 200){
            // message.success(data.description);
            hashHistory.push({pathname:'/about/sp/ua/editTele2',state:sessionStorage.getItem('systemId'),query:{title:'手机'}})
        }else{
            message.error(data.description);
        }
    }

    /**
     * 手机号码验证
     */
    checkTelephone(rule, value, callback) {
        const { validateFields } = this.props.form;
        const telephoneReg = /^1[0-9]{10}$/;
        if (!value) {
            callback();
        } else {
            setTimeout(() => {
                if (!telephoneReg.test(value)) {
                    callback("手机号码输入错误,请校验并改正!");
                } else {
                    callback();
                }
                // validateFields(['reTelephone'], { force: true });
            }, 500);
        }
    }

    //再次验证手机号一致
    reCheckTelephone(rule, value, callback) {
        const { getFieldValue } = this.props.form;
        if (value && value !== getFieldValue('telephone')) {
            callback('两次输入密码不一致！');
        } else {
            callback();
        }
    }

    render() {
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;

        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 13 }
        };
        const ValidateProps = getFieldProps("messageCode", {
            rules: [{ required: true, message: "请填写验证码!" }],
        });

        const telephoneProps = getFieldProps("telephone", {
            rules: [
                { required: true, message: "请输入手机号码!" },
                { validator: this.checkTelephone.bind(this) }
            ]
        });

        const reTelephoneProps = getFieldProps("reTelephone", {
            rules: [
                { required: true, message: "请再次输入手机号码!" },
                { validator: this.reCheckTelephone.bind(this) }
            ]
        });
        return (
            <div className="userInfo">
                <div>
                    <Steps className='long-step'>
                        <Step status="finish" title="验证身份"  />
                        <Step status="process" title="修改手机"  />
                        <Step status="wait" title="完成" />
                    </Steps>
                </div>
                <div className='form-position'>
                    <Form horizontal form={this.props.form}>
                        <FormItem
                            {...formItemLayout}
                            label="手机号"
                            hasFeedback
                            help={
                                isFieldValidating("telephone")
                                    ? "校验中..."
                                    : (getFieldError("telephone") || []).join(", ")
                            }
                        >
                            <Input
                                {...telephoneProps}
                                placeholder="请输入手机号"
                            />
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="确认手机"
                            hasFeedback
                            help={
                                isFieldValidating("telephone")
                                    ? "校验中..."
                                    : (getFieldError("telephone") || []).join(", ")
                            }
                        >
                            <Input
                                {...reTelephoneProps}
                                placeholder="请输入手机号"
                            />
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
EditTelephone1 = createForm()(EditTelephone1);
export default EditTelephone1;

