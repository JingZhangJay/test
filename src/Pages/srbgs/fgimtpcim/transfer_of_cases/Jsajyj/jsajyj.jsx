import React from "react";
import {Form,Button,Row,Col,Select,RangePicker,Cascader,Table,Modal,Upload,Input,Radio,Checkbox,DatePicker,message} from 'antd';
import {parseTime} from "../../../../../asset/srbgs/js/common";
import {getHandoverInfoShow,getCaseFile, getDealJsAjyj} from "../../../../../Service/srbgs/fgimtpcim/server";
import { CaseFile_Model,SelectGroup} from "../../../../../Components";
const FormItem = Form.Item;
const Option = Select.Option;

require('./jsajyj.css');
 
class Jsajyj extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            jsajyjTableLoading:false,
            inquiryLoading:false,
            jsajyjTableData:[],
            request: false,
            caseFileVisible:false,
            transferVisible: false,
            data_caseFile: {0: [], 1: [], 2: []},
            transferId:'',
            downAndUp: false,
        }
    }


    // 查询移交信息列表 请求
    async handleGetHandoverInfoShow(params){
        let data = await getHandoverInfoShow(params)
        if (data.code == '000000') {
            this.setState({
                jsajyjTableData:data.responseData.dataList,
                jsajyjTableLoading:false,
                inquiryLoading:false
            })
        }else{
            message.error('数据获取失败');
            this.setState({
                sqajyjTableData:[],
                jsajyjTableLoading:false,
                inquiryLoading:false
            })
        }

    }

    
    // 查看案件材料 请求
    async handleGetCaseFile(params){
        let caseFileDom = '';
        let caseFileObj = {};
        let arr = [];
        let data = await getCaseFile(params);
        let caseFile = (data.responseData).map(function (item1,index1,input) {
            arr = []
               item1.forEach(function (item2,index2) {
                       arr.push({ num:item2.num,cllxmc:item2.cllxmc, ajbh:item2.ajbh,cllx:item2.cllx})
                })
            caseFileObj[index1] = arr;
        })
        if(data.code == '000000'){
            this.setState({
                data_caseFile: caseFileObj,
                caseFileVisible : true,
            });
        }else{
            message.error('数据获取失败')
        } 
    }

    // 接收案件移交  请求
    async handleGetDealJsAjyj(params){
        let data = await getDealJsAjyj(params);
        if(data.code == '000000'){
            message.success('案件提交成功！');
            this.setState({
                transferVisible: false
            })
        }else{
            message.error('案件提交失败！')
        }
    }

    // 查询
    handle(e) { 
        let data; 
        this.props.form.validateFields((errors,values) => { 
            data = {
                ajbh:(values.ajbh == undefined ? '': values.ajbh),
                ajmc:(values.ajmc == undefined ? '': values.ajmc),
                sqsj:   parseTime(values.sqsj),
                sqsjEnd: parseTime(values.sqsjEnd),
                yjzt: (values.yjzt == undefined ? '': values.yjzt),
                yjdw: (values.yjdw == undefined ? '': values.yjdw),
                jsdw:(values.jsdw == undefined ? '': values.jsdw),
                badw: window.sessionStorage.getItem('zoningCode'),
            };
        })

        data.pageNum = '1';
        data.pageSize = '10';
        this.setState({
            inquiryLoading:true,
            jsajyjTableLoading:true,
        })
        this.handleGetHandoverInfoShow(data);

    }

    // 查看案件材料
    handleCaseFile(e){
        e.preventDefault();
        let thisAjbh = e.currentTarget.parentNode.parentNode.childNodes[0].innerText;
        this.handleGetCaseFile(thisAjbh)
    }

    // 查看案件材料 取消 按钮
    CaseFileHandle(e) {;
        this.setState({
            caseFileVisible:false,
            data:""
        })
    }


    // 移交要求 弹框展示
    request(text,e){
        this.props.form.setFieldsValue({
            caseName:e.currentTarget.parentNode.parentNode.childNodes[1].innerText,
            TransferRequest:text
        });
        this.setState({
            request: true
        })
    }

    // 移交要求 取消弹框
    requestCancel(){
        this.setState({
            request: false
        })
    }

    // 接收案件移交 操作
    transferHandle(test,e){ 
        this.setState({
            transferVisible:true,
            transferId: test,
            transferAjbh: e.currentTarget.parentNode.parentNode.childNodes[0].innerText,
        }) 
        this.props.form.setFieldsValue({
            ajmc_M:  e.currentTarget.parentNode.parentNode.childNodes[1].innerText,
        })
    }

    // 接收案件移交 确认
    transferOk(){
        let data;
        this.props.form.validateFields((error,values)=>{
            data = {
                id: this.state.transferId,
                ajbh: this.state.transferAjbh,
                yjzt: values.yjyj,
                jssm: values.jssm, 
            }
        });
        data.jsdw = window.sessionStorage.getItem('zoningCode');
        this.handleGetDealJsAjyj(data)
    }

     // 接收案件移交 取消
    transferCancel(){
        this.setState({
            transferVisible: false
        })
    }

    // 区划下拉框的 Value
    handleZoningCode(test,e){
        console.log(test, e);
        for(var key in e) {
            if (key == "xzqhOnly") {
                this.props.form.setFieldsValue({
                    "badw": e[key]
                })
            } else if (key == "xzqhAllSix") {
                this.props.form.setFieldsValue({
                    "afdd": e[key]
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
    render(){
        const { getFieldProps } = this.props.form;

        const columns = [
            { title: '案件编号', dataIndex: 'ajbh', key: 'ajbh'},
            { title: '案件名称', dataIndex: 'ajmc', key: 'ajmc' },
            { title: '移交单位', dataIndex: 'sqdw', key: 'sqdw' },
            { title: '移交时间', dataIndex: 'yjrq', key: 'yjrq'},
            { title: '移交要求', dataIndex: 'yjsm', key: 'yjsm',render:(test)=> <a href="javascript:;" onClick={this.request.bind(this,test)}>查看</a>},
            { title: '移交材料', dataIndex: '', key: '' ,render:()=> <a href="javascript:;"  onClick={this.handleCaseFile.bind(this)}>查看</a>},
            { title: '移交状态', dataIndex: 'yjzt', key: 'yjzt' }, 
            { title: '操作', dataIndex: 'id', key: 'id',render:(test)=> <a href="javascript:;" onClick={this.transferHandle.bind(this,test)}>操作</a> },
        ];

        return(
            <div>
                <div className="formBox">
                    <div className="formTitle">
                        接收案件移交
                        <p className={`downAndUp ${this.state.downAndUp ? 'rotate' : ''}`} onClick={this.downAndUpHandel.bind(this)}></p>
                    </div>
                    <div className={`formConten ${this.state.downAndUp ? 'up' : ''}`}>
                        <Form horizontal className="ant-advanced-search-form">
                            <Row gutter={16}>
                                <Col sm={8}>
                                    <FormItem
                                        label="案件编号"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 17 }}
                                        hasFeedback
                                    >
                                        <Input placeholder="请输入搜索名称" size="default" {...getFieldProps('ajbh')}/>
                                    </FormItem>

                                    <FormItem
                                        label="移交时间"
                                        labelCol={{ span: 6 }}
                                        hasFeedback
                                        help
                                    >
                                        <Col span="8"> 
                                            <DatePicker {...getFieldProps('sqsj')} /> 
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8"> 
                                            <DatePicker {...getFieldProps('sqsjEnd')} /> 
                                        </Col>
                                    </FormItem>

                                </Col>
                                <Col sm={7}>
                                    <FormItem
                                        label="案件名称"
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        hasFeedback
                                    >
                                        <Input {...getFieldProps('ajmc')} />
                                    </FormItem>

                                    <FormItem
                                        label="移交状态"
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        hasFeedback
                                    >
                                        <Select {...getFieldProps('yjzt')}>
                                            <Option value="0">申情中</Option>
                                            <Option value="1">已接收</Option>
                                            <Option value="3">已拒绝</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col sm={9}>
                                    <FormItem
                                        label="移交单位"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }} 
                                    >
                                        {/* <Input placeholder="请选择地区" {...getFieldProps('yjdw')}/> */}
                                        <SelectGroup sign="xzqhAll"  {...getFieldProps('yjdw')}  handleZoningCode={this.handleZoningCode.bind(this,'xzqhAll')}></SelectGroup>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} offset={12} style={{ textAlign: 'right' }}>
                                    <Button type="primary" htmlType="submit"  onClick={this.handle.bind(this)} loading={this.state.inquiryLoading}>查询</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
                <div className="queryResults">
                    <Table columns={columns}
                           dataSource={this.state.jsajyjTableData}
                           loading = {this.state.jsajyjTableLoading}
                           className="table"
                           pagination={{pageSize:5}}
                    />
                </div>

                <Modal title="移交要求详情" visible={this.state.request} 
                    onCancel={this.requestCancel.bind(this)}
                    onOk={this.requestCancel.bind(this)}
                    >
                    <FormItem 
                        label="案件名称"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                     >
                        <Input {...getFieldProps('caseName')} />
                    </FormItem>
                    <FormItem 
                        label="移交要求"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }} 
                    >
                        <Input type='textarea'  rows={15} {...getFieldProps('TransferRequest')}  />
                    </FormItem>
                </Modal>

                {/* 接收案件移交 */}
                <Modal title="是否接收案件移交" visible={this.state.transferVisible}
                    onOk={this.transferOk.bind(this)}
                    onCancel={this.transferCancel.bind(this)}
                    > 
                    <FormItem 
                            label="案件名称"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                        >
                            <Input {...getFieldProps('ajmc_M')} />
                        </FormItem>
                        <FormItem 
                            label="移交意见"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }} 
                        > 
                            <Select {...getFieldProps('yjyj')} style={{width:'100%'}}>
                                <Option value="">请选择</Option>  
                                <Option value="1">接收</Option>  
                                <Option value="3">拒绝</Option>
                            </Select>
                        </FormItem>
                        <FormItem 
                            label="移交说明"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }} 
                        > 
                            <Input type="textarea" row={3}  {...getFieldProps('jssm')} />
                        </FormItem>
                    </Modal>

                 {/* 案件材料 */}
                 <CaseFile_Model visible={this.state.caseFileVisible} data={this.state.data_caseFile} CaseFileHandle={this.CaseFileHandle.bind(this)} addBtnVisible="none"/>

            </div>
        )
    }
}

Jsajyj = Form.create()(Jsajyj);

export default Jsajyj;