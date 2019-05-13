import React from 'react'
import { Menu, Breadcrumb, Icon, Badge } from 'antd';
import { Router, Route, IndexRedirect, IndexRoute, Link, hashHistory } from 'react-router'

// sp-ua
import UserInfo from "../../../../Pages/sp/ua/UserInfo/userInfo";
import Busin from "../../../../Pages/sp/ua/Business/business";
import Manage from "../../../../Pages/sp/ua/Manage/manage";
import Approval from "../../../../Pages/sp/ua/Approval/approval";
import EditUserInfo from "../../../../Pages/sp/ua/EditUserInfo/editUserInfo";
import CreateAuth from "../../../../Pages/sp/ua/CreateAuth/createAuth";
import Bread from '../BreadCrumb/breadCrumb'

import Test from "../../../../Pages/common/Test/test"
import Test2 from "../../../../Pages/common/Test2/test2"

import CreateAuth1 from "../../../../Pages/sp/ua/CreateAuth1/createAuth1";
import AssignPermission from "../../../../Pages/sp/ua/AssignPermission/assignPermission";
import EditTelephone from "../../../../Pages/sp/ua/EditTelephone/editTelephone";
import ShiftAuth from "../../../../Pages/sp/ua/ShiftAuth/shiftAuth";
import ReplaceAuth from "../../../../Pages/sp/ua/ReplaceAuth/replaceAuth";
import EditTelephone1 from "../../../../Pages/sp/ua/EditTelephone1/editTelephone1";
import EditTelephone2 from "../../../../Pages/sp/ua/EditTelephone2/editTelephone2";
import EditEmail from "../../../../Pages/sp/ua/EditEmail/editEmail";

//  wpdmp-dmp
import ApiList from '../../../../Pages/wpdmp/dmp/ApiList/apilist'
import ApiDetail from "../../../../Pages/wpdmp/dmp/ApiDetail/apiDetail";
import BlackWhiteList from "../../../../Pages/wpdmp/dmp/BlackWhiteList/blackWhiteList";
import ApiDetailChange from "../../../../Components/wpdmp/dmp/ApiDetailChange/apiDetailChange";
import {BlackWhiteDetail} from "../../../../Pages/wpdmp/dmp/BlackWhiteDetail/blackWhiteDetail";
import ApplyApiCheck from "../../../../Pages/wpdmp/dmp/ApplyApiCheck/applyApiCheck";
import {ApplyApiList} from "../../../../Pages/wpdmp/dmp/ApplyApiList/applyApiList";
import {ApplyApi} from "../../../../Pages/wpdmp/dmp/ApplyApi/applyApi";
import {ReviewApi} from "../../../../Pages/wpdmp/dmp/ReviewApi/reviewApi";
import {BlackListRevise} from "../../../../Pages/wpdmp/dmp/BlackListRevise/blackListRevise";

//  pfpsmas-zcms
import ZcmsIndex from "../../../../Pages/pfpsmas/zcms/rzc/zcmsIndex";
import CreateChangeComparisonTable from "../../../../Pages/pfpsmas/zcms/rzc/createChangeComparisonTable";
import InputChangeDetails from "../../../../Pages/pfpsmas/zcms/rzc/inputChangeDetails";
import PreviewChangeDetails from "../../../../Pages/pfpsmas/zcms/rzc/previewChangeDetails";
import Download from "../../../../Pages/pfpsmas/zcms/rzc/download";
import TimedTask from "../../../../Pages/pfpsmas/zcms/rzc/timedTask";
import PreviewFormalZoningCode from "../../../../Pages/pfpsmas/zcms/rzc/previewFormalZoningCode";
import ProvincialVersionControl from "../../../../Pages/pfpsmas/zcms/rzc/provincialVersionControl";
import ConditionQuery from "../../../../Pages/pfpsmas/zcms/rzc/conditionQuery";
import UploadApprovalFile from "../../../../Pages/pfpsmas/zcms/rzc/uploadApprovalFile";
import ApprovalDocumentManage from "../../../../Pages/pfpsmas/zcms/rzc/approvalDocumentManage";
import ImportCivilzoningCode from "../../../../Pages/pfpsmas/zcms/rzc/importCivilzoningCode";
import PreviewCivilzoningCode from "../../../../Pages/pfpsmas/zcms/rzc/previewCivilzoningCode";
import HistoricalTrace from "../../../../Pages/pfpsmas/zcms/rzc/historicalTrace";
import PreviewChangeReport from "../../../../Pages/pfpsmas/zcms/rzc/previewChangeReport";
import CivilComparisonReport from "../../../../Pages/pfpsmas/zcms/rzc/civilComparisonReport";





require('./template.css')

export const Template = (props) => (

    <div className="ant-layout-main template-bg">
        <div className="ant-layout-header">
            <div style={{padding:'3px 0 0 22px'}}>
                <a href="#">
                <span className='ant-badge ant-badge-not-a-wrapper'>
                    <Icon type='message' style={{fontSize:40,marginRight:16,color:"#fff",position:'absolute'}}/>
                    <sup className='ant-badge-count'>12</sup>
                </span>
                </a>
            </div>
        </div>

        <div className="ant-layout-breadcrumb">
            <Bread systemId={props.systemId}/>
        </div>

        <div className="ant-layout-container">
            <div className="ant-layout-content template-content">
                <div>
                    <Router history={hashHistory}>
                        
                        {/* 权限 */}
                        <Route path='/about' exact component={UserInfo} />
                        <Route path='/about/sp/ua/approval' component={Approval} />
                        <Route path='/about/sp/ua/manage' component={Manage} />
                        <Route path='/about/sp/ua/business' component={Busin} />
                        <Route path='/about/sp/ua/editUserInfo' component={EditUserInfo} />
                        <Route path='/about/sp/ua/createAuth' component={CreateAuth1} />
                        <Route path='/about/sp/ua/createAuth1' component={CreateAuth} />
                        <Route path='/about/sp/ua/assignPermission' component={AssignPermission} />
                        <Route path='/about/sp/ua/editTele' component={EditTelephone} />
                        <Route path='/about/sp/ua/editTele1' component={EditTelephone1} />
                        <Route path='/about/sp/ua/editTele2' component={EditTelephone2} />
                        <Route path='/about/sp/ua/editEmail' component={EditEmail} />
                        <Route path='/about/sp/ua/ShiftAuth' component={ShiftAuth} />
                        <Route path='/about/sp/ua/ReplaceAuth' component={ReplaceAuth} />
                        <Route path='/about/test' component={Test} />
                        <Route path='/about/test2' component={Test2} />

                        {/* 区划 */}
                        <Route path='/about/pfpsmas/zcms/zcmsIndex' component={ZcmsIndex} />
                        <Route path='/about/pfpsmas/zcms/createChangeComparisonTable' component={CreateChangeComparisonTable} />
                        <Route path='/about/pfpsmas/zcms/inputChangeDetails' component={InputChangeDetails} />
                        <Route path='/about/pfpsmas/zcms/previewChangeDetails' component={PreviewChangeDetails} />
                        <Route path='/about/pfpsmas/zcms/download' component={Download} />
                        <Route path='/about/pfpsmas/zcms/timedTask' component={TimedTask} />
                        <Route path='/about/pfpsmas/zcms/previewFormalZoningCode' component={PreviewFormalZoningCode} />
                        <Route path='/about/pfpsmas/zcms/provincialVersionControl' component={ProvincialVersionControl} />
                        <Route path='/about/pfpsmas/zcms/conditionQuery' component={ConditionQuery} />
                        <Route path='/about/pfpsmas/zcms/uploadApprovalFile' component={UploadApprovalFile} />
                        <Route path='/about/pfpsmas/zcms/approvalDocumentManage' component={ApprovalDocumentManage} />
                        <Route path='/about/pfpsmas/zcms/importCivilzoningCode' component={ImportCivilzoningCode} />
                        <Route path='/about/pfpsmas/zcms/previewCivilzoningCode' component={PreviewCivilzoningCode} />
                        <Route path='/about/pfpsmas/zcms/historicalTrace' component={HistoricalTrace} />
                        <Route path='/about/pfpsmas/zcms/previewChangeReport' component={PreviewChangeReport} />
                        <Route path='/about/pfpsmas/zcms/civilComparisonReport' component={CivilComparisonReport} />
                        
                        {/* 全员人口 */}
                        <Route path='/about/wpdmp/dmp/apilist' component={ApiList}/>
                        <Route path='/about/wpdmp/dmp/apilist/apiDetail' component={ApiDetail}/>
                        <Route path='/about/wpdmp/dmp/apilist/apiDetailChange' component={ApiDetailChange}/>
                        <Route path='/about/wpdmp/dmp/apilist/blackList' component={BlackWhiteList}/>
                        <Route path='/about/wpdmp/dmp/apilist/blackList/blackDetail' component={BlackWhiteDetail}/>
                        <Route path='/about/wpdmp/dmp/apilist/blackList/blackListRevise' component={BlackListRevise}/>
                        <Route path='/about/wpdmp/dmp/applyCHeck' component={ApplyApiCheck}/>
                        <Route path='/about/wpdmp/dmp/applyCHeck/apiList' component={ApplyApiList}/>
                        <Route path='/about/wpdmp/dmp/applyCHeck/apiList/applyApi' component={ApplyApi}/>
                        <Route path='/about/wpdmp/dmp/reviewApi' component={ReviewApi}/>
                    </Router>
                </div>
            </div>
        </div>

        {/* <div className="ant-layout-footer">
            </div> */}
    </div>
)


export default Template;