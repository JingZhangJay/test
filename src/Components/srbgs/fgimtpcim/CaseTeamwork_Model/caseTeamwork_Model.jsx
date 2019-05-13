import React from "react";
import {Table, Modal} from 'antd';
import {getCaseCloseReport, getCaseDetail} from "../../../../Service/srbgs/fgimtpcim/server";
import { CaseEnd_Model,CaseInfo_Model } from "../../../../Components"
import { caseEndFile,detailShowModal} from "../../../../asset/srbgs/js/common"

require('./caseTeamwork_Model.css')

class CaseTeamwork_Model extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            caseEndVisible:false,
            data_caseEnd:'',
            data:{},
        }
    }

    // 查看案件详情 请求
    async handleGetCaseDetail(params){
        let data = await getCaseDetail(params);
        this.setState({
            data: data.responseData,
            detailVisible: true,
        });
    }

    // 查看结案报告 请求
    async handleGetCaseEnd(params){
        let data = await getCaseCloseReport(params);
        this.setState({
            data_caseEnd:data.responseData,
            caseEndVisible:true
        })
    }

    // 查看案件详情
    detailShowModal (e){
        // e.preventDefault();
        // let thisAjbh = e.currentTarget.parentNode.parentNode.childNodes[0].innerText;
        // this.handleGetCaseDetail(thisAjbh);
        detailShowModal(e, this, this.handleGetCaseDetail);
    }


    xbajModel(){
        this.props.cancelHandle()
    }

    // 结案报告查看
    caseEnd(e){
        let thisXbAjbh = e.currentTarget.parentNode.parentNode.childNodes[0].innerText;
        caseEndFile(e,this,this.handleGetCaseEnd,thisXbAjbh)
    }

    // 获取结案报告的 Ok 按钮
    CaseEndHandle() {
        this.setState({
            caseEndVisible:false,
            data:""
        })
    }

    // 查看协办案件详情
    handleXbajDetail(e){
        e.preventDefault();
        let thisAjbh = e.currentTarget.parentNode.parentNode.childNodes[0].innerText;
        this.handleGetCaseDetail(thisAjbh);
    }

    // 获取案件详情 的 取消 按钮
    detailHandle(e) {;
        this.setState({
            detailVisible:false,
            data:""
        })
    }

    render() {
        const columns_xbaj = [
            { title: '案件编号', dataIndex: 'xbajbh', key: 'xbajbh'},
            { title: '案件名称', dataIndex: 'xbajmc', key: 'xbajmc',render: (test) => <a href="javascript:;" onClick={this.handleXbajDetail.bind(this)}>{test}</a> },
            { title: '发出单位', dataIndex: 'sqdw', key: 'sqdw' },
            { title: '发出时间', dataIndex: 'sqrq', key: 'sqrq' },
            { title: '接收单位', dataIndex: 'jsdw', key: 'jsdw' },
            { title: '案件状态', dataIndex: 'ajzt', key: 'ajzt' },
            { title: '接收时间', dataIndex: 'jsrq', key: 'jsrq' },
            { title: '结案报告', dataIndex: 'ajzt', key: 'ajzt',render: (text)=> <a href="javascript:;" disabled={text == '已结案' ? false : true} onClick={this.caseEnd.bind(this)}>结案报告</a>}
        ];

        return(
            <div className="caseInfo_Model">
                <Modal title="查看协办案件" visible={this.props.visible} width="54%"
                       onOk={this.xbajModel.bind(this)}
                       onCancel={this.xbajModel.bind(this)} >
                    <Table columns={columns_xbaj}
                           dataSource={this.props.dataSource}
                           className="table"
                           rowKey="id"
                           pagination={{pageSize:5}}
                    />
                </Modal>

                {/*  查看案件信息详情 */}
                <CaseInfo_Model visible={this.state.detailVisible} data={this.state.data} detailShowModal={this.detailShowModal.bind(this)} detailHandle={this.detailHandle.bind(this)} />

                {/* 结案报告 */}
                <CaseEnd_Model visible={this.state.caseEndVisible} data={this.state.data_caseEnd} CaseEndHandle={this.CaseEndHandle.bind(this)}/>
            </div>
        )
    }
}

export default CaseTeamwork_Model;