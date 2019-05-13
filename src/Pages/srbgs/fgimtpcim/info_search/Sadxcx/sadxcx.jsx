import React from 'react';
import { Form, Input, Row, Col, Button, DatePicker,Cascader,Select,Table, Modal, Card,Icon, message} from 'antd';
import { CaseInfo_Model,CaseCustomized_Model,SelectGroup } from "../../../../../Components";
import {
    getCaseDetail,
    getCaseInfoList,
    getSagrQuery,
    handleGetSagrQueryExport,
    getSagrQueryExport,
} from "../../../../../Service/srbgs/fgimtpcim/server";

const FormItem = Form.Item;
const Option = Select.Option;

require('./sadxcx.css');

class Sadxcx extends  React.Component{
    constructor(props) {
        super(props);
        this.state = {
            sadxcxTableLoading:false,
            inquiryLoading:false,
            detailVisible:false ,
            customizedVisible:false,
            data:{},
            downAndUp: false,
            pageSize: 5,//每页条数
            pageNum: 1,//当前页码
            totalRecord: "",
            inquiryData: {},
        }
    }

    // 涉案对象列表查询 请求
    async handleGetSagrQuery(parent){
        let data = await getSagrQuery(parent);
        if(data.code == '000000'){
            this.setState({
                sadxcxlistTable:data.responseData.dataList,
                totalRecord: data.responseData.totalRecord,
                sadxcTableLoading:false,
                inquiryLoading:false
            })
        }else{
            message.error('数据请求失败！')
            this.setState({ 
                sadxcTableLoading:false,
                inquiryLoading:false
            })
        }
      
    }

    // 涉案对象列表导出 请求
    async handleGetSagrQueryExport(parent) {
        let data = await getSagrQueryExport(parent);
        console.log(data)
    }

    // 查看案件详情 请求
    async handleGetCaseDetail(params){
        let data = await getCaseDetail(params);
        if(data.code == '000000'){
            this.setState({
                data: data.responseData,
                detailVisible: true,
            });
        }else{
            message.error('数据请求失败！')
        }
       
    }


    // 查询 和 导出
    handle(callback,e) {
        event.returnValue = false;
        let data;
        this.props.form.validateFields((errors,values) => {
            data = {
                xm:(values.xm == undefined ? '': values.xm),
                xb:  (values.xb == undefined ? '': values.xb),
                zjhm: (values.zjhm == undefined ? '': values.zjhm),
                zzmm: (values.zzmm == undefined ? '': values.zzmm),
                saxz:(values.ajxz == undefined ? '': values.ajxz),
                sadxsf: (values.sadxsf == undefined ? '': values.sadxsf),
                hjd: (values.hjd == undefined ? '': values.hjd),
            };
        })

        if(callback == 'handleSubmit'){
            data.pageNum = this.state.pageNum;
            data.pageSize =  this.state.pageSize;
            this.setState({
                inquiryData:data,
                inquiryLoading:true,
                sadxcxTableLoading:true,
            })
            this.handleGetSagrQuery(data);
        }else if(callback == 'handleExport'){
            getSagrQueryExport(
                '?xm='+data.xm+
                '&xb='+data.xb+
                '&zjhm='+data.zjhm+
                '&zzmm='+data.zzmm+
                '&saxz='+data.saxz+
                '&sadxsf='+data.sadxsf+
                '&hjd='+data.hjd
            )
        }
    }

    // 查看案件详情
    detailShowModal (e){
        e.preventDefault();
        let params = e.currentTarget.parentNode.parentNode.childNodes[3].innerText;
        this.handleGetCaseDetail(params)
    }


    // 获取案件详情 的 取消 按钮
    detailHandle(e) {
        this.setState({
            detailVisible:false,
            data:""
        })
    }

    // 定制
    customized(){
        this.setState({
            CaseCustomizedVisible:true
        })
    }

    // 定制 的 取消 按钮
    customizedHandle(e) {
        this.setState({
            CaseCustomizedVisible:false,
        })
    }

    // 区划下拉框的 Value
    handleZoningCode(test,e){
        console.log(test, e);
        for(var key in e) {
             if (key == "xzqhAllSix") {
                this.props.form.setFieldsValue({
                    "hjd": e[key]
                })
            }
        }
    }

    // 收起 搜素框
    downAndUpHandel(){ 
        let {downAndUp} = this.state; 
        this.setState({
            downAndUp: !downAndUp
        })
    }
    render (){
        const { getFieldProps } = this.props.form;

        const columns_sadxcx= [
            { title: '证件号码', dataIndex: 'zjhm', key: 'zjhm' },
            { title: '对象名称', dataIndex: 'xm', key: 'xm',},
            { title: '户籍地', dataIndex: 'hjd_mc', key: 'hjd_mc' },
            { title: '案件编号', dataIndex: 'ajbh', key: 'ajbh' },
            { title: '案件名称', dataIndex: 'ajmc', key: 'ajmc',render: (text) => <a href="javascript:;" onClick={this.detailShowModal.bind(this)}>{text}</a>},
            { title: '办案单位', dataIndex: 'badw', key: 'badw' },
            { title: '对象身份', dataIndex: 'sasf_mc', key: 'sasf_mc' },
            { title: '涉案性质', dataIndex: 'saxz_mc', key: 'saxz_mc'},
            { title: '添加时间', dataIndex: 'lrsj', key: 'lrsj'},
        ];

        const pagination = {
            _this: this,
            total: this.state.totalRecord,
            pageSize: this.state.pageSize,
            onChange(current) {
                let postData = this._this.state.inquiryData;
                postData.pageSize = this._this.state.pageSize;
                postData.pageNum = current;
                this._this.handleGetSagrQuery(postData);
                this._this.setState({
                    sadxcTableLoading: false,
                })
            },
        };
        return(
            <div>
                <div className="formBox">
                    <div className="formTitle">
                        涉案对象查询
                        <p className={`downAndUp ${this.state.downAndUp ? 'rotate' : ''}`} onClick={this.downAndUpHandel.bind(this)}></p>
                    </div>
                    <div className={`formConten ${this.state.downAndUp ? 'up' : ''}`}>
                        <Form horizontal className="ant-advanced-search-form">
                            <Row gutter={16}>
                                <Col sm={8}>
                                    <FormItem
                                        label="姓名"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                        hasFeedback
                                    >
                                        <Input placeholder="请输入搜索名称" size="default"  {...getFieldProps('xm')}/>
                                    </FormItem>
                                    <FormItem
                                        label="政治面貌"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                        hasFeedback
                                        help
                                    >
                                        <Select  {...getFieldProps('zzmm')}>
                                            <Option value="">全部</Option>
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
                                <Col sm={8}>
                                    <FormItem
                                        label="案件性质"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                        hasFeedback
                                    >
                                        <Select  {...getFieldProps('ajxz')} >
                                            <Option value="">全部</Option>
                                            <Option value="570">非医学需要鉴定胎儿性别</Option>
                                            <Option value="571">非法终止妊娠</Option>
                                            <Option value="572">“两非”中介</Option>
                                            <Option value="574">出售相关药品</Option>
                                            <Option value="575">溺弃女婴</Option>
                                            <Option value="576">其他</Option>
                                        </Select>
                                    </FormItem>

                                    <FormItem
                                        label="性别"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                        hasFeedback
                                    >
                                        <Select  {...getFieldProps('xb')}  >
                                            <Option value="">全部</Option>
                                            <Option value="341">男</Option>
                                            <Option value="342">女</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col sm={8}>

                                    <FormItem
                                        label="身份证号"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                        hasFeedback
                                        help
                                    >
                                    <Input placeholder="请输入身份证号码"  {...getFieldProps('zjhm')}/>
                                    </FormItem>

                                    <FormItem
                                        label="涉案对象身份"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                        hasFeedback
                                    >
                                        <Select  {...getFieldProps('sadxsf')}>
                                            <Option value="">全部</Option>
                                            <Option value="583">育龄群众</Option>
                                            <Option value="584">公办医疗机构</Option>
                                            <Option value="585">民办医疗机构</Option>
                                            <Option value="586">妇幼保健机构（含计生服务机构）</Option>
                                            <Option value="587">公办医疗机构医务人员</Option>
                                            <Option value="588">民办医疗机构医务人员</Option>
                                            <Option value="589">计生服务机构医务人员</Option>
                                            <Option value="590">游医</Option>
                                            <Option value="591">出售相关药品药店</Option>
                                            <Option value="598">两非中介</Option>
                                            <Option value="592">其他</Option>
                                        </Select>
                                    </FormItem>

                                </Col>
                            </Row>
                            <Row offset={24}>
                                <FormItem
                                        label="户籍地"
                                        labelCol={{ span: 2}}
                                        wrapperCol={{ span: 18 }}
                                        hasFeedback
                                    > 
                                    <SelectGroup sign="xzqhAllSix" offset='1' {...getFieldProps('hjd')} handleZoningCode={this.handleZoningCode.bind(this,'xzqhAllSix')} ></SelectGroup>
                                </FormItem>
                            </Row>
                            <Row>
                                <Col span={12} offset={12} style={{ textAlign: 'right' }}>
                                    <Button type="primary" htmlType="submit"  onClick={this.handle.bind(this,'handleSubmit')} loading={this.state.inquiryLoading}>查询</Button>
                                    <Button onClick={this.handle.bind(this,'handleExport')} >导出</Button>
                                    <Button onClick={this.customized.bind(this)}>定制</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
                <div className="queryResults">
                    <Table columns={columns_sadxcx}
                           dataSource={this.state.sadxcxlistTable}
                           className="table"
                           loading={this.state.sadxcTableLoading}
                           pagination={pagination} />
                </div>

                {/*  查看案件信息详情 */}
                <CaseInfo_Model visible={this.state.detailVisible} data={this.state.data} detailShowModal={this.detailShowModal.bind(this)} detailHandle={this.detailHandle.bind(this)} />

                {/* 报表定制*/}
                <CaseCustomized_Model  visible={this.state.CaseCustomizedVisible} detailHandle={this.customizedHandle.bind(this)}/>

            </div>
        )
    }
}

Sadxcx = Form.create()(Sadxcx);

export default  Sadxcx