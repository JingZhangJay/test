import React from 'react';
import ReactDom from 'react-dom';
import {Button, Form, Input, Modal, Select, Tree, Table, message, Cascader} from 'antd';
import {
    getSuperAdminZoningList,
    getSuperAdminSystemList,
    createAuth,
    searchAuth
} from "../../../../Service/sp/ua/server";
import {getNowFormatDate} from '../../../../asset/sp/ua/js/public'
require("./createAuth1.css")
const createForm = Form.create;
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;

const columns = [{
    title: '用户名',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '密码',
    dataIndex: 'password',
    key: 'password',
}, {
    title: '创建时间',
    dataIndex: 'time',
    key: 'time',
}];


class CreateAuth1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            treeData: [],

            system: '',
            zoningCode: '',
            systemCode: '',
            systemType: '',
            zoningList: [],
            systemList: [],
            userList: [],
            options: [],
            checkedKeys: [],
            zoningKey: ''
        }
    }

    async componentWillMount() {
        this.axiosSuperAdminSystemList()
    }

    handleCancel() {
        this.setState({
            visible: false
        })
    }

    handleOk() {
        this.setState({
            visible: false
        })
    }

    handleShow() {
        console.log('system',this.state.systemCode);
        if(this.state.systemCode){
            this.setState({
                visible: true,
            });
        }else{
            message.error('请先选择系统!')
        }

    }

    onSelect(selectedKeys, e) {
        let selectKey=[];
        let {uniqueKey,title}=e.node.props;
        selectKey.push(uniqueKey)
        this.props.form.setFieldsValue({
            zoningCode: title,
        })
        this.setState({
            checkedKeys: selectKey,
            zoningCode: uniqueKey,
            userList:[]
        });
        let key=selectedKeys.filter((item)=>{
            return item===uniqueKey
        })
        if(!key.length){
            this.setState({
                checkedKeys:[],
                zoningCode:null
            })
            this.props.form.setFieldsValue({
                zoningCode: '',
            })
        }
    }

    onCheck(checkedKeys, e) {
        let selectKey=[];
        let {uniqueKey,title}=e.node.props;
        selectKey.push(uniqueKey)
        this.props.form.setFieldsValue({
            zoningCode:title,
        })
        this.setState({
            checkedKeys: selectKey,
            zoningCode:uniqueKey,
            userList:[]
        });
        if(!checkedKeys.length){
            this.setState({
                checkedKeys:[],
                zoningCode:null
            })
            this.props.form.setFieldsValue({
                zoningCode: '',
            })
        }
    }

    async onLoadData(treeNode) {
        let zoningKey = treeNode.props.eventKey;
        let params = {systemId: this.state.system, zoningCode: zoningKey}
        let {status, description, dataObject: {zoningList, type}} = await getSuperAdminZoningList(params);
        if (type === 0) {
            zoningList.map((item)=>{
                item.isLeaf=true
            })
        }
        treeNode.props.dataRef.children = zoningList;
        let treeData = [...this.state.treeData];
        this.setState({
            treeData: treeData,
            systemType:type
        })
    }

    /**
     * 获取系统列表
     */
    async axiosSuperAdminSystemList() {
        let data = await getSuperAdminSystemList();
        let dataArr;
        let list = [];
        let obj;
        if (data.status == 200) {
            dataArr = data.dataObject;
            dataArr.forEach(item => {
                obj = {};
                obj.key = item.systemId;
                obj.title = item.systemName;
                obj.code = item.systemCode;
                list.push(obj);
            })
            this.setState({
                systemList: [...list],
                system: list[0].key
            })
        }

    }

    /**
     * 选择系统
     */
    systemSelect(val) {
        this.axiosGetZoning(val);
        let sysCode = this.state.systemList.filter((item) => {
            return item.key === val ? item : ''
        })
        this.setState({system: val, systemCode: sysCode[0].code,userList:[]})
    }

    /**
     * 根据系统获取区划代码
     */
    async axiosGetZoning(val) {
        let params = {systemId: val}
        let {status, description, dataObject: {zoningList, type}} = await getSuperAdminZoningList(params);
        if (status == 200) {
            message.success(description);
            if(type===0){
                zoningList.map((item)=>{
                    item.isLeaf=true;
                })
            }
            this.setState({
                treeData: zoningList,
                systemType: type
            })
        } else {
            message.error(description);
        }
    }


//提交创建用户
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('Submit!!!');
            const {zoningCode} = values;
            values.zoningCode = this.state.zoningCode;
            values.systemCode = this.state.systemCode;
            console.log(values);
            this.axiosCreateAuth(values)
        });

    }


    /**
     * 创建用户
     */
    async axiosCreateAuth(val) {
        let data = await createAuth(val);
        if (data.status == 200) {
            message.success(data.description);
            let obj = {name: '', password: '00000000', time: getNowFormatDate()};
            obj.name = data.dataObject.username;
            let {userList} = this.state;
            userList.push(obj)
            this.setState({
                userList: userList
            })
        } else {
            message.error(data.description);
        }
        // console.log('userList',this.state.userList);
    }

    //提交查询用户
    onSearch(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            const {zoningCode} = values;
            values.zoningCode = this.state.zoningCode;
            values.type = '1';
            this.axiosSearch(values)
        });
    }

    async axiosSearch(values) {
        let {description,status,dataObject} = await searchAuth(values);
        let dataArr;
        let list = [];
        let obj;
        if (status === 200) {
            message.success(description);
            if(dataObject){
                dataArr = dataObject;
                dataArr.forEach(item => {
                    obj = {};
                    obj.name = item.username;
                    obj.time = item.createTime;
                    item.custStatus===1? obj.password='00000000':obj.password='********';
                    list.push(obj);
                });
                this.setState({
                    userList: list
                })
            }else{
                this.setState({
                    userList: []
                })
            }
        } else {
            message.error(description);
        }
    }

    render() {
        const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
        const {systemList, zoningList, system, zoningCode, options} = this.state;

        const systemSelectProps = getFieldProps('systemId', {
            rules: [
                {required: true, message: '请选择您的系统'},
            ],

        });
        const parentZoningKeyProps = getFieldProps("zoningCode", {
            rules: [{required: true, message: "请选择所在区划代码!"}]
        });

        const loop = data => data.map((item) => {
            if (item.children) {
                return <TreeNode title={item.zoningName} key={item.zoningCode} uniqueKey={item.zoningCode}
                                 dataRef={item}>{loop(item.children)}</TreeNode>;
            }
            return <TreeNode isLeaf={item.isLeaf} title={item.zoningName} key={item.zoningCode} uniqueKey={item.zoningCode} dataRef={item}/>;
        });

        const treeNodes = loop(this.state.treeData);
        return (
            <div>
                <div>
                    <div className='Createtitle'>创建用户</div>
                </div>
                <Form inline form={this.props.form} className='form-create'>
                    {/*系统*/}
                    <FormItem
                        label="系统"
                    >
                        <Select {...systemSelectProps} style={{width: 150}} placeholder='请选择系统'
                                onSelect={this.systemSelect.bind(this)}>
                            {
                                systemList.length ? systemList.map(item => (
                                    <Select.Option value={item.key}>{item.title}</Select.Option>)
                                ) : null
                            }
                        </Select>
                    </FormItem>

                    <FormItem label="区划代码" hasFeedback>
                        <Input
                            {...parentZoningKeyProps}
                            placeholder="请选择区划"
                            onClick={this.handleShow.bind(this)}
                            readOnly
                            style={{width: 150}}
                        />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.onSearch.bind(this)}
                                style={{marginRight: 10}}>查询用户 </Button>
                        <Button type="primary" onClick={this.handleSubmit.bind(this)}>自动创建用户</Button>
                    </FormItem>
                </Form>

                <Modal title="第一个 Modal" visible={this.state.visible}
                       onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                >
                    <Tree
                        onSelect={this.onSelect.bind(this)}
                        loadData={this.onLoadData.bind(this)}
                        checkedKeys={this.state.checkedKeys}
                        onCheck={this.onCheck.bind(this)}
                        checkable
                        checkStrictly
                        multiple
                    >
                        {treeNodes}
                    </Tree>
                </Modal>
                <div className='table-create'>
                    <Table columns={columns} dataSource={this.state.userList}/>
                </div>
            </div>
        );
    }
}

CreateAuth1 = createForm()(CreateAuth1);
export default CreateAuth1;