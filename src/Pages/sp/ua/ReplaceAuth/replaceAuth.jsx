import React from 'react';
import ReactDom from 'react-dom';
import {Button, Form, Input, Modal, Select, Tree, Table, message, Cascader} from 'antd';
import {
    getSuperAdminZoningList,
    getSuperAdminSystemList,
    searchAuth, releaseAccount
} from "../../../../Service/sp/ua/server";
import style from './replaceAuth.css'
const createForm = Form.create;
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
const confirm= Modal.confirm;
function noop() {
    return false;
}

class ReplaceAuth extends React.Component {
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
            userName:'',
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
        console.log('title',title);
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


    //选择用户事件
    selectAuth(val,e){
        console.log(val,e);
        this.setState({userName:e.props.children})
    }


    //取消实名验证
    cancelAuth(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('submit');
            console.log(values);
             this.axiosCancelAuth(values)
        });
    }

    //取消实名验证接口
    async axiosCancelAuth(values){
        let {description,status} = await releaseAccount(values);
        let _this=this;
        if (status === 200) {
            confirm({
                title: description,
                content:`您已撤销${this.props.form.getFieldValue('zoningCode')}下${this.state.userName}的验证`,
                onOk(){
                    _this.props.form.resetFields();
                }
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
                console.log('userId',dataObject[0].userId);

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
            return <TreeNode title={item.zoningName} key={item.zoningCode} uniqueKey={item.zoningCode}  isLeaf={item.isLeaf}
                             dataRef={item}/>;
        });

        const treeNodes = loop(this.state.treeData);

        return (
            <div className='assign'>
                <div>
                    <div className='replace-title'>撤销实名验证</div>
                </div>
                <Form horizontal form={this.props.form} className='form-auth'>
                    {/*系统*/}
                    <FormItem
                        label="系统"
                        {...formItemLayout}
                    >
                        <Select {...systemSelectProps}  placeholder='请选择系统'
                                onSelect={this.systemSelect.bind(this)}>
                            {
                                systemList.length ? systemList.map(item => (
                                    <Select.Option value={item.key}>{item.title}</Select.Option>)
                                ) : null
                            }
                        </Select>
                    </FormItem>

                    <FormItem label="区划代码"  {...formItemLayout} hasFeedback>
                        <Input
                            {...parentZoningKeyProps}
                            placeholder="请选择区划"
                            onClick={this.handleShow.bind(this)}
                            readOnly
                        />
                    </FormItem>

                    <FormItem
                        label="用户列表"
                        {...formItemLayout}
                    >
                        <Select {...userProps}  placeholder='请选择用户' onSelect={this.selectAuth.bind(this)}>
                            {
                                userList.length ? userList.map(item => (
                                    <Select.Option  value={item.userId}>{item.username}</Select.Option>)
                                ) : null
                            }
                        </Select>
                    </FormItem>

                    <FormItem>
                        <Button type="primary" className='anth-btn' onClick={this.cancelAuth.bind(this)}
                                >撤销 </Button>
                    </FormItem>
                </Form>


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
ReplaceAuth = createForm()(ReplaceAuth);

export default ReplaceAuth;