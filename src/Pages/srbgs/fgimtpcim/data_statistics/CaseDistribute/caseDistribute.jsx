import React from 'react';
import {Form, Select, Col, Row} from 'antd';
import echarts from 'echarts';
import 'echarts/map/js/china';

import {getQueryRateByProvince, getQuerySumByProvince} from "../../../../../Service/srbgs/fgimtpcim/server";
import {chinaMap} from "../../../../../asset/srbgs/js/chinaMap"

const FormItem = Form.Item;
const Option = Select.Option;

require('./caseDistribute.css');

let config = {
    title: {
        text: '年案件分布（件）',
        textStyle: {
            color: '#fff'
        },
        x: '6%',
        top: 40,
    },
    tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        textStyle: {
            color: '#000',
        },
        showDelay: 0,
        hideDelay: 0,
        enterable: true,
        transitionDuration: 0,
        formatter: function (params) {
            console.log('params ===>', params);
            let data = params.data;
            return '<div style="padding:5px 10px;"> <p><strong>'
                + params.name + '</strong></p>立案数：' + data.value  + '<br/>'
                + '结案数：' + data.jas + '<br/>'
                + '结案率：' + data.jal + '<br/>'
                + '</div>'
        }
    },
    visualMap: { //图例值控制
        calculable: true,
        show: true,
        min: 0,
        max: 2000,
        bottom: '10%',
        left: '7%',
        text: ['高', '低'],
        inRange: {
            color: ['#23BCF3', '#91DA80', '#FEFC0A']
        },
        textStyle: {
            color: '#A1A1A1'
        }
    },
    series: [
        {
            type: 'map',
            map: 'china',
            name: '案件分布（件）',
            zoom: 1,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: true, // 存在legend时显示
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        color: '#785A3C'
                    }
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#23BCF6',
                    borderColor: '#fff',
                    borderWidth: 0.8
                },
                emphasis: {
                    areaColor: '#FE8463'
                }
            },
            data: []
        }
    ]
}, currentYear = new Date().getFullYear(), step =10;


class caseDistribute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mapdata: [],
            yearSelect: {
                start: currentYear - step,
                end: currentYear
            }
        };
    }


    async handleGetQuerySumByProvince(param) {
        console.log('param ---> ', param );
        if (param.start > param.end) {
            let tmp = param.end;
            param.start = param.end;
            param.end = tmp;
        }
        let res = await getQueryRateByProvince(param);
        let data = res.responseData, max = 0;
        this.setState({
            mapdata: data.map(e => {
                if(e.value.las >= max){
                    max = e.value.las;
                }
                return {
                    name: chinaMap[e.name],
                    value: e.value.las,
                    jas: e.value.jas,
                    jal: e.value.jal
                }
            })
        });
        config.visualMap.max = max;

    }


    initPie(id) {
        let myChart = echarts.getInstanceByDom(document.getElementById(id));
        if (myChart === undefined) {
            myChart = echarts.init(document.getElementById(id));
        }
        myChart.setOption(config)
    }

    async leftSelect(value) {
        console.log('this.state.yearSelect -1--> ', this.state.yearSelect );
        let yearSelect = this.state.yearSelect;
        yearSelect.start = value;
        this.setState({
            yearSelect: yearSelect
        });
        console.log('yearSelect ---> ', yearSelect );
        await this.handleGetQuerySumByProvince(yearSelect);

        config.series[0].data = this.state.mapdata;
        this.updateTitle();
        this.initPie('mainMap');

    }

    updateTitle() {
        console.log("update----->");
        let yearSelect = this.state.yearSelect, start = yearSelect.start, end = yearSelect.end;
        if (start == end) {
            config.title.text = start + '年案件分布（件）';
        } else if (start > end) {
            config.title.text = end + '至' + start + '年案件分布（件）';
        } else {
            config.title.text = start + '至' + end + '年案件分布（件）';
        }
    }

    async rightSelect(value) {
        let yearSelect = this.state.yearSelect;
        yearSelect.end = value;
        this.setState({
            yearSelect:yearSelect
        });
        await this.handleGetQuerySumByProvince(yearSelect);

        config.series[0].data = this.state.mapdata;
        this.updateTitle();
        this.initPie('mainMap');
    }


    async componentDidMount() {
        let yearSelect = this.state.yearSelect;
        console.log('yearSelect ---> ', yearSelect );
        await this.handleGetQuerySumByProvince(yearSelect);
        //config.title = year + config.title;
        this.updateTitle();
        config.series[0].data = this.state.mapdata;
        this.initPie('mainMap');
    }


    async componentDidUpdate() {
        this.initPie('mainMap');
    }

    render() {

        let year = currentYear, op = [];
        for (let i = year; i >= year - step; i--) {
            op.push((<Option value={i}>{i}年</Option>));
        }
        return (
            <div className="caseDistribute">
                <Row>
                    <FormItem
                        label="年份"
                        labelCol={{span: 3}}
                        wrapperCol={{span: 7}}
                        hasFeedback
                        help
                        className="yearSelect"
                    >
                        <Col span="8">
                            <Select defaultValue={year - step} onSelect={this.leftSelect.bind(this)} style={{width: '100%'}}>
                                {op}
                            </Select>
                        </Col>
                        <Col span="1">
                            <p className="ant-form-split">-</p>
                        </Col>
                        <Col span="8">
                            <Select defaultValue={year} onSelect={this.rightSelect.bind(this)} style={{width: '100%'}}>
                                {op}
                            </Select>
                        </Col>
                    </FormItem>
                </Row>
                <div className="Geo">
                    <div id="mainMap" style={{width: '100%', height: '700px', overflow: 'hidden'}}></div>
                </div>
            </div>
        )
    }
}

export default caseDistribute;