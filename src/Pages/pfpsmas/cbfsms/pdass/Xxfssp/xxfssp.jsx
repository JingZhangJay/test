import React from 'react';
import { hashHistory, Link } from "react-router";

import { Form, Button, Row, Col, Select, Cascader, Table, Input, DatePicker, Modal, Tabs } from 'antd';

import './xxfssp.css'

import { getQueryFamily } from '../../../../../Service/pfpsmas/cbfsms/server';

import { openNotificationWithIcon } from "../../../../../asset/pfpsmas/zcms/js/common";

const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;


class Xxfssp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleTable: 'none',//点击查询后的
            tableList: [
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
            visibleTable: 'block',
        })
    }

    // 发送审批
    fssp() {

    }

    // 取消
    qx() {
       
    }


    render() {
        const columns = [
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
                render: (text) =>
                    (
                        <span>
                            <a href="javascript:;" onClick={this.fssp.bind(this)}>发送审批</a>
                            <span className="ant-divider"></span>
                            <a href="javascript:;" onClick={this.qx.bind(this)}>取消</a>
                        </span>
                    ),
            },
        ]


        return (
            <div className="xxfssp">
                {/* 查询 */}
                <div className="formQuery">
                    <Form className="ant-advanced-search-form" >
                        <Row>
                            <FormItem span={24}
                                // wrapperCol={{ span: 18 }}
                                hasFeedback
                            >
                                <Col span={18} offset={1}>
                                    {/* <SelectGroup sign="xzqhAllSix" offset='1' {...getFieldProps('afdd')} handleZoningCode={this.handleZoningCode.bind(this)} >
                                    </SelectGroup> */}
                                </Col>
                                <Col span={3} offset={1}>
                                    <Button type="primary" htmlType="submit"
                                        onClick={this.handleSubmit.bind(this)}>查询
                                    </Button>
                                </Col>
                            </FormItem>
                        </Row>
                    </Form>
                </div>

                {/* 查询出Table */}
                <div className="formTable">
                    <Table
                        columns={columns}
                        dataSource={this.state.tableList}
                        pagination={{ pageSize: 5 }}
                        style={{ 'display': this.state.visibleTable }}
                    />
                </div>
            </div>
        )
    }


}
Xxfssp = Form.create()(Xxfssp);
export default Xxfssp;