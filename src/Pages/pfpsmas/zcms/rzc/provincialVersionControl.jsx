import React from 'react';
import { hashHistory, Link } from "react-router";
import "./provincialVersionControl.css";

import blue from "../../../../asset/pfpsmas/zcms/img/blue.png";
import black from "../../../../asset/pfpsmas/zcms/img/black.png";
import gray from "../../../../asset/pfpsmas/zcms/img/gray.png";

import { openNotificationWithIcon } from "../../../../asset/pfpsmas/zcms/js/common";
import {getFindVersionExist, getFindVersionRecord, getRecordVersion } from "../../../../Service/pfpsmas/zcms/server";
import { Navbar, Hr } from "../../../../Components/index";
import { Table, Button, Modal, Input, Select, Row, Col, Tooltip, Tree } from 'antd';

const Option = Select.Option;

class ProvincialVersionControl extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            zoningCode: sessionStorage.getItem("zoningCode"),   //  用户登录区划
    
            displayVersion: [], //  各省使用区划版本
            usedVersionList: [],    //  已发布版本列表
            usedVersion: "--请选择--" //  所使用的版本
            
        }
    }

    handleUsedVersion(e){
        console.log(e);
        this.setState({
            usedVersion: e
        })
    }

    /**
     * 提交版本记录
     */
    handleAxiosRecordVersion(){
        let {zoningCode, usedVersion} = this.state;
        let postData = {};

        postData.dmxzqh = zoningCode;
        postData.bbfbrq = usedVersion;

        this.axiosRecordVersion(postData);
    }

    /**
     * 查询已发布版本
     */
    async axiosFindVersionExist(){
        let res = await getFindVersionExist();
        console.log(res);
        if(res.rtnCode == "000000"){
            let data = res.responseData;
            this.setState({
                usedVersionList: data
            })
        }else{
            openNotificationWithIcon("error", res.rtnMessage);
        }
    }

    /**
     * 查询版本记录
     */
    async axiosFindVersionRecord(){
        let res = await getFindVersionRecord();
        console.log(res);
        if(res.rtnCode == "000000"){
            let data = res.responseData;
            this.setState({
                displayVersion: data
            })
        }else{
            openNotificationWithIcon("error", res.rtnMessage);
        }
    }

    /**
     * 提交版本记录
     * @param {string} dmxzqh 行政区划代码
     * @param {string} bbfbrq 版本发布日期
     */
    async axiosRecordVersion(params){
        let res = await getRecordVersion(params);
        console.log(res);
        if(res.rtnCode == "000000"){
            openNotificationWithIcon("success", res.rtnMessage);
            this.axiosFindVersionRecord();
            this.setState({
                usedVersion: "--请选择--"
            })
        }else{
            openNotificationWithIcon("error", res.rtnMessage);
        }
    }

    componentWillMount(){
        this.axiosFindVersionExist();   
        this.axiosFindVersionRecord();
    }

    render(){
        const columns = [{
            title: '区划名称',
            dataIndex: 'xzqhmc',
            key: 'xzqhmc',
            width: 150
        }, {
            title: '版本号(版本发布日期)',
            dataIndex: 'bbfbrq',
            key: 'bbfbrq',
            width: 150
        }];

        const navbar = [{
            name: "区划下载",
            routerPath: "/about/pfpsmas/zcms/download",
            imgPath: gray
        },{
            name: "省级版本记录",
            routerPath: "/about/pfpsmas/zcms/provincialVersionControl",
            imgPath: blue
        }]

        const loopOption = data => data.map(item => {
            return (
                <Option value={item.bbfbrq}>{item.bbfbrq}</Option>
            )
        })

        return (
            <div className="provincialVersionControl">

                <Navbar data={navbar}></Navbar>

                <div className="container">

                    <div className="container-top margin-top-15">
                        <Table className="provincialVersionControl-table" dataSource={this.state.displayVersion} columns={columns} pagination={{ pageSize: 5 }} />
                    </div>

                    <Hr />

                    <div className="container-bottom margin-top-15">
                        <Row>
                            <Col span={4} offset={6}>
                                <span style={{fontSize: 16}}>
                                    请选择当前使用的区划版本
                                </span>
                            </Col>
                            <Col span={6}>
                                <Select 
                                    defaultValue="--请选择" 
                                    value={this.state.usedVersion} 
                                    onChange={this.handleUsedVersion.bind(this)}
                                    style={{
                                        width: "80%"
                                    }}>
                                    {loopOption(this.state.usedVersionList)}
                                </Select>
                            </Col>
                            <Col span={2}>
                                <Button type="primary" size="large" onClick={this.handleAxiosRecordVersion.bind(this)}>提交</Button>
                            </Col>
                        </Row>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default ProvincialVersionControl;