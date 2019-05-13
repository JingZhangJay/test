import React from "react";
import {Table, Modal, Form, Input,Button,Icon, message} from 'antd';
import {getCaseProgressContentShow,getCaseProgressAdd} from "../../../../Service/srbgs/fgimtpcim/server";

const FormItem = Form.Item

// import { } from "../../../../Components"
// import { caseEndFile } from "../../../../asset/js/common"

require('./caseBljd_model.css')

class CaseBljd_Modal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            bljdContent:{},
            bljdContentVisible:false,
            bljdAddtVisible: false,
        }
    }

    // 查看案件办理进度内容 请求
    async handleGetCaseProgressContentShow(params){
        let data = await getCaseProgressContentShow(params);
        if( data.code == '000000' ){
            this.setState({
                bljdContent:data.responseData,
                bljdContentVisible:true
            })
        }else{
            message.error('请求异常')
        }
       
    }

    async handleGetCaseProgressAdd(params){
        let data = await getCaseProgressAdd(params); 
        if (data.code == '000000'){
            message.success('新增案件办理进度成功')
            this.setState({
                bljdAddtVisible: false
            })
        }else{
            message.error('新增案件办理失败')
        }
    }
    
    // 办理进度 进度内容
    handleBljContent(e){
        let data = {
            ajbh:this.props.data[0]['ajbh'],
            jdbh:e.currentTarget.parentNode.parentNode.childNodes[0].innerText,
        }
        this.handleGetCaseProgressContentShow(data);

    }

    // 办理进度 的 取消 按钮
    bljContentdHandle(){
        this.setState({
            bljdContentVisible:false
        })
    }

    bljdHandle(){
        this.props.cancelHandle();
    }


    // 新增办理进度
    addBljdShow(){
        this.setState({
            bljdAddtVisible: true
        })
    }

    // 提交新增办理进度
    addBljd(e){
        let data;
        this.props.form.validateFields((error,value)=>{
            data = {
                ajbh:this.props.bljdAjbh,
                jdbh: value.jdbh,
                jdmc: value.jdmc,
                jdms: value.jdms,
                sbdw: value.sbdw
            }
        })  
        this.handleGetCaseProgressAdd(data)
    }
    
    // 关闭新增办理进度弹框
    closeBljd(){
        this.setState({
            bljdAddtVisible: false
        })
    }


    render() {

        const { getFieldProps } = this.props.form;

        const columns_bljd = [
            { title: '进度编号', dataIndex: 'jdbh', key: 'jdbh'},
            { title: '进度名称', dataIndex: 'jdmc', key: 'jdmc',render:(text)=> <a href="javascript:;" onClick={this.handleBljContent.bind(this)}>{text}</a>},
            { title: '上报时间', dataIndex: 'sbsj', key: 'sbsj' },
            { title: '上报单位', dataIndex: 'sbdw', key: 'sbdw' }, 
        ]
 
        return(
            <div className="caseInfo_Model">
                  
                <Modal title="案件进度" visible={this.props.visible}  width="54%"
                       onOk={this.bljdHandle.bind(this)} onCancel={this.bljdHandle.bind(this)} >
                    <Button type="dashed" style={{marginLeft:'2%',color:'#666',marginBottom:10,display:(window.sessionStorage.getItem('assigningCode') == '3'? 'block' : 'none')}} className="caseAdd" onClick={this.addBljdShow.bind(this)}>
                        <Icon type="plus-circle" />
                         新增办理进度
                    </Button>
                    <Table
                        columns={columns_bljd}
                        dataSource={this.props.data}
                        className="table"
                        pagination={{pageSize:5}}
                    />
                </Modal>

                {/* 办理进度内容 */}
                <Modal title="办案进度内容" visible={this.state.bljdContentVisible}  width="54%"
                       onOk={this.bljContentdHandle.bind(this)} onCancel={this.bljContentdHandle.bind(this)} >
                    <FormItem
                        label="案件名称"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                        hasFeedback
                    >
                        <Input value={this.state.bljdContent.ajmc}/>
                    </FormItem>
                    <FormItem
                        label="进度名称"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                        hasFeedback
                    >
                        <Input size="default" value={this.state.bljdContent.jdmc} />
                    </FormItem>
                    <FormItem
                        label="进度内容"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                        hasFeedback
                    >
                        <Input type="textarea" size="default" value={this.state.bljdContent.jdms}  rows="12"/>
                    </FormItem>
                    <FormItem
                        label="上报时间"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                        hasFeedback
                    >
                        <Input size="default" value={this.state.bljdContent.sbsj}/>
                    </FormItem>
                    <FormItem
                        label="上报单位"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                        hasFeedback
                    >
                        <Input size="default" value={this.state.bljdContent.sbdw}/>
                    </FormItem>
                </Modal>

                 {/* 新增进度内容 */}
                 <Modal title="新增进度内容" visible={this.state.bljdAddtVisible} width="54%"
                       onOk={this.addBljd.bind(this)} onCancel={this.closeBljd.bind(this)} >
                    <FormItem
                        label="案件名称"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                        hasFeedback
                    >
                        <Input value={this.props.bljdAjmc}/>
                    </FormItem>
                    <FormItem
                        label="进度名称"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                        hasFeedback
                    >
                        <Input size="default" {...getFieldProps('jdmc')}/>
                    </FormItem>
                    <FormItem
                        label="进度内容"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                        hasFeedback
                    >
                        <Input type="textarea" size="default" rows="3" {...getFieldProps('jdms')}/>
                    </FormItem>
                    {/* <FormItem
                        label="上报时间"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                        hasFeedback
                    >
                        <Input size="default"/>
                    </FormItem> */}
                    <FormItem
                        label="上报单位"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                        hasFeedback
                    >
                        <Input size="default"  {...getFieldProps('sbdw')}/>
                    </FormItem>
                </Modal>
            </div>
        )
    }
}

CaseBljd_Modal = Form.create()(CaseBljd_Modal);

export default CaseBljd_Modal;