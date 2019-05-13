import React from 'react';
import { hashHistory, Link } from "react-router";

import { Form, Button, Row, Col, Select, Cascader, Table, Input, DatePicker, Modal, Tabs } from 'antd';

import { SelectGroup } from "../../../../../Components/index";

import './rsira.css'

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class Rsira extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleTabs: 'none',//Tabs
            visibleTable: 'none',//Table
            visibleInformationTable: 'none',//家庭户信息Table

            // Tabs
            panes: [],
            activeKey: '',

            tableList: [
                {
                    dq: '深州市',
                    snfzjt: '100',
                    qrfzjt: '200',
                    qcfzjt: '300'
                }
            ],

            tableList2: [
                {
                    dq: '衡水市',
                    snfzjt: '1',
                    qrfzjt: '1',
                    qcfzjt: '1'
                }
            ],

            tableInformationList: [
                {
                    fqxm: '父亲',
                    fqsfzh: '111',
                    mqxm: '母亲',
                    mqsfzh: '222'
                }
            ]

        }
    }

    // 区划下拉框的 Value
    handleZoningCode(e, test) {
        this.props.form.setFieldsValue({
            [test]: e
        })
    }

    //查询
    handleSubmit() {
        let postData = {};
        postData.pageNum = '1';
        postData.pageSize = '10';
        this.setState({
            visibleTabs: 'block',
            visibleTable: 'block'
        })

        // this.handleGetCaseInfoList(postData);
        this.tabsAdd();
    }

    // 已结案件列表查询 请求
    // handleGetCaseInfoList() {
    //     // let data = await getCaseInfoList(parent);
    //     this.setState({
    //         tableList: [
    //             {
    //                 ajbh: '1',
    //                 ajdd: 'zz'
    //             },
    //             {
    //                 ajbh: '2',
    //                 ajdd: 'zz'
    //             }
    //         ],
    //     })
    // }

    tabsAdd() {
        this.newTabIndex = 0;
        // const panes = [
        //     {
        //         title: '村',
        //         key: '5',
        //         content: '',

        //     },
        // ]
        this.setState({
            panes: panes,
            activeKey: panes[0].key
        })
    }

    onChangeTabs(activeKey) {
        this.setState({ activeKey })
    }

    onEdit(targetKey, action) {
        this[action](targetKey)
    }

    add() {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({
            title: '家庭户',
            key: activeKey,
        });
        this.setState({
            panes,
            activeKey,
        });
    }

    remove(targetKey) {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        })

        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey })
    }

    // 显示家庭户信息
    information() {
        this.setState({
            visibleInformationTable: 'block',
            visibleTable: 'none'
        })
    }

    //家庭户信息 返回
    handleInformationSubmit() {
        this.setState({
            visibleInformationTable: 'none',
            visibleTable: 'block'
        })
    }

    // 家庭户信息 维护按钮
    weihu() {

    }

    render() {
        const columns = [
            {
                title: '地区',
                dataIndex: 'dq',
                key: 'dq',
                width: '150',
                render: (text) => <a href="javascript:;" onClick={this.add.bind(this)}>{text}</a>,
            },
            {
                title: '上年扶助家庭',
                dataIndex: 'snfzjt',
                key: 'snfzjt',
                width: '150',
                // render: (text) => <a href="javascript:;" onClick={this.information.bind(this)}>{text}</a>,
            },
            {
                title: '迁入扶助家庭',
                dataIndex: 'qrfzjt',
                key: 'qrfzjt',
                width: '150',
                // render: (text) => <a href="javascript:;" onClick={this.information.bind(this)}>{text}</a>,
            },
            {
                title: '迁出扶助家庭',
                dataIndex: 'qcfzjt',
                key: 'qcfzjt',
                width: '150',
                // render: (text) => <a href="javascript:;" onClick={this.information.bind(this)}>{text}</a>,
            }
        ]

        const columnsInformation = [
            {
                title: '父亲姓名',
                dataIndex: 'fqxm',
                key: 'fqxm',
                width: '150',
            }, {
                title: '父亲身份证号',
                dataIndex: 'fqsfzh',
                key: 'fqsfzh',
                width: '150',
            }, {
                title: '母亲姓名',
                dataIndex: 'mqxm',
                key: 'mqxm',
                width: '150',
            }, {
                title: '母亲身份证号',
                dataIndex: 'mqsfzh',
                key: 'mqsfzh',
                width: '150',
            }, {
                title: '操作',
                dataIndex: 'cz',
                key: 'cz',
                width: '150',
                render: () => <a href="javascript:;" onClick={this.weihu.bind(this)}>维护</a>,
            }
        ]

        const { getFieldProps } = this.props.form;

        return (
            <div className="rsira">
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
                <div className="queryResults">
                    <Tabs defaultActiveKey="1" className="ssiraTabs"
                        // onChange={this.onChangeTabs.bind(this)}
                        // activeKey={this.state.activeKey}
                        // type="editable-card"
                        // onEdit={this.onEdit.bind(this)}
                        style={{ 'display': this.state.visibleTabs }}
                    >
                        <TabPane tab='村' key='1'>
                            <Table
                                columns={columns}
                                dataSource={this.state.tableList}
                                pagination={{ pageSize: 5 }}
                                style={{ 'display': this.state.visibleTable }}
                            />
                        </TabPane>
                        {this.state.panes.map(pane =>
                            <TabPane tab={pane.title} key={pane.key}>
                                {/* {pane.content} */}
                                <Table
                                    columns={columns}
                                    dataSource={this.state.tableList2}
                                    pagination={{ pageSize: 5 }}
                                    style={{ 'display': this.state.visibleTable }}
                                />

                            </TabPane>
                        )}
                    </Tabs>

                </div>
                <div className="queryInformation" style={{ 'display': this.state.visibleInformationTable }}>
                    <Table
                        columns={columnsInformation}
                        dataSource={this.state.tableInformationList}
                        pagination={{ pageSize: 5 }}

                    />
                    <Col span={2} offset={10}>
                        <Button type="primary"
                            onClick={this.handleInformationSubmit.bind(this)}>返回</Button>
                    </Col>
                </div>
            </div>
        )
    }

}
Rsira = Form.create()(Rsira);
export default Rsira;