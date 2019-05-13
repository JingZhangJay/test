import React from "react";
import { Form, Input, Row, Col,Select,Table, Modal,Cascader,Upload,Button,Icon,Checkbox, message} from 'antd';
import  {getCaseObjectInfo,getCaseUpdateAjxx} from '../../../../Service/srbgs/fgimtpcim/server';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

require('./caseInfo_Model.css')

const tableData = [
    {
        key: 1,caseId:'1',caseName: '奎文瑞金门诊部', caseArea: '罚款7000元',caseRole:'2019-03-05',caseProperty:'山东省潍坊市奎文区'
    },
    {
        key: 2,caseId:'2',caseName: '张淑珍', caseArea: '没收非法所得1000元',caseRole:'2019-03-05',caseProperty:'山东省潍坊市奎文区'
    }
];

const ajxzCheack = [
    { label: '非医学需要鉴定胎儿性别', value: '570' },
    { label: '非法终止妊娠', value: '571' },
    { label: '“两非”中介', value: '572' },
    { label: '出售相关药品', value: '574' },
    { label: '溺弃女婴', value: '575' },
    { label: '其他', value: '576' },
];

const jdfsCheack = [
    { label: 'B超', value: '593' },
    { label: '母血鉴定', value: '594' },
    { label: '羊水穿刺', value: '595' },
    { label: '绒毛取样', value: '596' },
    { label: '其他', value: '597' },
];

class CaseInfo_Model extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sadxInfo:{},
            sadwInfo:{},
            visible1:false,
            visibleDw:false,
            caseRevise: this.props.visible, 
        }
       
    }

    handleCancel() {
        this.props.detailHandle();
    }

    async handleGetCaseObjectInfo(params){ 
        let data = await getCaseObjectInfo(params);
        if(data.code == '000000'){
            if(params.sf == '个人'){
                this.setState({
                    sadxInfo: data.responseData,
                    visible1:true
                });
            }else if(params.sf == '单位'){
                this.setState({
                    sadwInfo: data.responseData,
                    visibleDw:true
                });
            }
           
        }else{
            message.error('请求数据失败')
        }
    }
 

    showarInfo(e){ // 展示 涉案对象信息卡
        let data = {};
        data.ajbh =  this.props.data.ajbh;
        data.sf =  e.currentTarget.parentNode.parentNode.childNodes[5].innerText;
        data.dxbh =  e.currentTarget.parentNode.parentNode.childNodes[0].innerText; 
        this.handleGetCaseObjectInfo(data)  
    }

    showDwInfo(e){
        let data = {};
        data.ajbh =  this.props.data.ajbh;
        data.sf =  e.currentTarget.parentNode.parentNode.childNodes[5].innerText;
        data.dxbh =  e.currentTarget.parentNode.parentNode.childNodes[0].innerText;

        this.handleGetCaseObjectInfo(data)
    }

    checkCancel(){ // 涉案对象信息卡 点击 取消
        this.setState({
            visible1:false,
            visibleDw:false,
        })
    }


    checkOk(){ // 涉案对象信息卡 点击 OK
        this.setState({
            visible1:false,
            visibleDw:false,
        })
    }

    handleRevise(){
        alert('修改')
        let data;
            this.props.from.validateFields((error,values)=>{
                //  ajmc:
                //  lyfs
                //  afdd
                //  ajxz
                //  jdfs
                //  afsj
                //  lasj
                //  lajg
                //  lar
                //  spr
                //  cbr
                //  aqjj
                //  aqbz
                //  bajg
            })
        this.handleGetCaseUpdateAjxx(data)
    }

    // componentWillReceiveProps(nextProps){
    //     if(nextProps.data != this.props.data){
    //         console.log("==============>",nextProps, this.props);
    //         this.props.form.setFieldsValue({
    //             'ajmc': nextProps.data.ajmc
    //         })
    //     }
    // }

    render() {
        const { getFieldProps } = this.props.form;
        let {data} = this.state;
 

        const columns = [
            { title: '对象编号', dataIndex: 'dxbh', key: 'dxbh' },
            { title: '对象名称', dataIndex: 'dxmc', key: 'dxmc',render: (text,e) => { 
                if(e.sf == '个人') {
                    return   <a href="javascript:;"  onClick={this.showarInfo.bind(this)} >{text}</a>
                }else if(e.sf == '单位'){
                    return   <a href="javascript:;"  onClick={this.showDwInfo.bind(this)} >{text}</a>
                }}
            },  
            { title: '户籍(管理)地', dataIndex: 'hjd', key: 'hjd' },
            { title: '涉案身份', dataIndex: 'sasf', key: 'sasf' },
            { title: '涉案性质', dataIndex: 'saxz', key: 'saxz' },
            { title: '身份', dataIndex: 'sf', key: 'sf' },
            { title: '证件号码', dataIndex: 'zjhm', key: 'zjhm' },
            { title: '当前状态', dataIndex: 'dqzt', key: 'dqzt'}
        ]; 

        return(
            <div className="caseInfo_Model">
                <Modal title="案件信息查看"  visible={this.props.visible} style={{'z-index':1002}} width="54%"
                       onOk={this.handleCancel.bind(this)}
                       onCancel={this.handleCancel.bind(this)}
                    >
                        <Form horizontal >
                            <FormItem
                                label="案件名称"
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 18 }}
                            >
                                <Input size="small" value={this.props.data.ajmc} />
                            </FormItem>

                            <Row gutter={24}>
                                <Col sm={8}>
                                    <FormItem
                                        label="立案时间"
                                        labelCol={{ span: 12 }}
                                        wrapperCol={{ span: 12 }}
                                    >
                                        <Input size="small" value={this.props.data.lasj} />
                                    </FormItem>
                                </Col>
                                <Col sm={8}>
                                    <FormItem
                                        label="案发时间"
                                        labelCol={{ span: 12 }}
                                        wrapperCol={{ span: 12 }}
                                    >
                                        <Input size="small" value={this.props.data.afsj}  />
                                    </FormItem>
                                </Col>
                                <Col sm={8}>
                                    <FormItem
                                        label="案件来源方式"
                                        labelCol={{ span: 12 }}
                                        wrapperCol={{ span: 12 }}
                                    >
                                        <Input size="small"  value={this.props.data.lyfs}  />
                                    </FormItem>
                                </Col>
                            </Row>

                            <FormItem
                                label="案件性质"
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 18 }}
                            >
                                <CheckboxGroup options={ajxzCheack} value={this.props.data.ajxz} />
                            </FormItem>


                            <FormItem
                                label="鉴定方式"
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 18 }}
                            >
                                <CheckboxGroup options={jdfsCheack} value={this.props.data.jdfs}  />
                            </FormItem>

                            <FormItem
                                label="案发地点"
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 18 }}
                            >
                                <Input  rows="3" value={this.props.data.afdd}  />
                            </FormItem>
                            <Row gutter={24} >
                                <Col sm={4}>
                                    <div style={{'text-align':'right'}}>涉案对象</div>
                                </Col>
                                <Col sm={18}>
                                    <Table
                                        rowKey="ajbh"
                                        columns={columns}
                                        dataSource={this.props.data.sadxList}
                                        className="CaseInfo-table"
                                        pagination={false}
                                    />
                                </Col>
                            </Row>

                            <FormItem
                                label="案情简介"
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 18 }}
                            >
                                <Input type="textarea" rows="3" value={this.props.data.aqjj}  />
                            </FormItem>

                            <Row gutter={24}>
                                <Col sm={12}>
                                    <FormItem
                                        label="办案人"
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 14 }}
                                    >
                                        <Input size="small" value={this.props.data.lar} />
                                    </FormItem>
                                </Col>
                                <Col sm={12}>
                                    <FormItem
                                        label="审批人"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 14 }}
                                    >
                                        <Input size="small" value={this.props.data.spr} />
                                    </FormItem>
                                </Col>
                            </Row>
                            <FormItem
                                label="备注"
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 18 }}
                            >
                                <Input type="textarea" rows={3} value={(this.props.data.aqbz == undefined ? '' : this.props.data.aqbz) } size="small" />
                            </FormItem>
                        </Form>
                </Modal>


                {/* 对象名称 */}
                <Modal title="浏览涉案对象信息"  visible={this.state.visible1} style={{'z-index':1003}} width="54%"
                       onOk={this.checkOk.bind(this)}
                       onCancel={this.checkCancel.bind(this)} >
                    <Form horizontal className="ant-advanced-search-form">
                        <Row>
                            <Col span={8}>
                                <FormItem
                                    label="姓名"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 14}}
                                    hasFeedback
                                >
                                    <Input type="text" value={this.state.sadxInfo.xm}/>
                                </FormItem>
                                <FormItem
                                    label="涉案身份"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 14}}
                                    hasFeedback
                                >
                                    <Input value={this.state.sadxInfo.sasf_mc} /> 
                                </FormItem>
                                <FormItem
                                    label="民族"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 14}}
                                    hasFeedback
                                >
                                    <Input value={this.state.sadxInfo.mz} /> 
                                </FormItem>
                                <FormItem
                                    label="身份证号"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 14}}
                                    hasFeedback
                                >
                                    <Input value={this.state.sadxInfo.zjhm}/>
                                </FormItem>
                                <FormItem
                                    label="文化程度"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 14}}
                                    hasFeedback
                                >
                                    <Input value={this.state.sadxInfo.whcd} /> 
                                </FormItem>
                                <FormItem
                                    label="户籍地"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 14}}
                                    hasFeedback
                                >
                                    <Input value={(this.state.sadxInfo.hjd_mc == undefined ? '': this.state.sadxInfo.hjd_mc)}/>
                                </FormItem>
                                <FormItem
                                    label="联系电话"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 14}}
                                    hasFeedback
                                >
                                    <Input value={(this.state.sadxInfo.lxdh == undefined ? '': this.state.sadxInfo.lxdh)}/>
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="涉案性质"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 14}}
                                    hasFeedback
                                >
                                    <Input value={this.state.sadxInfo.saxz_mc} /> 
                                </FormItem>
                                <FormItem
                                    label="执业资格"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 14}}
                                    hasFeedback
                                >
                                    <Input value={this.state.sadxInfo.zyzg} /> 
                                </FormItem>
                                <FormItem
                                    label="工作单位"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 14}}
                                    hasFeedback
                                >
                                    <Input value={this.state.sadxInfo.gzdw}/>
                                </FormItem>
                                <FormItem
                                    label="性别"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 14}}
                                    hasFeedback
                                >
                                    <Input value={this.state.sadxInfo.xb} /> 
                                </FormItem>
                                <FormItem
                                    label="政治面貌"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 14}}
                                    hasFeedback
                                >
                                    <Input value={this.state.sadxInfo.zzmm} /> 
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <img alt="example" width="100%" src={this.state.sadxInfo.img} />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <FormItem
                                    label="备注"
                                    labelCol={{span: 4}}
                                    wrapperCol={{span: 18}}
                                >
                                    <Input type="textarea" placeholder="" rows="3" value={(this.state.sadxInfo.bz == undefined ? '': this.state.sadxInfo.bz)}/>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Modal>

                 {/* 单位名称 */}
                 <Modal title="浏览涉案单位信息"  visible={this.state.visibleDw} style={{'z-index':1003}} width="54%"
                       onOk={this.checkOk.bind(this)}
                       onCancel={this.checkCancel.bind(this)} >
                        <Form horizontal className="ant-advanced-search-form">
                        <Row>
                            <Col span={8}>
                                <FormItem
                                    label="单位名称"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 14}}
                                    hasFeedback
                                >
                                    <Input size="default" value={this.state.sadwInfo.sadwmc}/>
                                </FormItem>
                                <FormItem
                                    label="法人代表"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 14}}
                                    hasFeedback
                                >
                                    <Input size="default"  value={this.state.sadwInfo.frdb}/>
                                </FormItem>
                                <FormItem
                                    label="法人身份证"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 14}}
                                    hasFeedback
                                >
                                    <Input size="default" value={this.state.sadwInfo.frdbsfz}/>
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="涉案性质"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 14}}
                                    hasFeedback
                                >
                                    <Input size="default" value={this.state.sadwInfo.saxz_mc}/>
                                </FormItem>
                                <FormItem
                                    label="证件类型"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 14}}
                                    hasFeedback
                                >
                                   <Input size="default" value={this.state.sadwInfo.zjlx}/>
                                </FormItem>
                                <FormItem
                                    label="联系人"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 14}}
                                    hasFeedback
                                >
                                    <Input size="default" value={this.state.sadwInfo.lxr} />
                                </FormItem>

                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="涉案单位身份"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 14}}
                                    hasFeedback
                                >
                                    <Input size="default" value={this.state.sadwInfo.sasf_mc} />
                                </FormItem>
                                <FormItem
                                    label="证件号码"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 14}}
                                    hasFeedback
                                >
                                    <Input size="default" />
                                </FormItem>
                                <FormItem
                                    label="联系电话"
                                    labelCol={{span: 9}}
                                    wrapperCol={{span: 14}}
                                    hasFeedback
                                >
                                    <Input size="default" value={this.state.sadwInfo.lxdh}/>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <FormItem
                                    label="管理地"
                                >
                                    <Input value={this.state.sadwInfo.gld_mc} /> 
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    label="详细地址"
                                >
                                    <Input value={this.state.sadwInfo.xxdz} /> 
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <FormItem
                                    label="备注"
                                >
                                    <Input type="textarea" rows={3}  size="default"  value={this.state.sadwInfo.bz} />
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Modal>



              
            </div>
        )
    }
}

CaseInfo_Model = Form.create()(CaseInfo_Model);

export default CaseInfo_Model;