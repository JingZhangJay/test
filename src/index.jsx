import {} from "../scss/GlobalCSS"
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRedirect, IndexRoute, Link, hashHistory } from 'react-router'
import { relative } from "path";

import 'antd/dist/antd.css';
import './asset/pfpsmas/zcms/css/common.css';

//  common
import Login from "./Pages/common/Login/login";
import Register from "./Pages/common/Register/register";
import Home from "./Pages/common/Home/home";
import About from "./Pages/common/About/about";
import Test from "./Pages/common/Test/test";

import Test2 from './Pages/common/Test2/test2'


//  wpdmp-dmp
import ApiList from "./Pages/wpdmp/dmp/ApiList/apilist";
import ApiDetail from "./Pages/wpdmp/dmp/ApiDetail/apiDetail";
import ApiDetailChange from "./Components/wpdmp/dmp/ApiDetailChange/apiDetailChange";
import BlackWhiteList from "./Pages/wpdmp/dmp/BlackWhiteList/blackWhiteList";
import {BlackWhiteDetail} from "./Pages/wpdmp/dmp/BlackWhiteDetail/blackWhiteDetail";
import ApplyApiCheck from "./Pages/wpdmp/dmp/ApplyApiCheck/applyApiCheck";
import {ApplyApiList} from "./Pages/wpdmp/dmp/ApplyApiList/applyApiList";
import {ApplyApi} from "./Pages/wpdmp/dmp/ApplyApi/applyApi";
import {ReviewApi} from "./Pages/wpdmp/dmp/ReviewApi/reviewApi";
import {BlackListRevise} from "./Pages/wpdmp/dmp/BlackListRevise/blackListRevise";

//  sp-ua
import Approval from "./Pages/sp/ua/Approval/approval";
import Manage from "./Pages/sp/ua/Manage/manage";
import Busin from "./Pages/sp/ua/Business/business";
import EditUserInfo from "./Pages/sp/ua/EditUserInfo/editUserInfo";
import CreateAuth from "./Pages/sp/ua/CreateAuth/createAuth";
import CreateAuth1 from "./Pages/sp/ua/CreateAuth1/createAuth1";
import AssignPermission from "./Pages/sp/ua/AssignPermission/assignPermission";
import EditTelephone from "./Pages/sp/ua/EditTelephone/editTelephone";
import ShiftAuth from "./Pages/sp/ua/ShiftAuth/shiftAuth";
import ReplaceAuth from "./Pages/sp/ua/ReplaceAuth/replaceAuth";
import EditTelephone1 from "./Pages/sp/ua/EditTelephone1/editTelephone1";
import EditTelephone2 from "./Pages/sp/ua/EditTelephone2/editTelephone2";
import EditEmail from "./Pages/sp/ua/EditEmail/editEmail";

//  pfpsmas-zcms
import ZcmsIndex from "./Pages/pfpsmas/zcms/rzc/zcmsIndex";
import CreateChangeComparisonTable from "./Pages/pfpsmas/zcms/rzc/createChangeComparisonTable";
import InputChangeDetails from "./Pages/pfpsmas/zcms/rzc/inputChangeDetails";
import PreviewChangeDetails from "./Pages/pfpsmas/zcms/rzc/previewChangeDetails";
import Download from "./Pages/pfpsmas/zcms/rzc/download";
import TimedTask from "./Pages/pfpsmas/zcms/rzc/timedTask";
import PreviewFormalZoningCode from "./Pages/pfpsmas/zcms/rzc/previewFormalZoningCode";
import ProvincialVersionControl from "./Pages/pfpsmas/zcms/rzc/provincialVersionControl";
import ConditionQuery from "./Pages/pfpsmas/zcms/rzc/conditionQuery";
//批复文件上传 管理
import UploadApprovalFile from "./Pages/pfpsmas/zcms/rzc/uploadApprovalFile";
import ApprovalDocumentManage from "./Pages/pfpsmas/zcms/rzc/approvalDocumentManage";
// 民政区划管理
import ImportCivilzoningCode from "./Pages/pfpsmas/zcms/rzc/importCivilzoningCode";
import PreviewCivilzoningCode from "./Pages/pfpsmas/zcms/rzc/previewCivilzoningCode";
import HistoricalTrace from "./Pages/pfpsmas/zcms/rzc/historicalTrace";
import PreviewChangeReport from "./Pages/pfpsmas/zcms/rzc/previewChangeReport";
import CivilComparisonReport from "./Pages/pfpsmas/zcms/rzc/civilComparisonReport";

//  fgimtpcim 兩非
import Lasp from "./Pages/srbgs/fgimtpcim/case_approval/Lasp/lasp"; // 立案审批
import Zxsp from "./Pages/srbgs/fgimtpcim/case_approval/Zxsp/zxsp"; // 注销审批
import CaseMangement from "./Pages/srbgs/fgimtpcim/case_management/CaseManage/caseManage"; // 案件管理
import Wjaj from "./Pages/srbgs/fgimtpcim/case_management/Wjaj/wjaj"; //  未结案件
import Yjaj from "./Pages/srbgs/fgimtpcim/case_management/Yjaj/yjaj"; // 已结案件
import Ajdb from "./Pages/srbgs/fgimtpcim/case_supervision/Ajdb/ajdb";  // 案件督办
import Dbxx from "./Pages/srbgs/fgimtpcim/case_supervision/Dbxx/dbxx";  // 督办信息
import Jsjl from "./Pages/srbgs/fgimtpcim/case_supervision/Jsjl/jsjl"; // 解锁记录
import Jsajdb from "./Pages/srbgs/fgimtpcim/case_supervision/Jsajdb/jsajdb"; // 接收案件督办
import Fqajxb from "./Pages/srbgs/fgimtpcim/case_teamwork/Fqajxb/fqajxb"; // 发起案件协办
import Jsajxb from "./Pages/srbgs/fgimtpcim/case_teamwork/Jsajxb/jsajxb"; // 接收案件协办
import Xbxxck from "./Pages/srbgs/fgimtpcim/case_teamwork/Xbxxck/xbxxck"; // 协办信息查看
import Cljgb from "./Pages/srbgs/fgimtpcim/data_statistics/Cljgb/cljgb"; //  处理结果表                                                                       //   区域协作关系表
import Cljgmx from "./Pages/srbgs/fgimtpcim/data_statistics/Cljgmx/cljgmx"; // 处理结果明细
import Qyxzb from "./Pages/srbgs/fgimtpcim/data_statistics/Qyxzb/qyxzb"; // 区域协作表
import Sjcljghzb from "./Pages/srbgs/fgimtpcim/data_statistics/Sjcljghzb/sjcljghzb"; // 省级处理结果汇总表
import Xtlrqkb from "./Pages/srbgs/fgimtpcim/data_statistics/Xtlrqkb/xtlrqkb";  // 系统录入情况表
import Xtyyqkb from "./Pages/srbgs/fgimtpcim/data_statistics/Xtyyqkb/xtyyqkb"; //  系统应用情况表
import Yyglqkb from "./Pages/srbgs/fgimtpcim/data_statistics/Yyglqkb/yyglqkb"; //   应用管理情况表
import Sadwtj from "./Pages/srbgs/fgimtpcim/focused_personnel/Sadwtj/sadwtj"; // 涉案单位统计
import Sadxtj from "./Pages/srbgs/fgimtpcim/focused_personnel/Sadxtj/sadxtj"; // 涉案对象统计
import Yljgcx from "./Pages/srbgs/fgimtpcim/focused_personnel/Yljgcx/yljgcx"; // 医疗机构查询
import Ylqzcx from "./Pages/srbgs/fgimtpcim/focused_personnel/Ylqzcx/ylqzcx"; // 育龄群众查询
import Ywrycx from "./Pages/srbgs/fgimtpcim/focused_personnel/Ywrycx/ywrycx"; // 医务人员查询
import Zjrycx from "./Pages/srbgs/fgimtpcim/focused_personnel/Zjrycx/zjrycx"; // 中介人员查询
import Jbjbxx from "./Pages/srbgs/fgimtpcim/info_manage/Jbjbxx/jbjbxx"; // 交办举报信息
import Rsycxs from "./Pages/srbgs/fgimtpcim/info_manage/Rsycxs/rsycxs"; // 妊娠异常消失
import Ycldjbxx from "./Pages/srbgs/fgimtpcim/info_manage/Ycldjbxx/ycldjbxx"; // 已处理的举报信息
import messageEntry from "./Pages/srbgs/fgimtpcim/info_manage/messageEntry/messageEntry"; // 消息录入
import messageReceive from "./Pages/srbgs/fgimtpcim/info_manage/info_receive/messageReceive"; // 消息接收
import Ajcx from "./Pages/srbgs/fgimtpcim/info_search/Ajcx/ajcx"; // 案件查询
import Cljgcx from "./Pages/srbgs/fgimtpcim/info_search/Cljgcx/cljgcx"; // 处理结果查询
import Ksclmx from "./Pages/srbgs/fgimtpcim/info_search/Ksclmx/Ksclmx"; // 跨省处理明细
import MySearch from "./Pages/srbgs/fgimtpcim/info_search/My_search/mySearch" // 我的查询
import Sadwcx from "./Pages/srbgs/fgimtpcim/info_search/Sadwcx/sadwcx"; // 涉案单位查询
import Sadwhmd from "./Pages/srbgs/fgimtpcim/info_search/Sadwhmd/sadwhmd"; // 涉案单位黑名单
import Sadxcx from "./Pages/srbgs/fgimtpcim/info_search/Sadxcx/sadxcx"; // 涉案对象查询
import Sadxhmd from "./Pages/srbgs/fgimtpcim/info_search/Sadxhmd/sadxhmd"; // 涉案对象黑名单
import Snkxclmx from "./Pages/srbgs/fgimtpcim/info_search/Snkxclmx/snkxclmx"; // 市内跨县处理明细
import Snksclmx from "./Pages/srbgs/fgimtpcim/info_search/Snksclmx/snksclmx"; // 省内跨市处理明细
import YjxxckInfo from "./Pages/srbgs/fgimtpcim/info_search/Yjxxck/yjxxck"; // 移交信息查看
import Jsajyj from "./Pages/srbgs/fgimtpcim/transfer_of_cases/Jsajyj/jsajyj"; // 接收案件移交
import Sqajyj from "./Pages/srbgs/fgimtpcim/transfer_of_cases/Sqajyj/sqajyj"; // 申请案件移交
import Yjxxck from "./Pages/srbgs/fgimtpcim/transfer_of_cases/Yjxxck/yjxxck"; // 移交信息查看
import AjfbEchaets from "./Pages/srbgs/fgimtpcim/data_statistics/CaseDistribute/caseDistribute"; // 案件分布
import AjjaEchaets from "./Pages/srbgs/fgimtpcim/data_statistics/CloseCase/closeCase"; // 结案分布
import BirthSexRatio from './Pages/srbgs/srbgr/birth_monitor/BirthSexRatio/birthSexRatio'; // 出生性别比

//  pfpsmas-cbfsms
//  pdass 三项制度 
import Rsira from "./Pages/pfpsmas/cbfsms/pdass/Rsira/rsira";
import Ssira from "./Pages/pfpsmas/cbfsms/pdass/Ssira/ssira";
import Lbefpira from "./Pages/pfpsmas/cbfsms/pdass/Lbefpira/lbefpira";

// 手动更改路由
import Xxfssp from "./Pages/pfpsmas/cbfsms/pdass/xxfssp/Xxfssp";
import Xxsp from "./Pages/pfpsmas/cbfsms/pdass/xxsp/Xxsp";
import Nfhjthcx from "./Pages/pfpsmas/cbfsms/pdass/nfhjthcx/Nfhjthcx";


//  引入axios
//  并做全局配置
import axios from "axios";

axios.defaults.baseURL = `http://localhost:9999`;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

class App extends React.Component{
    render() {
        return (
            <div style={{width:"100%",height:"100%"}}>
                <div className="main" style={{width:"100%",height:"100%"}}>{this.props.children}</div>
            </div>
        )
    }
}

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>

            {/*<Route path="inbox" component={PageInbox}>*/}
                {/*<Route path="messages/:id" component={PageInboxMessage} />*/}
            {/*</Route> *!/*/}

            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>

            <Route path='/home' component={Home}/>
            <Route path='/about' component={About}>

                {/* 权限 */}
                <Route path='/about/sp/ua/approval' component={Approval} />
                <Route path='/about/sp/ua/manage' component={Manage} />
                <Route path='/about/sp/ua/business' component={Busin} />
                <Route path='/about/sp/ua/editUserInfo' component={EditUserInfo} />
                <Route path='/about/sp/ua/createAuth' component={CreateAuth1} />
                <Route path='/about/sp/ua/createAuth1' component={CreateAuth} />
                <Route path='/about/sp/ua/assignPermission' component={AssignPermission} />
                <Route path='/about/sp/ua/ShiftAuth' component={ShiftAuth} />
                <Route path='/about/sp/ua/ReplaceAuth' component={ReplaceAuth} />
                <Route path='/about/sp/ua/editTele' component={EditTelephone} />
                <Route path='/about/sp/ua/editTele1' component={EditTelephone1} />
                <Route path='/about/sp/ua/editTele2' component={EditTelephone2} />
                <Route path='/about/sp/ua/editEmail' component={EditEmail} />
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
                <Route path='/about/wpdmp/dmp/apilist' component={ApiList}>
                    <Route path='/about/wpdmp/dmp/apilist/apiDetail' component={ApiDetail}/>
                    <Route path='/about/wpdmp/dmp/apilist/apiDetailChange' component={ApiDetailChange}/>
                    <Route path='/about/wpdmp/dmp/apilist/blackList' component={BlackWhiteList}/>
                    <Route path='/about/wpdmp/dmp/apilist/blackList/blackDetail' component={BlackWhiteDetail}/>
                    <Route path='/about/wpdmp/dmp/apilist/blackList/blackListRevise' component={BlackListRevise}/>
                </Route>
                <Route path='/about/wpdmp/dmp/applyCHeck' component={ApplyApiCheck}>
                    <Route path='/about/wpdmp/dmp/applyCHeck/apiList' component={ApplyApiList}/>
                    <Route path='/about/wpdmp/dmp/applyCHeck/apiList/applyApi' component={ApplyApi}/>
                </Route>
                <Route path='/about/wpdmp/dmp/reviewApi' component={ReviewApi}/>

                {/* 
		            *** 出生性别比治理子系统 ***
		        */}
                <Route path='/about/pfpsmas/cbfsms/srbgs/home' component={FHome} />
		        {/* 出生性别比治理备案 */}
                <Route path='/about/pfpsmas/cbfsms/srbgs/srbgr/birth_monitor/BirthSexRatio/birthSexRatio' component={BirthSexRatio} />
		        {/* ‘两非’案件信息管理 */}
		        {/* 重点关注人员 */}
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/focused_personnel/unit_census' component={Sadwtj} />
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/focused_personnel/object_census' component={Sadxtj} />
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/focused_personnel/intermediary_inquity' component={Zjrycx} />
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/focused_personnel/procreate_masses_inquiry' component={Ylqzcx} />
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/focused_personnel/medical_staff_inquiry' component={Ywrycx} />
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/focused_personnel/medical_institution_inquiry' component={Yljgcx} />
                {/* 案件管理 */}
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/case_management/case_manage' component={CaseMangement} />
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/case_management/over_case' component={Yjaj} />
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/case_management/not_over_case' component={Wjaj} />

                {/* 案件审批 */}
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/case_examine/register_examine' component={Lasp} />
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/case_examine/cancel_examine' component={Zxsp} />

                {/* 案件督办 */}
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/case_supervisor/supervision_info' component={Dbxx} />
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/case_supervisor/unlock_record' component={Jsjl} />
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/case_supervisor/case_supervision' component={Ajdb} />
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/case_supervisor/receive_case_supervision' component={Jsajdb} />

                {/* 信息查询 */}
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/info_inquiry/case_inquiry' component={Ajcx} />
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/info_inquiry/fruit_inquiry' component={Cljgcx} />
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/info_inquiry/object_inquiry' component={Sadxcx} />
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/info_inquiry/unit_inquiry' component={Sadwcx} />
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/info_inquiry/object_blacklist' component={Sadxhmd} />
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/info_inquiry/unit_blacklist' component={Sadwhmd} />
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/info_inquiry/cross_provincial_detail' component={Ksclmx} />
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/info_inquiry/cross_city_details' component={Snksclmx} />
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/info_inquiry/cross_county_detail' component={Snkxclmx} />
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/info_inquiry/transfer_view' exact component={YjxxckInfo} />
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/info_inquiry/my_inquiry' component={MySearch} />

                {/* 报表统计 */}
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/repor_statistics/system_application' component={Xtyyqkb}/>
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/repor_statistics/system_entry' component={Xtlrqkb}/>
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/repor_statistics/area_cooperation' component={Qyxzb}/>
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/repor_statistics/dispose_fruit' component={Cljgb}/>
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/repor_statistics/dispose_fruit_detail' component={Cljgmx}/>
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/repor_statistics/apply_manage' component={Yyglqkb}/>
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/repor_statistics/fruit_gather' component={Sjcljghzb}/>
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/repor_statistics/case_distribute' component={AjfbEchaets}/>
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/repor_statistics/close_case' component={AjjaEchaets}/>/

                {/* 消息管理 */}
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/info_management/assign_report' component={Jbjbxx}/>
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/info_management/encyesis_vanish' component={Rsycxs}/>
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/info_management/over_report' component={Ycldjbxx}/>
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/info_management/message_entry' component={messageEntry}/>
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/info_management/message_receive' component={messageReceive}/>

                {/* 案件移交 */}
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/case_transfer/case_apply' component={Sqajyj}/>
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/case_transfer/case_receive' component={Jsajyj}/>
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/case_transfer/transfer_info' exact component={Yjxxck}/>

                {/* 案件协办*/}
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/case_cooperation/case_start' component={Fqajxb}/>
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/case_cooperation/case_receive' component={Jsajxb}/>
                <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/case_cooperation/cooperation_info' component={Xbxxck}/>

                {/* 奖扶 */}
                {/* pdass 三项制度 */}
                <Route path='/about/pfpsmas/cbfsms/pdass/rsira' component={Rsira} />
                <Route path='/about/pfpsmas/cbfsms/pdass/ssira' component={Ssira} />
                <Route path='/about/pfpsmas/cbfsms/pdass/lbefpira' component={Lbefpira} />

                {/* 手动更改路由 */}
                <Route path='/about/pfpsmas/cbfsms/pdass/xxfssp' component={Xxfssp} />
                <Route path='/about/pfpsmas/cbfsms/pdass/xxsp' component={Xxsp} />
                <Route path='/about/pfpsmas/cbfsms/pdass/nfhjthcx' component={Nfhjthcx} />
            </Route>

            <Router path='/test' component={Test}/>
            
            <IndexRedirect to='/login'/>
        </Route>
    </Router>,
    document.getElementById("app")
)