import React from 'react';
import ReactDom from 'react-dom';
import {Button, Form, Input, message, Steps} from "antd";
import {updateEmail} from "../../../../Service/sp/ua/server";
import {hashHistory} from "react-router";

const FormItem = Form.Item;
const Step = Steps.Step;
const createForm = Form.create;
function noop() {
    return false;
}

class EditEmail extends React.Component {
    componentDidMount() {

    }
    handleSubmit(){
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('Submit!!!');
            this.axiosUpdateEmail(values)
        });
    }

    async axiosUpdateEmail(value){
        let data=await updateEmail(value);
        if(data.status == 200){
            // message.success(data.description);
            hashHistory.push({pathname:'/about/sp/ua/editTele2',state:sessionStorage.getItem('systemId'),query:{title:'邮箱'}})
        }else{
            message.error(data.description);
        }
    }

    render() {
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;

        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 13 }
        };

        const emailProps = getFieldProps("email", {
            validate: [
                {
                    rules: [{ required: true, message: "请输入邮箱地址" }],
                    trigger: "onBlur"
                },
                {
                    rules: [{ type: "email", message: "请输入正确的邮箱地址" }],
                    trigger: ["onBlur", "onChange"]
                }
            ]
        });
        return (
            <div className="userInfo">
                <div>
                    <Steps className='long-step'>
                        <Step status="finish" title="验证身份"  />
                        <Step status="process" title="修改邮箱"  />
                        <Step status="wait" title="完成" />
                    </Steps>
                </div>
                <div className='form-position'>
                    <Form horizontal form={this.props.form}>

                        <FormItem {...formItemLayout} label='用户名'  hasFeedback>
                            <p className="ant-form-text" id="codeNum"> </p>
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="邮箱"
                            hasFeedback
                            help={
                                isFieldValidating("email")
                                    ? "校验中..."
                                    : (getFieldError("email") || []).join(", ")
                            }
                        >
                            <Input
                                {...emailProps}
                                placeholder="请输入邮箱"
                            />
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
EditEmail = createForm()(EditEmail);
export default EditEmail;