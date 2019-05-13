import React from "react"; 
import {Table,Form,Input,Select,Row,Col, message,Button} from 'antd';
import {SelectGroup} from '../../../../../Components/index';
import {getYljg} from '../../../../../Service/srbgs/fgimtpcim/server'
require('./yljgcx.css');

const FormItem = Form.Item;
const Option = Select.Option;


class Yljgcx extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            inquiryLoading: false,
            YljgTabLoading: false,
            YljgDataSource:[],
            pageSize: 5,//每页条数
            pageNum: 1,//当前页码
            totalRecord: "",
            inquiryData: {},
        }
    };
 
    async handleGetYljg(params){
        let data = await getYljg(params);
        if (data.code == '000000') {
            this.setState({
                YljgDataSource: data.responseData.dataList,
                totalRecord: data.responseData.totalRecord,
                inquiryLoading: false,
                YljgTabLoading: false,
            })
        }else{
            message.error('查询数据失败！');
            this.setState({ 
                inquiryLoading: false,
                YljgTabLoading: false,
            })
        }
    }

    inquiry(){
        let data;
        this.props.form.validateFields((error,values)=>{ 
            data = {
                mc : values.xm,
                frsfz: values.zjhm,
                glddm: values.hjd == undefined ? '000000000000000' : values.hjd,
                pageNum:  this.state.pageNum,
                pageSize: this.state.pageSize,
            }
        })
        this.handleGetYljg(data);

        this.setState({
            inquiryData:data,
            inquiryLoading: true,
            YljgTabLoading: true,
        })
    }

    // 区划下拉框的 Value
    handleZoningCode(test,e){
        for(var key in e) {
            if (key == "xzqhOnly") {
                this.props.form.setFieldsValue({
                    "badw": e[key]
                })
            } else if (key == "xzqhAllSix") {
                this.props.form.setFieldsValue({
                    "afdd": e[key]
                })
            } else if (key == "xzqhAll") {
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
    render(){
        const {getFieldProps} = this.props.form;

        const columns = [ 
            { title: '机构名称', dataIndex: 'mc', key: 'mc'},  
            { title: '法人名称', dataIndex: 'frdb', key: 'frdb'}, 
            { title: '法人身份证', dataIndex: 'frsfz', key: 'frsfz'},
            { title: '管理地', dataIndex: 'gldmc', key: 'gldmc'},
        ];

        const pagination = {
            _this: this,
            total: this.state.totalRecord,
            pageSize: this.state.pageSize,
            onChange(current) {
                let postData = this._this.state.inquiryData;
                postData.pageSize = this._this.state.pageSize;
                postData.pageNum = current;
                this._this.handleGetYljg(postData);
                this._this.setState({
                    YljgTabLoading: false,
                })
            },
        };


        return(
            <div>  
                <div className="formBox">
                    <div className="formTitle">
                        医疗机构查询
                        <p className={`downAndUp ${this.state.downAndUp ? 'rotate' : ''}`} onClick={this.downAndUpHandel.bind(this)}></p>
                    </div>
                    <div className={`formConten ${this.state.downAndUp ? 'up' : ''}`}>
                        <Form horizontal className="ant-advanced-search-form" >
                            <Row>
                                <Col sm={7}> 
                                    <FormItem label="名称"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}>
                                        <Input  {...getFieldProps('xm')}/>
                                    </FormItem>
                                </Col>
                                <Col sm={10}>
                                    <FormItem label="户籍地" 
                                        labelCol={{ span: 4 }}
                                        wrapperCol={{ span: 20 }}
                                        required>
                                            <SelectGroup sign='xzqhAll' {...getFieldProps('hjd')}  handleZoningCode={this.handleZoningCode.bind(this,'xzqhAll')}></SelectGroup>
                                    </FormItem> 
                                </Col>
                                <Col sm={7}>
                                    <FormItem label="证件号码" 
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}>
                                        <Input  {...getFieldProps('zjhm')}/>
                                    </FormItem>
                                </Col>
                            </Row> 
                            <Row>
                                <Col span={12} offset={12} style={{ textAlign: 'right' }}>
                                    <Button type="primary" htmlType="submit"  onClick={this.inquiry.bind(this)} loading={this.state.inquiryLoading}>查询</Button> 
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div> 
                <div className="queryResults">
                    <Table 
                        columns={columns} 
                        dataSource={this.state.YljgDataSource} 
                        loading={this.state.YljgTabLoading}
                        pagination={pagination} />
                </div>
            </div>
        )
    }
}

Yljgcx = Form.create()(Yljgcx);

export default Yljgcx;