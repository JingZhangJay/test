import React from "react";
import { Link } from 'react-router'
import { Form,Table, message,Modal,Input } from 'antd'
import { getMyQueryList,getMyQueryUpdate } from '../../../../../Service/srbgs/fgimtpcim/server';

require("./mySearch.css");

const FormItem = Form.Item
 
class My_search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mySearchTabData:[],
            reviseVisible: false,
            detailsVisible: false,
        }
    }

    // 列表展示 请求
    async handelGetMyQueryList(params){
        let data = await getMyQueryList(params);
        if(data.code == '000000'){
            this.setState({
                mySearchTabData: data.responseData.dataList
            })
        }else{
            message.error('请求数据失败！') 
        }
    }

    // 列表展示 修改
    async handelGetMyQueryUpdate(params){
        alert('111')
        let data = await getMyQueryUpdate(params);
        if(data.code == '000000'){
            message.error('修改数据失败！') 
        }else{
            message.error('修改数据失败！') 
        }
    } 

    // 修改 弹框展示
    revise(){
        this.setState({
            reviseVisible: true,
        })
    }

    // 修改 弹框隐藏
    reviseCancel(){
        this.setState({
            reviseVisible: false,
        })
    }

    // 修改 弹框确认
    reviseOk(){
        let data; 
        this.props.form.validateFields((error,values)=>{
            data = {
                id: values.id,
                name: values.dzmc,
                bz: values.dzbz,
            } 
        });

        this.handelGetMyQueryUpdate(data);
    }

    // 详情
    details(e){
        console.log(e.getattribute('moduleName'))
        this.props.form.setFieldsValue({
            moduleName: e.getattribute('moduleName'),
            id:  e.getattribute('idValue'),
        })
        this.setState({
            detailsVisible: true,
        })
    }

    async componentDidMount() {
        await this.handelGetMyQueryList({pageSize:'10',pageNum:'1'});
    }

    render (){
        const { getFieldProps } = this.props.form; 

        const columns = [
            { title: '编号', dataIndex: 'bh', key: 'bh'},
            { title: '定制名称', dataIndex: 'mc', key: 'mc', render:()=> <a href="javascript:;" onClick={this.details.bind(this)}></a>},
            { title: '模块名称', dataIndex: 'module', key: 'module'},
            { title: '路径', dataIndex: 'path', key: 'path',render:(test) => <Link to={test}>{test}</Link>},  
            { title: '操作', dataIndex: 'id', key: 'id', render: (text,e) => <a href="javascript:;" moduleName={e.module} idValue={text} onClick={this.revise.bind(this)}>修改</a> },
        ];

        return (
            <div>
                <div className="formBox">
                    <div className="formTitle">
                        我的查询
                    </div>
                    <div className="formConten">
                        {/* 暂无任何报表 */}
                        <div className="queryResults" >
                            <Table 
                            columns={columns}
                            // dataSource= {dataSourceArr} 
                            />
                        </div>
                    </div>
                </div>

                {/* 修改 模态框 */}
                <Modal visible={this.state.reviseVisible} width='54%'
                    onOk={this.reviseOk.bind(this)}
                    onCancel={this.reviseCancel.bind(this)}
                        >
                        <input type="hidden" {...getFieldProps('id')}  />
                    <FormItem 
                        label="模块名称"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Input {...getFieldProps('moduleName')} />
                    </FormItem>
                    <FormItem 
                        label="定制名称"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Input  {...getFieldProps('dzmc')} />
                    </FormItem>
                    <FormItem 
                        label="备注"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 19 }}
                    >
                        <Input  type="textarea" rows={3} {...getFieldProps('dzbz')}/>
                    </FormItem>
                </Modal> 
            </div>
        )
    }
}

My_search = Form.create()(My_search);

export default My_search;
