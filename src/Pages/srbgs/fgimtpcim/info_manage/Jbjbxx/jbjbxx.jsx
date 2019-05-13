import React from 'react';
import {Row,Col,Button,Table, message, Modal, Form, Input, Select} from 'antd'; 
import { getSeekAssignedJbx, } from "../../../../../Service/srbgs/fgimtpcim/server";

const FormItem = Form.Item;
const Option = Select.Option;
require("./jbjbxx.css");

const dataSource = [{
    key: '1',
    number:'123212344321',
    name: '信息名称',
    property: 32,
    time1:'2019年1月2日',
    time2:'2019年1月2日',
    place:'案发地',
    phone:'联系电话',
    address:'联系地址',
    approve:'上级批示'
}, ];

class Jbjbxx extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            jbjbxxTabData:[],
            jbjbxxTabLoading:false, 
            jbjbxxTabTotal:'',
            cljbjbxxVisible: false,
            C_xxmc:'',
            C_id:''
        }
    }

    // 查询 请求
    async handelGetSeekAssignedJbx(params){
        let data = await getSeekAssignedJbx(params); 
        if(data.code == '000000'){  
            this.setState({
                jbjbxxTabData:data.responseData.dataList,
                jbjbxxTabTotal:data.responseData.totalRecord,
                jbjbxxTabLoading:false,  
            })
        }else{
            message.error('查询数据失败');
            this.setState({ 
                jbjbxxTabLoading:false,  
            })
        }
    }

    // 处理 请求
    async handelGetProcessJbxx(params){
        let data = await getProcessJbxx(params); 
        if(data.code == '000000'){  
            message.success('信息处理成功');
            this.setState({
                cljbjbxxVisible: false,
            })
        }else{
            message.error('信息处理失败');
        }
    }

    // 查询 
    query(start,end,e){ 
        let data = {
            start:start,
            end: end,
            pageNum: 1,
            pageSize: 5, 
        }
        this.setState({
            jbjbxxTabLoading:true
        })
        this.handelGetSeekAssignedJbx(data)
    }

    // 分页
    paginationChange(current){  
        let getDataObj = {};
        getDataObj.pageSize = '5';
        getDataObj.pageIndex = current;
        this.handelGetSeekAssignedJbx(getDataObj);
        console.log('current ===》'+current);
    }

    // 处理交办举报信息  展示
    cljbjbxx(text,e){ 
        this.setState({
            C_xxmc: e.currentTarget.parentNode.parentNode.childNodes[1].innerText,
            C_id:  e.currentTarget.parentNode.parentNode.childNodes[0].innerText,
            C_clbz: text,
        })
        this.setState({
            cljbjbxxVisible: true,
        }) 
    }

    // 处理交办举报信息  确认
    cljbjbxxOk(e){
        let data;
        this.props.form.validateFields((error,values)=>{
            data = {
                id: values.C_id,
                clzt: values.C_clzt,
                sjyj: values.C_sjyj,
                clsm: values.C_clsm
            }
            
        }); 
        this.handelGetProcessJbxx(data)
    }

    // 处理交办举报信息  取消
    cljbjbxxCancel(e){
        this.setState({
            cljbjbxxVisible: false,
        })
    }
    render(){ 
        const { getFieldProps } = this.props.form;

        const columns = [{
            title: '编号',
            dataIndex: 'lxdh',
            key: 'lxdh',
        }, {
            title: '信息名称',
            dataIndex: 'xxmc',
            key: 'xxmc',
        }, {
            title: '案件性质',
            dataIndex: 'ajxz',
            key: 'ajxz',
        }, {
            title: '举报时间',
            dataIndex: 'jbsj',
            key: 'jbsj',
        }, {
            title: '移交时间',
            dataIndex: 'lrsj',
            key: 'lrsj',
        }, {
            title: '案发地',
            dataIndex: 'afdd_mc',
            key: 'afdd_mc',
        }, {
            title: '联系电话',
            dataIndex: 'lxdh',
            key: 'lxdh',
        }, {
            title: '联系地址',
            dataIndex: 'lxdh',
            key: 'lxdh',
        }, {
            title: '上级批示',
            dataIndex: 'sjyj',
            key: 'sjyj',
        }, {
            title: '操作',
            dataIndex: 'jbnr',
            key: 'jbnr',
            render:(text)=> <a href="javascript:;" onClick={this.cljbjbxx.bind(this,text)}>处理</a> 
        }];

        const pagination = {
            total:this.state.jbjbxxTabTotal,
            pageSize:'5',
            onchange: this.paginationChange.bind(this)
        }
        console.log('jbjbxxTabTotal === 》' + this.state.jbjbxxTabTotal)
        return(
            <div className="formBox">
                <div className="formTitle">
                    交办举报信息
                </div>
                <div className="formConten">
                    <Row>
                        <Col>
                            <Button onClick={this.query.bind(this,'0','0')}>
                                查询全部
                            </Button>
                            <Button onClick={this.query.bind(this,'1','3')}>
                                1-3天
                            </Button>
                            <Button onClick={this.query.bind(this,'3','7')}>
                                3-7天
                            </Button>
                            <Button onClick={this.query.bind(this,'7','15')}>
                                7-15天
                            </Button>
                            <Button onClick={this.query.bind(this,'15','0')}>
                                15天以上
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <div className="queryResults">
                            <Table dataSource={this.state.jbjbxxTabData} columns={columns} loading={this.state.jbjbxxTabLoading}  
                                   pagination={{pagination}} />
                        </div>

                    </Row>
                </div>
                
                <Modal title="处理交办举报信息" visible={this.state.cljbjbxxVisible} width="54%"
                     onOk={this.cljbjbxxOk.bind(this)} onCancel={this.cljbjbxxCancel.bind(this)}> 
                    <FormItem label="信息名称" 
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}>
                        <Input value={this.state.C_xxmc}/>
                    </FormItem>
                    <FormItem label="处理状态" 
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}>
                        <Select {...getFieldProps('C_clzt')} style={{width:'100%'}}>
                            <Option value="625">举报信息不属实</Option>
                            <Option value="626">已另案处理</Option>
                            <Option value="627">涉案对象不在本辖区</Option>
                            <Option value="628">立案处理</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="处理备注" 
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}>
                        <Input type="textarea" rows={3} {...getFieldProps('C_clbz')} />
                    </FormItem>
                    <FormItem label="上级意见" 
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}>
                        <Input type="textarea" rows={3} value={this.state.C_clbz} />
                    </FormItem>
                    <FormItem label="处理说明" 
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}>
                        <Input type="textarea" rows={3} {...getFieldProps('C_clsm')}/>
                    </FormItem>
                </Modal>
            </div>
        )
    }
}

Jbjbxx = Form.create()(Jbjbxx);

export default Jbjbxx;