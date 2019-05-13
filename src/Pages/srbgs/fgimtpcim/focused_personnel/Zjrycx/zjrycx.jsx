import React from "react";
import {Table,Form,Input,Select,Row,Col, message,Button} from 'antd';
import {SelectGroup} from '../../../../../Components/index'; 
import {getZjry} from '../../../../../Service/srbgs/fgimtpcim/server'

const FormItem = Form.Item;
const Option = Select.Option;

require('./zjrycx.css')

class Zrycx extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            inquiryLoading: false,
            zjryTabLoading: false,
            zjryDataSource:[],
            pageSize: 5,//每页条数
            pageNum: 1,//当前页码
            totalRecord: "",
            inquiryData: {},
        }
    };
 
    async handleGetZjry(params){
        let response = await getZjry(params);
        if (response.data.code == '000000' && response.status >= 200 && response.status < 300) {
            this.setState({
                zjryDataSource: response.data.responseData.dataList,
                totalRecord: response.data.responseData.totalRecord,
                inquiryLoading: false,
                zjryTabLoading: false,
            })
        }else{
            message.error('查询数据失败！');
            this.setState({ 
                inquiryLoading: false,
                zjryTabLoading: false,
            })
        }
    }

    inquiry(){
        let data;
        this.props.form.validateFields((error,values)=>{
            data = {
                xm : values.xm,
                sfz: values.zjhm,
                hjddm: values.hjd == undefined ? '000000000000000' : values.hjd,
                pageNum:  this.state.pageNum,
                pageSize: this.state.pageSize,
            }
        })

        this.handleGetZjry(data);

        this.setState({
            inquiryData:data,
            inquiryLoading: true,
            zjryTabLoading: true,
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
            }else if (key == "xzqhAll") {
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
            { title: '姓名', dataIndex: 'xm', key: 'xm'}, 
            { title: '性别', dataIndex: 'xb', key: 'xb',render:(test)=> test == '342' ? '女':'男'}, 
            { title: '名族', dataIndex: 'mz', key: 'mz'}, 
            { title: '证件号码', dataIndex: 'zjhm', key: 'zjhm'},
            { title: '学历', dataIndex: 'whcd', key: 'whcd'}, 
            { title: '政治面貌', dataIndex: 'zzmm', key: 'zzmm'}, 
            { title: '户籍地', dataIndex: 'hjd', key: 'hjd'}, 
        ];

        const pagination = {
            _this: this,
            total: this.state.totalRecord,
            pageSize: this.state.pageSize,
            onChange(current) {
                console.log('current ====>',current)
                console.log(this._this.state.totalRecord)
                let postData = this._this.state.inquiryData;
                postData.pageSize = this._this.state.pageSize;
                postData.pageNum = current;
                this._this.handleGetZjry(postData)
                this._this.setState({
                    zjryTabLoading: true
                })
            },
        };

        return(
            <div>  
                <div className="formBox">
                    <div className="formTitle">
                        中介人员查询
                        <p className={`downAndUp ${this.state.downAndUp ? 'rotate' : ''}`} onClick={this.downAndUpHandel.bind(this)}></p>
                    </div>
                    <div className={`formConten ${this.state.downAndUp ? 'up' : ''}`}>
                        <Form horizontal className="ant-advanced-search-form" >
                            <Row>
                                <Col sm={7}> 
                                    <FormItem label="姓名" 
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
                        dataSource={this.state.zjryDataSource}
                        className="table"
                        loading={this.state.zjryTabLoading}
                        pagination={pagination} />
                </div>
            </div>
        )
    }
}

Zrycx = Form.create()(Zrycx);

export default Zrycx;