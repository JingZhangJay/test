import React from "react";
import ReactDom from "react-dom";
import { Router, Route, IndexRedirect, IndexRoute, Link, hashHistory } from 'react-router';
import { Card, Col, Row, Button, Modal, Input, Form, message, Icon } from "antd";
import { getUserInfo } from "../../../../Service/sp/ua/server";
import userPhoto from "../../../../asset/sp/ua/img/admin-tx.png"

require("./userInfo.css")

const createForm = Form.create;
const FormItem = Form.Item;
function noop() {
    return false;
}

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: ''
        }
    }

    /**
     * 查询个人信息
     */

    async axiosUserInfo() {
        let data = await getUserInfo();
        if(data.status == 200){
            message.success(data.description);
            this.setState({
                 userInfo: data.dataObject
            })
        }else{
            message.error(data.description);
        }
    }

    handlego(){
        let systemId = sessionStorage.getItem('systemId');
        hashHistory.push({
            pathname: "/about/sp/ua/editUserInfo", 
            state: systemId
        })
    }

    componentWillMount() {
         this.axiosUserInfo();
    }

    render() {
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };

        const custNameProps = getFieldProps("custName", {
            rules: [
                // { required: true, min: 8, message: "用户名至少为 8 个字符" },
                // { validator: this.checkCustName }
            ]
        });

        const userNameProps = getFieldProps("userName", {});

        const telephoneProps = getFieldProps("telephone", {});

        const emailProps = getFieldProps("email", {});

        const zoningNameProps = getFieldProps("zoningName", {});



        return (
            <div className="userInfo">
                <div className="userInfo-content">
                    <div className="userInfo-title">
                        用户信息
                        {/* <Icon type="edit">
                            <Link to={{pathname: "/about/sp/ua/editUserInfo", state: {systemId: this.props.location.state.systemId}}} />
                        </Icon> */}
                    </div>

                    <div className="userInfo-container">
                        <div class="userInfo-container-left">
                            <div className="userInfo-photo">
                                <img src={userPhoto} alt="用户头像"/>
                            </div>

                        </div>
                        <div className="userInfo-container-right">
                            {/*<div className="userInfo-label">*/}
                                {/*<span className="span-label">姓名</span>*/}
                                {/*<span className="span-info">*/}
                                    {/*{this.state.userInfo.custName}*/}
                                {/*</span>*/}
                            {/*</div>*/}
                            <div className="userInfo-label">
                                <span className="span-label">用户名</span>
                                <span className="span-info">
                                    {this.state.userInfo.singleUsername}
                                </span>

                            </div>
                            {/*<div className="userInfo-label">*/}
                                {/*<span className="span-label">区划</span>*/}
                                {/*<span className="span-info">*/}
                                    {/*{this.state.userInfo.zoningName}*/}
                                {/*</span>*/}
                            {/*</div>*/}
                            <div className="userInfo-label">
                                <span className="span-label">邮箱</span>
                                <span className="span-info">
                                    {this.state.userInfo.email}
                                </span>
                                <Link to={{pathname:'/about/sp/ua/editTele',query:{telephone:this.state.userInfo.telephone,title:'邮箱'},state:sessionStorage.getItem('systemId')}} className='edit-tele'  >修改邮箱</Link>
                            </div>
                            <div className="userInfo-label">
                                <span className="span-label">手机号</span>
                                <span className="span-info">
                                    {this.state.userInfo.telephone}
                                </span>
                                <Link to={{pathname:'/about/sp/ua/editTele',query:{telephone:this.state.userInfo.telephone,title:'手机'},state:sessionStorage.getItem('systemId')}} className='edit-tele'  >修改手机号</Link>
                            </div>
                        </div>

                        {/*<div className="userInfo-container-footer">*/}
                            {/*<Button type="primary" onClick={this.handlego.bind(this)}>修改个人信息</Button>*/}
                        {/*</div>*/}
                    </div>
                </div>

            </div>
        )
    }
}

UserInfo = createForm()(UserInfo);
export default UserInfo;