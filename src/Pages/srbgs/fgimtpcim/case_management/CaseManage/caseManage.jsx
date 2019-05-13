import React from "react";
import { hashHistory, Link } from "react-router";
import { Form, Input, Row, Col, Button, DatePicker,Cascader,Select,Table, Modal, Card,Icon,Badge,message,Popconfirm} from 'antd';
import { CaseInfo_Model,CaseFile_Model,CaseEnd_Model,CaseAdd_Model,SagrAdd_Model,SadwAdd_Model,CaseTeamwork_Model,CaseBljd_Model,Sadxclxx_Model,SelectGroup} from "../../../../../Components";
import {
    getCaseManage,
    getCaseManageExport,
    getCaseDetail,
    getCaseRelatedCooperation,
    getCaseFile,
    getCaseCloseReport,
    getCaseRating,
    getCaseSupervisionAdd,
    getCaseInfoAdd,
    getCaseObjectList,
    getCaseObjectInfo,
    getCaseIndividualAdd,
    getCaseUnitAdd,
    getCaseProgressListShow,
    getCaseProgressContentShow,
    getCaseIndividualRevise,
    handleGetCaseUnitAdd,
    getCaseDelect,
    getCaseHandleInfoListShow,
} from '../../../../../Service/srbgs/fgimtpcim/server';

import { detailShowModal, caseEndFile, parseTime} from "../../../../../asset/srbgs/js/common"


const FormItem = Form.Item;
const Option = Select.Option;

require("./caseManage.css");


class CaseManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inquiryLoading:false,
            exportLoading:false,
            detailVisible: false,
            thisAjbh:'',
            data:{},
            tableLoading:false,
            visible_xbaj:false,
            caseFileVisible:false,
            data_caseFile: {0: [], 1: [], 2: []},
            caseEndVisible:false,
            data_caseEnd:'',
            caseRateVisible:false,
            caseBDVisible:false,
            caseAddVisible:false,
            addNewData:'',
            message:'',
            objectInvolvedVisible:false,
            SagrAddVisible:false,
            SadwAddVisible:false,
            bljdModalVisible:false,
            bljdContentVisible:false,
            bljdContent:{},
            bljdAjbh:'',
            ajpjTitleL:'',
            ajpjAjbh:'',
            ajdbTitleL:'',
            ajdbAjbh:'',
            visibleThbl: false,
            SagrData:{'xm':''},
            detailData:{},
            caseObjectInfoData:{
                "ajbh":"",
                "xm":"",
                "sasf_mc":"",
                "mz":"",
                "zjhm":"",
                "whcd":"",
                "hjd_mc":"",
                "lxdh":"",
                "saxz_mc":"",
                "zyzg":"",
                "gzdw":"",
                "xb":"",
                "zzmm":"",
                "img":"", 
                "bz":"", 
                "saxz":"", 
                "sfyx":"", 
                "sasf_dm":"", 
                "sagrbh":""
            },
            sadxclxxData:[], 
            sadxclxxVisible: false,
            bljdAjmc:'',
            downAndUp: false,
            sadxclxxAdd:{
                ajbh:'',
                sadxbh:'',
                sadxmc:'',
                tbdw:'',
            },
            pageSize: 5,//每页条数
            pageNum: 1,//当前页码
            totalRecord: "",
            inquiryData: {},
            clickSf:'',
            columns1:[
                { title: '案件编号', dataIndex: 'ajbh', key: 'ajbh' },
                { title: '案件名称', dataIndex: 'ajmc', key: 'ajmc',render: (text) => <a href="javascript:;"  onClick={ this.detailShowModal.bind(this)}>{text}</a>},
                { title: '案件性质', dataIndex: 'ajxz_mc', key: 'ajxz_mc' },
                { title: '立案时间', dataIndex: 'lasj', key: 'lasj' },
                { title: '办案单位', dataIndex: 'bajg_mc', key: 'bajg_mc' },
                { title: '案件状态', dataIndex: 'ajzt', key: 'ajzt'},
                { title: '案件级别', dataIndex: 'ajjb', key: 'ajjb' },
                {
                    title: '协办案件', dataIndex: 'xbajs', key: 'xbajs', render: (text) => <a href="javascript:;" onClick={this.handleXbaj.bind(this)}  disabled={text == '1'? false : true}>查看</a>

                },
                { title: '涉案对象', dataIndex: '', key: '',render: () =>  <a href="javascript:;" onClick={this.handleObjectInvolved.bind(this)}>查看</a>},
                { title: '案件材料', dataIndex: '', key: '',render: () =>  <a href="javascript:;" onClick={this.handleCaseFile.bind(this)}>查看</a>},

                {title:'办理进度',dataIndex: '', key: '',render: () => <a href="javascript:;" onClick={this.handleBljd.bind(this)}>查看</a> },
                { title: '结案报告', dataIndex: 'ajzt', key: 'ajzt',render: (text) => <a href="javascript:;"  disabled={text == '办理中' ? true : false} onClick={this.handleCaseEnd.bind(this)}>查看</a> },
                { title: '操作', dataIndex: '', key: '',render: () =>  <div>
                        <a href="javascript:;" onClick={this.handlecaseRateShow.bind(this)} style={{display:(window.sessionStorage.getItem('assigningCode') !== '0' ? 'none':'')}}>评级 </a>
                        {/* <a href="javascript:;" onClick={this.handlecaseAjdb.bind(this)}> 督办 </a> */}
                        <a href="javascript:;" onClick={this.handlecaseThbl.bind(this)}> 案件质量</a>
                    </div>},
            ],
        }
    }

    // 国家级 查询信息列表
    async getCaseManage(params){
        let data = await getCaseManage(params);
        let tableData1;
        if (data.code == '000000') {
            tableData1 = data.responseData.dataList;
            tableData1.forEach(item => {
                tableData1.push(...item)
            })
            if(data.code == '000000'){
                this.setState({
                    tableData1: tableData1,
                    tableLoading:false,
                    inquiryLoading:false,
                    totalRecord: data.responseData.totalRecord,
                })
            }else{
                message.error('数据获取失败');
                this.setState({ 
                    tableLoading:false,
                    inquiryLoading:false
                })
            }
        }
    }

    // 查看案件详情 请求
    async handleGetCaseDetail(params){
        let data = await getCaseDetail(params);
        if(data.code == '000000'){
            this.setState({
                detailData: data.responseData,
                detailVisible: true,
            });
        }else{
            message.error('数据获取失败')
        }
    }

    // 查看协办案件 请求
    async handleGetCaseRelatedCooperation(params){
        let data = await getCaseRelatedCooperation(params);
        if(data.code == '000000'){
            this.setState({
                data_xbaj: data.responseData,
                visible_xbaj : true,
            });
        }else{
            message.error('数据获取失败')
        }
       
    }

    // 查看案件材料 请求
    async handleGetCaseFile(params){
        let caseFileDom = '';
        let caseFileObj = {};
        let arr = [];
        let data = await getCaseFile(params);
        let caseFile = (data.responseData).map(function (item1,index1,input) {
            arr = []
               item1.forEach(function (item2,index2) {
                       arr.push({ num:item2.num,cllxmc:item2.cllxmc, ajbh:item2.ajbh,cllx:item2.cllx})
                })
            caseFileObj[index1] = arr;
        })
        if(data.code == '000000'){
            this.setState({
                data_caseFile: caseFileObj,
                caseFileVisible : true,
            });
        }else{
            message.error('数据获取失败')
        }
       
    }

    // 查看结案报告 请求
    async handleGetCaseEnd(params){
        let data = await getCaseCloseReport(params);
        if(data.code == '000000'){
            this.setState({
                data_caseEnd:data.responseData,
                caseEndVisible:true
            })
        }else{
            message.error('数据获取失败')
        }
       
    }

    // 案件评级 请求
    async handleGetCaseRating(params){
        let data = await getCaseRating(params); 
        if(data.code == '000000'){
            this.setState({
                caseRateVisible: false,
            });
            message.success('操作成功');
        }else{
            message.error('操作失败');
        }
       
    }

    // 添加案件督办 请求
    async handlegetCaseSupervisionAdd(params){
        let data = await getCaseSupervisionAdd(params); 
        if(data.code == '000000'){
            this.setState({
                visibleThbl: false,
            });
            message.success('操作成功');
        }else{
            message.error('操作失败')
        }
        
    } 

    // 查看涉案对象列表
    async handleGetCaseObjectList(params){
        let data = await getCaseObjectList (params);
        if(data.code == '000000'){
            this.setState({
                caseObjectListData:data.responseData,
                objectInvolvedVisible:true
            })
        }else{
            message.error('数据获取失败')
        }
    }

    // 查看涉案对象详细信息
    async handleGetCaseObjectInfo(params){
        let data = await getCaseObjectInfo(params);
        if(data.code == '000000'){
            if(this.state.sf == '个人'){
                this.setState({
                    SagrData:data.responseData,
                    SagrAddVisible:true
                })
            }else if(this.state.sf == '单位'){
                this.setState({
                    SadwData:data.responseData,
                    SadwAddVisible:true
                })
            }

        }else{
            message.error('数据获取失败')
        }
        
    }

    // // 添加涉案个人 请求
    // async handlegetCaseIndividualAdd(params){
    //     console.log(params)
    //     let data = await getCaseIndividualAdd (params)
    //     console.log(data)
    //     if(data.code == '999999'){
    //         message.error('数据提交失败');
    //     }else {
    //         message.success('数据提交成功');
    //     }
    // }

    // // 添加涉案单位 请求
    // async handleGetCaseUnitAdd(params){
    //     console.log(params)
    //     let data = await getCaseUnitAdd (params)
    //     if(data.code == '999999'){
    //         message.error('数据提交失败');
    //     }else {
    //         message.success('数据提交成功');
    //     }
    // }

    // // 修改涉案个人 请求
    // async handleGetCaseIndividualRevise(params){
    //     let data = await getCaseIndividualRevise(params)
    //     if(data.code == '999999'){
    //         message.error('数据提交失败');
    //     }else if(data.code == '000000'){
    //         message.success('数据提交成功');
    //     }
    // }

    // // 修改涉案单位 请求
    // async handleGetCaseUnitRevise(params){
    //     let data = await getCaseUnitRevise(params)
    //     if(data.code == '999999'){
    //         message.error('数据提交失败');
    //     }else if(data.code == '000000'){
    //         message.success('数据提交成功');
    //     }
    // }

    // 删除涉案对象
    async handleGetCaseDelect(params){
        let data = await getCaseDelect(params);
        data.code == '000000' ? message.success('数据删除成功') : message.error('数据删除失败');
    }

    // 办理进度 请求
    async handleGetCaseProgressListShow (params){ 
       let data = await getCaseProgressListShow(params); 
       if(data.code == '000000'){
            this.setState({
                bljdList:data.responseData.dataList,
                bljdModalVisible:true
            })
       }else{
           message.error('数据获取失败')
       }
    }
 
    // 查看涉案对象处理信息 请求
    async handleGetCaseHandleInfoListShow(params){
        let data = await getCaseHandleInfoListShow(params);
        if(data.code == '000000'){ 
            this.setState({
                sadxclxxData: data.responseData.dataList,
                sadxclxxVisible:true, 
            })
        }else{
            message.error('数据请求失败！')
        }
    }

    // 查看案件详情
    detailShowModal (e){
        e.preventDefault();
        // let thisAjbh = e.currentTarget.parentNode.parentNode.childNodes[0].innerText;
        // this.handleGetCaseDetail(thisAjbh);
        detailShowModal(e, this, this.handleGetCaseDetail);
    }


    // 获取案件详情 的 取消 按钮
    detailHandle(e) {
        this.setState({
            detailVisible:false,
            data:""
        })
    }

    // 查询 和 导出
    handle(callback,e) {
        // event.returnValue = false;
        let data;
        this.props.form.validateFields((errors,values) => {
            console.log("============>values", values);
            data = {
                ajbh:(values.ajbh == undefined ? '': values.ajbh),
                afdd: (values.afdd == undefined ? '': values.afdd),
                badw: (values.badw == undefined ? '': values.badw), 
                ajjb: (values.ajjb == undefined ? '': values.ajjb),
                ajxz: (values.ajxz == undefined ? '': values.ajxz),
                ajzt: (values.ajzt == undefined ? '': values.ajzt),
                lasj: parseTime(values.lasj),
                lasjEnd: parseTime(values.lasjEnd),  
                afsj: parseTime(values.afsj), 
                afsjEnd: parseTime(values.afsjEnd), 
                jasj: parseTime(values.jasj), 
                jasjEnd: parseTime(values.jasjEnd), 
            };
        }); 
        if(callback == 'handleSubmit'){
            console.log("===========>", data.badw);
            data.pageNum =  this.state.pageNum;
            data.pageSize = this.state.pageSize;
            this.setState({
                inquiryData:data,
                inquiryLoading:true,
                tableLoading:true,
            })
            this.getCaseManage(data);

        }else if(callback == 'handleExport'){
            getCaseManageExport(
                    '?ajbh='+data.ajbh+
                    '&ajxz='+data.ajxz+
                    '&afsj='+data.afsj+
                    '&afsjEnd='+data.afsjEnd+
                    '&lasj='+data.lasj+
                    '&lasjEnd='+data.lasjEnd+
                    '&afdd='+data.afdd+
                    '&ajjb='+data.ajjb+
                    '&ajzt='+data.ajzt+
                    '&badw='+data.badw+
                    '&jasj='+data.jasj+
                    '&jasjEnd='+data.jasjEnd
            )

        }
    }

    // 查看协办案件
    handleXbaj(e){
        e.preventDefault();
        let thisAjbh = e.currentTarget.parentNode.parentNode.childNodes[0].innerText;
        this.handleGetCaseRelatedCooperation(thisAjbh)
    }

    //  查看协办案件 model 的隐藏
    xbajModel(){
        this.setState({
            visible_xbaj : false,
            data_xbaj:""
        });
    }


    // 查看案件材料
    handleCaseFile(e){
        e.preventDefault();
        let thisAjbh = e.currentTarget.parentNode.parentNode.childNodes[0].innerText;
        this.handleGetCaseFile(thisAjbh)
    }

    // 查看案件材料 取消 按钮
    CaseFileHandle(e) {;
        this.setState({
            caseFileVisible:false,
            data:""
        })
    }

    // 查看结案报告
    handleCaseEnd(e){
        // e.preventDefault();
        let thisAjbh = e.currentTarget.parentNode.parentNode.childNodes[0].innerText;
        // this.handleGetCaseEnd(thisAjbh)
        caseEndFile(e,this,this.handleGetCaseEnd,thisAjbh)
    }

    // 获取结案报告的 Ok 按钮
    CaseEndHandle() {
        this.setState({
            caseEndVisible:false,
            data:""
        })
    }

    // 案件评级
    handlecaseRate(e){ 
        let params = {
            ajbh:this.state.ajpjAjbh,
            ajjb:this.props.form.getFieldValue('ajpjAjjb'),
            tbdw:'370201000000000'
        } 
        this.handleGetCaseRating(params)
    }

    // 案件评级的 显示
    handlecaseRateShow(e){ 
        this.setState({
            ajpjAjbh:e.currentTarget.parentNode.parentNode.parentNode.childNodes[0].innerText,
            ajpjTitle:e.currentTarget.parentNode.parentNode.parentNode.childNodes[1].innerText,
            caseRateVisible:true,
        })
    }
    // 案件评级的 取消 按钮
    caseRateHandleHide() { 
        this.setState({
            caseRateVisible:false,
        })
    }

    // 添加案件督办
    // caseBDOk(e){  
    //     let params = {
    //         ajbh: this.state.ajdbAjbh,
    //         dblx: this.props.form.getFieldValue('tjdbDblx'),
    //         dbsm: this.props.form.getFieldValue('tjdbCzsm'),
    //         dbdw:'370201000000000'
    //     }
    //     this.handlegetCaseSupervisionAdd(params)
    // }

    // 添加案件督办 展示
    // handlecaseAjdb(e){ 
    //     this.setState({
    //         ajdbAjbh: e.currentTarget.parentNode.parentNode.parentNode.childNodes[0].innerText,
    //         ajdbTitle: e.currentTarget.parentNode.parentNode.parentNode.childNodes[1].innerText,
    //         caseBDVisible: true,
    //     })
    // }

    // 添加案件督办的 取消 按钮
    // caseBDCancel(){
    //     this.setState({
    //         caseBDVisible: false,
    //     })
    // }

    // 退回办理弹框展示
    handlecaseThbl(e){
        this.setState({
            thblAjbh: e.currentTarget.parentNode.parentNode.parentNode.childNodes[0].innerText,
            thblTitle: e.currentTarget.parentNode.parentNode.parentNode.childNodes[1].innerText,
            visibleThbl: true
        })
    }

    // 退回办理
    thblOk(e){  
        let params = {
            ajbh: this.state.thblAjbh,
            dblx: this.props.form.getFieldValue('thblDblx'),
            dbsm: this.props.form.getFieldValue('thblCzsm'),
            dbdw: window.sessionStorage.getItem('zoningCode')
        }
        this.handlegetCaseSupervisionAdd(params)
    }

    // 退回办理的 取消 按钮
    thblCancel(){
        this.setState({
            visibleThbl: false,
        })
    }


    // 新增案件信息
    HandlecaseAdd(){
        this.setState({
            caseAddVisible:true
        });
    }

    // 新增案件信息的 取消 按钮
    caseAddHandle(){
        this.setState({
            caseAddVisible:false
        })
    }

    // 涉案对象
    handleObjectInvolved(e){
        e.preventDefault();
        let thisAjbh = e.currentTarget.parentNode.parentNode.childNodes[0].innerText;
        this.setState({
            SaAjbh:thisAjbh
        })
        this.handleGetCaseObjectList(thisAjbh)
    }

    // 涉案对象 的 取消 按钮
    objectInvolvedHandle(){
        this.setState({
            objectInvolvedVisible:false
        })
    }

    // 涉案对象 的详情展示
    handleObjectDetail(e){
        let data = {
            ajbh:this.state.caseObjectListData[0].ajbh,
            sf:e.currentTarget.parentNode.parentNode.childNodes[5].innerText,
            dxbh:e.currentTarget.parentNode.parentNode.childNodes[3].innerText,
        };
        this.setState({
            clickSf:'详情',
            sf:e.currentTarget.parentNode.parentNode.childNodes[5].innerText,
        })
        this.handleGetCaseObjectInfo(data)
    }

    // 涉案个人添加
    sagrAdd(){
        this.setState({
            SagrAddVisible:true,
            clickSf:'修改'
        })

    }

    // 涉案个人添加 的 取消 按钮
    sagrAddHandle(){
        this.setState({
            SagrAddVisible:false
        })
    }

    // 涉案单位添加
    sadwAdd(){
        this.setState({
            SadwAddVisible:true
        })
    }

    // 涉案单位添加 的 取消 按钮
    sadwAddHandle(){
        this.setState({
            SadwAddVisible:false
        });
    }

    // 涉案对象 修改
    sadxRevise(e){
        let thisNodeName =  e.currentTarget.parentNode.parentNode.parentNode.childNodes[5].innerText;
        console.log(thisNodeName)
        let data = {
            ajbh:this.state.caseObjectListData[0].ajbh,
            sf: thisNodeName,
            dxbh:e.currentTarget.parentNode.parentNode.parentNode.childNodes[3].innerText,
        };
        if( thisNodeName == '个人'){
            // this.handleGetCaseIndividualRevise();
            console.log(this.state.SaAjbh)
            this.setState({
                clickSf:'修改',
                SagrAddVisible:true,
                sf: thisNodeName,
            })
            this.handleGetCaseObjectInfo(data);
        }else if( thisNodeName  == '单位'){
            this.handleGetCaseObjectInfo(data);
            this.setState({
                SadwAddVisible:true,
                clickSf:'修改',
                sf: thisNodeName,
            })
        }

    }

    // 涉案对象列表 删除
    sadxDel(e){
        let data = {
            ajbh:this.state.caseObjectListData[0].ajbh,
            sf: e.currentTarget.parentNode.parentNode.parentNode.childNodes[5].innerText,
            sadxbh: e.currentTarget.parentNode.parentNode.parentNode.childNodes[3].innerText,
        }
        this.handleGetCaseDelect(data)
    }

    // 涉案对象处理信息 隐藏
    SadxclxxHandle(e){
        this.setState({
            sadxclxxVisible:false, 
        })
    }

    // 涉案对象处理信息 确定
    handleClxx(e){ 
        let data = {
            ajbh:this.state.SaAjbh,
            sadxbh: e.currentTarget.parentNode.parentNode.childNodes[3].innerText,
            pageNum:'1',
            pageSize: '10'
        }
        this.setState({
            sadxclxxAdd:{
                ajbh: this.state.SaAjbh,
                sadxbh: e.currentTarget.parentNode.parentNode.childNodes[3].innerText,
                sadxmc: e.currentTarget.parentNode.parentNode.childNodes[0].innerText,
                tbdw: window.sessionStorage.getItem('zoningCode'),
            }
        })
        this.handleGetCaseHandleInfoListShow(data)
    }

    // 办理进度
    handleBljd(e){
        let data = {
            ajbh:e.currentTarget.parentNode.parentNode.childNodes[0].innerText,
            pageNum:1,
            pageSize:100
        };
        this.setState({
            bljdAjbh:e.currentTarget.parentNode.parentNode.childNodes[0].innerText,
            bljdAjmc:e.currentTarget.parentNode.parentNode.childNodes[1].innerText,
        })
        this.handleGetCaseProgressListShow(data)
    }

    // 办理进度 的 取消 按钮
    bljdHandle(e){
        this.setState({
            bljdModalVisible:false
        })
    }

    // 办理进度 进度内容
    handleBljContent(e){
        let data = {
            ajbh:this.state.ajbh,
            jdbh:e.currentTarget.parentNode.parentNode.childNodes[0].innerText,
        }
        this.handleGetCaseProgressContentShow(data);

    }

    // 办理进度 的 取消 按钮
    bljContentdHandle(){
        this.setState({
            bljdContentVisible:false
        })
    }


    normFile(e) {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }


   
 
    // 区划下拉框的 Value
    handleZoningCode(test,e){
        // console.log(test, e);
        for(var key in e) {
            if (key == "xzqhOnly") {
                this.props.form.setFieldsValue({
                    "badw": e[key]
                })
            } else if (key == "xzqhAllSix") {
                this.props.form.setFieldsValue({
                    "afdd": e[key]
                })
            }
        }
    }

    // // 新增涉案个人 数据
    // NewSagrInfo(data){
    //     data.ajbh = this.state.SaAjbh;
    //     this.handlegetCaseIndividualAdd(data)
    // }

    // // 新增涉案单位 数据
    // NewSadwInfo(data){
    //     console.log(data)
    //     data.ajbh = this.state.SaAjbh;
    //     this.handleGetCaseUnitAdd(data)
    // }

    // 收起 搜素框
    downAndUpHandel(){
        // document.getElementsByClassName('formConten')[0].className='formConten up'
        let {downAndUp} = this.state; 
        this.setState({
            downAndUp: !downAndUp
        })
    }

    componentWillMount(){
        let { columns1 } = this.state;
        let newColumns = [];
        if(window.sessionStorage.getItem('assigningCode') == '0'){
            columns1.splice(4,2);
            columns1.splice(6,1);
            this.setState({
                columns1: columns1
            })
        }
    }

    render() {
        const { getFieldProps } = this.props.form;

        // 查询结果 Table 数据


        const columns_xbaj = [
            { title: '案件编号', dataIndex: 'xbajbh', key: 'xbajbh'},
            { title: '案件名称', dataIndex: 'xbajmc', key: 'xbajmc',render: (test) => <a href="javascript:;" onClick={this.handleXbajDetail.bind(this)}>{test}</a> },
            { title: '发出单位', dataIndex: 'sqdw', key: 'sqdw' },
            { title: '发出时间', dataIndex: 'sqrq', key: 'sqrq' },
            { title: '接收单位', dataIndex: 'jsdw', key: 'jsdw' },
            { title: '案件状态', dataIndex: 'ajzt', key: 'ajzt' },
            { title: '接收时间', dataIndex: 'jsrq', key: 'jsrq' },
            { title: '结案报告', dataIndex: 'ajzt', key: 'ajzt' ,render: (text)=>  <a href="javascript:;" disabled={text == '已结案' ? false : true} onClick={this.caseEnd.bind(this)}>结案报告</a>}
        ];

        const columns_sadxAdd = [
            { title: '对象名称', dataIndex: 'dxmc', key: 'dxmc', render:(text)=> <a href="javascript:;" onClick={this.handleObjectDetail.bind(this)}>{text}</a>},
            { title: '户籍（管理）地', dataIndex: 'hjd', key: 'hjd'},
            { title: '涉案身份', dataIndex: 'sasf', key: 'sasf' },
            { title: '对象编号', dataIndex: 'dxbh', key: 'dxbh',filterDropdownVisible:false,visible:false},
            { title: '涉案性质', dataIndex: 'saxz', key: 'saxz' },
            { title: '身份', dataIndex: 'sf', key: 'sf' },
            { title: '证件号码', dataIndex: 'zjhm', key: 'zjhm' },
            { title: '处理信息', dataIndex: '', key: '',render:()=> <a href="javascript:;" onClick={this.handleClxx.bind(this)}>处理</a>},
            { title: '操作', dataIndex: '', key: '' ,render: ()=>  {
                return (
                    <div>
                        <a href="javascript:;" onClick={this.sadxRevise.bind(this)}>修改</a>
                        {/*<Popconfirm title="确定要删除这个任务吗？" onConfirm={this.sadxDel.bind(this)}> */}
                            <a href="javascript:;" onClick={this.sadxDel.bind(this)}>删除</a>
                        {/*</Popconfirm>*/}
                     </div>
                     )
                }
            }
        ]


        const columns_bljd = [
            { title: '进度编号', dataIndex: 'jdbh', key: 'jdbh'},
            { title: '进度名称', dataIndex: 'jdmc', key: 'jdmc'},
            { title: '上报时间', dataIndex: 'sbsj', key: 'sbsj' },
            { title: '上报单位', dataIndex: 'sbdw', key: 'sbdw' },
            { title: '进度内容', dataIndex: 'jdms', key: 'jdms',render:(text)=> <a href="javascript:;" onClick={this.handleBljContent.bind(this)}>{text}</a>},
        ]

        const pagination = {
            _this: this,
            total: this.state.totalRecord,
            pageSize: this.state.pageSize,
            onChange(current) {
                let postData = this._this.state.inquiryData;
                postData.pageSize = this._this.state.pageSize;
                postData.pageNum = current;
                this._this.getCaseManage(postData);
                this._this.setState({
                    tableLoading: false,
                })
            },
        };

        return(
            <div>
                <div className="formBox">
                    <div className="formTitle">
                        案件管理
                        <p className={`downAndUp ${this.state.downAndUp ? 'rotate' : ''}`} onClick={this.downAndUpHandel.bind(this)}></p>
                    </div>
                    <div className={`formConten ${this.state.downAndUp ? 'up' : ''}`}>
                        <Form horizontal className="ant-advanced-search-form" onSubmit={this.handle.bind(this)}>
                            <Row>
                            <Col sm={7}>
                                    <FormItem
                                        label="案件性质"
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        hasFeedback
                                    >
                                        <Select {...getFieldProps('ajxz')} >
                                            <Option value="570">非医学需要鉴定胎儿性别</Option>
                                            <Option value="571">非法终止妊娠</Option>
                                            <Option value="572">“两非”中介</Option>
                                            <Option value="574">出售相关药品</Option>
                                            <Option value="575">溺弃女婴</Option>
                                            <Option value="576">其他</Option>
                                        </Select>
                                    </FormItem>
 
                                    <FormItem
                                        label="案件状态"
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        hasFeedback
                                    >
                                        <Select {...getFieldProps('ajzt')} >
                                            <Option value="901">办理中</Option>
                                            <Option value="902">已结案</Option>
                                            <Option value="904">移交办理中</Option>
                                            <Option value="903">已注销</Option>
                                            <Option value="905">申请注销中</Option>
                                        </Select>
                                    </FormItem>
                                    <FormItem
                                        label="案件级别"
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        hasFeedback
                                    >
                                        <Select {...getFieldProps('ajjb')} >
                                            <Option value="1">一般案件</Option>
                                            <Option value="2">重点案件</Option>
                                        </Select>
                                    </FormItem>
                                </Col>

                                <Col sm={8}>
                                    <FormItem
                                        label="案件编号"
                                        labelCol={{ span: 7 }}
                                        wrapperCol={{ span: 17 }}
                                        hasFeedback
                                    >
                                        <Input placeholder="请输入案件编号" size="default"  {...getFieldProps('ajbh')}/>
                                    </FormItem>
                                    <FormItem
                                        label="立案时间"
                                        labelCol={{ span: 7 }}
                                        hasFeedback
                                        help
                                    >
                                        <Col span="8">
                                            <FormItem >
                                                <DatePicker {...getFieldProps('lasj')}/>
                                            </FormItem>
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8">
                                            <FormItem>
                                                <DatePicker {...getFieldProps('lasjEnd')}/>
                                            </FormItem>
                                        </Col>
                                    </FormItem> 
                                    <FormItem
                                        label="结案时间"
                                        labelCol={{ span: 7 }}
                                        help
                                        hasFeedback
                                    >
                                        <Col span="8">
                                            <FormItem >
                                                <DatePicker {...getFieldProps('jasj')}/>
                                            </FormItem>
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8">
                                            <FormItem>
                                                <DatePicker {...getFieldProps('jasjEnd')}/>
                                            </FormItem>
                                        </Col>
                                    </FormItem>
                                </Col>
                                
                                <Col sm={9}>

                                    <FormItem
                                        label="案发时间"
                                        labelCol={{ span: 6 }}
                                        hasFeedback
                                        help
                                    >
                                        <Col span="8">
                                            <FormItem >
                                                <DatePicker {...getFieldProps('afsj')} />
                                            </FormItem>
                                        </Col>
                                        <Col span="1">
                                            <p className="ant-form-split">-</p>
                                        </Col>
                                        <Col span="8">
                                            <FormItem>
                                                <DatePicker {...getFieldProps('afsjEnd')}/>
                                            </FormItem>
                                        </Col>
                                    </FormItem>

                                    <FormItem
                                        label="办案单位"
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }} 
                                    >
                                        {/* <Cascader options={this.state.areaData} {...getFieldProps('badw')} /> */}
                                        <SelectGroup sign="xzqhOnly"  {...getFieldProps('badw')}  handleZoningCode={this.handleZoningCode.bind(this,'xzqhOnly')}></SelectGroup>
                                    </FormItem> 
                                </Col>
                            </Row>
                            <Row  gutter={72}>
                                <Col> 
                                    <FormItem
                                        label="案发地点"
                                        labelCol={{span: 2}}
                                        wrapperCol={{span: 18}}
                                         
                                    >
                                        {/* <Cascader options={this.state.areaData} {...getFieldProps('afdd')} /> */}
                                        <SelectGroup sign="xzqhAllSix"  {...getFieldProps('afdd')}  handleZoningCode={this.handleZoningCode.bind(this,'xzqhAllSix')}></SelectGroup>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} style={{ textAlign: 'left' }}>
                                    <Button type="dashed" style={{marginLeft:'2%',display:(window.sessionStorage.getItem('assigningCode') == '2' ? 'block' : 'none')}} className="caseAdd" onClick={this.HandlecaseAdd.bind(this)} >
                                        <Icon type="plus-circle" />
                                        新增案件
                                    </Button>
                                </Col>
                                <Col span={12} style={{ textAlign: 'right' }}>
                                    <Button type="primary" onClick={this.handle.bind(this,'handleSubmit')} loading={this.state.inquiryLoading}>查询</Button>
                                    <Button onClick={this.handle.bind(this,'handleExport')} loading={this.state.exportLoading} >导出</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
                <div className="queryResults">
                    <Table columns={this.state.columns1}
                           dataSource={this.state.tableData1}
                           className="table"
                           rowKey="id"
                           loading={this.state.tableLoading}
                           pagination={pagination}
                    />
                </div>

                {/* 案件评级 */}
                <Modal title="案件评级" visible={this.state.caseRateVisible} width="54%"
                    onOk={this.handlecaseRate.bind(this)}
                    onCancel={this.caseRateHandleHide.bind(this)}
                    >
                    <FormItem
                        label="案件名称"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Input value={this.state.ajpjTitle}/>
                    </FormItem>
                    <FormItem
                        label="案件级别"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Select defaultValue=""  style={{"width":"100%"}} {...getFieldProps('ajpjAjjb')}>
                            <Option value="">请选择</Option>
                            <Option value="1">一般案件</Option>
                            <Option value="2">重点案件</Option>
                        </Select>
                    </FormItem>
                </Modal>

                {/* 退回办理 */}
                <Modal title="退回办理" visible={this.state.visibleThbl} width="54%"
                    onOk={this.thblOk.bind(this)}
                    onCancel={this.thblCancel.bind(this)}>
                    <FormItem
                        label="案件名称"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Input  value={this.state.thblTitle}/>
                    </FormItem>
                    <FormItem
                        label="案件质量"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Select {...getFieldProps('thblDblx')} defaultValue="退回办理" style={{"width":"100%"}}>
                            <Option value="973">退回办理</Option>
                            <Option value="972">案件存疑</Option>
                            <Option value="971">合格</Option>
                            <Option value="970">未评定</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        label="质量监督"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Input type="textarea" rows="3" {...getFieldProps('thblCzsm')} />
                    </FormItem>
                </Modal>

                {/* 协办案件 */}
                <CaseTeamwork_Model dataSource={this.state.data_xbaj} visible={this.state.visible_xbaj} cancelHandle={this.xbajModel.bind(this)}/>

                {/* 添加案件督办 */}
                {/* <Modal title="添加案件督办" visible={this.state.caseBDVisible}
                    onOk={this.caseBDOk.bind(this)}
                    onCancel={this.caseBDCancel.bind(this)}
                    >
                    <FormItem
                        label="案件名称"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Input value={this.state.ajdbTitle}/>
                    </FormItem>
                    <FormItem
                        label="督办类型"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Select defaultValue=" "  style={{"width":"100%"}}  {...getFieldProps('tjdbDblx')}>
                            <Option value=" ">请选择</Option>
                            <Option value="631">超时未结案</Option>
                            <Option value="632">协办不配合</Option>
                            <Option value="633">协办拒绝两次以上</Option>
                            <Option value="634">未按时上报进度</Option>
                            <Option value="635">重点案件</Option>
                            <Option value="636">及时督办</Option>
                            <Option value="637">退回存疑</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        label="操作说明"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                       <Input type="textarea" rows="3" value=""  {...getFieldProps('tjdbCzsm')} />
                    </FormItem>
                </Modal> */}

                {/* 添加涉案列表 */}
                <Modal title="新增/修改涉案对象" visible={this.state.objectInvolvedVisible} width="60%"
                    onOk={this.objectInvolvedHandle.bind(this)} onCancel={this.objectInvolvedHandle.bind(this)} >
                    <Row style={{marginBottom:16}}>
                        <Col sm={12} style={{ textAlign: 'center' }}>
                            <Button type="primary" onClick={this.sagrAdd.bind(this)}>  <Icon type="plus-circle" /> 添加涉案个人</Button>
                        </Col>
                        <Col sm={12} style={{ textAlign: 'center' }}>
                            <Button onClick={this.sadwAdd.bind(this)}>  <Icon type="plus-circle" /> 添加涉案单位</Button>
                        </Col>  
                    </Row>
                    <Table columns={columns_sadxAdd}
                           dataSource={this.state.caseObjectListData}
                           className="table"
                           pagination={{pageSize:5}} />
                </Modal>

                {/* 添加涉案个人 */}
                <SagrAdd_Model visible={this.state.SagrAddVisible} 
                    SagrAddHandle={this.sagrAddHandle.bind(this)} 
                    SaAjbh = {this.state.SaAjbh}
                    SagrData={this.state.SagrData} clickSf={this.state.clickSf}/>

                {/* 添加涉案单位 */}
                <SadwAdd_Model visible={this.state.SadwAddVisible}  
                     SaAjbh = {this.state.SaAjbh} SadwData={this.state.SadwData}
                     SadwAddHandle={this.sadwAddHandle.bind(this)}  clickSf={this.state.clickSf}
                    />

                {/* 涉案对象处理信息 */}
                <Sadxclxx_Model visible={this.state.sadxclxxVisible}  SadxclxxHandle={this.SadxclxxHandle.bind(this)}  sadxclxxData={this.state.sadxclxxData} sadxclxxAddData={this.state.sadxclxxAdd}/>  

                {/* 办理进度 */}
                <CaseBljd_Model visible={this.state.bljdModalVisible} data={this.state.bljdList} cancelHandle={this.bljdHandle.bind(this)} bljdAjbh={this.state.bljdAjbh} bljdAjmc={this.state.bljdAjmc}/>

                {/*  查看案件信息详情  */}
                <CaseInfo_Model visible={this.state.detailVisible} data={this.state.detailData} detailShowModal={this.detailShowModal.bind(this)} detailHandle={this.detailHandle.bind(this)} />

                {/* 案件材料 */}
                <CaseFile_Model visible={this.state.caseFileVisible} data={this.state.data_caseFile} CaseFileHandle={this.CaseFileHandle.bind(this)} addBtnVisible='none'/>

                {/* 查看结案报告 */}
                <CaseEnd_Model visible={this.state.caseEndVisible} data={this.state.data_caseEnd} CaseEndHandle={this.CaseEndHandle.bind(this)}/>

                {/* 新增案件信息 */}
                <CaseAdd_Model visible={this.state.caseAddVisible} CaseAddHandle={this.caseAddHandle.bind(this)} />
 
            </div>
        )
    }
}

CaseManage = Form.create()(CaseManage);

export default CaseManage;