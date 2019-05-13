import React from "react";
import {Table,Form,Input,Select,Row,Col, message,Button} from 'antd';
import {SelectGroup} from '../../../../../Components/index';
import {getYwry} from '../../../../../Service/srbgs/fgimtpcim/server' 

const Option = Select.Option;
const FormItem = Form.Item;

require('./ywrycx.css');

class Ywrycx extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            inquiryLoading: false,
            YwryTabLoading: false,
            YwryDataSource:[],
            pageSize: 5,//每页条数
            pageNum: 1,//当前页码
            totalRecord: "",
            inquiryData: {},
        }
    };
 
    async handleGetYlry(params){
        let data = await getYwry(params);
        if (data.code == '000000') {
            this.setState({
                YwryDataSource: data.responseData.dataList,
                totalRecord: data.responseData.totalRecord,
                inquiryLoading: false,
                YwryTabLoading: false,
            })
        }else{
            message.error('查询数据失败！');
            this.setState({ 
                inquiryLoading: false,
                YwryTabLoading: false,
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
        this.handleGetYlry(data);

        this.setState({
            inquiryData:data,
            inquiryLoading: true,
            YwryTabLoading: true,
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
            { title: '姓名', dataIndex: 'xm', key: 'xm'}, 
            { title: '性别', dataIndex: 'xb', key: 'xb',render:(test)=> test == '342' ? '女':'男'}, 
            // { title: '名族', dataIndex: 'mz', key: 'mz'},
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
                let postData = this._this.state.inquiryData;
                postData.pageSize = this._this.state.pageSize;
                postData.pageNum = current;
                this._this.handleGetYlry(postData)
                this._this.setState({
                    YwryTabLoading: true
                })
            },
        };


        return(
            <div>  
                <div className="formBox">
                    <div className="formTitle">
                        医务人员查询
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
                        dataSource={this.state.YwryDataSource}
                        className="table"
                        loading={this.state.YwryTabLoading}
                        pagination={pagination} />
                </div>
            </div>
        )
    }
}

Ywrycx = Form.create()(Ywrycx);

export default Ywrycx;


