import React from "react";
import { hashHistory, Link ,Router,Route} from "react-router";
import { Menu, Breadcrumb, Icon, Badge, message } from 'antd';

import CaseManage from "../../../../Pages/srbgs/fgimtpcim/case_management/CaseManage/caseManage";

require('./content.css')

class Content extends React.Component {
    render() {
        return(
            <div className="ant-layout-main template-bg">

                <div className="ant-layout-header">
                    <div>
                        <Badge count={99}>
                            {/* <a href="#" className="head-example"> */}
                            <Icon type="mail" style={{fontSize: "40px", color: '#fff', margin: '10px'}}/>
                            {/* </a> */}
                        </Badge>
                        <Badge count={200}>
                            {/* <a href="#" className="head-example"> */}
                            <Icon type="book" style={{fontSize: "40px", color: '#fff', margin: '10px'}}/>
                            {/* </a> */}
                        </Badge>
                    </div>
                </div>

                <div className="ant-layout-breadcrumb">

                </div>

                <div className="ant-layout-container">
                    <div className="ant-layout-content template-content">
                        <div>
                            <CaseManage/>
                            {/*<Router history={hashHistory}>*/}
                                {/*<Route path='./fgimtpcim/case_management/case_manage' component={CaseManage} />*/}
                            {/*</Router>*/}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Content;