import React from "react";
import { Select, Row, Col, message } from 'antd';

import { getFindSonCodes, getDetailInfo } from "../../../../Service/srbgs/fgimtpcim/server";
import { placeData, selectZoningCode, clearData , clearObj, ownZoningCode,addZeroAtTail,zeroAtTail} from "../../../../asset/srbgs/js/common"

const Option = Select.Option;

class SelectGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zoningCode:  window.sessionStorage.getItem('zoningCode'),
            assigningCode:  window.sessionStorage.getItem('assigningCode'),
            badwData: { 1: [], 2: [], 3: [] },
            cldwData: { 1: [], 2: [], 3: [] },
            afddData: { 1: [], 2: [], 3: [] , 4: [], 5: []},
            badwDataObj: { 1: "", 2: "", 3: "" },  // 办案单位--xzqhOnly 下拉框选中的值
            cldwDataObj: { 1: "", 2: "", 3: "" },  // 处理单位--xzqhAll 下拉框选中的值
            afddDataObj: { 1: "", 2: "", 3: "" , 4: "", 5: ""},  // 案发地点--xzqhAllSix 下拉框选中的值
            xzqhBadwArr:['','',''],
            xzqhCldwArr:['00','00','00'],
            xzqhAfddArr:['00','00','00','00','00','00'], 
            selectIndex:'',
            postQhdm:'',
            paramsOdd:'', 
            downAndUp: false,
        }
    }

    /**
     * 获取下级区划代码
     * @param {string} sign 拉下框标志
     * @param {string} selectedAssigningCode 区划级次
     * @param {string} value 选中的值-区划代码
     * @param {obj} key 被选中下拉框的对象
     * 
     * 其中sign,selectedAssigningCode 是手动赋予的形参  value,key  是antd onSelect封装好的形参
     */
    handleFindSonCodes(sign, selectedAssigningCode, value, key) {   
        let {badwDataObj, cldwDataObj, afddDataObj} = this.state;

        let tempObj = {};
        let temp;
        var obj = {};
        
        tempObj[selectedAssigningCode] = value;

        //  向父组件传递下拉框所选中的值
        //  下拉框标志并不需要传递, 父组件并不需要接收
        //  由于初始化的时候, 子组件需要向父组件传递  案发地点-即 xzqhOnly 的默认值
        //  而父组件中含有多个相同的子组件, 所以传值考虑使用对象形式, 以便区分是哪个下拉框的值

        //  在下拉框选择完区划,用户重新选择上级区划为全部,即值为空时
        //  需要将选择的区划级次之后的级别代码清空

        if(sign == "xzqhOnly"){
            temp = Object.assign({}, badwDataObj, tempObj);
            this.setState({
                badwDataObj: temp
            },() => {
                //  用户选择存在区划,传所选择的区划代码
                if(value){
                    obj[sign] = value;
                }else{
                    //  选择全部,按级次清空之前所选值
                    clearObj(badwDataObj, selectedAssigningCode-1);
                    for(var key in badwDataObj){
                        if(badwDataObj[key]) {
                            obj[sign] = badwDataObj[key];
                        }else{
                            obj[sign] = "";
                        }
                    }
                }
                this.props.handleZoningCode(obj); 
            })
        }else if(sign == "xzqhAll"){
            temp = Object.assign({}, cldwDataObj, tempObj);
            this.setState({
                cldwDataObj: temp
            }, () => {
                if(value){
                    obj[sign] = value;
                }else{
                    clearObj(cldwDataObj, selectedAssigningCode-1);
                    for(var key in cldwDataObj){
                        if(cldwDataObj[key]) {
                            obj[sign] = cldwDataObj[key];
                        }else{
                            obj[sign] = 0;
                        }
                    }
                }
                this.props.handleZoningCode(obj); 
            })
        }else if(sign == "xzqhAllSix"){
            temp = Object.assign({}, afddDataObj, tempObj);
            this.setState({
                afddDataObj: temp
            }, () => {
                // console.log("=======进了", value)
                if(value){
                    obj[sign] = value;
                }else{
                    clearObj(afddDataObj, selectedAssigningCode-1);
                    for(var key in afddDataObj){
                        if(afddDataObj[key]) {
                            obj[sign] = afddDataObj[key];
                        }else{
                            obj[sign] = "";
                        }
                        // console.log("================你大爷",obj, afddDataObj[key]);
                    }
                }
                // console.log('xzqhAllSix ====》 ',obj)
                this.props.handleZoningCode(obj); 
            })
        }

        

        let postData = {};  
        postData.code = value; 
        this.axiosFindSonCodes(postData, sign, selectedAssigningCode);    
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
 
        }else{
            message.error('请求数据失败！')
        }

        this.setState({
            badwData: badwData,
        })
    }

    /**
     * 获取下级区划
     * @param {string} code 区划代码
     * @param {string} flag 下拉框标志
     * @param {string} assign 区划级次
     */
    async axiosFindSonCodes(params, flag, assign) {  
        // let paramsNew = {};
        // if(params.code == '3'){ 
        //     // console.log( zeroAtTail(  this.state.paramsOdd.code,params.code))  
        //     this.setState({
        //         postQhdm:paramsNew
        //     })
        //     console.log(paramsNew)
        // }else{
        //     paramsNew.code = params.code;
        // }
 
        let res = await getFindSonCodes(params);
        let { cldwData, badwData,afddData, cldwDataObj, badwDataObj,afddDataObj } = this.state;
        let obj = {};
        let tempData = [];  //  一个临时数组,用来存储包含"全部"区划
        let tempObj = {};   //  伪造的一个"全部"区划对象

        if (res.code == "000000") {
            let data = res.responseData;  
            //  级次代码小于4   指到县级就不处理数据
            //  否则会导致下拉框多级出现

            // if(data.length > 0){
            //     tempObj.XZQH_DM = "";
            //     tempObj.XZQH_MC= "全部";
            //     tempObj.JCDM = data[0].JCDM == 1 ? 0 : data[0].JCDM;
            // }

            // data.forEach(item => {
            //     tempData.push(item);
            // })

            // tempData.unshift(tempObj);
            
            if(flag == 'xzqhAllSix'){
                if (data.length > 0 && data[1].JCDM < 7) {
                    obj[data[0].JCDM] = data;
                }
            }else {
                if (data.length > 0 && data[1].JCDM < 4) {
                    obj[data[0].JCDM] = data;
                } 
            } 

            if (flag == "xzqhAll") {
                clearData(cldwData, assign);
                clearObj(cldwDataObj, assign);
                placeData(obj, cldwData);
            } else if (flag == "xzqhAllSix") {  
                clearData(afddData, assign);
                clearObj(afddDataObj, assign);
                placeData(obj, afddData);        
            } else if (flag == "xzqhOnly") {
                clearData(badwData, assign);
                clearObj(badwDataObj, assign);
                placeData(obj, badwData); 
            }
        }

        this.setState({
            cldwData: cldwData,
            badwData: badwData, 
            afddData: afddData,
            cldwDataObj: cldwDataObj,
            badwDataObj: badwDataObj, 
            afddDataObj: afddDataObj,
        })

        // console.log("================>" ,this.state.badwDataObj, this.state.afddDataObj)
     
    }

    componentWillMount() {
        let { zoningCode, assigningCode } = this.state;
        let cldwPostData = {};
        let temp = {};
        let badwPostData = {};
        let badwCode;
        //  根据登录人信息做办案单位下拉框对比
        temp = selectZoningCode(zoningCode, assigningCode); 
 
        //  上一步获取到了登录人所在区划的所有级次代码区划  根据此来判断调用详情信息
        for (var k in temp) {
            this.axiosDetailInfo({ code: temp[k] }); 

            //  拿到登录人的区划信息,也就是办案单位的区划
            if(temp[k]){
                badwCode = temp[k];
            }
        } 

        //  同样,通过对象的方式进行传参,以便区分是哪个下拉框的值

        badwPostData.xzqhOnly = badwCode;
        // console.log('badwPostData ====>',badwPostData)
        this.props.handleZoningCode(badwPostData);

        //  办案单位默认调用一次下级区划查询
        this.axiosFindSonCodes( { code: temp[assigningCode] } , "xzqhOnly")

        //  获取处理单位数据
        cldwPostData.code = "000000000000000";
        this.axiosFindSonCodes(cldwPostData, "xzqhAllSix");
        this.axiosFindSonCodes(cldwPostData, "xzqhAll");

        this.setState({
            badwDataObj: Object.assign({}, this.state.badwDataObj, temp)
        })
    }

    render() { 



        const { cldwData, badwData, afddData } = this.state;

        const loopSelect = (data, sign) => Object.keys(data).map(key => {  
           
            if (sign == "xzqhAllSix") {
                return (
                    <Col span={4} offset={key == '1' ? '0' : '1'}>
                    {
                        this.state.afddDataObj[key] ? 
                        <Select value={this.state.afddDataObj[key]} defaultValue="" onSelect={this.handleFindSonCodes.bind(this,sign,key)} width="100%">
                            <Option value="">全部</Option>
                            {loopOption(data[key])}
                        </Select> :
                        <Select value={this.state.afddDataObj[key]} defaultValue="" onSelect={this.handleFindSonCodes.bind(this,sign,key)} width="100%">
                            <Option value="">全部</Option>
                            {loopOption(data[key])}
                        </Select>
                    }
                        
                    </Col>
                )
            } else if (sign == "xzqhAll") {
                return (
                    <Col span={7} offset={key == '1' ? '0' : '1'}>
                        <Select value={this.state.cldwDataObj[key]} defaultValue="" onSelect={this.handleFindSonCodes.bind(this,sign,key)} style={{width:"100%"}}>
                            <Option value="">全部</Option>
                            {loopOption(data[key])}
                        </Select>
                    </Col>
                )
            } else if (sign == "xzqhOnly") {  
                return (
                    <Col span={7} offset={key == '1' ? '0' : '1'}>
                        {
                            this.state.badwDataObj[key] ?
                                <Select value={this.state.badwDataObj[key]} defaultValue="" onSelect={this.handleFindSonCodes.bind(this,sign,key)} disabled={this.state.badwDataObj[key] ? true : false}  style={{width:"100%"}}>
                                    <Option value="">全部</Option>
                                    {loopOption(data[key])}
                                </Select> :
                                <Select value={this.state.badwDataObj[key]} defaultValue="" onSelect={this.handleFindSonCodes.bind(this,sign,key)} disabled={this.state.badwDataObj[key] ? true : false}  style={{width:"100%"}}>
                                    <Option value="">全部</Option>
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

        if(  this.props.sign == "xzqhOnly" ){
            xzqhOption = loopSelect(badwData, this.props.sign);
        } else 
        if(  this.props.sign == "xzqhAll" ){
            xzqhOption = loopSelect(cldwData, this.props.sign);
        } else
        if(  this.props.sign == "xzqhAllSix" ){
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