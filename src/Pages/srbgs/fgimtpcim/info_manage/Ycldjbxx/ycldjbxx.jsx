import React from 'react';
import {Form,Button,DatePicker,Cascader,Table,Row,Col, message} from 'antd'; 
import { parseTime } from '../../../../../asset/srbgs/js/common';
import { SelectGroup } from "../../../../../Components/index"
import { getSelectProcessedJbxx } from "../../../../../Service/srbgs/fgimtpcim/server"
import axios from "axios";
const FormItem = Form.Item;

require('./ycldjbxx.css');

class Ycldjbxx extends React.Component{
    constructor(props){
        super(props);
        this.state={ 
            ycldjbxxLoading: false,
            ycldjbxxTabData:[],
            handelLoading: false,
        }
    }
    
    // 查询已经下发的举报消息  请求
    async handelGetSelectProcessedJbxx(params){
        let data = await getSelectProcessedJbxx(params);
        console.log(data)
        if(data.code == '000000'){
            this.setState({
                ycldjbxxTabData: data.responseData.dataList,
                ycldjbxxLoading: false,
                handelLoading: false,
            })
        }else{
            message.error('请求数据失败！');
            this.setState({ 
                ycldjbxxLoading: false,
                handelLoading: false,
            })
        }
    }

    // 查询已经下发的举报消息
    handel(text){
        let data;
        this.props.form.validateFields((error,values)=>{
            console.log(values.xzqh)
            data = {
                start: parseTime(values.start),
                end: parseTime(values.end),
                xzqh: values.xzqh,
            }
        })

        if(text == 'inquiry'){
            data.pageNum = '1';
            data.pageSize = '10';
            this.setState({
                handelLoading: true,
                ycldjbxxLoading:true,
            }) 
            this.handelGetSelectProcessedJbxx(data)
        }else if(text == 'export'){  
            window.location.href = axios.defaults.baseURL +'/xxgl/action/export?xzqh='+data.xzqh+
            '&start='+data.start+
            '&end='+data.end
        }
    }

    // 区划下拉框的 Value
    handleZoningCode(test,e){
        console.log(test, e);
        for(var key in e) {
            if (key == "xzqhOnly") {
                this.props.form.setFieldsValue({
                    "xzqh": e[key]
                })
            }
        }
    }

    render(){
        const { getFieldProps } = this.props.form;
        const columns = [{
            title: '编号',
            dataIndex: 'number',
            key: 'number',
        }, {
            title: '信息名称',
            dataIndex: 'xxmc',
            key: 'xxmc',
        }, {
            title: '案件性质',
            dataIndex: 'ajxz',
            key: 'ajxz',
        },{
            title: '举报时间',
            dataIndex: 'time',
            key: 'time',
        },{
            title: '案发地',
            dataIndex: 'afdd_mc',
            key: 'afdd_mc',
        },{
            title: '联系电话',
            dataIndex: 'lxdh',
            key: 'lxdh',
        },{
            title: '联系地址',
            dataIndex: 'lxdz',
            key: 'lxdz',
        },{
            title: '处理结果',
            dataIndex: 'cljg',
            key: 'cljg',
        }];

        const disabledDate = function (current) {
            return current && current.getTime() > Date.now();
        };

        return(
            <div>
                <div className="formBox">
                    <div className="formTitle">
                        已处理的举报信息
                    </div>
                    <div className="formConten">
                        <Form  horizontal className="ant-advanced-search-form" >
                            <Row>
                                <Col sm={1}></Col>
                                <Col sm={10}>
                                    <FormItem label="处理时间"  labelCol={{ span: 6 }}>
                                    <Col span="8">
                                            <FormItem >
                                                <DatePicker {...getFieldProps('start')}  disabledDate={disabledDate}  />
                                            </FormItem>
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8">
                                            <FormItem>
                                                <DatePicker {...getFieldProps('end')}  disabledDate={disabledDate} />
                                            </FormItem>
                                        </Col>
                                    </FormItem>
                                </Col>
                                <Col sm={10}>
                                    <FormItem label="接收单位"  labelCol={{ span: 6 }}  wrapperCol={{ span: 18 }}> 
                                      <SelectGroup  sign="xzqhOnly"  {...getFieldProps('xzqh')}  handleZoningCode={this.handleZoningCode.bind(this,'xzqhOnly')}> </SelectGroup>
                                    </FormItem>
                                </Col>
                                <Col sm={1}></Col>
                            </Row>
                            <Row>
                                <Col span={12} offset={12} style={{ textAlign: 'right' }}>
                                    <Button  type="primary" htmlType="submit" onClick={this.handel.bind(this,'inquiry')} loading={this.state.handelLoading} >查询</Button>
                                    <Button onClick={this.handel.bind(this,'export')}>导出</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
                <div className="queryResults">
                    <Table columns={columns}
                           dataSource={this.state.ycldjbxxTabData}
                           className="table"
                           loading={this.state.ycldjbxxLoading}
                           pagination = {{pageSize:5}}
                    />
                </div>
            </div>
        )
    }
}

Ycldjbxx = Form.create()(Ycldjbxx);

export default Ycldjbxx;