import React from "react";
import { Form, Input, Row, Col, Button, DatePicker,Cascader,Select,Table, Modal, Card,Icon, message} from 'antd';
import {
    getCaseCloseReport,
    getCaseDetail, getCaseFile,
    getCaseInquiry,
    getCaseManage,
    getCaseRelatedCooperation,
    getCustomizedAdd
} from "../../../../../Service/srbgs/fgimtpcim/server";
import {caseEndFile, detailShowModal, parseTime, disabledDate} from "../../../../../asset/srbgs/js/common";
import { CaseInfo_Model, CaseTeamwork_Model,CaseFile_Model,CaseEnd_Model, CaseCustomized_Model, SelectGroup} from "../../../../../Components";
const FormItem = Form.Item;
const Option = Select.Option;
require('./ajcx.css');

class Ajcx extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            customizedVisible:false,
            ajcxDetailVisible:false,
            ajcxDetailData:{},
            visible_xbaj:false,
            data_xbaj:{},
            caseFileVisible:false,
            data_caseFile: {0: [], 1: [], 2: []},
            caseEndVisible:false,
            data_caseEnd:{},
            inqueryData:{},
            downAndUp: false,
            pageSize: 5,//每页条数
            pageNum: 1,//当前页码
            totalRecord: "",
            inquiryData: {},
        }
    }

    // 查询信息列表 请求
    async handleGetCaseInquiry(params){
        let data = await getCaseInquiry(params);
        let tableData1;
        if (data.code == '000000') {
            tableData1 = data.responseData.dataList;
            tableData1.forEach(item => {
                tableData1.push(...item)
            })

            this.setState({
                tableData1: tableData1,
                totalRecord: data.responseData.totalRecord,
                tableLoading:false,
                inquiryLoading:false,
                CaseCustomizedVisible:false
            })
        }
    }



    // 查看案件详情 请求
    async handleGetCaseDetail(params){
        let data = await getCaseDetail(params);
        if(data.code == '000000'){
            this.setState({
                ajcxDetailData: data.responseData,
                ajcxDetailVisible: true,
            });
        }else{
            message.error('请求数据失败！')
        }
        
    }

    // 查看案件协办 请求
    async handleGetCaseRelatedCooperation(params){
        let data = await getCaseRelatedCooperation(params);
        this.setState({
            data_xbaj: data.responseData,
            visible_xbaj : true,
        });
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
        this.setState({
            data_caseFile: caseFileObj,
            caseFileVisible : true,
        });
    }

    // 查看结案报告 请求
    async handleGetCaseEnd(params){
        let data = await getCaseCloseReport(params);
        this.setState({
            data_caseEnd:data.responseData,
            caseEndVisible:true
        })
    }

    // 查询 和 导出
    handle(callback,e) {
        event.returnValue = false;
        let data;
        this.props.form.validateFields((errors,values) => {
            data = {
                ajbh: (values.ajbh == undefined ? '': values.ajbh),
                ajmc: (values.ajmc == undefined ? '': values.ajmc),
                ajjb: (values.ajjb == undefined ? '': values.ajjb),
                ajxz: (values.ajxz == undefined ? '': values.ajxz),
                ajzt: (values.ajzt == undefined ? '': values.ajzt),
                badw: (values.badw == undefined ? '': values.badw),
                afdd: (values.afdd == undefined ? '': values.afdd),
                lasj: parseTime(values.lasj),
                lasjEnd: parseTime(values.lasjEnd),
                jasj: parseTime(values.jasj),
                jasjEnd: parseTime(values.jasjEnd),
            };
        })

        if(callback == 'handleSubmit'){
            data.pageNum = this.state.pageNum;
            data.pageSize =  this.state.pageSize;
            this.setState({
                inquiryData:data,
                inquiryLoading:true,
                tableLoading:true,
            })
            this.handleGetCaseInquiry(data);
        }else if(callback == 'handleExport'){
            this.setState({
                exportLoading:true,
            })
            this.getCaseManageExport(data);
        }
    }

    // 定制
    customized(){
        this.props.form.validateFields((errors,values) => {
            this.setState({
                inqueryData: values,
                CaseCustomizedVisible:true,
            }) 
        })
        
    }

    // 定制 的 取消 按钮
    customizedHandle(e) {
        this.setState({
            CaseCustomizedVisible:false,
        })
    }

    // 查看案件详情
    detailShowModal (e){
        detailShowModal(e, this, this.handleGetCaseDetail);
    }

    // 获取案件详情 的 取消 按钮
    detailHandle(e) {
        this.setState({
            ajcxDetailVisible:false,
            data:""
        })
    }

    //  查看协办
    handleXbaj(e){
        e.preventDefault();
        let thisAjbh = e.currentTarget.parentNode.parentNode.childNodes[0].innerText;
        this.handleGetCaseRelatedCooperation(thisAjbh)
    }

    //  查看协办案件 model 的隐藏
    xbajModel(){
        this.setState({
            visible_xbaj : false,
            data_xbaj:""
        });
    }

    // 查看案件材料
    handleCaseFile(e){
        e.preventDefault();
        let thisAjbh = e.currentTarget.parentNode.parentNode.childNodes[0].innerText;
        this.handleGetCaseFile(thisAjbh)
    }

    // 查看案件材料 取消 按钮
    CaseFileHandle(e) {
        this.setState({
            caseFileVisible:false,
        })
    }

    // 查看结案报告
    handleCaseEnd(e){
        // e.preventDefault();
        let thisAjbh = e.currentTarget.parentNode.parentNode.childNodes[0].innerText;
        // this.handleGetCaseEnd(thisAjbh)
        caseEndFile(e,this,this.handleGetCaseEnd,thisAjbh)
    }

    // 获取结案报告的 取消 按钮
    CaseEndHandle() {
        this.setState({
            caseEndVisible:false,
            data:""
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

    render () {
        const { getFieldProps } = this.props.form;

        const columns = [
            { title: '案件编号', dataIndex: 'ajbh', key: 'ajbh' },
            { title: '案件名称', dataIndex: 'ajmc', key: 'ajmc',render: (text) => <a href="javascript:;" onClick={this.detailShowModal.bind(this)}>{text}</a>},
            { title: '案件性质', dataIndex: 'ajxz_mc', key: 'ajxz_mc' },
            { title: '立案时间', dataIndex: 'lasj', key: 'lasj' },
            { title: '办案单位', dataIndex: 'bajg', key: 'bajg' },
            { title: '案件级别', dataIndex: 'ajjb', key: 'ajjb' },
            { title: '案件状态', dataIndex: 'ajzt', key: 'ajzt' },
            { title: '协办案件', dataIndex: 'xbajs', key: 'xbajs',render: (text) => <a href="javascript:;"  onClick={this.handleXbaj.bind(this)} disabled ={text == "1"? false : true}>查看</a> },
            { title: '案件材料', dataIndex: '', key: '',render: () =>  <a href="javascript:;"  onClick={this.handleCaseFile.bind(this)}>查看</a> },
            { title: '结案信息', dataIndex: 'ajzt', key: 'ajzt',render: (text) => <a href="javascript:;" onClick={this.handleCaseEnd.bind(this)} disabled ={text == "已结案"? false : true}>结案报告</a> },

        ];

        const pagination = {
            _this: this,
            total: this.state.totalRecord,
            pageSize: this.state.pageSize,
            onChange(current) {
                let postData = this._this.state.inquiryData;
                postData.pageSize = this._this.state.pageSize;
                postData.pageNum = current;
                this._this.handleGetCaseInquiry(postData);
                this._this.setState({
                    tableLoading: true,
                })
            },
        };
        return (
            <div>
                <div className="formBox">
                    <div className="formTitle">
                        案件查询
                        <p className={`downAndUp ${this.state.downAndUp ? 'rotate' : ''}`} onClick={this.downAndUpHandel.bind(this)}></p>
                    </div>
                    <div className={`formConten ${this.state.downAndUp ? 'up' : ''}`}>
                        <Form horizontal className="ant-advanced-search-form">
                            <Row gutter={16}>
                                <Col sm={7}>
                                    <FormItem
                                        label="案件编号"
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        hasFeedback
                                    >
                                        <Input size="default" {...getFieldProps('ajbh')} />
                                    </FormItem>
                                    <FormItem
                                        label="案件级别"
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        hasFeedback
                                    >
                                        <Select {...getFieldProps('ajjb')} >
                                            <Option value="">全部</Option>
                                            <Option value="1">一般案件</Option>
                                            <Option value="2">重点案件</Option>
                                        </Select>
                                    </FormItem>
                                    <FormItem
                                        label="案件状态"
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        hasFeedback
                                    >
                                        <Select {...getFieldProps('ajzt')} >
                                            <Option value="">全部</Option>
                                            <Option value="901">办理中</Option>
                                            <Option value="902">已结案</Option>
                                            <Option value="903">已注销</Option>
                                            <Option value="904">移交办理中</Option>
                                            <Option value="905">申请注销中</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col sm={9}>
                                    <FormItem
                                        label="案件名称"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                        hasFeedback
                                    >
                                        <Input size="default" {...getFieldProps('ajmc')} />
                                    </FormItem>

                                    <FormItem
                                        label="案件性质"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                        hasFeedback
                                    >
                                        <Select {...getFieldProps('ajxz')} >
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
                                        label="办案单位"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                    >
                                        <SelectGroup sign="xzqhOnly" offset='1' {...getFieldProps('badw')} handleZoningCode={this.handleZoningCode.bind(this,'badw')} ></SelectGroup>
                                         {/* <Cascader options={this.state.areaData} {...getFieldProps('badw')} /> */}
                                    </FormItem>
                                </Col>
                                <Col sm={8}>
                                    <FormItem
                                        label="立案时间"
                                        labelCol={{ span: 6 }}
                                        hasFeedback
                                        help
                                    >
                                        <Col span="8">
                                            <DatePicker {...getFieldProps('lasj')}  disabledDate={disabledDate}/>
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8">
                                            <DatePicker {...getFieldProps('lasjEnd')}  disabledDate={disabledDate}/>
                                        </Col>
                                    </FormItem>
                                    <FormItem
                                        label="结案时间"
                                        labelCol={{ span: 6 }}
                                        help
                                        hasFeedback
                                    >
                                        <Col span="8">
                                            <DatePicker {...getFieldProps('jasj')}  disabledDate={disabledDate}/>
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8">
                                            <DatePicker {...getFieldProps('jasjEnd')}  disabledDate={disabledDate}/>
                                        </Col>
                                    </FormItem> 
                                </Col>
                            </Row>
                            <Row offset={24}>
                                <FormItem
                                        label="案发地点"
                                        labelCol={{ span: 3}}
                                        wrapperCol={{ span: 18 }}
                                    >
                                        {/* <Input type="text"  {...getFieldProps('afdd')}/> */}
                                        <SelectGroup sign="xzqhAllSix" offset='1' {...getFieldProps('afdd')} handleZoningCode={this.handleZoningCode.bind(this,'afdd')} ></SelectGroup>
                                </FormItem>
                            </Row>
                            <Row>
                                <Col span={12} offset={12} style={{ textAlign: 'right' }}>
                                    <Button type="primary" htmlType="submit" onClick={this.handle.bind(this,'handleSubmit')} loading={this.state.inquiryLoading}>查询</Button>
                                    <Button onClick={this.handle.bind(this,'handleExport')} >导出</Button>
                                    <Button onClick={this.customized.bind(this)}>定制</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
                <div className="queryResults">
                    <Table columns={columns}
                           loading ={this.state.tableLoading}
                           dataSource={this.state.tableData1}
                           className="table"
                           pagination={pagination}
                    />
                </div>

                {/* 报表定制*/}
                <CaseCustomized_Model  visible={this.state.CaseCustomizedVisible} detailHandle={this.customizedHandle.bind(this)} inqueryData={this.state.inqueryData} modelName={document.getElementsByClassName('formTitle')[0]}/>

                {/* 案件详情 */}
                <CaseInfo_Model visible={this.state.ajcxDetailVisible} data={this.state.ajcxDetailData} detailShowModal={this.detailShowModal.bind(this)} detailHandle={this.detailHandle.bind(this)} />

                {/* 案件协办 */}
                <CaseTeamwork_Model dataSource={this.state.data_xbaj} visible={this.state.visible_xbaj} cancelHandle={this.xbajModel.bind(this)}/>

                {/* 案件材料 */}
                <CaseFile_Model visible={this.state.caseFileVisible} data={this.state.data_caseFile} CaseFileHandle={this.CaseFileHandle.bind(this)} addBtnVisible='none'/>

                {/* 查看结案报告 */}
                <CaseEnd_Model visible={this.state.caseEndVisible} data={this.state.data_caseEnd} CaseEndHandle={this.CaseEndHandle.bind(this)}/>

            </div>
        )
    }
}

Ajcx = Form.create()(Ajcx);

export default Ajcx;