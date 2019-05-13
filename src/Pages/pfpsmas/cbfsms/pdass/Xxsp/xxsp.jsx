import React from 'react';
import { hashHistory, Link } from "react-router";

import { Form, Button, Row, Col, Select, Cascader, Table, Input, DatePicker, Modal, Tabs } from 'antd';

import './xxsp.css'

const FormItem = Form.Item;
const Option = Select.Option;

class Xxsp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleTable: 'none',//查询出Table
            visibleInformationTable: 'none',//详细信息

            tableList: [
                {
                    zt: '张三',
                    cjsj: '2019-5-10',
                    jzrq: '2019-5-10'
                }
            ],

            tableInformationList: [
                {
                    fqxm: '父亲',
                    mqxm: '母亲',
                    xsjfsj: '2019-5-10'
                }
            ],


        }
    }

    // 查询
    handleSubmit() {
        this.setState({
            visibleTable: 'block'
        })
    }

    // 对XX审批
    nameApproval() {
        this.setState({
            visibleInformationTable: 'block',
            visibleTable: 'none'
        })
    }
    // 审批
    sp(){
        this.setState({
            visibleInformationTable: 'none',
            visibleTable: 'block'
        })
    }

    render() {
        const columns = [
            {
                title: '主题',
                dataIndex: 'zt',
                key: 'zt',
                width: '150',
                render: (text) => (
                    <a href="javascript:;" onClick={this.nameApproval.bind(this)}>对{text}退出申请进行审批</a>
                )
            },
            {
                title: '创建时间',
                dataIndex: 'cjsj',
                key: 'cjsj',
                width: '150',
            }, {
                title: '截止日期',
                dataIndex: 'jzrq',
                key: 'jzrq',
                width: '150',
            },

        ]

        const columnsInformation = [
            {
                title: '父亲姓名',
                dataIndex: 'fqxm',
                key: 'fqxm',
                width: '150',
            }, {
                title: '母亲姓名',
                dataIndex: 'mqxm',
                key: 'mqxm',
                width: '150',
            }, {
                title: '享受奖扶时间',
                dataIndex: 'xsjfsj',
                key: 'xsjfsj',
                width: '150',
            }, {
                title: '操作',
                dataIndex: 'cz',
                key: 'cz',
                width: '150',
                render: (text) => <a href="javascript:;" onClick={this.sp.bind(this)}>审批</a>,
            },
        ]

        const { getFieldProps } = this.props.form;

        return (
            <div className="xxsp">
                {/* 查询条件 */}
                <div
                    className="formConten margin-top-20">
                    <Form className="ant-advanced-search-form" >
                        <Row type="flex" justify="center">
                            <Col span={6}>
                                <FormItem
                                    label="紧急程度"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 14 }}
                                    hasFeedback
                                >
                                    <Select
                                        {...getFieldProps('jjcd')}
                                    >
                                        <Option value="0">紧急</Option>
                                        <Option value="1">快到期</Option>
                                        <Option value="2">过期</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span={6} offset={1}>
                                <FormItem
                                    wrapperCol={{ span: 14 }}
                                    hasFeedback
                                >
                                    <Select
                                        {...getFieldProps('mhcx')}
                                    >
                                        <Option value="0">模糊查询</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span={6} offset={1}>
                                <Button type="primary" onClick={this.handleSubmit.bind(this)} >查询</Button>
                            </Col>
                        </Row>

                    </Form>
                </div>

                {/* 查询出Table */}
                <div
                    style={{ 'display': this.state.visibleTable }}>
                    <Table columns={columns} dataSource={this.state.tableList} pagination={{ pageSize: 5 }} />
                </div>

                {/* 详细信息 */}
                <div
                    style={{ 'display': this.state.visibleInformationTable }}>
                    <Table columns={columnsInformation} dataSource={this.state.tableInformationList} pagination={{ pageSize: 5 }} />
                </div>
            </div>
        )
    }

}
Xxsp = Form.create()(Xxsp);
export default Xxsp;