import React from 'react';
import {Form,Select} from 'antd';
import echarts from 'echarts'; 

import 'echarts/map/js/china';  

import {getQueryRateByProvince} from "../../../../../Service/srbgs/fgimtpcim/server";
import {chinaMap} from "../../../../../asset/srbgs/js/chinaMap"

const FormItem = Form.Item;
const Option = Select.Option;

require('./closeCase.css')

var config = {
    title:{
        text:'2014年 结案分布',
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
        formatter: function(params){
            console.log('params ===>',params)
            return '<div style="padding:5px 10px;"> <p>'+params.name +' 结案分布：</p>结案率：'+(params.data.value === null ? "0":params.data.value)+'<br/>'
                +'结案数：'+params.data.jas+'<br/>'
                +'立案数：'+params.data.las+'<br/>'
            +'</div>'
        }

    },
    visualMap: { //图例值控制 
        calculable: true,
        show: true, 
        orient:'horizontal',
        bottom: '10%',
        min: 0,
        max: 1,
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
            name: '案件分布 (条)',
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



class closeCase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapdata:[],
        }
    }

    
    async handleGetQueryRateByProvince(param){
        let data,
            xzqhdm = [], // 区划代码 
			newData = [], // 出生数量
			newData_obj = {},
            dataArr = [];
            
        let res = await getQueryRateByProvince(param);  
        // 数据重构
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
                    'value': value.jal,  
                    'jas': value.jas,
                    'las': value.las,

                }
            })
             
            dataArr.push(newData_obj)
        });   

         
        this.setState({
            mapdata: dataArr
        })
        
    }

    
    initPie(id) {
        let myChart = echarts.getInstanceByDom(document.getElementById(id));
        if( myChart === undefined){ 
            myChart = echarts.init(document.getElementById(id));
        }
        myChart.setOption(config)
    }

    async yearSelect(value){ 
        let data;
        data = {
            time: value
        }
        await this.handleGetQueryRateByProvince(data);

        config.series[0].data = this.state.mapdata
        config.title.text = value +'年 结案分布';
        this.initPie('mainMap');
    }

    

    async componentDidMount() {    
        await this.handleGetQueryRateByProvince({ time:'2014'}) 

        config.series[0].data = this.state.mapdata

        this.initPie('mainMap');
    }
 
 

    async componentDidUpdate(){
        this.initPie('mainMap');
    }
 
    render(){   
        return(
            <div className="caseDistribute">  
                <FormItem
                    label="年份" labelCol={{span:2}} wrapperCol={{span:5}} className="yearSelect"> 
                    <Select onChange={this.yearSelect.bind(this)} style={{width:'100%'}}>
                        <Option value="2010">2010年</Option>
                        <Option value="2011">2011年</Option>
                        <Option value="2012">2012年</Option>
                        <Option value="2013">2013年</Option>
                        <Option value="2014">2014年</Option>
                        <Option value="2015">2015年</Option>
                        <Option value="2016">2016年</Option>
                        <Option value="2017">2017年</Option>
                        <Option value="2018">2018年</Option> 
                    </Select>
                </FormItem>
                <div className="Geo">
                    <div id="mainMap" style={{ width: '100%', height: '700px', overflow: 'hidden'}}></div>   
                </div>
            </div>
        )
    }
}

export default closeCase;   