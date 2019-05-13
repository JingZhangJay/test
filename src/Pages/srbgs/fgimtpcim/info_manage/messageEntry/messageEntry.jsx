import React from "react";
import { Form, Select, Input, Button, Table, Icon, Modal, message, DatePicker, Row, Col} from "antd";
import { SelectGroup } from "../../../../../Components/index";
import { parseTime, selectZoningCode ,disabledDate} from "../../../../../asset/srbgs/js/common";
import { getlrJbxx, getSelectCreatedJbxx, getAssignJbxxeatedJbxx, getInfoDetail} from "../../../../../Service/srbgs/fgimtpcim/server";
 
const FormItem = Form.Item;
const Option = Select.Option;

require('./messageEntry.css');


class messageEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {   
            infoVisible: false,
            xxfbVisible: false,
            infoDetailVisible: false,
            infoEntryTableData:[],
            infoEntryTableLoading:false,
            inqueryLoading: false,
            xxmcDetail:''
        }
    }

    // 录入消息 请求
    async handleGetlrJbxx (params){
        let data = await getlrJbxx(params); 
        if(data.code == '000000'){
            message.success('消息添加成功'); 
            this.setState({
                inqueryLoading: false,
                infoEntryTableLoading: false,
            })
        }else {
            message.error('消息添加失败');
        }
        
    }

    // 录入消息列表 请求
    async handleGetSelectCreatedJbxx (params){
        let data = await getSelectCreatedJbxx(params);
        console.log(data);
        if(data.code == '000000'){
            message.success('查询成功');
            this.setState({
                inqueryLoading: false,
                infoEntryTableLoading: false,
                infoEntryTableData: data.responseData.dataList, 
            })
        }else {
            message.error('查询失败');
            this.setState({
                inqueryLoading: false,
                infoEntryTableLoading: false,
            })
        }
    }

    // 录入消息发布   请求
    async handleGetAssignJbxxeatedJbxx(){
        let data = await getAssignJbxxeatedJbxx(params);
        console.log(data)
    }

    // 查看消息详情 
    async handleGetInfoDetail (params){
        let data = await getInfoDetail(params);
        if(data.code == '000000'){ 
            this.props.form.setFieldsValue({
                D_xxmc: data.responseData.xxmc,
                D_lyfs: data.responseData.lyfs,
                D_afdd: data.responseData.afdd_mc,
                D_jbr:  data.responseData.jbr,
                D_lxdh: data.responseData.lxdh,
                D_lxdz: data.responseData.lxdz,
                D_ajxz: data.responseData.ajxz, 
                D_jbnr: data.responseData.jbnr,
            })

            this.setState({
                infoDetailVisible: true
            })
        }else{
            message.error('数据请求失败！')
        }
    }
    // 消息录入列表 查询
    selectXxlrList(e){
        let data;
        this.props.form.validateFields((errors,values) => {
            data = {
                start: parseTime(values.qssj),
                end: parseTime(values.jzsj),
                pageNum: '1',
                pageSize:'10'
            }
        }); 
        this.setState({
            inqueryLoading:true,
            infoEntryTableLoading:true,
        })
        this.handleGetSelectCreatedJbxx(data)
    }

    // 消息录入弹框展示
    infoShow() {
        this.setState({
            infoVisible: true
        })
    }

    // 消息录入
    infoOk(e) {
        let data; 
        this.props.form.validateFields((errors,values) => {
            data = {
                xxmc: values.xxmc,
                lyfs: values.lyfs,
                afdd: values.afdd,
                jbr: values.jbr,
                lxdh: values.lxdh,
                lxdz: values.lxdz,
                ajxz: values.ajxz,
                jbnr: values.jbnr,
                lrdw: window.sessionStorage.getItem('zoningCode')
            };
        })
        console.log(data)
        this.handleGetlrJbxx(data)
    }


    // 消息录入弹框 关闭
    infoCancel() { 
        this.setState({
            infoVisible: false
        })
    }

    //  消息发布弹框 展示
    xxfbShow(e){
        this.setState({
            xxfbVisible: true
        }) 
    }

    // 消息发布 
    infoIssue(e){
        let data = {};
        this.handleGetAssignJbxxeatedJbxx(data)
    }

    //  消息发布弹框 隐藏
    xxfbHide(e){
        this.setState({
            xxfbVisible: false
        }) 
    }

    // 消息详情
    infoDetail(e){ 
        this.setState({
            xxmcDetail: e.currentTarget.parentNode.parentNode.childNodes[1].innerText
        })
        this.handleGetInfoDetail(e.currentTarget.parentNode.parentNode.childNodes[0].innerText);
    }

     // 消息详情弹框关闭
    infoDetailCancel(){ 
        this.setState({
            infoDetailVisible: false
        })
    }

    // 区划下拉框的 Value
    handleZoningCode(test,e){
        console.log(test, e);
        for(var key in e) {
             if (key == "xzqhAllSix") {
                this.props.form.setFieldsValue({
                    "afdd": e[key]
                })
            }
        }
    }

    // 分页
    paginationChange(current){
        console.log(current)
    }
    render() {
        const { getFieldProps } = this.props.form;

        const columns= [
            { title: '案发编号', dataIndex: 'id', key: 'id'},
            { title: '消息名称', dataIndex: 'xxmc', key: 'xxmc', render: (text) => <a href="javascript:;" onClick={this.infoDetail.bind(this)}>{text}</a>},
            { title: '处理状态', dataIndex: 'clzt', key: 'clzt', render: (text) => (text == '1' ? '已下发':'未下发')},
            { title: '案件性质', dataIndex: 'ajxz', key: 'ajxz' },
            { title: '来源方式', dataIndex: 'lyfs', key: 'lyfs' },
            { title: '举报时间', dataIndex: 'lrsj', key: 'lrsj' },
            { title: '操作', dataIndex: '', key: '', render: (text) => <a href="javascript:;" onClick={this.xxfbShow.bind(this)}>发布</a> },
        ];
  
        return (
            <div>
                <div className="formBox">
                    <div className="formTitle">
                        消息录入
                    </div>
                    <div className="formConten">
                        <Form horizontal inline className="ant-advanced-search-form" >
                            <Row>
                                <Col span="2"></Col>
                                <Col span="20"> 
                                    <FormItem
                                        label="起始时间"
                                    > 
                                        <DatePicker {...getFieldProps('qssj')} disabledDate={disabledDate} />
                                    </FormItem> 
                                    <FormItem
                                        label="截至时间"
                                    > 
                                        <DatePicker {...getFieldProps('jzsj')} disabledDate={disabledDate}/>
                                    </FormItem>
                                    <Button type="primary" onClick={this.selectXxlrList.bind(this)} loading={this.state.inqueryLoading}>查询</Button> 
                                    <Button type="dashed" style={{ marginLeft: '2%' }} className="caseAdd" onClick={this.infoShow.bind(this)}>
                                        <Icon type="plus-circle" />
                                        消息录入
                                    </Button>
                                 </Col>
                                <Col span="2"></Col>
                            </Row>
                            
                        </Form>
                    </div>
                </div>
                <div className="queryResults">
                    <Table
                        columns={columns}
                        dataSource={this.state.infoEntryTableData} 
                        pagination={{onChange:this.paginationChange.bind(this)}}
                        loading={this.state.infoEntryTableLoading}

                    />
                </div>

                {/* 消息录入框 */}
                <Modal visible={this.state.infoVisible} title="消息录入" width="58%"
                    onOk={this.infoOk.bind(this)}
                    onCancel={this.infoCancel.bind(this)}>
                    <Form horizontal className="ant-advanced-search-form">
                        <FormItem
                            label="消息名称"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                        >
                            <Input {...getFieldProps('xxmc')} />
                        </FormItem>
                        <FormItem
                            label="来源方式"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
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
                        <FormItem
                            label="案发地点"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                        >
                            {/* <Input {...getFieldProps('afdd')} /> */}
                            <SelectGroup sign="xzqhAllSix"  offset='0'  {...getFieldProps('afdd')} handleZoningCode={this.handleZoningCode.bind(this,'afdd')} ></SelectGroup>
                        </FormItem>
                        <FormItem
                            label="举报人"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                        >
                            <Input {...getFieldProps('jbr')} />
                        </FormItem>
                        <FormItem
                            label="联系电话"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                        >
                            <Input {...getFieldProps('lxdh')} />
                        </FormItem>
                        <FormItem
                            label="联系地址"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                        >
                            <Input {...getFieldProps('lxdz')} />
                        </FormItem> 
                        <FormItem
                            label="案件性质"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                        >
                           <Select {...getFieldProps('ajxz')}>
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
                            <Input {...getFieldProps('jbnr')} type="textarea" rows={3} />
                        </FormItem>
                    </Form>
                </Modal>

                {/* 消息发布 */}
                <Modal visible={this.state.xxfbVisible} title="消息发布" width="54%"
                    onOk ={this.infoIssue.bind(this)}
                    onCancel={this.xxfbHide.bind(this)} >
                    <FormItem
                            label="消息名称"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                        >
                            <Input value={this.state.xxmcDetail}/> 
                    </FormItem>
                     <FormItem
                            label="接收单位"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                        >
                            {/* <Input {...getFieldProps('jsdw')}/> */}
                            <SelectGroup sign="xzqhAll" {...getFieldProps('jsdw')} handleZoningCode={this.handleZoningCode.bind(this,'xzqhAll')} ></SelectGroup>
                    </FormItem>
                    <FormItem
                            label="发布备注"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                        >
                            <Input {...getFieldProps('jsdz')} type='textarea' rows={3}/> 
                    </FormItem>
                </Modal>

                {/* 消息详情 */}
                <Modal visible={this.state.infoDetailVisible} title="消息详情" width="54%"
                    onOk={this.infoDetailCancel.bind(this)}
                    onCancel={this.infoDetailCancel.bind(this)}>
                    <Form horizontal className="ant-advanced-search-form">
                        <FormItem
                            label="消息名称"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                        >
                            <Input {...getFieldProps('D_xxmc')}/>
                        </FormItem>
                        <FormItem
                            label="来源方式"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                        > 
                            <Input {...getFieldProps('D_lyfs')}/>
                        </FormItem>
                        <FormItem
                            label="案发地点"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                        >
                            <Input {...getFieldProps('D_afdd')}/>
                        </FormItem>
                        <FormItem
                            label="举报人"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                        >
                            <Input {...getFieldProps('D_jbr')}/>
                        </FormItem>
                        <FormItem
                            label="联系电话"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                        >
                            <Input {...getFieldProps('D_lxdh')}/>
                        </FormItem>
                        <FormItem
                            label="联系地址"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                        >
                            <Input {...getFieldProps('D_lxdz')}/>
                        </FormItem> 
                        <FormItem
                            label="案件性质"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                        >
                           <Input {...getFieldProps('D_ajxz')}/>
                        </FormItem>
                        <FormItem
                            label="举报内容"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                        >
                            <Input type="textarea" rows="3"  {...getFieldProps('D_jbnr')}/>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

messageEntry = Form.create()(messageEntry);

export default messageEntry;