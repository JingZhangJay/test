import React from 'react';
import { hashHistory, Link } from "react-router";

import { Form, Button, Row, Col, Select, Cascader, Table, Input, DatePicker, Modal, Tabs } from 'antd';

import qs from 'qs'

//  自定义滚动条
// import FreeScrollBar from 'react-free-scrollbar';checkAgencyZoningCode

import './lbefpira.css'

import { checkNameProps, checkPhone, checkIdentityType } from '../../../../../asset/pfpsmas/cbfsms/js/common';

import { getCreateFamily } from '../../../../../Service/pfpsmas/cbfsms/server';

import { openNotificationWithIcon } from "../../../../../asset/pfpsmas/zcms/js/common";


const FormItem = Form.Item;
const Option = Select.Option;

class Lbefpira extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            childList: [],//存放孩子数组

            fatherDiv: 'none',//父亲信息div
            motherDiv: 'none',//母亲信息div
            childDiv: 'block',//孩子信息div

            childToggle: false,  //新增孩子Modal
            fatherDisabled: false,//选择孩子与父亲的关系
            motherDisabled: false,//选择孩子与母亲的关系
            childAdoptDateDisabled: false,//孩子抱养日期

            birthday: '',//出生日期
            sex: '',//性别

            childName: '', // 孩子姓名
            childGender: '', // 孩子性别
            childBirthdate: '', // 孩子出生日期
            childAdoptDate: '', // 孩子抱养日期
            childDeathDate: '', // 孩子死亡日期
            childFatherRelationship: '', // 孩子与父亲关系
            childMotherRelationship: '', // 孩子与母亲关系
            childZoningCode: '', // 孩子家庭住址

        }
    }

    //孩子信息 "下一步"按钮 
    childNextPage() {
        this.setState({
            fatherDiv: 'block',
            motherDiv: 'none',
            childDiv: 'none',
        })
    }

    //父亲信息 "上一步"按钮
    fatherupPage() {
        this.setState({
            fatherDiv: 'none',
            motherDiv: 'none',
            childDiv: 'block',
        })
    }

    //父亲信息 "下一步"按钮
    fatherNextPage() {
        this.setState({
            fatherDiv: 'none',
            motherDiv: 'block',
            childDiv: 'none',
        })
    }

    //母亲信息 "上一步"按钮
    motherupPage() {
        this.setState({
            fatherDiv: 'block',
            motherDiv: 'none',
            childDiv: 'none',
        })
    }

    //母亲信息 "创建家庭户"按钮
    CreateFamily() {

    }

    // 新增孩子
    addedChild() {
        this.setState({
            childToggle: true
        })
    }
    // 新增 父亲
    addedFather() {
        this.setState({
            childToggle: true
        })
    }

    // 新增 母亲
    addedMother() {
        this.setState({
            childToggle: true
        })
    }

    // 新增页面'取消'
    handleChildCancel() {
        this.setState({
            childToggle: false
        })
        this.props.form.resetFields();
    }

    // 与母亲关系 select
    handleChildMotherRelationship(e) {
        this.setState({
            childMotherRelationship: e
        })
    }
    handleChildFatherRelationship(e) {
        this.setState({
            childFatherRelationship: e
        })
    }

    onChangeTime(sign, date, dateStr) {
        this.setState({
            [sign]: dateStr
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


    // 校验父亲姓名
    checkFatherName(rule, value, callback) {
        // checkNameProps(rule, value, callback);
    }
    // 校验母亲姓名
    checkMotherName(rule, value, callback) {
        // checkNameProps(rule, value, callback);

    }
    // 校验孩子姓名
    checkChildName(rule, value, callback) {
        checkNameProps(rule, value, callback);
    }

    //校验父亲证件号码 131182199508186629
    checkFatherIdentityNumber(rule, idcardnum, callback, birthday, sex) {
        // checkIdentityType(rule, idcardnum, callback);
        birthday = idcardnum.substring(6, 14);
        birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
        sex = idcardnum.substr(16, 1)
        if (parseInt(sex) % 2 == 1) {
            sex = '男';
        }
        else {
            sex = '女';
        }

        this.props.form.setFieldsValue({
            fatherBirthdate: birthday,
            fatherGender: sex,
        })
    }
    //校验母亲证件号码
    checkMotherIdentityNumber(rule, idcardnum, callback, birthday, sex) {
        // checkIdentityType(rule, idcardnum, callback);
        birthday = idcardnum.substring(6, 14);
        birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
        sex = idcardnum.substr(16, 1)
        if (parseInt(sex) % 2 == 1) {
            sex = '男';
        }
        else {
            sex = '女';
        }

        this.props.form.setFieldsValue({
            motherBirthdate: birthday,
            motherGender: sex,
        })
    }

    //校验父亲联系电话 座机
    checkFatherPhone(rule, value, callback) {
        // checkPhone(rule, value, callback);
    }
    //校验母亲联系电话 座机
    checkMotherPhone(rule, value, callback) {
        // checkPhone(rule, value, callback);
    }


    //校验父亲银行账号
    checkFatherAgencyZoningCode(rule, value, callback) {
        // checkAgencyZoningCode(rule, value, callback);
    }
    //校验母亲银行账号
    checkmotherAgencyZoningCode(rule, value, callback) {
        // checkAgencyZoningCode(rule, value, callback);
    }


    //校验父亲家庭住址


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

    render() {
        const columns = [
            {
                title: '编号',
                dataIndex: 'childNum',
                key: 'childNum',
                width: '100'
            }, {
                title: '姓名',
                dataIndex: 'childName',
                key: 'childName',
                width: '100'
            }, {
                title: '性别',
                dataIndex: 'childGender',
                key: 'childGender',
                width: '100'
            }, {
                title: '出生日期',
                dataIndex: 'childBirthDate',
                key: 'childBirthDate',
                width: '100'
            }, {
                title: '抱养日期',
                dataIndex: 'childAdoptDate',
                key: 'childAdoptDate',
                width: '100'
            }, {
                title: '死亡日期',
                dataIndex: 'childDeathDate',
                key: 'childDeathDate',
                width: '100'
            }, {
                title: '与父亲关系',
                dataIndex: 'childFatherRelationship',
                key: 'childFatherRelationship',
                width: '100'
            }, {
                title: '与母亲关系',
                dataIndex: 'childMotherRelationship',
                key: 'childMotherRelationship',
                width: '100'
            }, {
                title: '家庭住址',
                dataIndex: 'childZoningCode',
                key: 'childZoningCode',
                width: '100'
            },
        ]

        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;

        //校验父亲姓名
        const fatherNameProps = getFieldProps("fatherName", {
            rules: [
                { required: true, message: "姓名不能为空" },
                { validator: this.checkFatherName.bind(this) }
            ],
            trigger: 'onBlur'
        })
        //校验母亲姓名
        const motherNameProps = getFieldProps("motherName", {
            rules: [
                { required: true, message: "姓名不能为空" },
                { validator: this.checkMotherName.bind(this) }
            ]
        })
        //校验孩子姓名
        const childNameProps = getFieldProps("childName", {
            rules: [
                { validator: this.checkChildName.bind(this) }
            ]
        })


        //校验父亲证件号码
        const fatherIdentityNumberProps = getFieldProps("fatherIdentityNumber", {
            rules: [
                { required: true, message: "证件号码不能为空!" },
                // { validator: this.checkFatherIdentityNumber.bind(this) }
            ],
        });
        //校验母亲证件号码
        const motherIdentityNumberProps = getFieldProps("motherIdentityNumber", {
            rules: [
                { required: true, message: "证件号码不能为空!" },
                // { validator: this.checkMotherIdentityNumber.bind(this) }
            ]
        });


        //校验父亲联系电话
        const fatherPhoneProps = getFieldProps("fatherPhone", {
            rules: [
                { required: true, message: "手机号码不能为空!" },
                { validator: this.checkFatherPhone }
            ]
        })
        //校验母亲联系电话
        const motherPhoneProps = getFieldProps("motherPhone", {
            rules: [
                { required: true, message: "手机号码不能为空!" },
                { validator: this.checkMotherPhone }
            ]
        })


        //校验父亲银行账号
        const fatherAgencyZoningCodeProps = getFieldProps("fatherAgencyZoningCode", {
            rules: [
                { required: false, message: "请输入银行账号!" },
                { validator: this.checkFatherAgencyZoningCode }
            ]
        });
        //校验母亲银行账号
        const motherAgencyZoningCodeProps = getFieldProps("motherAgencyZoningCode", {
            rules: [
                { required: false, message: "请输入银行账号!" },
                { validator: this.checkMotherAgencyZoningCode }
            ]
        });


        const formItemCol = {
            labelCol: { span: 8 },
            wrapperCol: { span: 5, offset: 1 }
        };


        return (
            <div className="lbefpira">
                {/*孩子信息 */}
                <div
                    style={{ 'display': this.state.childDiv }}
                    className="childDiv"
                >
                    <div className="childTitle">
                        录入孩子信息
                    </div>
                    <div className="margin-top-20">
                        <Row>
                            <Col span={4} offset={10}>
                                <Button type="primary" onClick={this.addedChild.bind(this)} >新增</Button>
                            </Col>
                        </Row>
                    </div>
                    <div className="margin-top-20">
                        <Table columns={columns} dataSource={this.state.childList} />
                    </div>
                    <div className="margin-top-20">
                        <Row>
                            <Col span={2} offset={10}>
                                <Button type="primary" onClick={this.childNextPage.bind(this)} >下一步</Button>
                            </Col>
                        </Row>
                    </div>
                    <Modal title="新增孩子信息"
                        visible={this.state.childToggle}
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
                                            labelCol={{ span: 8 }}
                                            wrapperCol={{ span: 12 }}
                                            hasFeedback
                                            required
                                        >
                                            <Input size="default"
                                                placeholder="请输入姓名"
                                                {...childNameProps}
                                                {...getFieldProps('childName')}
                                            />
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row type="flex" justify="center">
                                    <Col span={24} >
                                        <FormItem
                                            label="性别"
                                            labelCol={{ span: 8 }}
                                            wrapperCol={{ span: 12 }}
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
                                            labelCol={{ span: 8 }}
                                            wrapperCol={{ span: 12 }}
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
                                            labelCol={{ span: 8 }}
                                            wrapperCol={{ span: 12 }}
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
                                            labelCol={{ span: 8 }}
                                            wrapperCol={{ span: 12 }}
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
                                            labelCol={{ span: 8 }}
                                            wrapperCol={{ span: 12 }}
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
                                            labelCol={{ span: 8 }}
                                            wrapperCol={{ span: 12 }}
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
                                            labelCol={{ span: 8 }}
                                            wrapperCol={{ span: 12 }}
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
                </div>
                {/*父亲信息 */}
                <div className="fatherDiv"
                    style={{ 'display': this.state.fatherDiv }}
                >
                    <div className="fatherTitle">
                        录入父亲信息
                    </div>

                    <div className="main-outer-container">
                        <div className="main-inner-container">
                            <div className="main-scroll-content">

                                <div className="fatherContent">
                                    <Form className="ant-advanced-search-form">
                                        <Row type="flex" justify="center">
                                            <Col span={18} >
                                                <FormItem
                                                    {...formItemCol}
                                                    label="姓名"
                                                    hasFeedback
                                                    help={
                                                        isFieldValidating("fatherName")
                                                            ? "校验中..."
                                                            : (getFieldError("fatherName") || []).join(", ")
                                                    }
                                                >
                                                    <Input
                                                        placeholder="请输入姓名"
                                                        {...fatherNameProps}
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
                                                    help={
                                                        isFieldValidating("fatherIdentityNumber")
                                                            ? "校验中..."
                                                            : (getFieldError("fatherIdentityNumber") || []).join(", ")
                                                    }
                                                >
                                                    <Input size="default" placeholder="请输入证件号码" {...fatherIdentityNumberProps} />
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
                                                    help={
                                                        isFieldValidating("fatherPhone")
                                                            ? "校验中..."
                                                            : (getFieldError("fatherPhone") || []).join(", ")
                                                    }
                                                >
                                                    <Input placeholder="请输入联系电话" {...fatherPhoneProps} />
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
                                                    help={
                                                        isFieldValidating("fatherAgencyZoningCode")
                                                            ? "校验中..."
                                                            : (getFieldError("fatherAgencyZoningCode") || []).join(", ")
                                                    }
                                                >
                                                    <Input size="default"
                                                        placeholder="请输入银行卡账号"{...fatherAgencyZoningCodeProps} />
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
                                        <Row>
                                            <Col span={2} offset={8}>
                                                <Button type="primary"
                                                    onClick={this.fatherupPage.bind(this)}
                                                >上一步</Button>
                                            </Col>
                                            <Col span={2} offset={1}>
                                                <Button type="primary" onClick={this.addedFather.bind(this)} >新增</Button>
                                            </Col>
                                            <Col span={2} offset={1}>
                                                <Button type="primary"
                                                    onClick={this.fatherNextPage.bind(this)}
                                                >下一步</Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                                <div className="margin-top-20">
                                    <Table columns={columns} dataSource={this.state.childList} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/*母亲信息 */}
                <div
                    style={{ 'display': this.state.motherDiv }}
                >
                    <div className="motherTitle">
                        录入母亲信息
                    </div>

                    <div className="main-outer-container">
                        <div className="main-inner-container">
                            <div className="main-scroll-content">
                                <div className="motherContent">
                                    <Form className="ant-advanced-search-form" >
                                        <Row type="flex" justify="center">
                                            <Col span={18} >
                                                <FormItem
                                                    {...formItemCol}
                                                    label="姓名"
                                                    hasFeedback
                                                    help={
                                                        isFieldValidating("motherName")
                                                            ? "校验中..."
                                                            : (getFieldError("motherName") || []).join(", ")
                                                    }
                                                >
                                                    <Input size="default" placeholder="请输入姓名"
                                                        {...motherNameProps} />
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
                                                    help={
                                                        isFieldValidating("motherIdentityNumber")
                                                            ? "校验中..."
                                                            : (getFieldError("motherIdentityNumber") || []).join(", ")
                                                    }
                                                >
                                                    <Input size="default"
                                                        placeholder="请输入证件号码"{...motherIdentityNumberProps} />
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
                                                    help={
                                                        isFieldValidating("motherPhone")
                                                            ? "校验中..."
                                                            : (getFieldError("motherPhone") || []).join(", ")
                                                    }
                                                >
                                                    <Input size="default" placeholder="请输入联系电话"
                                                        {...motherPhoneProps} />
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
                                                    help={
                                                        isFieldValidating("motherAgencyZoningCode")
                                                            ? "校验中..."
                                                            : (getFieldError("motherAgencyZoningCode") || []).join(", ")
                                                    }
                                                >
                                                    <Input size="default"
                                                        placeholder="请输入银行卡账号"{...motherAgencyZoningCodeProps} />
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
                                        <Row>
                                            <Col span={2} offset={8}>
                                                <Button type="primary" onClick={this.motherupPage.bind(this)} >上一步</Button>
                                            </Col>
                                            <Col span={2} offset={1}>
                                                <Button type="primary" onClick={this.addedMother.bind(this)} >新增</Button>
                                            </Col>
                                            <Col span={2} offset={1}>
                                                <Button type="primary" className="button-margin-left-10"
                                                // onClick={this.CreateFamily.bind(this)} 
                                                >创建家庭户</Button>
                                            </Col>

                                        </Row>
                                    </Form>

                                </div>
                                <div className="margin-top-20">
                                    <Table columns={columns} dataSource={this.state.childList} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div >
        )
    }

}

Lbefpira = Form.create()(Lbefpira);
export default Lbefpira;