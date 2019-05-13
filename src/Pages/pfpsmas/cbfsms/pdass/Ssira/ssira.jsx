import React from 'react';
import { hashHistory, Link } from "react-router";

import { Form, Button, Row, Col, Select, Cascader, Table, Input, DatePicker, Modal, Tabs } from 'antd';

import './ssira.css'

import { getQueryFamily } from '../../../../../Service/pfpsmas/cbfsms/server';

import { openNotificationWithIcon } from "../../../../../asset/pfpsmas/zcms/js/common";

const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;


class Ssira extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: 'none',//家庭户
            visibleXxxx: 'none',//家庭户详细信息
            SignOutToggle: false,//个案退出
            addedChildToggle: false,  //新增孩子Modal
            fatherDisabled: false,//选择孩子与父亲的关系 
            motherDisabled: false,//选择孩子与母亲的关系
            childAdoptDateDisabled: false,//孩子抱养日期

            changeFatherToggle: false,//修改父亲信息Modal
            changeMotherToggle: false,//修改母亲信息Modal
            changeChildToggle: false,//修改孩子信息Modal


            tableList: [],//家庭户Table
            childListFatherTable: [],//父亲详细信息 孩子Table
            childListMotherTable: [],//母亲详细信息 孩子Table
            childListChildTable: [],//孩子详细信息 孩子Table

            personName: '',//姓名
            personIdentityNumber: '',//证件号码
            standardId: '',//扶助标准
            childName: '',//孩子姓名
            childGender: '',//孩子性别
            childBirthdate: '',//孩子出生日期
            hc: '',//孩次


        }
    }

    // 区划下拉框的 Value
    handleZoningCode(e, test) {
        this.props.form.setFieldsValue({
            [test]: e
        })
    }

    /**
      * 查询
      * @param personName — 姓名
      * @param personIdentityNumber — 证件号码
    */
    handleSubmit() {
        let postData = {};

        let { personName, personIdentityNumber } = this.state;
        postData.personName = this.props.form.getFieldsValue().personName;
        postData.personIdentityNumber = this.props.form.getFieldsValue().personIdentityNumber;

        // this.handleGetQueryFamily(postData);
        this.setState({
            visible: 'block',
            visibleXxxx: 'none',
            tableList: [
                {
                    personName: '张三',
                    personIdentityNumber: '111',
                    personName2: '李四',
                    personIdentityNumber2: '222',
                    childName: '嗯嗯',
                    childGender: '1',
                    personBirthdate: '1995-8-18',
                    standardId: '1',
                    hc: '2'
                }
            ]
        })

    }
    /**
      * 查询
      * @param personName — 父亲姓名
      * @param personIdentityNumber — 父亲证件号码
      * @param personName — 母亲姓名
      * @param personIdentityNumber — 母亲证件号码
      * @param childName — 孩子姓名
      * @param childGender — 孩子性别
      * @param personBirthdate — 孩子出生日期
      * @param hc — 孩次
      * @param standardId — 扶助标准
    */

    async handleGetQueryFamily(params) {
        // let { dataObject: { mother: { childName, childGender, childBirthdate }, personName, personZoningCode } } = await getQueryFamily(params);
        let res = await getQueryFamily(params);

        if (res.status == "200") {
            let arr = [];
            let childrenArr = [];
            for (var i in res.dataObject) {
                arr.push(res.dataObject[i]);
            }
            console.log('arr--->', arr)
            childrenArr = arr.concat(arr[0].childList);

            console.log('childrenArr---->', childrenArr)
            this.setState({
                tableList: childrenArr,

            })
        } else {
            openNotificationWithIcon("error", res.rtnMessage);
        }


    }

    // 详细信息
    handleSubmitXxxx() {
        let postData = {};
        // postData.pageNum = '1';
        // postData.pageSize = '10';
        this.setState({
            visible: 'none',
            visibleXxxx: 'block',
            childListFatherTable: [
                {
                    childName: '嗯',
                    childGender: '0',
                    childBirthDate: '1995-8-18',
                    childAdoptDate: '1995-8-18',
                    childDeathDate: '1995-8-18',
                    childZoningCode: '340000',
                    childFatherRelationship: '1',
                    childMotherRelationship: '1',
                }
            ],
            childListMotherTable: [
                {
                    childName: '嗯嗯',
                    childGender: '0',
                    childBirthDate: '1995-8-18',
                    childAdoptDate: '1995-8-18',
                    childDeathDate: '1995-8-18',
                    childZoningCode: '340000',
                    childFatherRelationship: '1',
                    childMotherRelationship: '1',
                }
            ],
            childListChildTable: [
                {
                    childName: '嗯嗯嗯',
                    childGender: '0',
                    childBirthDate: '1995-8-18',
                    childAdoptDate: '1995-8-18',
                    childDeathDate: '1995-8-18',
                    childZoningCode: '340000',
                    childFatherRelationship: '1',
                    childMotherRelationship: '1',
                }
            ],

        })

        // this.handleGetCaseInfoListXxxx(postData);
    }

    handleGetCaseInfoListXxxx() {
        // let data = await getCaseInfoList(parent);

    }

    // 详细信息页面 返回按钮
    handleBack() {
        this.setState({
            visible: 'block',
            visibleXxxx: 'none',
        })
    }

    // 点击修改
    handleChange() {
        this.setState({
            visibleXxxx: 'none',
        })
    }

    // 修改页面 确定
    handleOk() {
        this.setState({
            visibleXxxx: 'block',
        })
    }

    // 修改页面 取消
    handleChangeCancel() {
        this.setState({
            visibleXxxx: 'block',
            changeToggle: false
        })
    }

    //修改页面 个案退出
    handleSignOut() {
        this.setState({
            SignOutToggle: true
        })
    }

    //个案退出 确定
    handleSignOutOk() {
        this.setState({
            SignOutToggle: false
        })
    }

    //个案退出 取消
    handleSignOutCancel() {
        this.setState({
            SignOutToggle: false
        })
    }

    // 新增孩子
    addedChild(sign, date, dateStr) {
        this.setState({
            addedChildToggle: true,
            // [sign]: dateStr
        }, () => {
            // console.log(this.state.childBirthDate, this.state.childAdoptDate, this.state.childDeathDate)
        })
    }

    // 新增页面'确定' 提交表单
    handleChildSubmit() {
        let postDataObj = {};
        let { childName, childGender, childBirthDate, childAdoptDate, childDeathDate, childFatherRelationship, childMotherRelationship, childZoningCode } = this.state;
        childName = this.props.form.getFieldsValue().childName;
        childGender = this.props.form.getFieldsValue().childGender;
        childZoningCode = this.props.form.getFieldsValue().childZoningCode;
        postDataObj.childName = childName;
        postDataObj.childGender = childGender;
        postDataObj.childBirthDate = childBirthDate;
        postDataObj.childAdoptDate = childAdoptDate;
        postDataObj.childDeathDate = childDeathDate;
        postDataObj.childFatherRelationship = childFatherRelationship;
        postDataObj.childMotherRelationship = childMotherRelationship;
        postDataObj.childZoningCode = childZoningCode;


        // this.axiosCreateFamily(postDataObj);

        this.props.form.resetFields();

        this.setState({
            childToggle: false
        })

        if (childName == null || childGender == null || childBirthDate == null) {
            openNotificationWithIcon("error", "姓名、性别、出生日期不能为空");
            this.setState({
                childToggle: true
            })
        }
        if (childFatherRelationship == "" && childMotherRelationship == "") {
            openNotificationWithIcon("error", "与父亲的关系、与母亲的关系不能同时为空");
            this.setState({
                childToggle: true
            })
        }

    }

    /**
     * 添加孩子
     * @param childName — 姓名
     * @param childGender — 性别
     * @param childBirthdate — 出生日期
     * @param childAdoptDate — 抱养日期
     * @param childDeathDate — 死亡日期
     * @param childFatherRelationship — 与父亲关系
     * @param childMotherRelationship — 与母亲关系
     * @param childZoningCode — 家庭住址
     */
    async axiosCreateFamily(params) {
        let res = await getCreateFamily(params);
        console.log('数据-->', res)


        // let data = res.responseData.dataList;
        // if (res.rtnCode == "000000") {
        // this.setState({
        //     requestList: res.responseData.dataList
        // })

        // } else {
        // openNotificationWithIcon("error", res.rtnMessage);
        // }
        this.props.form.resetFields();
    }

    // 新增页面'取消'
    handleChildCancel() {
        this.setState({
            addedChildToggle: false
        })
        this.props.form.resetFields();
    }

    onChangeTime(sign, date, dateStr) {
        this.setState({
            [sign]: dateStr
        }, () => {
            // console.log(this.state.childBirthDate, this.state.childAdoptDate, this.state.childDeathDate)
        })
    }

    // 父亲与孩子关系
    childFatherRelationshipProps(value) {
        if (value == '1') {
            // if (childAdoptDate == '') {
            //     openNotificationWithIcon("error", "抱养日期不能为空");
            //     this.setState({
            //         childToggle: true
            //     })
            // }
            this.setState({
                childAdoptDateDisabled: false
            })
        } else {
            this.setState({
                childAdoptDateDisabled: true
            })
        }
    }

    handleChildFatherRelationship(e) {
        this.setState({
            childFatherRelationship: e
        })
    }

    // 母亲与孩子关系
    childMotherRelationshipProps(value) {
        if (value == '1') {
            // if (childAdoptDate == '') {
            //     openNotificationWithIcon("error", "抱养日期不能为空");
            //     this.setState({
            //         childToggle: true
            //     })
            // }
            this.setState({
                childAdoptDateDisabled: false
            })
        } else {
            this.setState({
                childAdoptDateDisabled: true
            })
        }
    }

    // 与母亲关系 select
    handleChildMotherRelationship(e) {
        this.setState({
            childMotherRelationship: e
        })
    }

    //点击修改父亲信息
    handleChangFatherContent() {
        this.setState({
            changeFatherToggle: true
        })
    }

    // 修改父亲信息 确定按钮
    handleChangeFatherOk() {
        this.setState({
            changeFatherToggle: false
        })
    }

    // 修改父亲信息 取消按钮
    handleChangeFatherCancel() {
        this.setState({
            changeFatherToggle: false
        })
    }

    //点击修改母亲信息
    handleChangMotherContent() {
        this.setState({
            changeMotherToggle: true
        })
    }

    // 修改母亲信息 确定按钮
    handleChangeMotherOk() {
        this.setState({
            changeMotherToggle: false
        })
    }

    // 修改母亲信息 取消按钮
    handleChangeMotherCancel() {
        this.setState({
            changeMotherToggle: false
        })
    }

    //点击修改孩子信息
    handleChangChildContent() {
        this.setState({
            changeChildToggle: true
        })
    }

    // 修改孩子信息 确定按钮
    handleChangeChildOk() {
        this.setState({
            changeChildToggle: false
        })
    }

    // 修改孩子信息 取消按钮
    handleChangeChildCancel() {
        this.setState({
            changeChildToggle: false
        })
    }


    render() {

        const columns = [
            {
                title: '父亲姓名',
                dataIndex: 'personName',
                key: 'personName',
                width: '150'
            }, {
                title: '父亲证件号码',
                dataIndex: 'personIdentityNumber',
                key: 'personIdentityNumber',
                width: '150'
            }, {
                title: '母亲姓名',
                dataIndex: 'personName2',
                key: 'personName2',
                width: '150'
            }, {
                title: '母亲证件号码',
                dataIndex: 'personIdentityNumber2',
                key: 'personIdentityNumber2',
                width: '150'
            }, {
                title: '孩次',
                dataIndex: 'hc',
                key: '',
                width: '150'
            }, {
                title: '扶助标准',
                dataIndex: 'standardId',
                key: 'standardId',
                width: '150'
            },
            {
                title: '操作',
                key: 'operation',
                width: '150',
                render: () => (
                    <span>
                        <a href="javascript:;" onClick={this.handleSubmitXxxx.bind(this)}>详细信息</a>
                    </span>
                )
            }
        ]
        
        const columnsChild = [
            {
                title: '姓名',
                dataIndex: 'childName',
                key: 'childName',
                width: '150'
            }, {
                title: '性别',
                dataIndex: 'childGender',
                key: 'childGender',
                width: '150'
            }, {
                title: '出生日期',
                dataIndex: 'childBirthDate',
                key: 'childBirthDate',
                width: '150'
            }, {
                title: '与父亲的关系',
                dataIndex: 'childFatherRelationship',
                key: 'childFatherRelationship',
                width: '150'
            }, {
                title: '与母亲的关系',
                dataIndex: 'childMotherRelationship',
                key: 'childMotherRelationship',
                width: '150'
            }, {
                title: '抱养日期',
                dataIndex: 'childAdoptDate',
                key: 'childAdoptDate',
                width: '150'
            }, {
                title: '死亡日期',
                dataIndex: 'childDeathDate',
                key: 'childDeathDate',
                width: '150'
            }, {
                title: '家庭住址',
                dataIndex: 'childZoningCode',
                key: 'childZoningCode',
                width: '150'
            }, {
                title: '操作',
                key: 'operation',
                width: '150',
                render: () => (
                    <span>
                        <a href="javascript:;" onClick={this.handleChangChildContent.bind(this)}>修改</a>
                    </span>
                )
            }
        ]

        const { getFieldProps } = this.props.form;

        const formItemCol = {
            labelCol: { span: 8 },
            wrapperCol: { span: 5, offset: 1 }
        };
        const formItemColXg = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 }
        }

        // const DefaultValue = getFieldProps('fatherIdentityType',
        //     { initialValue: '0' || undefined }
        // );

        return (
            <div className="ssira">
                {/* 查询条件 */}
                <div className="formConten margin-top-20">
                    <Form className="ant-advanced-search-form" >
                        <Row type="flex" justify="center">
                            <Col span={6}>
                                <FormItem
                                    label="姓名"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 14 }}
                                    hasFeedback
                                >
                                    <Input size="default" placeholder="请输入姓名"
                                        {...getFieldProps('personName')} />
                                </FormItem>
                            </Col>
                            <Col span={6}>
                                <FormItem
                                    label="证件号码"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 14 }}
                                    hasFeedback
                                >
                                    <Input size="default" placeholder="请输入证件号码"
                                        {...getFieldProps('personIdentityNumber')} />
                                </FormItem>
                            </Col>
                            <Col span={6} offset={1}>
                                <Button type="primary" onClick={this.handleSubmit.bind(this)} >查询</Button>
                            </Col>
                        </Row>

                    </Form>
                </div>

                <div className="main-outer-container">
                    <div className="main-inner-container">
                        <div className="main-scroll-content">

                            {/* 家庭户 */}
                            <div
                                style={{ 'display': this.state.visible }}>
                                <Table columns={columns} dataSource={this.state.tableList} pagination={{ pageSize: 5 }} />
                            </div>

                            {/* 家庭户详细信息 */}
                            <div
                                className="margin-top-20" style={{ 'display': this.state.visibleXxxx }}>
                                <Tabs defaultActiveKey="1" className="ssiraTabs">
                                    <TabPane tab="父亲信息" key="1">
                                        <div className="fatherContent">
                                            <Form className="ant-advanced-search-form">
                                                <Row type="flex" justify="center">
                                                    <Col span={18} >
                                                        <FormItem
                                                            {...formItemCol}
                                                            label="姓名"
                                                            hasFeedback
                                                            required
                                                        >
                                                            <Input
                                                                placeholder="请输入姓名"
                                                                {...getFieldProps('fatherName')}
                                                            />
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                                <Row type="flex" justify="center">
                                                    <Col span={18} >
                                                        <FormItem
                                                            {...formItemCol}
                                                            label="证件类型"
                                                            required
                                                        >
                                                            <Select {...getFieldProps("fatherIdentityType")}>
                                                                <Option value="1">身份证</Option>
                                                                <Option value="2">军官证</Option>
                                                            </Select>
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                                <Row type="flex" justify="center">
                                                    <Col span={18} >
                                                        <FormItem
                                                            {...formItemCol}
                                                            label="证件号码"
                                                            hasFeedback
                                                            required

                                                        >
                                                            <Input size="default" placeholder="请输入证件号码" {...getFieldProps('fatherIdentityNumber')} />
                                                        </FormItem>
                                                    </Col>
                                                </Row>

                                                <Row type="flex" justify="center">
                                                    <Col span={18} >
                                                        <FormItem
                                                            {...formItemCol}
                                                            label="性别"
                                                            required
                                                        >
                                                            <Select
                                                                {...getFieldProps('fatherGender')}
                                                            >
                                                                <Option value="0">男</Option>
                                                            </Select>
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                                <Row type="flex" justify="center">
                                                    <Col span={18} >
                                                        <FormItem
                                                            {...formItemCol}
                                                            label="出生日期"
                                                            required
                                                        >
                                                            <DatePicker
                                                                // size='large'
                                                                {...getFieldProps("fatherBirthdate")}
                                                            />
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                                <Row type="flex" justify="center">
                                                    <Col span={18} >
                                                        <FormItem
                                                            {...formItemCol}
                                                            label="联系电话"
                                                            hasFeedback
                                                            required

                                                        >
                                                            <Input placeholder="请输入联系电话" {...getFieldProps('fatherPhone')} />
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                                <Row type="flex" justify="center">
                                                    <Col span={18} >
                                                        <FormItem
                                                            {...formItemCol}
                                                            label="户口性质"
                                                            required
                                                        >
                                                            <Select {...getFieldProps("fatherHkxz")}>
                                                                <Option value="1">农业</Option>
                                                                <Option value="2">非农业</Option>
                                                            </Select>
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                                <Row type="flex" justify="center">
                                                    <Col span={18} >
                                                        <FormItem
                                                            {...formItemCol}
                                                            label="银行账户"
                                                            hasFeedback

                                                        >
                                                            <Input size="default"
                                                                placeholder="请输入银行卡账号"{...getFieldProps('fatherAgencyZoningCode')} />
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                                <Row type="flex" justify="center">
                                                    <Col span={18} >
                                                        <FormItem
                                                            {...formItemCol}
                                                            label="家庭住址"
                                                            required
                                                        >
                                                            <Input size="default" placeholder="省市县乡村" {...getFieldProps("fatherZoningCode")} />
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                            </Form>

                                        </div>
                                        <div className="margin-top-20">
                                            <Table columns={columnsChild} dataSource={this.state.childListFatherTable} />
                                        </div>
                                        <Row>
                                            <Col span={2} offset={8}>
                                                <Button type="primary" onClick={this.handleSignOut.bind(this)} >个案退出</Button>
                                            </Col>
                                            <Col span={2} offset={1}>
                                                <Button type="primary" onClick={this.handleChangFatherContent.bind(this)} >修改信息</Button>
                                            </Col>
                                            <Col span={2} offset={1}>
                                                <Button type="primary" onClick={this.addedChild.bind(this, 'fatherAddChild')} >新增</Button>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tab="母亲信息" key="2">
                                        <div className="motherContent">
                                            <Form className="ant-advanced-search-form" >
                                                <Row type="flex" justify="center">
                                                    <Col span={18} >
                                                        <FormItem
                                                            {...formItemCol}
                                                            label="姓名"
                                                            hasFeedback
                                                            required

                                                        >
                                                            <Input size="default" placeholder="请输入姓名"
                                                                {...getFieldProps('motherName')} />
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                                <Row type="flex" justify="center">
                                                    <Col span={18} >
                                                        <FormItem
                                                            {...formItemCol}
                                                            label="证件类型"
                                                            required
                                                        >
                                                            <Select {...getFieldProps("motherIdentityType")}>
                                                                <Option value="1">身份证</Option>
                                                                <Option value="2">军官证</Option>
                                                            </Select>
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                                <Row type="flex" justify="center">
                                                    <Col span={18} >
                                                        <FormItem
                                                            {...formItemCol}
                                                            label="证件号码"
                                                            hasFeedback
                                                            required

                                                        >
                                                            <Input size="default"
                                                                placeholder="请输入证件号码"{...getFieldProps('motherIdentityNumber')} />
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                                <Row type="flex" justify="center">
                                                    <Col span={18} >
                                                        <FormItem
                                                            {...formItemCol}
                                                            label="性别"
                                                            required
                                                        >
                                                            <Select {...getFieldProps('motherGender')} >
                                                                <Option value="0">女</Option>
                                                            </Select>
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                                <Row type="flex" justify="center">
                                                    <Col span={18} >
                                                        <FormItem
                                                            {...formItemCol}
                                                            label="出生日期"
                                                            required
                                                        >
                                                            <DatePicker
                                                                // value={this.state.startValue}
                                                                // onChange={this.onStartChange.bind(this)}
                                                                // size='large'
                                                                {...getFieldProps("motherBirthdate")}
                                                            />
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                                <Row type="flex" justify="center">
                                                    <Col span={18} >
                                                        <FormItem
                                                            {...formItemCol}
                                                            label="联系电话"
                                                            hasFeedback
                                                            required

                                                        >
                                                            <Input size="default" placeholder="请输入联系电话"
                                                                {...getFieldProps('motherPhone')} />
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                                <Row type="flex" justify="center">
                                                    <Col span={18} >
                                                        <FormItem
                                                            {...formItemCol}
                                                            label="户口性质"
                                                            required
                                                        >
                                                            <Select {...getFieldProps("motherHkxz")}>
                                                                <Option value="1">农业</Option>
                                                                <Option value="2">非农业</Option>
                                                            </Select>
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                                <Row type="flex" justify="center">
                                                    <Col span={18} >
                                                        <FormItem
                                                            {...formItemCol}
                                                            label="银行账户"
                                                            hasFeedback

                                                        >
                                                            <Input size="default"
                                                                placeholder="请输入银行卡账号"{...getFieldProps('motherAgencyZoningCode')} />
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                                <Row type="flex" justify="center">
                                                    <Col span={18} >
                                                        <FormItem
                                                            {...formItemCol}
                                                            label="家庭住址"
                                                            required
                                                        >
                                                            <Input size="default" placeholder="省市县乡村" {...getFieldProps("motherZoningCode")} />
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                            </Form>

                                        </div>
                                        <div className="margin-top-20">
                                            <Table columns={columnsChild} dataSource={this.state.childListMotherTable} />
                                        </div>
                                        <Row>
                                            <Col span={2} offset={8}>
                                                <Button type="primary" onClick={this.handleSignOut.bind(this)} >个案退出</Button>
                                            </Col>
                                            <Col span={2} offset={1}>
                                                <Button type="primary" onClick={this.handleChangMotherContent.bind(this)} >修改信息</Button>
                                            </Col>
                                            <Col span={2} offset={1}>
                                                <Button type="primary" onClick={this.addedChild.bind(this, 'motherAddChild')} >新增</Button>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tab="孩子信息" key="3">

                                        <div className="queryResults" style={{ height: '52.7vh', }}>
                                            <Table columns={columnsChild} dataSource={this.state.childListChildTable} />
                                        </div>
                                        <Col span={2} offset={12}>
                                            <Button type="primary" onClick={this.addedChild.bind(this, 'childAddChild')} >新增</Button>
                                        </Col>
                                    </TabPane>

                                </Tabs>
                                <Row className="margin-top-20">
                                    <Col span={2} offset={12}>
                                        <Button type="primary" onClick={this.handleBack.bind(this)} >返回</Button>
                                    </Col>
                                </Row>
                            </div>

                            {/* 新增孩子 */}
                            <Modal
                                title="新增孩子信息"
                                visible={this.state.addedChildToggle}
                                okText="确定"
                                cancelText="取消"
                                maskClosable={false}
                                onOk={this.handleChildSubmit.bind(this)}
                                onCancel={this.handleChildCancel.bind(this)}
                            >
                                <div className="childContent">
                                    <Form className="ant-advanced-search-form">
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    label="姓名"
                                                    {...formItemColXg}
                                                    hasFeedback
                                                    required
                                                >
                                                    <Input size="default"
                                                        placeholder="请输入姓名"
                                                        // {...childNameProps}
                                                        {...getFieldProps('childName')}
                                                    />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    label="性别"
                                                    {...formItemColXg}
                                                    required
                                                >
                                                    <Select
                                                        {...getFieldProps('childGender')}
                                                    >
                                                        <Option value="0">女</Option>
                                                        <Option value="1">男</Option>
                                                    </Select>
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    label="出生日期"
                                                    {...formItemColXg}
                                                    required
                                                >
                                                    <DatePicker
                                                        size='large'
                                                        value={this.state.childBirthDate}
                                                        onChange={this.onChangeTime.bind(this, "childBirthDate")}
                                                    />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    label="与父亲的关系"
                                                    {...formItemColXg}
                                                >
                                                    <Select
                                                        onSelect={this.childFatherRelationshipProps.bind(this)}
                                                        onChange={this.handleChildFatherRelationship.bind(this)}
                                                        disabled={this.state.fatherDisabled}
                                                    >
                                                        <Option value="0">本人亲生</Option>
                                                        <Option value="1">本人抱养</Option>
                                                        <Option value="2">配偶亲生</Option>
                                                        <Option value="3">配偶抱养</Option>
                                                    </Select>
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    label="与母亲的关系"
                                                    {...formItemColXg}
                                                >
                                                    <Select
                                                        disabled={this.state.motherDisabled}
                                                        onSelect={this.childMotherRelationshipProps.bind(this)}
                                                        onChange={this.handleChildMotherRelationship.bind(this)}
                                                    >
                                                        <Option value="0">本人亲生</Option>
                                                        <Option value="1">本人抱养</Option>
                                                        <Option value="2">配偶亲生</Option>
                                                        <Option value="3">配偶抱养</Option>
                                                    </Select>
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    label="抱养日期"
                                                    {...formItemColXg}
                                                >
                                                    <DatePicker
                                                        size='large'
                                                        value={this.state.childAdoptDate}
                                                        disabled={this.state.childAdoptDateDisabled}
                                                        onChange={this.onChangeTime.bind(this, "childAdoptDate")}
                                                    />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    label="死亡日期"
                                                    {...formItemColXg}
                                                >
                                                    <DatePicker
                                                        size='large'
                                                        value={this.state.childDeathDate}
                                                        onChange={this.onChangeTime.bind(this, "childDeathDate")}
                                                    />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    label="家庭住址"
                                                    {...formItemColXg}
                                                >
                                                    <Input size="default"
                                                        {...getFieldProps("childZoningCode")}
                                                    />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                    </Form>

                                </div>
                            </Modal>

                            {/* 修改父亲信息 */}
                            <Modal
                                title="修改父亲信息"
                                visible={this.state.changeFatherToggle}
                                okText="确定"
                                cancelText="取消"
                                maskClosable={false}
                                onOk={this.handleChangeFatherOk.bind(this)}
                                onCancel={this.handleChangeFatherCancel.bind(this)}
                            >
                                <div className="changeFatherContent">
                                    <Form className="ant-advanced-search-form">
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    {...formItemColXg}
                                                    label="姓名"
                                                    hasFeedback
                                                    required
                                                >
                                                    <Input
                                                        placeholder="请输入姓名"
                                                        {...getFieldProps('fatherName')}
                                                    />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    {...formItemColXg}
                                                    label="证件类型"
                                                    required
                                                >
                                                    <Select {...getFieldProps("fatherIdentityType")}>
                                                        <Option value="1">身份证</Option>
                                                        <Option value="2">军官证</Option>
                                                    </Select>
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    {...formItemColXg}
                                                    label="证件号码"
                                                    hasFeedback
                                                    required

                                                >
                                                    <Input size="default" placeholder="请输入证件号码" {...getFieldProps('fatherIdentityNumber')} />
                                                </FormItem>
                                            </Col>
                                        </Row>

                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    {...formItemColXg}
                                                    label="性别"
                                                    required
                                                >
                                                    <Select
                                                        {...getFieldProps('fatherGender')}
                                                    >
                                                        <Option value="0">男</Option>
                                                    </Select>
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    {...formItemColXg}
                                                    label="出生日期"
                                                    required
                                                >
                                                    <DatePicker
                                                        // size='large'
                                                        {...getFieldProps("fatherBirthdate")}
                                                    />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    {...formItemColXg}
                                                    label="联系电话"
                                                    hasFeedback
                                                    required

                                                >
                                                    <Input placeholder="请输入联系电话" {...getFieldProps('fatherPhone')} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    {...formItemColXg}
                                                    label="户口性质"
                                                    required
                                                >
                                                    <Select {...getFieldProps("fatherHkxz")}>
                                                        <Option value="1">农业</Option>
                                                        <Option value="2">非农业</Option>
                                                    </Select>
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    {...formItemColXg}
                                                    label="银行账户"
                                                    hasFeedback

                                                >
                                                    <Input size="default"
                                                        placeholder="请输入银行卡账号"{...getFieldProps('fatherAgencyZoningCode')} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    {...formItemColXg}
                                                    label="家庭住址"
                                                    required
                                                >
                                                    <Input size="default" placeholder="省市县乡村" {...getFieldProps("fatherZoningCode")} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                    </Form>

                                </div>
                            </Modal>

                            {/* 修改母亲信息 */}
                            <Modal title="修改母亲信息"
                                visible={this.state.changeMotherToggle}
                                okText="确定"
                                cancelText="取消"
                                maskClosable={false}
                                onOk={this.handleChangeMotherOk.bind(this)}
                                onCancel={this.handleChangeMotherCancel.bind(this)}
                            >
                                <div className="changeMotherContent">
                                    <Form className="ant-advanced-search-form" >
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    {...formItemColXg}
                                                    label="姓名"
                                                    hasFeedback
                                                    required

                                                >
                                                    <Input size="default" placeholder="请输入姓名"
                                                        {...getFieldProps('motherName')} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    {...formItemColXg}
                                                    label="证件类型"
                                                    required
                                                >
                                                    <Select {...getFieldProps("motherIdentityType")}>
                                                        <Option value="1">身份证</Option>
                                                        <Option value="2">军官证</Option>
                                                    </Select>
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    {...formItemColXg}
                                                    label="证件号码"
                                                    hasFeedback
                                                    required

                                                >
                                                    <Input size="default"
                                                        placeholder="请输入证件号码"{...getFieldProps('motherIdentityNumber')} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    {...formItemColXg}
                                                    label="性别"
                                                    required
                                                >
                                                    <Select {...getFieldProps('motherGender')} >
                                                        <Option value="0">女</Option>
                                                    </Select>
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    {...formItemColXg}
                                                    label="出生日期"
                                                    required
                                                >
                                                    <DatePicker
                                                        // value={this.state.startValue}
                                                        // onChange={this.onStartChange.bind(this)}
                                                        // size='large'
                                                        {...getFieldProps("motherBirthdate")}
                                                    />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    {...formItemColXg}
                                                    label="联系电话"
                                                    hasFeedback
                                                    required

                                                >
                                                    <Input size="default" placeholder="请输入联系电话"
                                                        {...getFieldProps('motherPhone')} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    {...formItemColXg}
                                                    label="户口性质"
                                                    required
                                                >
                                                    <Select {...getFieldProps("motherHkxz")}>
                                                        <Option value="1">农业</Option>
                                                        <Option value="2">非农业</Option>
                                                    </Select>
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    {...formItemColXg}
                                                    label="银行账户"
                                                    hasFeedback

                                                >
                                                    <Input size="default"
                                                        placeholder="请输入银行卡账号"{...getFieldProps('motherAgencyZoningCode')} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    {...formItemColXg}
                                                    label="家庭住址"
                                                    required
                                                >
                                                    <Input size="default" placeholder="省市县乡村" {...getFieldProps("motherZoningCode")} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                    </Form>

                                </div>
                            </Modal>

                            {/* 修改孩子信息 */}
                            <Modal
                                title="修改孩子信息"
                                visible={this.state.changeChildToggle}
                                okText="确定"
                                cancelText="取消"
                                maskClosable={false}
                                onOk={this.handleChangeChildOk.bind(this)}
                                onCancel={this.handleChangeChildCancel.bind(this)}
                            >
                                <div className="changeChildContent">
                                    <Form className="ant-advanced-search-form">
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    label="姓名"
                                                    {...formItemColXg}
                                                    hasFeedback
                                                    required
                                                >
                                                    <Input size="default"
                                                        placeholder="请输入姓名"
                                                        // {...childNameProps}
                                                        {...getFieldProps('childName')}
                                                    />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    label="性别"
                                                    {...formItemColXg}
                                                    required
                                                >
                                                    <Select
                                                        {...getFieldProps('childGender')}
                                                    >
                                                        <Option value="0">女</Option>
                                                        <Option value="1">男</Option>
                                                    </Select>
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    label="出生日期"
                                                    {...formItemColXg}
                                                    required
                                                >
                                                    <DatePicker
                                                        size='large'
                                                        value={this.state.childBirthDate}
                                                        onChange={this.onChangeTime.bind(this, "childBirthDate")}
                                                    />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    label="与父亲的关系"
                                                    {...formItemColXg}
                                                >
                                                    <Select
                                                        onSelect={this.childFatherRelationshipProps.bind(this)}
                                                        onChange={this.handleChildFatherRelationship.bind(this)}
                                                        disabled={this.state.fatherDisabled}
                                                    >
                                                        <Option value="0">本人亲生</Option>
                                                        <Option value="1">本人抱养</Option>
                                                        <Option value="2">配偶亲生</Option>
                                                        <Option value="3">配偶抱养</Option>
                                                    </Select>
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    label="与母亲的关系"
                                                    {...formItemColXg}
                                                >
                                                    <Select
                                                        disabled={this.state.motherDisabled}
                                                        onSelect={this.childMotherRelationshipProps.bind(this)}
                                                        onChange={this.handleChildMotherRelationship.bind(this)}
                                                    >
                                                        <Option value="0">本人亲生</Option>
                                                        <Option value="1">本人抱养</Option>
                                                        <Option value="2">配偶亲生</Option>
                                                        <Option value="3">配偶抱养</Option>
                                                    </Select>
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    label="抱养日期"
                                                    {...formItemColXg}
                                                >
                                                    <DatePicker
                                                        size='large'
                                                        value={this.state.childAdoptDate}
                                                        disabled={this.state.childAdoptDateDisabled}
                                                        onChange={this.onChangeTime.bind(this, "childAdoptDate")}
                                                    />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    label="死亡日期"
                                                    {...formItemColXg}
                                                >
                                                    <DatePicker
                                                        size='large'
                                                        value={this.state.childDeathDate}
                                                        onChange={this.onChangeTime.bind(this, "childDeathDate")}
                                                    />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    label="家庭住址"
                                                    {...formItemColXg}
                                                >
                                                    <Input size="default"
                                                        {...getFieldProps("childZoningCode")}
                                                    />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                    </Form>

                                </div>
                            </Modal>

                            {/* 个案退出 */}
                            <Modal
                                title="个案退出"
                                visible={this.state.SignOutToggle}
                                okText="确定"
                                cancelText="取消"
                                maskClosable={false}
                                onOk={this.handleSignOutOk.bind(this)}
                                onCancel={this.handleSignOutCancel.bind(this)}
                            >
                                <div className="SignOutContent">
                                    <Form className="ant-advanced-search-form" >
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    label="姓名"
                                                    {...formItemColXg}
                                                >
                                                    <Input size="default"
                                                        placeholder="请输入姓名"
                                                        {...getFieldProps('name')} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    label="扶助金额"
                                                    {...formItemColXg}
                                                >
                                                    <Input size="default"
                                                        placeholder="请输入扶助金额"
                                                        {...getFieldProps('standardAmount')} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    label="退出原因"
                                                    {...formItemColXg}
                                                >
                                                    <Select {...getFieldProps("quitReason")}>
                                                        <Option value="1">子女数变动</Option>
                                                        <Option value="2">丧偶</Option>
                                                        <Option value="3">本人已死</Option>
                                                    </Select>
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    label="村审批人"
                                                    {...formItemColXg}
                                                >
                                                    <Input size="default"
                                                        placeholder="请输入审批人"
                                                        {...getFieldProps('villageUserName')} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    label="乡审批人"
                                                    {...formItemColXg}
                                                >
                                                    <Input size="default"
                                                        placeholder="请输入审批人"
                                                        {...getFieldProps('townUserName')} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row type="flex" justify="center">
                                            <Col span={24} >
                                                <FormItem
                                                    label="县审批人"
                                                    {...formItemColXg}
                                                >
                                                    <Input size="default"
                                                        placeholder="请输入审批人"
                                                        {...getFieldProps('countyUserName')} />
                                                </FormItem>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </Modal>

                        </div>
                    </div>
                </div>
            
            </div>
        )
    }


}
Ssira = Form.create()(Ssira);
export default Ssira;