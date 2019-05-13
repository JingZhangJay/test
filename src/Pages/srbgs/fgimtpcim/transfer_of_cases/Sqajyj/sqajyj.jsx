import React from "react";
import {Form,Button,Row,Col,Select,Cascader,Table,Modal,Upload,Icon,Radio,Checkbox,Input,DatePicker,message} from 'antd';
import {detailShowModal, parseTime} from "../../../../../asset/srbgs/js/common";
import {getCaseDetail, getCaseTeamworkShow,getCaseInfoList  } from "../../../../../Service/srbgs/fgimtpcim/server";
import { CaseInfo_Model,SelectGroup} from "../../../../../Components";

const FormItem = Form.Item;

require('./sqajyj.css');

class Sqajyj extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            inquiryLoading:false,
            sqajyjTableLoading:false,
            sqajyjDetailVisible:false,
            transferVisible:false,
            sqajyjDetailData:[],
            downAndUp: false,
        }
    }

    // 查询移交信息列表 请求
    async handleGetCaseTeamworkShow(params){
        let data = await getCaseInfoList(params)
        if (data.code == '000000') {
            this.setState({
                sqajyjTableData:data.responseData.dataList,
                sqajyjTableLoading:false,
                inquiryLoading:false
            })
        }else{
            message.error('数据获取失败');
            this.setState({
                sqajyjTableData:[],
                sqajyjTableLoading:false,
                inquiryLoading:false
            })
        }

    }

    // 查看案件详情 请求
    async handleGetCaseDetail(params){
        let data = await getCaseDetail(params);
        this.setState({
            sqajyjDetailData: data.responseData,
            sqajyjDetailVisible: true,
        });
    }

    // 查看案件详情 请求
    async handleGetCaseTransferApplication(params){
        let data = await getCaseTransferApplication(params);
        this.setState({
            sqajyjDetailData: data.responseData,
            sqajyjDetailVisible: true,
        });
    }

    // 查询
    handle(e) {
        event.returnValue = false;
        let data;
        let lasj = [];
        let afsj = [];
        this.props.form.validateFields((errors,values) => {
            lasj.push(parseTime(values.lasj1),parseTime(values.lasj2));
            afsj.push(parseTime(values.afsj1),parseTime(values.afsj2));
            data = {
                ajbh:(values.ajbh == undefined ? '': values.ajbh),
                lasj:  lasj.length > 0 ? lasj : [],
                afsj: afsj.length > 0 ? afsj : [],
                ajxz: (values.ajxz == undefined ? '': values.ajxz),
                lyfs: (values.lyfs == undefined ? '': values.lyfs),
                afdd:(values.afdd == undefined ? '': values.afdd),
                badw: (values.badw == undefined ? '': values.badw),
                type: '1'
            };
        })

        data.pageNum = '1';
        data.pageSize = '10';
        this.setState({
            inquiryLoading:true,
            sqajyjTableLoading:true,
        })
        this.handleGetCaseTeamworkShow(data);

    }

    // 查看案件详情
    detailShowModal (e){
        detailShowModal(e, this, this.handleGetCaseDetail);
    }

    // 获取案件详情 的 取消 按钮
    detailHandle(e) {
        this.setState({
            sqajyjDetailVisible:false,
            sqajyjDetailData:{},
        })
    }

    // 案情移交弹框显示
    transferShow(e){
        this.props.form.setFieldsValue({
            yjAjmc: e.currentTarget.parentNode.parentNode.childNodes[1].innerText,
        })
        this.setState({
            transferVisible:true
        })
    }

    // 确认发送案件移交
    transfer(e){
        let data;
        this.props.form.validateFields((errors,values) => {
            data = {
                ajbh:e.currentTarget.parentNode.parentNode.childNodes[0].innerText,
                // sqdw:values
                jsdw:values.yjJsdw,
                yjsm:values.yjYjsm,
            }
        })
        this.handleGetCaseTransferApplication(data)
    }
    // 案情移交弹框隐藏
    transferHidden(){
        this.setState({
            transferVisible:false
        })
    }

     // 区划下拉框的 Value
     handleZoningCode(test,e){ 
        this.props.form.setFieldsValue({
            [test]:e
        })
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
            { title: '案件名称', dataIndex: 'ajmc', key: 'ajmc',render: (test)=> <a href="javascript:;" onClick={this.detailShowModal.bind(this)}>{test}</a>},
            { title: '案件性质', dataIndex: 'ajxz_mc', key: 'ajxz_mc' },
            { title: '立案时间', dataIndex: 'lasj', key: 'lasj' },
            { title: '立案机关', dataIndex: 'lajg_mc', key: 'lajg_mc' },
            { title: '信息来源', dataIndex: 'lyfs', key: 'lyfs' ,render: (test)=>{
                    if(test == '555'){return '来电'} else
                    if(test == '556'){return '来人'} else
                    if(test == '557'){return '来信'} else
                    if(test == '558'){return '批转件'} else
                    if(test == '559'){return '网上件'} else
                    if(test == '560'){return '请示件'} else
                    if(test == '561'){return '群众举报'} else
                    if(test == '562'){return '孕情监控发现'} else
                    if(test == '563'){return '孕情监控发现'} else
                    if(test == '563'){return '检查发现'} else
                    if(test == '564'){return '计生系统举报'} else
                    if(test == '565'){return '乡镇举报'} else
                    if(test == '566'){return '协助相关办理'} else
                    if(test == '567'){return '协助相关办理'} else
                    if(test == '568'){return '其他'} else
                    if(test == '569'){return '未说明'} 
                }
            },
            { title: '移交', dataIndex: '', key: '',render:()=> <a href="javascript:;" onClick={this.transferShow.bind(this)}>移交</a>}
        ];
        return(
            <div>
                <div className="formBox">
                    <div className="formTitle">
                        申请案件移交
                        <p className={`downAndUp ${this.state.downAndUp ? 'rotate' : ''}`} onClick={this.downAndUpHandel.bind(this)}></p>
                    </div>
                    <div className={`formConten ${this.state.downAndUp ? 'up' : ''}`}>
                        <Form className="ant-advanced-search-form" >
                            <Row gutter={16}>
                                <Col sm={8}>
                                    <FormItem
                                        label="案件编号"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 17 }}
                                        hasFeedback
                                    >
                                        <Input size="default" {...getFieldProps('ajbh')}/>
                                    </FormItem>
                                    <FormItem
                                        label="案件性质"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 17 }}
                                        hasFeedback
                                        help
                                    >
                                        <Select  {...getFieldProps('ajxz')}>
                                            <Option value="570">非医学需要鉴定胎儿性别</Option>
                                            <Option value="571">非法终止妊娠</Option>
                                            <Option value="572">“两非”中介</Option>
                                            <Option value="574">出售相关药品</Option>
                                            <Option value="575">溺弃女婴</Option>
                                            <Option value="576">其他</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col sm={8}>
                                    <FormItem
                                        label="立案时间"
                                        labelCol={{ span: 6 }}
                                        hasFeedback
                                    >
                                        <Col span="8">
                                            <FormItem >
                                                <DatePicker  {...getFieldProps('lasj1')}/>
                                            </FormItem>
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8">
                                            <FormItem>
                                                <DatePicker {...getFieldProps('lasj2')}/>
                                            </FormItem>
                                        </Col>
                                    </FormItem>
                                    <FormItem
                                        label="信息来源"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 17 }}
                                        hasFeedback
                                    >
                                        <Select  {...getFieldProps('lyfs')}>
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
                                </Col>
                                <Col sm={8}>
                                    <FormItem
                                        label="案发时间"
                                        labelCol={{ span: 6 }}
                                        hasFeedback
                                        help
                                    >
                                        <Col span="8">
                                            <FormItem >
                                                <DatePicker {...getFieldProps('afsj1')} />
                                            </FormItem>
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8">
                                            <FormItem>
                                                <DatePicker {...getFieldProps('afsj2')} />
                                            </FormItem>
                                        </Col>
                                    </FormItem> 
                                </Col> 
                            </Row>
                            <Row offset={24}>
                                <Col>
                                    <FormItem
                                        label="案发地点"
                                        labelCol={{ span: 3 }}
                                        wrapperCol={{ span: 18 }}
                                        hasFeedback
                                    >
                                        {/* <Cascader {...getFieldProps('afdd')}  /> */}
                                        <SelectGroup sign="xzqhAllSix"  {...getFieldProps('afdd')}  handleZoningCode={this.handleZoningCode.bind(this,'afdd')}></SelectGroup>
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
                           dataSource={this.state.sqajyjTableData}
                           loading = {this.state.inquiryLoading}
                           className="table"
                           pagination={{pageSize:5}}
                    />

               </div>

                {/*  案件移交 */}
                <Modal title="案件移交"  visible={this.state.transferVisible}
                    onOk={this.transfer.bind(this)}
                    onCancel={this.transferHidden.bind(this)}  >
                    <Form >
                        <FormItem label="案件名称"
                                  labelCol={{ span: 4 }}
                                  wrapperCol={{ span: 18 }}>
                            <Input  {...getFieldProps('yjAjmc')}/>
                        </FormItem>
                        <FormItem label="接收单位"
                                  labelCol={{ span: 4 }}
                                  wrapperCol={{ span: 18 }}>
                            <Cascader {...getFieldProps('yjJsdw')} />
                        </FormItem>
                        <FormItem label="移交说明"
                                  labelCol={{ span: 4 }}
                                  wrapperCol={{ span: 18 }}>
                            <Input type="textarea" placeholder="" rows="3" {...getFieldProps('yjYjsm')} />
                        </FormItem>
                    </Form>
                </Modal>

                {/* 案件详情 */}
                <CaseInfo_Model visible={this.state.sqajyjDetailVisible} data={this.state.sqajyjDetailData} detailShowModal={this.detailShowModal.bind(this)} detailHandle={this.detailHandle.bind(this)} />

            </div>
        )
    }
}

Sqajyj = Form.create()(Sqajyj);

export default Sqajyj;