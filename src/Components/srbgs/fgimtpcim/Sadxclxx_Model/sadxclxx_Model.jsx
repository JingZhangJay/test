import React from "react";
import {Table, Modal, Form, Input,Button,Icon, message,Popconfirm,DatePicker} from 'antd';
import {parseTime,disabledDate} from '../../../../asset/srbgs/js/common';
import {SelectGroup } from '../../../../Components/index'
import {getCaseHandleInfoAdd,getCaseHandleInfoDelect,getCaseHandleInfoListShow} from '../../../../Service/srbgs/fgimtpcim/server';
require('./sadxclxx_Model.css');

//涉案个人处理类型
const sadxcflxList = [
    {
        clmc: '判有期徒刑',
        cllx: '追究刑事责任',
        clsm: '判有期徒刑**个月',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '拘役缓刑',
        cllx: '追究刑事责任',
        clsm: '拘役**天，缓期%%天执行',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '判有期徒刑缓刑',
        cllx: '追究刑事责任',
        clsm: '判有期徒刑**个月，缓期%%个月执行',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '管制',
        cllx: '追究刑事责任',
        clsm: '管制**天',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '拘役',
        cllx: '追究刑事责任',
        clsm: '拘役**天',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '逮捕',
        cllx: '追究刑事责任',
        clsm: '逮捕证号：**',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '刑事拘留',
        cllx: '追究刑事责任',
        clsm: '刑事拘留**天',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '取保候审',
        cllx: '追究刑事责任',
        clsm: '取保候审**天',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '监视居住',
        cllx: '追究刑事责任',
        clsm: '监视居住**天',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '并处罚金',
        cllx: '追究刑事责任',
        clsm: '并处罚金**元',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '警告',
        cllx: '当政纪处分_党纪处分',
        clsm: '党内警告',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '严重警告',
        cllx: '当政纪处分_党纪处分',
        clsm: '党内严重警告',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '撤销党内职务',
        cllx: '当政纪处分_党纪处分',
        clsm: '撤销党内职务',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '留党察看',
        cllx: '当政纪处分_党纪处分',
        clsm: '留党察看',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '开除党籍',
        cllx: '当政纪处分_党纪处分',
        clsm: '开除党籍',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '警告',
        cllx: '当政纪处分_政纪处分',
        clsm: '行政警告',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '记过',
        cllx: '当政纪处分_政纪处分',
        clsm: '行政记过',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '记大过',
        cllx: '当政纪处分_政纪处分',
        clsm: '行政记大过',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '降级',
        cllx: '当政纪处分_政纪处分',
        clsm: '行政降级',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '撤销行政职务',
        cllx: '当政纪处分_政纪处分',
        clsm: '撤销行政职务',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '开除公职',
        cllx: '当政纪处分_政纪处分',
        clsm: '开除公职',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '解除聘用合同',
        cllx: '当政纪处分_政纪处分',
        clsm: '解除聘用合同',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '没收医疗器械',
        cllx: '行政处罚个人',
        clsm: '没收医疗器械**件',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '不批准再生育',
        cllx: '行政处罚个人',
        clsm: '不批准再生育',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '解除劳动关系',
        cllx: '行政处罚个人',
        clsm: '解除劳动关系',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '批评教育',
        cllx: '行政处罚个人',
        clsm: '批评教育',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '落实长效节育措施',
        cllx: '行政处罚个人',
        clsm: '处罚结果_行政处罚个人',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '吊销助理医师证书',
        cllx: '行政处罚个人',
        clsm: '吊销助理医师证书号：**',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '吊销护士执业证书',
        cllx: '行政处罚个人',
        clsm: '吊销护士执业证书号：**',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '其他',
        cllx: '行政处罚个人',
        clsm: '备注：**',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '没收B超',
        cllx: '行政处罚个人',
        clsm: '没收B超**台',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '没收非法所得',
        cllx: '行政处罚个人',
        clsm: '没收非法所得**元',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '没收药品',
        cllx: '行政处罚个人',
        clsm: '没收药品**克',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '罚款',
        cllx: '行政处罚个人',
        clsm: '罚款**元',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '行政拘留',
        cllx: '行政处罚个人',
        clsm: '行政拘留**天',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '吊销执业医师证书',
        cllx: '行政处罚个人',
        clsm: '吊销执业医师证书号：**',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '吊销乡村医生证书',
        cllx: '行政处罚个人',
        clsm: '吊销乡村医生证书号：**',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '注销生育证',
        cllx: '行政处罚个人',
        clsm: '注销生育证号：**',
        cldw: '',
        clsj: '',
    }
]


//涉案单位处理类型
const sadwcflxList = [
    {
        clmc: '没收医疗器械',
        cllx: '行政处罚单位',
        clsm: '没收医疗器械**件',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '没收B超',
        cllx: '行政处罚单位',
        clsm: '没收B超**台',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '吊销机构执业许可证',
        cllx: '行政处罚单位',
        clsm: '吊销机构执业许可证号：**',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '取缔医疗机构',
        cllx: '行政处罚单位',
        clsm: '取缔医疗机构执业证号：**',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '取消医疗科目',
        cllx: '行政处罚单位',
        clsm: '取缔医疗机构：**',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '罚款',
        cllx: '行政处罚单位',
        clsm: '罚款**元',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '没收非法所得',
        cllx: '行政处罚单位',
        clsm: '没收非法所得**元',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '没收药品',
        cllx: '行政处罚单位',
        clsm: '没收药品**克',
        cldw: '',
        clsj: '',
    },
    {
        clmc: '其他',
        cllx: '行政处罚单位',
        clsm: '备注：**',
        cldw: '',
        clsj: '',
    }
]

class sadxclxx_Model extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            cljglrVisible: false
        }
    }
    
    // 新增处理信息 请求
    async handleGetCaseHandleInfoAdd(params){
        let data = await getCaseHandleInfoAdd(params);
        if(data.code == '000000'){
            console.log(data)
        }else{
            message.error('数据请求失败！')
        }
    }   

    // 删除处理信息 请求
    async handleGetCaseHandleInfoDelect(params){
        let data = await getCaseHandleInfoDelect(params);
        if(data.code == '000000'){
            console.log(data)
            message.success('删除成功！');
        }else{
            message.error('删除失败！')
        }
    }

    // 隐藏 弹框
    handleCancel(){
        this.props.SadxclxxHandle()
    }
     
    // 新增处理结果
    sagrcljglu(e){
        // this.handleGetCaseHandleInfoAdd(this.props.sadxclxxAddData);
        this.setState({
            cljglrVisible: true
        })
    }

    // 确认新增的处理结构
    cljglrOk(){
        alert('ok')
    }

    // 取消新增的处理结构
    cljglrCancal(){
        this.setState({
            cljglrVisible: false
        })
    }

    confirm(text,e) { 
        // let data = {
        //     ajbh:this.props.sadxclxxData[0].ajbh,
        //     sadxbh:this.props.sadxclxxData[0].sadxbh,
        //     id:text,
        // }
        // this.handleGetCaseHandleInfoDelect(data);
    }

    // 区划下拉框的 Value
    handleZoningCode(test,e){
        for(var key in e){
            if(key == "xzqhOnly"){
                this.props.form.setFieldsValue({
                    "badw": e[key]
                })
            }
        }
    }
    render(){
        const {getFieldProps} = this.props.form;
        
        const columns_sadxclxx = [
            { title: '处理类型', dataIndex: 'clmc', key: 'clmc'},
            { title: '处理情况', dataIndex: 'bzsm', key: 'bzsm'},
            { title: '处理时间', dataIndex: 'clsj', key: 'clsj' },
            { title: '处理单位', dataIndex: 'cldw_mc', key: 'cldcldw_mcw' },
            { title: '操作', dataIndex: 'id', key: 'id',render:(text)=> <Popconfirm title="确定要删除这个任务吗？" onConfirm={this.confirm.bind(this,text)}>
                 <a href="#">删除</a>
                </Popconfirm>}
            ,
        ];

        const columns_sagrcljglu = [ 
            { title: '处理类型', dataIndex: 'clmc', key: 'clmc'},
            { title: '处理说明', dataIndex: 'clsm', key: 'clsm'},
            { title: '处理单位', dataIndex: '', key: '',render: ()=>  <SelectGroup sign="xzqhOnly"  {...getFieldProps('badw')}  handleZoningCode={this.handleZoningCode.bind(this,'xzqhOnly')}></SelectGroup> },
            { title: '处理时间', dataIndex: '', key: '',render: ()=>  <DatePicker {...getFieldProps('lasj')} disabledDate={disabledDate} />},
        ]
                
        // 通过 rowSelection 对象表明需要行选择
        const rowSelection = {
            onChange(selectedRowKeys, selectedRows) {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            onSelect(record, selected, selectedRows) {
            console.log(record, selected, selectedRows);
            },
            onSelectAll(selected, selectedRows, changeRows) {
            console.log(selected, selectedRows, changeRows);
            },
        }; 

        return (
            <div>
                <Modal title="涉案对象处理信息" visible={this.props.visible} width="54%"
                       onCancel={this.handleCancel.bind(this)} > 
                    <Button type="primary" onClick={this.sagrcljglu.bind(this)}>  <Icon type="plus-circle" /> 新增处理结果</Button>  
                    <Table columns={columns_sadxclxx}
                           dataSource={this.props.sadxclxxData}
                           className="table"
                           pagination={{pageSize:5}} />
                </Modal>    
              
               <Modal title="涉案个人处理结果录入"  width="54%"
                      visible={this.state.cljglrVisible}
                      onCancel={this.cljglrCancal.bind(this)}
                      onOk={this.cljglrOk.bind(this)}
                    > 
                    <Table rowSelection={rowSelection}
                           columns={columns_sagrcljglu}
                           dataSource={sadxcflxList}
                           className="table"
                           pagination={{pageSize:5}} />
               </Modal>
            </div>
        )
    }
}

sadxclxx_Model = Form.create()(sadxclxx_Model);

export default sadxclxx_Model;