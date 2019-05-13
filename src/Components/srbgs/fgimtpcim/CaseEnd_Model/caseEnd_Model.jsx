import React from "react";
import { Modal, Form,Input,Table} from 'antd';
const FormItem = Form.Item;

require('./caseEnd_Model.css')


class CaseEnd_Model extends React.Component {
    constructor(proper){
        super(proper);
    }

    CaseEndHandle() {
        this.props.CaseEndHandle();
    }

    render() {
        const columns = [
            { title: '涉案对象', dataIndex: 'sadxmc', key: 'sadxmc' },
            { title: '处理情况', dataIndex: 'bzsm', key: 'bzsm'},
            { title: '处理时间', dataIndex: 'clsj', key: 'clsj' },
            { title: '处理单位', dataIndex: 'cldw_mc', key: 'cldw_mc' },
        ]
        return(
            <div className="caseEnd">
                <Modal title="查看结案报告" visible={this.props.visible}  width="54%"
                       onOk={this.CaseEndHandle.bind(this)} onCancel={this.CaseEndHandle.bind(this)}
                >
                    <FormItem
                        label="案件编号"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Input size="size" value={this.props.data.ajbh} />
                    </FormItem>
                    <FormItem
                        label="案件性质"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Input size="size" value={this.props.data.ajxz}/>
                    </FormItem>
                    <FormItem
                        label="办案机关"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Input size="size" value={this.props.data.badw}/>
                    </FormItem>
                    <FormItem
                        label="立案时间"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Input size="size" value={this.props.data.lasj}/>
                    </FormItem>
                    <FormItem
                        label="案情简介"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Input type="textarea" id="control-textarea" rows="3" value={this.props.data.aqjj} />
                    </FormItem>
                    <FormItem
                        label="处理决定"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Table columns={columns}  dataSource={this.props.data.cfmxList} className="caseOverTable" pagination={false}/>
                    </FormItem>
                    <FormItem
                        label="执行情况"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Input type="textarea" id="control-textarea" rows="3" value={this.props.data.zxqk}/>
                    </FormItem>
                    <FormItem
                        label="结案时间"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Input size="size" value={this.props.data.jasj}/>
                    </FormItem>
                    <FormItem
                        label="承办人"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Input size="size" value={this.props.data.cbr}/>
                    </FormItem>
                    <FormItem
                        label="审批人"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Input size="size" value={this.props.data.spr} />
                    </FormItem>
                </Modal>
            </div>
        )
    }
}

export default CaseEnd_Model;