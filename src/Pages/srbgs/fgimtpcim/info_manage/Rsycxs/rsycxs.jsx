import React from 'react';
import {Form,Row,Col,Button,DatePicker,Cascader,Table,Radio,Select} from 'antd';
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group

require('./rsycxs.css');

const tableData =  [{
    key: '1',
    name: '育妇名称',
    date1: '末次月经日期',
    date2: '妊娠终止日期',
    PregnancyOutcome:'妊娠结果',
    place:'终止地点',
    remarks:'WIS备注',
    BuildCard:'建卡地',
    CreationTime:'创建时间',
    refreshTime:'更新时间',
}   ];


class Rsycxs extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            options : [{
                value: 'zhejiang',
                label: '浙江',
                children: [{
                    value: 'hangzhou',
                    label: '杭州',
                    children: [{
                        value: 'xihu',
                        label: '西湖',
                    }],
                }],
            }, {
                value: 'jiangsu',
                label: '江苏',
                children: [{
                    value: 'nanjing',
                    label: '南京',
                    children: [{
                        value: 'zhonghuamen',
                        label: '中华门',
                    }],
                }],
            }]
        }

    }


    render(){
        const columns = [{
            title: '育妇名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '末次月经日期',
            dataIndex: 'date1',
            key: 'date1',
        }, {
            title: '妊娠终止日期',
            dataIndex: 'date2',
            key: 'date2',
        },{
            title: '妊娠结果',
            dataIndex: 'PregnancyOutcome',
            key: 'PregnancyOutcome',
        },{
            title: '终止地点',
            dataIndex: 'place',
            key: 'place',
        },{
            title: 'WIS备注',
            dataIndex: 'remarks',
            key: 'remarks',
        },{
            title: '建卡地',
            dataIndex: 'BuildCard',
            key: 'BuildCard',
        },{
            title: '创建时间',
            dataIndex: 'CreationTime',
            key: 'CreationTime',
        },{
            title: '更新时间',
            dataIndex: 'refreshTime',
            key: 'refreshTime',
        },{
            title: '操作',
            dataIndex: '',
            key: '',
            render:()=>{
                <a href="javascript:;">处理</a>
            }
        }];

        return(
            <div>
                <div className="formBox">
                    <div className="formTitle">
                        妊娠异常消失
                    </div>
                    <div className="formConten">
                        <Form horizontal className="ant-advanced-search-form">
                            <Row gutter={16}>
                                <Col sm={2}></Col>
                                <Col sm={9}>
                                    <FormItem
                                        label="妊娠终止日期"
                                        labelCol={{ span: 9 }}
                                        wrapperCol={{ span: 14 }}
                                        hasFeedback
                                    >
                                        <RangePicker/>
                                    </FormItem>
                                    <FormItem
                                        label="管理地"
                                        labelCol={{ span: 9 }}
                                        wrapperCol={{ span: 14 }}
                                        hasFeedback
                                        help
                                    >
                                        <Cascader options={this.state.options} placeholder="请选择地区" />
                                    </FormItem>

                                </Col>
                                <Col sm={9}>
                                    <FormItem
                                        label="末次月经日期"
                                        labelCol={{ span: 9 }}
                                        wrapperCol={{ span: 14 }}
                                        hasFeedback
                                    >
                                        <RangePicker />
                                    </FormItem>

                                    <FormItem
                                        label="处理状态"
                                        labelCol={{ span: 9 }}
                                        wrapperCol={{ span: 14 }}
                                        hasFeedback
                                    >
                                        <Select>
                                            <Option value="请选择">未处理</Option>
                                            <Option value="已处理">已处理</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col sm={1}></Col>
                            </Row>
                            <Row>
                                <Col span={12} offset={12} style={{ textAlign: 'right' }}>
                                    <Button type="primary" htmlType="submit">查询</Button>
                                    <Button>导出</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
                <div className="queryResults">
                    <Table  columns={columns}
                            dataSource={tableData}
                            className="table"/>
                </div>
            </div>
        )
    }
}

Rsycxs = Form.create()(Rsycxs);

export default Rsycxs;