import React from "react";
import { Form, Input, Modal,Checkbox, message} from 'antd';
import {getInsert} from "../../../../Service/srbgs/fgimtpcim/server";

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

require('./caseCustomized_Model.css')

class CaseCancel_Model extends React.Component {
    constructor(props) {
        super(props);
    }

    // 定制 请求
    async handleGetInsert(params){
        let data = await getInsert(params);
        if(data.code == '000000'){
            message.success('数据添加成功！')
        }else{
            message.error('数据添加失败！')
        }
    }

    // 定制的新数据
    customizedNewData(e){
        let data = {}; 
        let rex = /^[^#]*#(\S*)[(?)$]/;
        let path = window.location.hash;
        let pathNew = rex.exec(path);   
        this.props.form.validateFields((errors,values) => {
            data = {
                name:values.dzmc,
                module: this.props.modelName.innerText,
                path:pathNew[1],
                creator:this.props.inqueryData,
                bz: values.bz
            }  
            this.handleGetInsert(data)
        })
    }

    // 定制框的取消
    handleCustomizedCancel(){
        this.props.detailHandle();
    }


    render() {
        const { getFieldProps } = this.props.form;
        return(
            <div>
                <Modal title="退回办理" visible={this.props.visible} width="54%"
                       onOk={this.customizedNewData.bind(this)} onCancel={this.handleCustomizedCancel.bind(this)}>
                    <FormItem
                        label="定制名称"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Input {...getFieldProps('dzmc')}/>
                    </FormItem>
                    <FormItem
                        label="备注说明"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Input type="textarea" id="control-textarea" rows="3" value="" {...getFieldProps('bz')} />
                    </FormItem>
                </Modal>
            </div>
        )
    }
}

CaseCancel_Model = Form.create()(CaseCancel_Model);

export default CaseCancel_Model;