import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route, Link, hashHistory} from 'react-router';

import { Select, Row, Col, message } from 'antd';

// 后台区划代码
import { getFindSonCodes, getDetailInfo } from "../../../../../Service/pfpsmas/cbfsms/server";

import { placeData, selectZoningCode, clearData, addZeroAtTail, zeroAtTail } from "../../../../../../src/asset/pfpsmas/cbfsms/js/common"

const Option = Select.Option;

class SelectGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zoningCode: "370200000000000",
            assigningCode: "2",
            badwData: { 1: [], 2: [], 3: [] },
            cldwData: { 1: [], 2: [], 3: [] },
            afddData: { 1: [], 2: [], 3: [], 4: [], 5: [] },
            badwDataObj: {},
            xzqhBadwArr: ['', '', ''],
            xzqhCldwArr: ['00', '00', '00'],
            xzqhAfddArr: ['00', '00', '00', '00', '00', '00'],
            selectIndex: '',
            postQhdm: '',
            paramsOdd: '',
        }
    }

    //  获取下级区划代码
    handleFindSonCodes(sign, selectedAssigningCode, value, key) {
        console.log('selectedAssigningCode =====>' + selectedAssigningCode)
        let { badwData, cldwData, afddData } = this.state;
        let postData = {};
        let paramsNew = {};
        let selected = '';
        let selecteds = '';
        let selectAll = '';
        if (value.length < 2) {
            alert('全部');
            console.log(key.props)

            if (value == '5') {
                alert(value);
                selected = zeroAtTail(key.props.selectedKeys[0], 1) + zeroAtTail(key.props.selectedKeys[0], 2) + zeroAtTail(key.props.selectedKeys[0], 3) + zeroAtTail(key.props.selectedKeys[0], 4) + "000"

                selecteds = addZeroAtTail(selected);
                paramsNew.code = selecteds;
                console.log(sign)
                console.log(paramsNew)
                if (sign == 'xzqhAllSix') {
                    alert('xzqhAllSix')
                    clearData(afddData, selectedAssigningCode);
                    this.axiosFindSonCodes(paramsNew, sign);
                    this.props.handleZoningCode(paramsNew, sign);
                } else if (sign == 'xzqhAll') {
                    clearData(cldwData, selectedAssigningCode)
                    this.axiosFindSonCodes(paramsNew, sign);
                    this.props.handleZoningCode(paramsNew, sign);
                } else if (sign == 'xzqhOnly') {
                    clearData(badwData, selectedAssigningCode);
                    this.axiosFindSonCodes(paramsNew, sign);
                    this.props.handleZoningCode(paramsNew.code, sign);
                }
            }
            if (value == '4') {
                alert(value);
                selected = zeroAtTail(key.props.selectedKeys[0], 1) + zeroAtTail(key.props.selectedKeys[0], 2) + zeroAtTail(key.props.selectedKeys[0], 3) + "000"

                selecteds = addZeroAtTail(selected);
                paramsNew.code = selecteds;
                console.log(sign)
                console.log(paramsNew)
                if (sign == 'xzqhAllSix') {
                    alert('xzqhAllSix')
                    clearData(afddData, selectedAssigningCode);
                    this.axiosFindSonCodes(paramsNew, sign);
                    this.props.handleZoningCode(paramsNew, sign);
                } else if (sign == 'xzqhAll') {
                    clearData(cldwData, selectedAssigningCode)
                    this.axiosFindSonCodes(paramsNew, sign);
                    this.props.handleZoningCode(paramsNew, sign);
                } else if (sign == 'xzqhOnly') {
                    clearData(badwData, selectedAssigningCode);
                    this.axiosFindSonCodes(paramsNew, sign);
                    this.props.handleZoningCode(paramsNew.code, sign);
                }
            }
            if (value == '3') {
                alert(value);

                selected = zeroAtTail(key.props.selectedKeys[0], 1) + zeroAtTail(key.props.selectedKeys[0], 2) + "00"

                selecteds = addZeroAtTail(selected);

                paramsNew.code = selecteds;
                console.log(sign)
                console.log(paramsNew)
                if (sign == 'xzqhAllSix') {
                    alert('xzqhAllSix')
                    clearData(afddData, selectedAssigningCode);
                    this.axiosFindSonCodes(paramsNew, sign);
                    this.props.handleZoningCode(paramsNew, sign);
                } else if (sign == 'xzqhAll') {
                    clearData(cldwData, selectedAssigningCode)
                    this.axiosFindSonCodes(paramsNew, sign);
                    this.props.handleZoningCode(paramsNew, sign);
                } else if (sign == 'xzqhOnly') {
                    clearData(badwData, selectedAssigningCode);
                    this.axiosFindSonCodes(paramsNew, sign);
                    this.props.handleZoningCode(paramsNew.code, sign);
                }
            }
            if (value == '2') {
                alert(value);
                value = "00"
                if (key.props.selectedKeys.length != 0) {
                    selected = zeroAtTail(key.props.selectedKeys[0], 1) + value + value
                }

                selecteds = addZeroAtTail(selected);

                paramsNew.code = selecteds;
                console.log(sign)
                if (sign == 'xzqhAllSix') {
                    alert('xzqhAllSix')
                    clearData(afddData, selectedAssigningCode);
                    this.axiosFindSonCodes(paramsNew, sign);
                    this.props.handleZoningCode(paramsNew, sign);
                } else if (sign == 'xzqhAll') {
                    clearData(cldwData, selectedAssigningCode)
                    this.axiosFindSonCodes(paramsNew, sign);
                    this.props.handleZoningCode(paramsNew, sign);
                } else if (sign == 'xzqhOnly') {
                    clearData(badwData, selectedAssigningCode);
                    this.axiosFindSonCodes(paramsNew, sign);
                    this.props.handleZoningCode(paramsNew.code, sign);
                }
            }
            if (value == '1') {
                alert(value);

                selected = '00' + '00'
                console.log('selected ====>' + selected)
                selecteds = addZeroAtTail(selected);

                paramsNew.code = selecteds;
                console.log('sign =====>' + sign)
                console.log(paramsNew)


                if (sign == 'xzqhAllSix') {
                    alert('xzqhAllSix')
                    clearData(afddData, selectedAssigningCode);
                    this.axiosFindSonCodes(paramsNew, sign);
                    this.props.handleZoningCode(paramsNew, sign);
                } else if (sign == 'xzqhAll') {
                    clearData(cldwData, selectedAssigningCode)
                    this.axiosFindSonCodes(paramsNew, sign);
                    this.props.handleZoningCode(paramsNew, sign);
                } else if (sign == 'xzqhOnly') {
                    alert('xzqhOnly')
                    clearData(badwData, selectedAssigningCode);
                    this.axiosFindSonCodes(paramsNew, sign);
                    this.props.handleZoningCode(paramsNew.code, sign);
                }
            }

        } else {
            postData.code = value;
            this.axiosFindSonCodes(postData, sign);
            this.props.handleZoningCode(value, sign);


        }

    }

    /**
     * 获取本级区划详细信息
     * @param {string} code 区划代码
     */
    async axiosDetailInfo(params) {
        let res = await getDetailInfo(params);
        let { badwData } = this.state;
        let obj = {};

        if (res.code == "000000") {
            let data = res.responseData;
            obj[data.JCDM] = [];
            obj[data.JCDM].push(data)
            placeData(obj, badwData);

        } else {
            message.error('请求数据失败！')
        }

        this.setState({
            badwData: badwData,
        })
    }

    /**
     * 获取下级区划
     * @param {string} code 区划代码
     */
    async axiosFindSonCodes(params, flag) {
        let res = await getFindSonCodes(params);
        let { cldwData, badwData, afddData } = this.state;
        let obj = {};

        if (res.code == "000000") {
            let data = res.responseData;

            console.log(data)
            //  级次代码小于4   指到县级就不处理数据
            //  否则会导致下拉框多级出现

            if (flag == 'xzqhAllSix') {
                if (data.length > 0 && data[0].JCDM < 7) {
                    obj[data[0].JCDM] = data;
                }
            } else {
                if (data.length > 0 && data[0].JCDM < 4) {
                    obj[data[0].JCDM] = data;
                }
            }

            if (flag == "xzqhAll") {
                placeData(obj, cldwData);
            } else if (flag == "xzqhAllSix") {
                placeData(obj, afddData);
            } else if (flag == "xzqhOnly") {
                placeData(obj, badwData);
            }
        }

        this.setState({
            cldwData: cldwData,
            badwData: badwData,
            afddData: afddData
        })

        // console.log(this.state.cldwData)
        // console.log(this.state.badwData)
    }

    componentWillMount() {
        let { zoningCode, assigningCode } = this.state;
        let cldwPostData = {};
        let temp = {}

        //  根据登录人信息做办案单位下拉框对比
        temp = selectZoningCode(zoningCode, assigningCode);
        console.log("componentWillMount.temp ---> ", temp);

        //  上一步获取到了登录人所在区划的所有级次代码区划  根据此来判断调用详情信息
        for (var k in temp) {
            this.axiosDetailInfo({ code: temp[k] });
        }
        console.log(temp)
        //  办案单位默认调用一次下级区划查询
        this.axiosFindSonCodes({ code: temp[assigningCode] }, "xzqhOnly")

        //  获取处理单位数据
        cldwPostData.code = "000000000000000";
        this.axiosFindSonCodes(cldwPostData, "xzqhAllSix");
        this.axiosFindSonCodes(cldwPostData, "xzqhAll");

        this.setState({
            badwDataObj: temp
        })
    }

    render() {



        const { cldwData, badwData, afddData } = this.state;

        const loopSelect = (data, sign) => Object.keys(data).map(key => {

            if (sign == "xzqhAllSix") {
                return (
                    <Col span={4} offset={key == '1' ? '0' : '1'}>
                        <Select defaultValue={key} onSelect={this.handleFindSonCodes.bind(this, sign, key)} width="100%">
                            <Option value={key} a={key}>全部</Option>
                            {loopOption(data[key])}
                        </Select>
                    </Col>
                )
            } else if (sign == "xzqhAll") {
                return (
                    <Col span={7} offset={key == '1' ? '0' : '1'}>
                        <Select defaultValue={key} onSelect={this.handleFindSonCodes.bind(this, sign, key)} style={{ width: "100%" }}>
                            <Option value={key}>全部</Option>
                            {loopOption(data[key])}
                        </Select>
                    </Col>
                )
            } else if (sign == "xzqhOnly") {
                return (
                    <Col span={7} offset={key == '1' ? '0' : '1'}>
                        {
                            this.state.badwDataObj[key] ?
                                <Select value={this.state.badwDataObj[key]} defaultValue={key} onSelect={this.handleFindSonCodes.bind(this, sign, key)} disabled={this.state.badwDataObj[key] ? true : false} style={{ width: "100%" }}>
                                    <Option value={key}>全部</Option>
                                    {loopOption(data[key])}
                                </Select> :
                                <Select defaultValue={key} onSelect={this.handleFindSonCodes.bind(this, sign, key)} disabled={this.state.badwDataObj[key] ? true : false} style={{ width: "100%" }}>
                                    <Option value={key} selected>全部</Option>
                                    {loopOption(data[key])}
                                </Select>
                        }
                    </Col>
                )
            }

        });

        const loopOption = data => data.map(item => {
            return (
                <Option value={item.XZQH_DM} key={item.key}>{item.XZQH_MC}</Option>
            )
        })

        let xzqhOption;

        if (this.props.sign == "xzqhOnly") {
            xzqhOption = loopSelect(badwData, this.props.sign);
        } else
            if (this.props.sign == "xzqhAll") {
                xzqhOption = loopSelect(cldwData, this.props.sign);
            } else
                if (this.props.sign == "xzqhAllSix") {
                    xzqhOption = loopSelect(afddData, this.props.sign);
                }

        return (
            <div>
                {
                    xzqhOption
                }
            </div>
        )
    }
}

export default SelectGroup;