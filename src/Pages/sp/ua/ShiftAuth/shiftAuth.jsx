import React from 'react';
import ReactDom from 'react-dom';
import {Button, Form, Input, Modal, Select, Tree, message, Cascader, Icon, Menu} from 'antd';
import {
    getSuperAdminSystemList,
    searchAuth, getUserAuth,
    assignPermission,
    getShiftAuthList,
    userTransfer, getSuperAdminZoningList
} from "../../../../Service/sp/ua/server";
import {Link} from "react-router";
import style from './shiftAuth.css'
const createForm = Form.create;
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
const confirm=Modal.confirm;
function noop() {
    return false;
}

class ShiftAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            treeData: [],
            authTreeData:[],

            system: '',
            zoningCode: '',
            systemCode: '',
            systemType: '',
            zoningList: [],
            systemList: [],
            userList: [],
            options: [],
            checkedKeys: [],
            AuthCheckedKeys:[],
            checkedKeysTemp:[],//保存初始化获取的选中项 key
            zoningKey: '',

            ZonVisible:false,
            ZonCheckedKeys:[],
            ZoningTree: [],
            ZoningType: '',
            shiftCode:'',
            title:''

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
        let {zoningCode,title}=this.state;
        if(zoningCode){
            let params={systemId:this.state.system,zoningCode:zoningCode,type:'1'}
            this.axiosUserList(params)
            this.props.form.setFieldsValue({
                zoningCode: title,
            })
        }else {
            message.error('您还未选择区划!')
            this.props.form.setFieldsValue({
                zoningCode:'',
                userId:''
            })
        }
    }

    handleShow() {
        // console.log('system',this.state.systemCode);
        if(this.state.systemCode){
            this.setState({
                visible: true,
            });
        }else{
            message.error('请先选择系统!')
        }
    }

    //迁移树显隐
    ZonCancel() {
        this.setState({
            ZonVisible: false
        })
    }

    ZonOk() {
        this.setState({
            ZonVisible: false
        })
    }

    ZonShow() {
        // console.log('system',this.state.systemCode);
        if(this.state.systemCode){
            this.setState({
                ZonVisible: true,
            });
        }else{
            message.error('请先选择系统!')
        }
    }

    onZonSelect(selectedKeys, e) {
        let selectKey=[];
        let {uniqueKey,title}=e.node.props;
        selectKey.push(uniqueKey)
        this.props.form.setFieldsValue({
            shiftCode: title,
        })
        this.setState({
            ZonCheckedKeys: selectKey,
            shiftCode: uniqueKey,
        });
        let key=selectedKeys.filter((item)=>{
            return item===uniqueKey
        })
        if(!key.length){
            this.setState({
                ZonCheckedKeys:[],
                shiftCode: '',
            })
            this.props.form.setFieldsValue({
                shiftCode: '',
            })
        }
        // console.log(this.state.ZonCheckedKeys);
    }

    onZonCheck(checkedKeys, e){
        let selectKey=[];
        let {title,uniqueKey}=e.node.props;
        selectKey.push(uniqueKey)
        this.props.form.setFieldsValue({
            shiftCode: title,
        })
        this.setState({
            ZonCheckedKeys: selectKey,
            shiftCode:uniqueKey
        });
        if(!checkedKeys.length){
            this.setState({
                ZonCheckedKeys:[],
                shiftCode:''
            })
            this.props.form.setFieldsValue({
                shiftCode: '',
            })
        }
        console.log(this.state.ZonCheckedKeys);
    }

    //迁移树动态加载
    async onZoningLoad(treeNode) {
        let zoningKey = treeNode.props.eventKey;
        let params = {systemId: this.state.system, zoningCode: zoningKey}
        let {status, description, dataObject: {zoningList, type}} = await getSuperAdminZoningList(params);
        if (type === 0) {
            zoningList.map((item)=>{
                item.isLeaf=true
            })
        }
        treeNode.props.dataRef.children = zoningList;
        let treeData = [...this.state.ZoningTree];
        this.setState({
            ZoningTree: treeData,
        })
    }


    onSelect(selectedKeys, e) {
        let selectKey=[];
        let {uniqueKey,title}=e.node.props;
        selectKey.push(uniqueKey)
        this.setState({
            checkedKeys: selectKey,
            zoningCode: uniqueKey,
            userList:[],
            title:title
        });
        let key=selectedKeys.filter((item)=>{
            return item===uniqueKey
        })
        if(!key.length){
            this.setState({
                checkedKeys:[],
                zoningCode:'',
            })
        }
    }
//区划树选择事件
    onCheck(checkedKeys, e) {
        let selectKey=[];
        let {uniqueKey,title}=e.node.props;
        selectKey.push(uniqueKey)
        this.setState({
            checkedKeys: selectKey,
            zoningCode:uniqueKey,
            userList:[],
            title:title
        });
        if(!checkedKeys.length){
            this.setState({
                checkedKeys:[],
                zoningCode:'',
            })
        }

    }

//区划树动态加载
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

    //权限树选中事件
    onCheckAuth(checkedKeys, e){
        console.log('checked',checkedKeys, e);
        this.setState({
            AuthCheckedKeys:checkedKeys
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
        this.setState({system: val, systemCode: sysCode[0].code})
        this.axiosShiftAuth(this.state.system);
    }

    /**
     * 根据系统获取区划代码
     */
    async axiosGetZoning(val) {
        let params = {systemId: val}
        let {status, description, dataObject: {zoningList, type}} = await getShiftAuthList(params);
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

    /**
     * 根据系统获取已经迁移的区划
     */
    async axiosShiftAuth(val) {
        let params = {systemId: val}
        let {status, description, dataObject: {zoningList, type}} = await getShiftAuthList(params);
        if (status === 200) {
            message.success(description);
            if(type===0){
                zoningList.map((item)=>{
                    item.isLeaf=true;
                })
            }
            this.setState({
                ZoningTree: zoningList,
                ZoningType: type
            })

        } else {
            message.error(description);
        }
    }


//提交用户迁移
    ZoningSubmit(e) {
        let {checkedKeys,ZonCheckedKeys}=this.state;
        if(checkedKeys[0]===ZonCheckedKeys[0]){
            message.error('不能选择相同区划迁移!')
        }else{
            this.props.form.validateFields((errors, values) => {
                if (!!errors) {
                    console.log('Errors in form!!!');
                    return;
                }
                console.log('Submit!!!');
                if(!values.shiftCode){
                    message.error('您还未选择迁移区划!')
                }else{
                    values.zoningCode=this.state.shiftCode
                    console.log(values);
                    this.axiosSubmitShift(values)
                }
            });
        }

    }


    /**
     * 用户迁移接口
     */
    async axiosSubmitShift(val) {
        let {status,description,dataObject} = await userTransfer(val);
        let _this=this;
        if (status == 200) {
            // message.success(description);
            confirm({
                title: description,
                content:`您的用户已迁移到${this.props.form.getFieldValue('shiftCode')}`,
                onOk(){
                    _this.props.form.resetFields();
                }
            })
        } else {
            message.error(description);
        }
    }

    //用户权限回显
    onUserAuth(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            values.zoningLevel = this.state.zoningLevel;
            this.axiosUserAuth(values)
        });
    }

    //读取权限树
    async axiosUserAuth(values){
        let {description,status,dataObject} = await getUserAuth(values);
        if (status === 200) {
            var listData =dataObject;
            let temp = {};
            let tree = {};
            let keys=[];
            // listData[4].isOwn=1;
            // listData[3].isOwn=1;
            for(let i in listData){
                temp[listData[i].authorityId] = listData[i];
                if(listData[i].isOwn===1){
                    keys.push(listData[i].authorityId)
                }
            }
            for(let i in temp){
                if(temp[i].parent && temp[temp[i].parent]) {
                    if(!temp[temp[i].parent].children) {
                        temp[temp[i].parent].children = new Object();
                        temp[temp[i].parent].isLeaf=true;
                    }
                    temp[temp[i].parent].children[temp[i].authorityId] = temp[i];
                    temp[temp[i].parent].children[temp[i].authorityId].isLeaf=false;
                } else {
                    tree[temp[i].authorityId] =  temp[i];
                    tree[temp[i].authorityId].isLeaf=false;
                }
            }
            // console.log('tree',tree);
            this.setState({
                authTreeData:tree,
                AuthCheckedKeys:keys,
                checkedKeysTemp:keys
            })
        } else {
            message.error(description);
        }
    }
    //读取用户列表
    async axiosUserList(values) {
        let {description,status,dataObject} = await searchAuth(values);
        if (status === 200) {
            message.success(description);
            if(dataObject){
                this.setState({
                    userList: dataObject,
                })
                this.props.form.setFieldsValue({userId:dataObject[0].userId})
            }else{
                this.setState({
                    userList: [],
                })
                this.props.form.setFieldsValue({userId:''})
            }
        } else {
            message.error(description);
        }
    }

    render() {
        const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
        const {systemList, zoningList, system, zoningCode, options,userList,authTreeData} = this.state;
        const formItemLayout = {
            labelCol: { span:5},
            wrapperCol: { span: 19 },
        };

        const systemSelectProps = getFieldProps('systemId', {
            rules: [
                {required: true, message: '请选择您的系统'},
            ],
        });

        const parentZoningKeyProps = getFieldProps("zoningCode", {
            rules: [{required: true, message: "请选择所在区划代码!"}]
        });

        const shiftZoningProps = getFieldProps("shiftCode", {
            rules: [{required: true, message: "请选择所在区划代码!"}]
        });

        const userProps = getFieldProps('userId', {
            rules: [
                {required: true, message: '请选择用户!'},
            ],
            // initialValue:defaultUser
        });

        const loop = (data )=> data.map((item) => {
            if (item.children) {
                return <TreeNode title={item.zoningName} key={item.zoningCode} uniqueKey={item.zoningCode}
                                 dataRef={item}>{loop(item.children)}</TreeNode>;
            }
            return <TreeNode title={item.zoningName} key={item.zoningCode} uniqueKey={item.zoningCode}   isLeaf={item.isLeaf}
                             dataRef={item}/>;
        });

        const treeNodes = loop(this.state.treeData);
        const ZoningTree=loop(this.state.ZoningTree)

        return (
            <div className='shift'>
                <div>
                    <div className='Createtitle'>用户迁移</div>
                </div>
                <Form horizontal form={this.props.form} className='form-auth'>
                    {/*系统*/}
                    <FormItem
                        label="系统"
                        {...formItemLayout}
                    >
                        <Select {...systemSelectProps}   placeholder='请选择系统'
                                onSelect={this.systemSelect.bind(this)}>
                            {
                                systemList.length ? systemList.map(item => (
                                    <Select.Option value={item.key}>{item.title}</Select.Option>)
                                ) : null
                            }
                        </Select>
                    </FormItem>

                    <FormItem label="区划代码" {...formItemLayout}  hasFeedback>
                        <Input
                            {...parentZoningKeyProps}
                            placeholder="请选择区划"
                            onClick={this.handleShow.bind(this)}
                            readOnly

                        />
                    </FormItem>

                    {/*<FormItem  label="区划代码" hasFeedback style={{ display: 'none' }}>*/}
                    {/*<Input*/}
                    {/*{...zoningKeyProps}*/}
                    {/*value={this.state.zoningKey}*/}
                    {/*/>*/}
                    {/*</FormItem>*/}


                    <FormItem
                        label="用户列表"
                        {...formItemLayout}
                    >
                        <Select {...userProps}    placeholder='请选择用户'>
                            {
                                userList.length ? userList.map(item => (
                                    <Select.Option value={item.userId}>{item.username}</Select.Option>)
                                ) : null
                            }
                        </Select>
                    </FormItem>

                    <FormItem label="迁移到" {...formItemLayout} hasFeedback>
                        <Input
                            {...shiftZoningProps}
                            placeholder="请选择区划"
                            onClick={this.ZonShow.bind(this)}
                            readOnly

                        />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" className='anth-btn' onClick={this.ZoningSubmit.bind(this)}>用户迁移</Button>
                    </FormItem>
                </Form>

                {/*<div className='auth-tree'>*/}
                    {/*<div className="tree-title">*/}
                        {/*用户权限*/}
                    {/*</div>*/}
                    {/*<div className="data-tree">*/}
                        {/*<Tree*/}
                            {/*checkedKeys={this.state.AuthCheckedKeys.length===0?[]:this.state.AuthCheckedKeys}*/}
                            {/*onCheck={this.onCheckAuth.bind(this)}*/}
                            {/*checkable*/}
                        {/*>*/}
                            {/*{AuthTreeNodes}*/}
                        {/*</Tree>*/}
                    {/*</div>*/}
                {/*</div>*/}
                <Modal title="区划" visible={this.state.visible}
                       onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                >
                    <Tree
                        loadData={this.onLoadData.bind(this)}
                        onSelect={this.onSelect.bind(this)}
                        checkedKeys={this.state.checkedKeys}
                        onCheck={this.onCheck.bind(this)}
                        checkable
                        checkStrictly
                        multiple
                    >
                        {treeNodes}
                    </Tree>
                </Modal>

                <Modal title="迁移区划" visible={this.state.ZonVisible}
                       onOk={this.ZonOk.bind(this)} onCancel={this.ZonCancel.bind(this)}
                >
                    <Tree
                        checkedKeys={this.state.ZonCheckedKeys}
                        onCheck={this.onZonCheck.bind(this)}
                        loadData={this.onZoningLoad.bind(this)}
                        onSelect={this.onZonSelect.bind(this)}
                        checkable
                        checkStrictly
                        multiple
                    >
                        {ZoningTree}
                    </Tree>
                </Modal>

            </div>
        );
    }
}
ShiftAuth = createForm()(ShiftAuth);
export default ShiftAuth;