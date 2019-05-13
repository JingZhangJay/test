import React from 'react'
import { Menu, Breadcrumb, Icon, Badge,Table} from 'antd';
import { Router, Route, IndexRedirect, IndexRoute, Link, hashHistory } from 'react-router'

//  fgimtpcim 兩非
import Lasp from "../../../../Pages/srbgs/fgimtpcim/case_approval/Lasp/lasp"; // 立案审批
import Zxsp from "../../../../Pages/srbgs/fgimtpcim/case_approval/Zxsp/zxsp"; // 注销审批
import CaseMangement from "../../../../Pages/srbgs/fgimtpcim/case_management/CaseManage/caseManage"; // 案件管理
import Wjaj from "../../../../Pages/srbgs/fgimtpcim/case_management/Wjaj/wjaj"; //  未结案件
import Yjaj from "../../../../Pages/srbgs/fgimtpcim/case_management/Yjaj/yjaj"; // 已结案件
import Ajdb from "../../../../Pages/srbgs/fgimtpcim/case_supervision/Ajdb/ajdb";  // 案件督办
import Dbxx from "../../../../Pages/srbgs/fgimtpcim/case_supervision/Dbxx/dbxx";  // 督办信息
import Jsjl from "../../../../Pages/srbgs/fgimtpcim/case_supervision/Jsjl/jsjl"; // 解锁记录
import Jsajdb from "../../../../Pages/srbgs/fgimtpcim/case_supervision/Jsajdb/jsajdb"; // 接收案件督办
import Fqajxb from "../../../../Pages/srbgs/fgimtpcim/case_teamwork/Fqajxb/fqajxb"; // 发起案件协办
import Jsajxb from "../../../../Pages/srbgs/fgimtpcim/case_teamwork/Jsajxb/jsajxb"; // 接收案件协办
import Xbxxck from "../../../../Pages/srbgs/fgimtpcim/case_teamwork/Xbxxck/xbxxck"; // 协办信息查看
import Cljgb from "../../../../Pages/srbgs/fgimtpcim/data_statistics/Cljgb/cljgb"; //  处理结果表                                                                       //   区域协作关系表
import Cljgmx from "../../../../Pages/srbgs/fgimtpcim/data_statistics/Cljgmx/cljgmx"; // 处理结果明细
import Qyxzb from "../../../../Pages/srbgs/fgimtpcim/data_statistics/Qyxzb/qyxzb"; // 区域协作表
import Sjcljghzb from "../../../../Pages/srbgs/fgimtpcim/data_statistics/Sjcljghzb/sjcljghzb"; // 省级处理结果汇总表
import Xtlrqkb from "../../../../Pages/srbgs/fgimtpcim/data_statistics/Xtlrqkb/xtlrqkb";  // 系统录入情况表
import Xtyyqkb from "../../../../Pages/srbgs/fgimtpcim/data_statistics/Xtyyqkb/xtyyqkb"; //  系统应用情况表
import Yyglqkb from "../../../../Pages/srbgs/fgimtpcim/data_statistics/Yyglqkb/yyglqkb"; //   应用管理情况表
import Sadwtj from "../../../../Pages/srbgs/fgimtpcim/focused_personnel/Sadwtj/sadwtj"; // 涉案单位统计
import Sadxtj from "../../../../Pages/srbgs/fgimtpcim/focused_personnel/Sadxtj/sadxtj"; // 涉案对象统计
import Yljgcx from "../../../../Pages/srbgs/fgimtpcim/focused_personnel/Yljgcx/yljgcx"; // 医疗机构查询
import Ylqzcx from "../../../../Pages/srbgs/fgimtpcim/focused_personnel/Ylqzcx/ylqzcx"; // 育龄群众查询
import Ywrycx from "../../../../Pages/srbgs/fgimtpcim/focused_personnel/Ywrycx/ywrycx"; // 医务人员查询
import Zjrycx from "../../../../Pages/srbgs/fgimtpcim/focused_personnel/Zjrycx/zjrycx"; // 中介人员查询
import Jbjbxx from "../../../../Pages/srbgs/fgimtpcim/info_manage/Jbjbxx/jbjbxx"; // 交办举报信息
import Rsycxs from "../../../../Pages/srbgs/fgimtpcim/info_manage/Rsycxs/rsycxs"; // 妊娠异常消失
import Ycldjbxx from "../../../../Pages/srbgs/fgimtpcim/info_manage/Ycldjbxx/ycldjbxx"; // 已处理的举报信息
import messageEntry from "../../../../Pages/srbgs/fgimtpcim/info_manage/messageEntry/messageEntry" // 消息录入
import messageReceive from "../../../../Pages/srbgs/fgimtpcim/info_manage/info_receive/messageReceive"; // 消息接收
import Ajcx from "../../../../Pages/srbgs/fgimtpcim/info_search/Ajcx/ajcx"; // 案件查询
import Cljgcx from "../../../../Pages/srbgs/fgimtpcim/info_search/Cljgcx/cljgcx"; // 处理结果查询
import Ksclmx from "../../../../Pages/srbgs/fgimtpcim/info_search/Ksclmx/Ksclmx"; // 跨省处理明细
import MySearch from "../../../../Pages/srbgs/fgimtpcim/info_search/My_search/mySearch" // 我的查询
import Sadwcx from "../../../../Pages/srbgs/fgimtpcim/info_search/Sadwcx/sadwcx"; // 涉案单位查询
import Sadwhmd from "../../../../Pages/srbgs/fgimtpcim/info_search/Sadwhmd/sadwhmd"; // 涉案单位黑名单
import Sadxcx from "../../../../Pages/srbgs/fgimtpcim/info_search/Sadxcx/sadxcx"; // 涉案对象查询
import Sadxhmd from "../../../../Pages/srbgs/fgimtpcim/info_search/Sadxhmd/sadxhmd"; // 涉案对象黑名单
import Snkxclmx from "../../../../Pages/srbgs/fgimtpcim/info_search/Snkxclmx/snkxclmx"; // 市内跨县处理明细
import Snksclmx from "../../../../Pages/srbgs/fgimtpcim/info_search/Snksclmx/snksclmx"; // 省内跨市处理明细
import YjxxckInfo from "../../../../Pages/srbgs/fgimtpcim/info_search/Yjxxck/yjxxck"; //  移交信息查看【信息搜素】

import Jsajyj from "../../../../Pages/srbgs/fgimtpcim/transfer_of_cases/Jsajyj/jsajyj"; // 接收案件移交
import Sqajyj from "../../../../Pages/srbgs/fgimtpcim/transfer_of_cases/Sqajyj/sqajyj"; // 申请案件移交
import Yjxxck from "../../../../Pages/srbgs/fgimtpcim/transfer_of_cases/Yjxxck/yjxxck"; // 移交信息查看

import AjfbEchaets from "../../../../Pages/srbgs/fgimtpcim/data_statistics/CaseDistribute/caseDistribute" // 案件分布 【echarst】
import AjjaEchaets from "../../../../Pages/srbgs/fgimtpcim/data_statistics/CloseCase/closeCase" // 已结案件  【echarst】

import FHome from "../../../../Pages/common/srbgs/fgimtpcim/Home/home"; 
import Index from "../../../../Pages/common/srbgs/fgimtpcim/Index/index"

require('./template.css')

export const Template = (props) => (

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
                    <Router history={hashHistory}>
                        {/*<Route path='/about' component={FHome} />*/}

                        <Route path='/about' component={Index} />
                        {/* 重点关注人员 */}
                        <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/focused_personnel/unit_census' component={Sadwtj} />
                        <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/focused_personnel/object_census' component={Sadxtj} />
                        <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/focused_personnel/intermediary_inquity' component={Zjrycx} />
                        <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/focused_personnel/procreate_masses_inquiry' component={Ylqzcx} />
                        <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/focused_personnel/medical_staff_inquiry' component={Ywrycx} />
                        <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/focused_personnel/medical_institution_inquiry' component={Yljgcx} />

                        {/*  案件管理 */}
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
                        <Route path='/about/pfpsmas/cbfsms/srbgs/fgimtpcim/repor_statistics/close_case' component={AjjaEchaets}/>

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


                        {/*<IndexRedirect to="/" />*/}
                    </Router>
                </div>
            </div>
        </div>

        {/*<div className="ant-layout-footer"> </div> */}
    </div>
)


export default Template;