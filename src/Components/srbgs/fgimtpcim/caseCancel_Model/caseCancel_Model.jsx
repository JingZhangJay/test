import React from "react";
import { Form, Input, Row, Col,Select,Table, Modal,Cascader,Upload,Button,Icon,Checkbox, message} from 'antd';
import { getCaseProgressCancel } from '../../../../Service/srbgs/fgimtpcim/server'
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

require('./caseCancel_Model.css')

class CaseCancel_Model extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            caseCancelData:props.caseCancelData,
        }
    }
    // 案件注销申请 请求
    async handleGetCaseProgressCancel(params){
        let data = await getCaseProgressCancel(params); 
        if(data.code == '000000'){
            message.success('本次操作成功');
        }else{
            message.error('操作失败');
        }
    }

    // 点击OK
    addSagr(e){
        let data = {
            ajbh: this.props.caseCancelData['ajbh'],
            zxyy: this.props.form.getFieldValue('zxyy'),
            sqdw: '370201000000000'
        }

        this.handleGetCaseProgressCancel(data)
        // this.props.caseCancelHandle(); // 关闭弹框
    }

    // 点击取消
    caseCancelHandle(){
        this.props.caseCancelHandle()
    }

    render() {
        const { getFieldProps } = this.props.form;
        return(
            <div>
                <Modal title="案件注销申请"  visible={this.props.visible}  width="54%"
                       onOk={this.addSagr.bind(this)}
                       onCancel={this.caseCancelHandle.bind(this)}
                >
                     <FormItem
                        label="案件名称"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                        hasFeedback>
                            <Input value={this.props.caseCancelData['ajmc']} />
                     </FormItem>
                    <FormItem
                        label="注销原因"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                        hasFeedback>
                        <Input type="textarea" rows="3"  {...getFieldProps('zxyy')} />
                    </FormItem>
                </Modal>
            </div>
        )
    }
}

CaseCancel_Model = Form.create()(CaseCancel_Model);

export default CaseCancel_Model;