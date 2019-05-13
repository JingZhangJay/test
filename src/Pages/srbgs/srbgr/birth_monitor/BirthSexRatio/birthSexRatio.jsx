import React from 'react';
import {Tabs,Table,Row,Col,Form,Select,Input,Button,message} from 'antd';
import echarts from 'echarts';
import 'echarts/map/js/china';
import {chinaMap} from "../../../../../asset/srbgs/js/chinaMap";
import {
    getQueryByYear,
    getExportByYear,
    getQueryByMonths,
    getExportByMonths
} from '../../../../../Service/srbgs/srbgr/server';

import SelectGroup from "../../../../../Components/srbgs/fgimtpcim/SelectGroup/selectGroup";

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;

require('./birthSexRatio.css');

var config_map = {
    title:{
        text:'2014年 分性别出生人口及出生性别比（现居住地出生性别比 单位：%）',
        textStyle: {
            color: '#fff',
            fontsize: 16,
            fontweight:'none'
        },
        x: 'center',
        top: 20
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
        formatter: function(params){
            return '<div>('+params.data.name+') '+params.seriesName+
                '<br/>男:'+params.data.value.nan+
                '<br/>女:'+params.data.value.nv+
                '<br/>性别比:'+params.data.value.xbb+'</div>'
        }
    },
    visualMap: { //图例值控制
        calculable: true,
        show: true,
        min: 0,
        max: 2000,
        orient:'horizontal',
        bottom: '10%',
        left: '18%',
        text: ['高', '低'],
        inRange: {
            color: ['#23BCF3', '#91DA80', '#FEFC0A']
        },
        textStyle: {
            color: '#A1A1A1'
        }
    },
    series:[
        {
            type: 'map',
            map: 'china',
            name: '分性别出生人口及出生性别比',
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
}

var config_bar = {
    tooltip: {
        trigger: 'axis',
            // axisPointer: {
            // type: 'cross',
            //     crossStyle: {
            //     color: '#999'
            // }
        // }
    },
    legend: {
        data:['男','女','出生性别比（%）']
    },
    xAxis: [
        {
            type: 'category',
            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
            axisPointer: {
                type: 'shadow'
            },
            axisLine:{
                lineStyle:{
                    color:"#fff"
                }
            },
        }
    ],
        yAxis: [
        {
            type: 'value',
            name: '（男/女）人数',
            min: 0,
            color: '#fff',
            axisLabel: {
                formatter: '{value} '
            },
            axisLine:{
                lineStyle:{
                    color:"#fff"
                }
            },
            splitLine:{
                show: false
            },
        },
        {
            type: 'value',
            name: '出生性别比（%）',
            min: 0,
            color: '#fff',
            axisLabel: {
                formatter: '{value} %'
            },
            axisLine:{
                lineStyle:{
                    color:"#fff"
                }
            },
        }
    ],
        series: [
        {
            name:'男',
            type:'bar',
            itemStyle:{
                color: '#86fbff'
            },
            data:[]
        },
        {
            name:'女',
            type:'bar',
            itemStyle:{
                color: '#ffaa60'
            },
            data:[]
        },
        {
            name:'出生性别比（%）',
            type:'line',
            yAxisIndex: 1,
            itemStyle:{
                color: '#fc231e'
            },
            data:[]
        }
    ]
}

class BirthSexRatio extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mapSelectYears: '2019',
            BarSelectYears: '2018',
            TableSelectYears: '2019',
            mapQueryLading: false,
            BarQueryLading: false,
            TableQueryLading: false,
            TableData:[],
            TableLoading: false
        }
    }

    // map 请求
    async handelGetQueryByYear(parent){
        let data,
            xzqhdm = [], // 区划代码
            newData = [], // 出生数量
            newData_obj = {},
            dataArr = [];
        let res = await getQueryByYear(parent);

        if(res.code == '000000'){
            data = res.responseData;
            data.sort(function (a, b) {
                return a.xzqhdm - b.xzqhdm;
            }).forEach(function (e,index) {
                if (xzqhdm.indexOf(e.name) === -1) {
                    xzqhdm.push(e.name);
                };
                if (newData[e.value]) {
                    newData.push(e.value);
                } else {
                    newData.push(e.value);
                };
                newData.map(function(value, index, array){
                    newData_obj = {
                        'name': chinaMap[e.name],
                        'value': value
                    }
                })
                dataArr.push(newData_obj)
            });

            config_map.series[0].data = dataArr;
            config_map.title.text = parent.year+  '年 分性别出生人口及出生性别比（现居住地出生性别比 单位：%）'
            this.initPie('map',config_map);
            this.setState({
                mapQueryLading: false,
            })

        }else {
            message.error('数据请求失败！');
            this.setState({
                mapQueryLading: false,
            })
        }
    }

    async handelGetQueryByMonths(parent,target){
        if(target == 'table'){
            let data  = await getQueryByMonths(parent);
            if(data.code == '000000'){
                this.setState({
                    TableData: data.responseData,
                    TableQueryLading: false,
                    TableLoading: false
                })
            }else{
                message.error('数据请求失败！')
                this.setState({
                    TableQueryLading: false,
                    TableLoading: false
                })
            }
        }else{
            let data  = await getQueryByMonths(parent);
            if(data.code == '000000'){
                let nanArr = [],
                    nvArr = [],
                    xbbArr = [];
                (data.responseData).map((item) => {
                    nanArr.push(item.nan);
                    nvArr.push(item.nv)
                    xbbArr.push(item.xbb)
                })

                config_bar.series[0].data = nanArr;
                config_bar.series[1].data = nvArr;
                config_bar.series[2].data = xbbArr;

                this.initPie('bar',config_bar);
                this.setState({
                    BarQueryLading: false,
                })
            } else{
                message.error('数据请求失败！')
                this.setState({
                    BarQueryLading: false,
                })
            }
        }
    }

    initPie(id,echarts_Option) {
        let myChart = echarts.getInstanceByDom(document.getElementById(id));
        if( myChart === undefined){
            myChart = echarts.init(document.getElementById(id));
        }
        myChart.setOption(echarts_Option)
    }

    // 查询地图
    inqueryMap(){
        let data;
        this.props.form.validateFields((error,values) =>{
            data = {
                year: values.mapSelectYears,
                xzqh: '000000000000000'
            }
        })
        this.handelGetQueryByYear(data);
        this.setState({
            mapQueryLading: true
        })
    }

    // 导出地图
    ExportMap(){
        this.props.form.validateFields((error,values) =>{
            getExportByYear(
                '?year='+ values.mapSelectYears
            )
        })
    }
    // 查询柱图
    inqueryBar(){
        let data;
        this.props.form.validateFields((error,values) =>{
            data = {
                year: values.BarSelectYears,
                xzqh: (values.xzqh == '' ? '000000000000000' : values.xzqh)
            };
        })
        this.handelGetQueryByMonths(data);
        this.setState({
            BarQueryLading: true
        })
    }

    // 导出柱图
    ExportBar(){
        this.props.form.validateFields((error,values) =>{
            getExportByMonths(
                    '?year='+ values.BarSelectYears +
                    '&xzqh='+ (values.xzqh == '' ? '000000000000000' : values.xzqh)
            )
        })
    }

    // 查询表格
    inqueryTable(){
        let data;
        this.props.form.validateFields((error,values) =>{
            data = {
                year: values.TableSelectYears,
                xzqh: values.xzqh2
            };
        })
        this.handelGetQueryByMonths(data,'table');
        this.setState({
            TableQueryLading: true,
            TableLoading: true,
            TableSelectYears: data.year
        })
    }
    // 导出表格
    ExportBarTable(){
        this.props.form.validateFields((error,values) =>{
            getExportByMonths(
                    '?year='+ values.TableSelectYears +
                    '&xzqh='+ values.xzqh2
                )
        })
    }

    // 区划下拉框的 Value
    handleZoningCode(test,e){
        console.log(test,e)
        for(var key in e) {
            if (key == "xzqhAll") {
                this.props.form.setFieldsValue({
                    "xzqh": e[key],
                    "xzqh2": e[key]
                })
            }
        }
    }

    async componentDidMount() {
        await this.handelGetQueryByYear({ year:'2019', xzqh: '000000000000000'})
    }

    render(){
        const { getFieldProps } = this.props.form;

        const columns = [
            { title: '年份', dataIndex: '', key: '' ,render: ()=> <span>{this.state.TableSelectYears}</span> },
            { title: '月份', dataIndex: 'month', key: 'month' },
            { title: '男孩（人）', dataIndex: 'nv', key: 'yjrq'},
            { title: '女孩（人）', dataIndex: 'nv', key: 'nv'},
            { title: '出生性别比', dataIndex: 'xbb', key: 'xbb'},
        ];

        const DefaultValueMap = getFieldProps('mapSelectYears',
            {initialValue :'2019' || undefined}
        );

        const DefaultValueBar = getFieldProps('BarSelectYears',
            {initialValue :'2018' || undefined}
        );

        const DefaultValueTable = getFieldProps('TableSelectYears',
            {initialValue :'2018' || undefined}
        );

        return(
            <div className="BirthSexRatio">
                <Tabs defaultActiveKey="1" className="csxbbTabs">
                    <TabPane tab="地图" key="1">
                        <Row>
                            <Col span={8}>
                                <FormItem label="年份" labelCol={{ span: 6 }} wrapperCol={{ span: 17 }} style={{marginBottom:'0px'}}>
                                    <Select {...DefaultValueMap} style={{width:'100%'}} size="default" >
                                        <Option value="2015">2015</Option>
                                        <Option value="2016">2016</Option>
                                        <Option value="2017">2017</Option>
                                        <Option value="2018">2018</Option>
                                        <Option value="2019">2019</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span={8} offset={2}>
                                <FormItem  style={{marginBottom:'0px'}}>
                                    <Button type="primary" htmlType="submit" size="default" onClick={this.inqueryMap.bind(this)} loading={this.state.mapQueryLading}>查询</Button>
                                    <Button size="default" style={{marginLeft:'10px'}}onClick={this.ExportMap.bind(this)}>导出</Button>
                                </FormItem>
                            </Col>
                        </Row>
                        <div id="map" style={{ width: '100%', height: '60vh', overflow: 'hidden'}}></div>
                    </TabPane>
                    <TabPane tab="图表" key="2">
                        <Row>
                            <Col span={10}>
                                <FormItem label="行政区划" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} style={{marginBottom:'0px'}} required>
                                    <SelectGroup sign="xzqhAll"  {...getFieldProps('xzqh')}  handleZoningCode={this.handleZoningCode.bind(this,'xzqhAll')}></SelectGroup>
                                </FormItem>
                            </Col>
                            <Col span={7}>
                                <FormItem label="年份" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} style={{marginBottom:'0px'}}>
                                    <Select {...DefaultValueBar} style={{width:'100%'}} size="default">
                                        <Option value="2015">2015</Option>
                                        <Option value="2016">2016</Option>
                                        <Option value="2017">2017</Option>
                                        <Option value="2018">2018</Option>
                                        <Option value="2019">2019</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span={7}>
                                <FormItem  style={{marginBottom:'0px'}}>
                                    <Button type="primary" htmlType="submit" size="default" onClick={this.inqueryBar.bind(this)} loading={this.state.BarQueryLading}>查询</Button>
                                    <Button size="default" style={{marginLeft:'10px'}} onClick={this.ExportBar.bind(this)}>导出</Button>
                                </FormItem>
                            </Col>
                        </Row>
                        <div id="bar" style={{ width: '100%', height: '60vh', overflow: 'hidden'}}></div>
                    </TabPane>
                    <TabPane tab="数据" key="3">
                        <Row>
                            <Col span={10}>
                                <FormItem label="行政区划" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} style={{marginBottom:'0px'}} required>
                                    <SelectGroup sign="xzqhAll"  {...getFieldProps('xzqh2')}  handleZoningCode={this.handleZoningCode.bind(this,'xzqhAll')}></SelectGroup>
                                </FormItem>
                            </Col>
                            <Col span={7}>
                                <FormItem label="年份" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} style={{marginBottom:'0px'}}>
                                    <Select {...DefaultValueTable} style={{width:'100%'}} size="default" >
                                        <Option value="2015">2015</Option>
                                        <Option value="2016">2016</Option>
                                        <Option value="2017">2017</Option>
                                        <Option value="2018">2018</Option>
                                        <Option value="2019">2019</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span={7}>
                                <FormItem  style={{marginBottom:'0px'}}>
                                    <Button type="primary" htmlType="submit" size="default" onClick={this.inqueryTable.bind(this)} loading={this.state.TableQueryLading}>查询</Button>
                                    <Button size="default" style={{marginLeft:'10px'}}>导出</Button>
                                </FormItem>
                            </Col>
                        </Row>
                        <div className="queryResults" style={{height: '52.7vh', }}>
                            <Table columns={columns} dataSource={this.state.TableData}  pagination={{pageSize:5}} loading={this.state.TableLoading}/>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

BirthSexRatio = Form.create()(BirthSexRatio);

export default BirthSexRatio;
