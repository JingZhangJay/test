import {Link} from 'react-router';
import {Icon, Menu} from 'antd';
const SubMenu = Menu.SubMenu;

require('./menu.css');


class Sider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'inline',
            theme: 'dark',
            menuData : [
                {
                    authorityName: "重点关注人员",
                    subMenu: [
                        {
                            authorityName: '涉案单位统计',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/focused_personnel/unit_census'
                        },
                        {
                            authorityName: '涉案对象统计',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/focused_personnel/object_census'
                        },
                        {
                            authorityName: '中介人员查询',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/focused_personnel/intermediary_inquity'
                        },
                        {
                            authorityName: '育龄群众查询',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/focused_personnel/procreate_masses_inquiry'
                        },
                        {
                            authorityName: '医务人员查询',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/focused_personnel/medical_staff_inquiry'
                        },

                        {
                            authorityName: '医疗机构查询',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/focused_personnel/medical_institution_inquiry'
                        },
                    ]
                },
                {
                    authorityName: "消息管理",
                    subMenu: [
                        {
                            authorityName: '消息录入',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/info_management/message_entry'
                        },
                        {
                            authorityName: '消息接收',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/info_management/message_receive'
                        },
                        {
                            authorityName: '交办举报信息',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/info_management/assign_report'
                        },
                        {
                            authorityName: '妊娠异常消失',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/info_management/encyesis_vanish'
                        },
                        {
                            authorityName: '已处理的举报信息',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/info_management/over_report'
                        }
                        
                    ]
                },
                {
                    authorityName: "案件管理",
                    subMenu: [
                        {
                            authorityName: '已结案件',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/case_management/over_case'
                        },
                        {
                            authorityName: '案件管理',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/case_management/case_manage'
                        },
                        {
                            authorityName: '未结案件',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/case_management/not_over_case'
                        }
                    ]
                },
                {
                    authorityName: "案件审批",
                    subMenu: [
                        {
                            authorityName: '立案审批',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/case_examine/register_examine'
                        },
                        {
                            authorityName: '注销审批',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/case_examine/cancel_examine'
                        }
                    ]
                },
                {
                    authorityName: "案件督办",
                    subMenu: [
                        {
                            authorityName: '督办信息',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/case_supervisor/supervision_info'
                        },
                        {
                            authorityName: '解锁记录',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/case_supervisor/unlock_record'
                        },
                        {
                            authorityName: '案件督办',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/case_supervisor/case_supervision'
                        },
                        {
                            authorityName: '接收案件督办',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/case_supervisor/receive_case_supervision'
                        }

                    ]
                },
                {
                    authorityName: "案件移交",
                    subMenu: [
                        {
                            authorityName: '申请案件移交',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/case_transfer/case_apply'
                        },
                        {
                            authorityName: '接收案件移交',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/case_transfer/case_receive'
                        },
                        {
                            authorityName: '移交信息查看',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/case_transfer/transfer_info'
                        }

                    ]
                },
                {
                    authorityName: "案件协办",
                    subMenu: [
                        {
                            authorityName: '发起案件协办',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/case_cooperation/case_start'
                        },
                        {
                            authorityName: '接收案件协办',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/case_cooperation/case_receive'
                        },
                        {
                            authorityName: '协办信息查看',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/case_cooperation/cooperation_info'
                        }

                    ]
                },
                {
                    authorityName: "信息查询",
                    subMenu: [
                        {
                            authorityName: '案件查询',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/info_inquiry/case_inquiry'
                        },
                        {
                            authorityName: '处理结果查询',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/info_inquiry/fruit_inquiry'
                        },
                        {
                            authorityName: '涉案对象查询',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/info_inquiry/object_inquiry'
                        },
                        {
                            authorityName: '涉案单位查询',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/info_inquiry/unit_inquiry'
                        },
                        {
                            authorityName: '涉案对象黑名单',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/info_inquiry/object_blacklist'
                        },
                        {
                            authorityName: '涉案单位黑名单',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/info_inquiry/unit_blacklist'
                        },
                        {
                            authorityName: '跨省处理明细',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/info_inquiry/cross_provincial_detail'
                        },
                        {
                            authorityName: '省内跨市处理明细',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/info_inquiry/cross_city_details'
                        },
                        {
                            authorityName: '市内跨县处理明细',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/info_inquiry/cross_county_detail'
                        },
                        {
                            authorityName: '移交信息查看',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/info_inquiry/transfer_view'
                        },
                        {
                            authorityName: '我的查询',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/info_inquiry/my_inquiry'
                        }
                    ]
                },
                {
                    authorityName: "报表统计",
                    subMenu: [
                        {
                            authorityName: '系统应用情况表',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/repor_statistics/system_application'
                        },
                        {
                            authorityName: '系统录入情况表',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/repor_statistics/system_entry'
                        },
                        {
                            authorityName: '区域协作表',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/repor_statistics/area_cooperation'
                        },
                        {
                            authorityName: '处理结果表',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/repor_statistics/dispose_fruit'
                        },
                        {
                            authorityName: '处理结果明细',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/repor_statistics/dispose_fruit_detail'
                        },
                        {
                            authorityName: '应用管理情况表',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/repor_statistics/apply_manage'
                        },
                        {
                            authorityName: '省级处理结果汇总表',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/repor_statistics/fruit_gather'
                        },
                        {
                            authorityName: '案件分布',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/repor_statistics/case_distribute'
                        },
                        {
                            authorityName: '已结案件',
                            requestUrl:'pfpsmas/cbfsms/srbgs/fgimtpcim/repor_statistics/close_case'
                        }
 
                    ]
                },
                {
                    authorityName: "系统工具",
                    subMenu: [
                        {
                            authorityName: '交流平台'
                        },
                        {
                            authorityName: '用户管理'
                        }
                    ]
                }
            ],
            current: '1',
            openKeys: [],

        }
    }

    changeMode(value) {
        this.setState({
            mode: value ? 'vertical' : 'inline',
        });
    }

    componentWillMount() {
        // console.log(`menuData ${this.state.menuData}`)
    }



    getInitialState() {
        return {
            current: '1',
            openKeys: [],
        };
    }

    handleClick(e) {
        console.log('click ', e);
        this.setState({
            current: e.key,
            openKeys: e.keyPath.slice(1),
        });
    }
    onToggle(info) {
        this.setState({
            openKeys: info.open ? info.keyPath : info.keyPath.slice(1),
        });
    }

    render() {
        return (
            this.state.menuData ? <div style={{marginTop:'42px'}}>
                {/*<Switch onChange={this.changeMode.bind(this)} />*/}
                {/* <span className="ant-divider" style={{ margin: '0 1em' }} /> */}
                 {/*<Switch onChange={this.changeTheme.bind(this)} /> Theme */}
                <br/>
                <Menu
                    onClick={this.handleClick.bind(this)}
                    style={{ width: 224 }}
                    openKeys={this.state.openKeys}
                    onOpen={this.onToggle.bind(this)}
                    onClose={this.onToggle.bind(this)}
                    selectedKeys={[this.state.current]}
                    mode="inline"
                >
                    {
                        this.state.menuData.map(function (item) {
                                return (
                                    <SubMenu key={item.authorityId}
                                         title={<span><Icon type="appstore"/><span className="nav-text">
                                              <Link to={{pathname: `/about/${item.requestUrl}`, state: {systemId: item.systemId}}}
                                                    title={item.authorityName}>
                                                {item.authorityName}
                                              </Link></span></span>}>
                                        {
                                            item.subMenu.map((el) => (
                                                <Menu.Item key={el.authorityId}>
                                                    <span className="nav-text">
                                                      <Link to={{pathname: `/about/${el.requestUrl}`, state: {systemId: el.systemId}}}
                                                            title={el.authorityName}>
                                                        {el.authorityName}
                                                      </Link>
                                                    </span>
                                                </Menu.Item>
                                            ))
                                        }
                                    </SubMenu>
                                )
                            })
                    }
                </Menu>
            </div> : <div></div>
        );
    }
}

export default Sider;