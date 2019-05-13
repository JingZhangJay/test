import React from "react";
import { Form, Select, Input, Button, Table, Icon, Modal, message, DatePicker, Row, Col} from "antd";
 
import { parseTime } from "../../../../../asset/srbgs/js/common";
import {getSeekAssignedJbx} from "../../../../../Service/srbgs/fgimtpcim/server";
 
const FormItem = Form.Item;
const Option = Select.Option;

require('./messageReceive.css');

const dataSource = [{
    key: '1',
    xxmc: '胡彦斌',
    lyfs: '来源方式',
    afdd: '案发地点',
    ajxz: '案件性质'
}, {
    key: '2',
    xxmc: '胡彦斌',
    lyfs: '来源方式',
    afdd: '案发地点',
    ajxz: '案件性质'
}];

class messageReceive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jsInfoDetailVisible: false,
            jsInfoData:[],
            jsInfoLoading: false,
            inqueryLoading: false,
        }
         
    }
    // 接收消息列表 请求
    async handleGetSeekAssignedJbx(params){
        let data = await getSeekAssignedJbx(params); 
        if(data.code == '000000'){
            message.success('查询成功')
            this.setState({
                jsInfoData: data.responseData.dataList,
                jsInfoLoading: false,
                inqueryLoading: false,
            })
        }else {
            message.error('查询失败')
            this.setState({ 
                jsInfoLoading: false,
                inqueryLoading: false,
            })
        }
    }
   
    // 接收消息列表 查询
    selectJsxxList(e){
        let data;
        this.props.form.validateFields((error,values) => {
            data = {
                start: parseTime(values.qssj) == ''? 0 : parseTime(values.qssj),
                end: parseTime(values.jzsj) == ''? 0 : parseTime(values.qssj),
                pageNum: '1',
                pageSize:'10'
            }
        })
        this.setState({
            jsInfoLoading: true,
            inqueryLoading: true,
        })
        this.handleGetSeekAssignedJbx(data);
    }

    // 接收消息详情
    jsInfoDetail(){ 
        this.setState({
            jsInfoDetailVisible: true
        })
    }

    // 接收消息弹框 取消 
    jsInfoDetailCancel(){
        this.setState({
            jsInfoDetailVisible: false
        })
    }
    render() {
        const { getFieldProps } = this.props.form;
        const columns = [
            { title: '消息名称', dataIndex: 'xxmc', key: 'xxmc', render: (text) => <a href="javascript:;" onClick={this.jsInfoDetail.bind(this)}>{text}</a> },
            { title: '来源方式', dataIndex: 'lyfs', key: 'lyfs' },
            { title: '案发地点', dataIndex: 'afdd', key: 'afdd' },
            { title: '案件性质', dataIndex: 'ajxz', key: 'ajxz' }
        ]
        return (
            <div>
                <div className="formBox">
                    <div className="formTitle">
                        消息接收
                    </div>
                    <div className="formConten">
                        <Form horizontal inline className="ant-advanced-search-form" >
                            <Row>
                                <Col span="2"></Col>
                                <Col span="20"> 
                                    <FormItem
                                        label="起始时间"
                                    > 
                                        <DatePicker {...getFieldProps('qssj')} />
                                    </FormItem> 
                                    <FormItem
                                        label="截至时间"
                                    > 
                                        <DatePicker {...getFieldProps('jzsj')} />
                                    </FormItem>
                                    <Button type="primary" onClick={this.selectJsxxList.bind(this)} >查询</Button>
                                 </Col>
                                <Col span="2"></Col>
                            </Row>
                            
                        </Form>
                    </div>
                </div>
                <div className="queryResults">
                    <Table
                        columns={columns}
                        dataSource={this.state.jsInfoData}
                        loading={this.state.jsInfoLoading} 
                        pagination={{pageSize:5}}
                    />
                </div> 

                {/* 消息详情 */}
                <Modal visible={this.state.infoDetailVisible} title="消息详情"
                    onOk={this.jsInfoDetailCancel.bind(this)}
                    onCancel={this.jsInfoDetailCancel.bind(this)}>
                    <Form horizontal className="ant-advanced-search-form">
                        <FormItem
                            label="消息名称"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                        >
                            <Input/>
                        </FormItem>
                        <FormItem
                            label="来源方式"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                        > 
                            <Select>
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
                                <Option value="569">未说明</Option> 
                            </Select>
                        </FormItem>
                        <FormItem
                            label="案发地点"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            label="举报人"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            label="联系电话"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            label="联系地址"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                        >
                            <Input />
                        </FormItem> 
                        <FormItem
                            label="案件性质"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                        >
                           <Select>
                                <Option value="570">非医学需要鉴定胎儿性别</Option>
                                <Option value="571">非法终止妊娠</Option>
                                <Option value="572">“两非”中介</Option>
                                <Option value="574">出售相关药品</Option>
                                <Option value="575">溺弃女婴</Option>
                                <Option value="576">其他</Option>
                            </Select>
                        </FormItem>
                        <FormItem
                            label="举报内容"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                        >
                            <Input type="textarea" rows="3" />
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

messageReceive = Form.create()(messageReceive);

export default messageReceive;