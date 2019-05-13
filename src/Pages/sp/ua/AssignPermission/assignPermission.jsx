import React from 'react';
import ReactDom from 'react-dom';
import {Button, Form, Input, Modal, Select, Tree, message, Cascader, Icon, Menu} from 'antd';
import {
    getSuperAdminZoningList,
    getSuperAdminSystemList,
    searchAuth, getUserAuth,
    assignPermission
} from "../../../../Service/sp/ua/server";
import style from './assignPermission.css';
import {Link} from "react-router";

const createForm = Form.create;
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
const confirm= Modal.confirm;
function noop() {
    return false;
}

class AssignPermission extends React.Component {
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

    onSelect(selectedKeys, e) {
        let selectKey=[];
        let {uniqueKey,title}=e.node.props;
        selectKey.push(uniqueKey)
        this.setState({
            checkedKeys: selectKey,
            zoningCode: uniqueKey,
            zoningLevel:e.node.props.dataRef.zoningLevel,
            userList:[],
            title:title
        });
        let key=selectedKeys.filter((item)=>{
            return item===uniqueKey
        })
        if(!key.length){
            this.setState({
                checkedKeys:[],
                zoningCode:''
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
            zoningLevel:e.node.props.dataRef.zoningLevel,
            title:title
        });
        if(!checkedKeys.length){
            this.setState({
                checkedKeys:[],
                zoningCode:''
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

    /**
     * 根据系统和区划获取区划代码
     */
    async axiosGetZoning2(ID, code) {
        let params = {systemId: ID, zoningCode: code}
        let {status, description, dataObject: {zoningList, type}} = await getSuperAdminZoningList(params);
        if (status == 200) {
            message.success(description);
            // dataArr = zoningList;
            // dataArr.forEach(item => {
            //     obj = {};
            //     obj.value = item.zoningCode;
            //     obj.label = item.zoningName;
            //     list.push(obj);
            // });
            // // console.log('zoningListlength',zoningList.length);
            // this.setState({
            //     zoningList: [...list],
            // })
        } else {
            message.error(description);
        }
    }


//  ["21", "2104", "210401"]
//提交分配权限
    handleSubmit(e) {
        let {AuthCheckedKeys,checkedKeysTemp}=this.state;
        let type={};
        let finalArr=[];
        let newArr=AuthCheckedKeys.concat(checkedKeysTemp).filter(function(v, i, arr) {
            return arr.indexOf(v) === arr.lastIndexOf(v)
        });
        for (let i=0;i<newArr.length;i++){
            for (let j=0;j<newArr.length;j++){
                if (newArr[i].indexOf(newArr[j])>=0&&newArr[i]!==newArr[j]){
                    console.log(newArr[i], newArr[j]);
                    newArr.splice(j,1);
                    j--;
                }
            }
        }
        console.log('newArr',newArr);
        newArr.forEach((item)=>{
            type[item]=1;
            checkedKeysTemp.forEach((item2)=>{
                if(item===item2){
                    type[item]=0
                }
            })
        });
          console.log('type',type,Object.values(type),Object.keys(type));
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('Submit!!!');
            delete values.zoningCode;
            values.authorities=type;
             console.log(values);
             this.axiosAssign(values)
        });

    }


    /**
     * 权限接口
     */
    async axiosAssign(val) {
        let {status,description,dataObject} = await assignPermission(val);
        let _this=this;
        if (status == 200) {
            confirm({
                title:description,
                onOk(){
                    _this.props.form.resetFields();
                }
            });
        } else {
            message.error(description);
        }
        // console.log('userList',this.state.userList);
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

        const systemSelectProps = getFieldProps('systemId', {
            rules: [
                {required: true, message: '请选择您的系统'},
            ],
        });

        const parentZoningKeyProps = getFieldProps("zoningCode", {
            rules: [{required: true, message: "请选择所在区划代码!"}]
        });

        const userProps = getFieldProps('userId', {
            rules: [
                {required: true, message: '请选择用户!'},
            ],
        });

        const loop = (data )=> data.map((item) => {
            if (item.children) {
                return <TreeNode title={item.zoningName} key={item.zoningCode} uniqueKey={item.zoningCode}
                                 dataRef={item}>{loop(item.children)}</TreeNode>;
            }
            return <TreeNode title={item.zoningName} key={item.zoningCode} uniqueKey={item.zoningCode}
                isLeaf={item.isLeaf}             dataRef={item}/>;
        });

        const treeNodes = loop(this.state.treeData);

        const loopAuth = data => Object.keys(data).map(item => {
            if(data[item].children && data[item].children.length !== 0){
                return (
                    <TreeNode title={data[item].authorityName} key={data[item].authorityId} uniqueKey={data[item].authorityId}
                              isLeaf={data[item].isLeaf} dataRef={data[item]}>{loopAuth(data[item].children)}</TreeNode>
                )
            }else{
                return (
                    <TreeNode title={data[item].authorityName} key={data[item].authorityId} uniqueKey={data[item].authorityId} isLeaf={data[item].isLeaf}                  dataRef={data[item]}/>
                )
            }
        });
        const AuthTreeNodes=loopAuth(authTreeData)
        return (
            <div className='assign'>
                <div>
                    <div className='Createtitle'>分配权限</div>
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

                    <FormItem
                        label="用户列表"
                    >
                        <Select {...userProps} style={{width: 180}} placeholder='请选择用户'>
                            {
                                userList.length ? userList.map(item => (
                                    <Select.Option value={item.userId}>{item.username}</Select.Option>)
                                ) : null
                            }
                        </Select>
                    </FormItem>

                    <FormItem>
                        <Button type="primary" onClick={this.onUserAuth.bind(this)}
                                style={{marginRight: 10}}>查询权限 </Button>
                        <Button type="primary" onClick={this.handleSubmit.bind(this)}>分配权限</Button>
                    </FormItem>
                </Form>

                <div className='auth-tree'>
                    <div className="tree-title">
                        用户权限
                    </div>
                    <div className="data-tree">
                        <Tree
                            checkedKeys={this.state.AuthCheckedKeys.length===0?[]:this.state.AuthCheckedKeys}
                            onCheck={this.onCheckAuth.bind(this)}
                            checkable
                        >
                            {AuthTreeNodes}
                        </Tree>
                    </div>
                </div>
                <Modal title="区划" visible={this.state.visible}
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

            </div>
        );
    }
}

AssignPermission = createForm()(AssignPermission);
export default AssignPermission;