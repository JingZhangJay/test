import React from 'react';
import ReactDom from 'react-dom';
import {Button, Form, Input, Modal, Select, Tree, Table, message,Cascader } from 'antd';
import {getSuperAdminZoningList, getSuperAdminSystemList,createAuth} from "../../../Service/sp/ua/server";

// require("./createAuth1.css")
const createForm = Form.create;
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;

const columns=[{
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

//
//
//级联选择框!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
//
class Test2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            system: '',
            zoningCode: '',
            systemCode: '',
            zoningList: [],
            systemList: [],
            userList: [],
            options: [],
        }
    }

    async componentWillMount() {
        this.axiosSuperAdminSystemList()
    }

    onChange(value, selectedOptions) {
        this.setState({zoningCode: value})
        const targetOption = selectedOptions[selectedOptions.length - 1];
        if (!targetOption.children) {
            console.log('..............');
            targetOption.isLeaf = true;
        }
    }


    loadData (selectedOptions) {
        console.log('selectedOptions',selectedOptions);
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        // load options lazily
        this.axiosGetZoning2(this.state.system,targetOption.value);
        setTimeout(() => {
            let zoningList=this.state.zoningList;
            // console.log('zoningList',zoningList);
            if(zoningList.length){
                targetOption.loading = false;
                targetOption.children =this.state.zoningList;
                this.setState({
                    options: [...this.state.options],
                });
            }else {
                // targetOption.loading = false;
                // targetOption.isLeaf=true;
                message.warning("此区划下已无更多类目!")
            }
        }, 500);
    }

    /**
     * 获取系统列表
     */
    async  axiosSuperAdminSystemList() {
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
                obj.code=item.systemCode;
                list.push(obj);
            })
            this.setState({
                systemList: [...list],
                system:list[0].key
            })
        }

    }

    /**
     * 选择系统
     */
    systemSelect(val){
        this.axiosGetZoning(val);
        let sysCode=this.state.systemList.filter((item)=>{
            return item.key===val?item:''
        })
        this.setState({system:val,systemCode:sysCode[0].code})
    }

    //选择区划
    zoningSelect(val){
        this.setState({zoningCode:val})
    }

    /**
     * 根据系统获取区划代码
     */
    async axiosGetZoning(val){
        let params={systemId:val}
        let {status,description,dataObject:{zoningList,type}}=await getSuperAdminZoningList(params);
        let dataArr;
        let list = [];
        let arr=[];
        let obj;
        if(status == 200){
            message.success(description);
            dataArr = zoningList;
            dataArr.forEach(item => {
                obj = {};
                obj.value = item.zoningCode;
                obj.label = item.zoningName;
                list.push(obj);
            })
            if(type===1&&zoningList.length){
                list.forEach((item)=>{
                    item.isLeaf=false;
                })
            }
            arr.push(zoningList[0].zoningCode)
            this.setState({
                options: [...list],
                zoningCode: arr,
            })
        }else{
            message.error(description);
        }
    }

    /**
     * 根据系统和区划获取区划代码
     */
    async axiosGetZoning2(ID,code){
        let params={systemId:ID,zoningCode:code}
        let {status,description,dataObject:{zoningList,type}}=await getSuperAdminZoningList(params);
        let dataArr;
        let list = [];
        let obj;
        if(status == 200){
            message.success(description);
            dataArr = zoningList;
            dataArr.forEach(item => {
                obj = {};
                obj.value = item.zoningCode;
                obj.label = item.zoningName;
                list.push(obj);
            });
            // console.log('zoningListlength',zoningList.length);

            if (zoningList.length){
                list.forEach((item)=>{
                    item.isLeaf=false;
                })
            }
            this.setState({
                zoningList: [...list],
            })
        }else{
            message.error(description);
        }
    }


    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('Submit!!!');
            const {zoningCode}=values;
            values.zoningCode=zoningCode.slice(-1).join('');
            values.systemCode=this.state.systemCode;
            console.log(values);
            this.axiosCreateAuth(values)
        });

    }

    /**
     * 创建用户
     */
    async axiosCreateAuth(val){
        let data=await createAuth(val);
        if(data.status == 200){
            message.success(data.description);
            let obj={name:'',password:'00000000',time:'2000-01-01'};
            obj.name=data.dataObject;
            let {userList}=this.state;
            userList.push(obj)
            this.setState({
                userList: userList
            })
        }else{
            message.error(data.description);
        }
        // console.log('userList',this.state.userList);
    }
    render() {
        const {getFieldProps, getFieldError, isFieldValidating} = this.props.form;
        const { systemList,zoningList,system,zoningCode,options} = this.state;

        const zoningKeyProps = getFieldProps("zoningCode", {
            rules: [{required: true, type: 'array'}],
            initialValue:zoningCode
        });


        const systemSelectProps = getFieldProps('systemId', {
            rules: [
                { required: true, message: '请选择您的系统' },
            ],

        });



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
                        <Select {...systemSelectProps} style={{width:150}}  placeholder='请选择系统'
                                onSelect={this.systemSelect.bind(this)}>
                            {
                                systemList.length? systemList.map(item => (
                                    <Select.Option value={item.key}>{item.title}</Select.Option>)
                                ):null
                            }
                        </Select>
                    </FormItem>

                    {/*/!*区划*!/*/}
                    {/*<FormItem*/}
                    {/*label="区划"*/}
                    {/*>*/}
                    {/*<Select {...zoningKeyProps} style={{width:150}}  placeholder='请选择区划'*/}
                    {/*onSelect={this.zoningSelect.bind(this)}*/}
                    {/*>*/}
                    {/*{*/}
                    {/*zoningList.length?zoningList.map(item => (*/}
                    {/*<Select.Option value={item.zoningCode}>{item.zoningName}</Select.Option>)):null*/}
                    {/*}*/}
                    {/*</Select>*/}
                    {/*</FormItem>*/}

                    {/*区划*/}
                    <FormItem
                        label="区划"
                    >
                        <Cascader
                            {...zoningKeyProps}
                            options={options}
                            loadData={this.loadData.bind(this)}
                            onChange={this.onChange.bind(this)}
                            changeOnSelect
                        />
                    </FormItem>

                    <FormItem >
                        <Button type="primary" onClick={this.handleSubmit.bind(this)}>自动创建用户</Button>
                    </FormItem>
                </Form>

                <div className='table-create'>
                    <Table columns={columns} dataSource={this.state.userList} />
                </div>
            </div>
        );
    }
}

Test2 = createForm()(Test2);
export default Test2;