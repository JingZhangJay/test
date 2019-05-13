import axios  from "axios";
import qs from "qs";

//  测试
export let test = async () => {
    let response = await axios({
        url:  '/ajgl/action/test',
        method: 'get',
        // params: data
    })
    return response.data
}




/**
 * 变更明细当月实时数据查询下级
 * @param {string} zoningCode 区划代码
 */
export let getBgmxRealTimeExcelSub = async (params) => {
    let response = await axios({
        url: 'zcmsapi1/queryZoningData/bgmxRealTimeExcelSub',
        method: 'get',
        params: params
    })
    return response.data
}

/**
 * 变更明细当月实时数据
 * @param {string} zoningCode 区划代码
 */
export let getBgmxRealTimeExcel = async (params) => {
    let response = await axios({
        url: 'zcmsapi1/queryZoningData/bgmxRealTimeExcel',
        method: 'get',
        params: params
    })
    return response.data
}
 

//  模拟登陆
// export let login = async (params) => {
//     let response = await axios({
//         url:  '/xzqh/action/login',
//         method: 'get',
//         params: params
//     })
//     return response.data
// }


// // 获取登录用户的顶级区划
// export let loginDxxqh    = async (params) => {
//     let response = await axios({
//         url: 'srbgs/xzqh/action/getLoginCode',
//         method: 'get',
//         params: params
//     })
//     return response.data
// }


// // 获取区划详细信息
// export let loginDxxqhInfo = async (params) => {
//     let response = await axios({
//         url:  '/xzqh/action/getDetailInfo',
//         method: 'get',
//         params: params
//     })
//     return response.data
// }

// // 获取子级区划
// export let loginZxxqh = async (params) => {
//     let response = await axios({
//         url:'/xzqh/action/findSonCodes',
//         method: 'get',
//         params: params
//     })
//     return response.data
// }










/*
*
* * * * * * * * * * * * * * *
*                           *
*        区划地址代码       *
*                           *
* * * * * * * * * * * * * * *
*
* */

/**
 * 获取下级区划
 * @param {string} code 区划代码
 */
export let getFindSonCodes = async (params) => {
    // console.log(data)
    let response = await axios({
        url:  'srbgs/xzqh/action/findSonCodes',
        method: 'get',
        params: params
    })
    return response.data
}

/**
 * 获取本级区划详细信息
 * @param {string} code 区划代码
 */
export let getDetailInfo = async (params) => {
    let response = await axios({
        url:  'srbgs/xzqh/action/getDetailInfo',
        method: 'get',
        params: params
    })
    return response.data
}

//  区划地址代码
// export let test = async () => {
//     let response = await axios({
//         url:  '/ajgl/action/test',
//         method: 'get',
//         // params: data
//     })
//     return response.data
// }


/*
*
* * * * * * * * * * * * * * *
*                           *
*            首 页          *
*                           *
* * * * * * * * * * * * * * *
*
* */

/**
 * 首页 【 消息提示 】
 *  
 */

export let getNewsApi = async (params) => {
    let response = await axios({
        url: 'srbgs/msg/action/news',
        method: 'get',
        params: params,
    });
    return response.data
}

/**
 * 首页 【 消息提示 详情 】
 * @param {string} id  id
 *  
 */ 
export let getDetailApi = async (params) => {
    let response = await axios({
        url: 'srbgs/msg/action/getDetail',
        method: 'get',
        params: params,
    });
    return response.data
}

/**
 * 首页 【 待办事宜 详情 】
 * @param {string} id  id
 *  
 */ 
export let getdDanbanDetail = async (params) => {
    let response = await axios({
        url: 'srbgs/daiBan/action/detail',
        method: 'get',
        params: params,
    });
    return response.data
}

/**
 * 首页 【 待办事宜 列表 】
 * @param {string} id  id
 *  
 */ 
export let getDaibanList = async (params) => {
    let response = await axios({
        url: 'srbgs/daiBan/action/list',
        method: 'get',
        params: params,
    });
    return response.data
}


/*
*
* * * * * * * * * * * * * * *
*                           *
*         重点人员关注       *
*                           *
* * * * * * * * * * * * * * *
*
* */

/**
 * 【 重点人员关注 】 中介人员查询
 * @param {string} xm  姓名 
 * @param {string} sfz  身份证 
 * @param {string} hjddm  户籍地 
 * @param {string} pageNum   
 * @param {string} pageSize 
 */
export let getZjry = async (params) => {
    let response = await axios({
        url: 'srbgs/zjry/info',
        method: 'get',
        params: params,
    });

    return response
}

/**
 * 【 重点人员关注 】 医疗机构查询
 * @param {string} frsfz  法人身份证
 * @param {string} mc  名称 
 * @param {string} glddm  管理地代码 
 * @param {string} pageNum   
 * @param {string} pageSize 
 */
export let getYljg = async (params) => {
    let response = await axios({
        url: 'srbgs/yljg/info',
        method: 'get',
        params: params,
    });
    return response.data
}

/**
 * 【 重点人员关注 】 育龄群众查询
 * @param {string} xm  姓名 
 * @param {string} sfz  身份证 
 * @param {string} hjddm  户籍地 
 * @param {string} pageNum   
 * @param {string} pageSize 
 */
export let getYlqz = async (params) => {
    let response = await axios({
        url: 'srbgs/ylqz/info',
        method: 'get',
        params: params,
    });
    return response.data
}

/**
 * 【 重点人员关注 】 医务人员查询
 * @param {string} xm  姓名 
 * @param {string} sfz  身份证 
 * @param {string} hjddm  户籍地 
 * @param {string} pageNum   
 * @param {string} pageSize 
 */
export let getYwry = async (params) => {
    let response = await axios({
        url: 'srbgs/ylry/info',
        method: 'get',
        params: params,
    });
    return response.data
}




/*
*
* * * * * * * * * * * * * * *
*                           *
*          消息管理         *
*                           *
* * * * * * * * * * * * * * *
*
* */

// export let getlrJbxx = async (params) => {
//     let response = await axios({
//         url: 'srbgs/xxgl/action/lrJbxx',
//         method: 'post',
//         params: params,
//         paramsSerializer: params => {
//             return qs.stringify(params, { indices: false })
//         }
//     });
//     return response.data
// }

/**
 * 【 消息录入 】 录入举报消息
 * @param {string} xxmc  消息名称
 * @param {string} jbsj  举报时间
 * @param {string} afdd  案发地点
 * @param {string} afdd_mc  案发地点名称
 * @param {string} afsj  案发时间
 * @param {string} jbr  举报人
 * @param {string} ajxz  案件性质
 * @param {string} lyfs  来源方式
 * @param {string} lxdh  联系电话
 * @param {string} lxdz  联系地址
 * @param {string} jbnr  举报内容 
 * 
 */
export let getlrJbxx = async (params) => {
    let response = await axios({
        url: 'srbgs/xxgl/action/lrJbxx',
        method: 'post',
        params: params,
        paramsSerializer: params => {
            return qs.stringify(params, { indices: false })
        }
    });
    return response.data
}


/**
 * 【 消息录入 】 查看未下发的举报消息
 * @param {string} start  起始时间
 * @param {string} end	  截至时间
 * @param {string} pageNum  当前页数
 * @param {string} pageSize  页面大小 
 * 
 */
export let getSelectCreatedJbxx = async (params) => {
    let response = await axios({
        url: 'srbgs/xxgl/action/selectCreatedJbxx',
        method: 'get',
        params: params
    });
    return response.data
}

/**
 * 
 * @param {string} id
 * @param {string} jsdw 接收单位
 * @param {string} jbbz 接收地址 
 */
export let getAssignJbxxeatedJbxx = async (params) => {
    let response = await axios({
        url: 'srbgs/xxgl/action/assignJbxxeatedJbxx',
        method: 'get',
        params: params
    });
    return response.data
}

/**
 *  【 消息接收 】 查询未办理的举报消息
 *  @param {string} start  起始时间
 *  @param {string} end	  截至时间
 *  @param {string} pageNum  当前页数
 *  @param {string} pageSize  页面大小  
 */ 
export let getSeekAssignedJbx = async (params) => {
    let response = await axios({
        url: 'srbgs/xxgl/action/seekAssignedJbxx',
        method: 'get',
        params: params
    });
    return response.data
}
 
/**
 *  【 已处理的举报信息 】 查询已经下发的举报消息
 *  @param {string} start  起始时间
 *  @param {string} end	  截至时间
 *  @param {string} pageNum  当前页数
 *  @param {string} pageSize  页面大小 
 *  @param {string}  xzqh 行政区划
 */ 
export let getSelectProcessedJbxx = async (params) => {
    let response = await axios({
        url: 'srbgs/xxgl/action/selectProcessedJbxx',
        method: 'get',
        params: params
    });
    return response.data
}


/**
 *  【 已处理的举报信息 】 查询已经下发的举报消息 
 *  @param {string}  sjyj 上级意见 【除了县级】 
 *  @param {string}  clzt 处理状态  
 *  @param {string}  clzt 处理说明 【县级】 
 */ 
export let getProcessJbxx = async (data) => { 
    let response = await axios({
        url: 'srbgs/xxgl/action/processJbxx',
        method: 'get',
        params: data
    });
    return response.data
}

/**
 *  【 查看信息详情 】 
 *  @param {string} id  信息编号 
 */ 
export let getInfoDetail = async (id) => { 
    let response = await axios({
        url: 'srbgs/xxgl/action/detail',
        method: 'get',
        params: {
            id : id
        }
    });
    return response.data
}

/*
*
* * * * * * * * * * * * * * *
*                           *
*          案件管理         *
*                           *
* * * * * * * * * * * * * * *
*
* */

/*  案件管理 【国家级 查询信息列表】
 *   @param {string} ajbh 案件编号
 *   @param {string} ajxz 案件性质
 *   @param {string} afsj 案发时间
 *   @param {string} lasj 立案时间
 *   @param {string} afdd 案发地点
 *   @param {string} ajjb 案件级别
 *   @param {string} ajzt 案件状态
 *   @param {string} badw 办案单位
 *   @param {string} jasj 结案时间
 *   @param {string} pageNum 页码
 *   @param {string} pageNum 每页数据记录数
 */
export let getCaseManage = async (params) => {

    let response = await axios({
        url: 'srbgs/ajgl/action/selectAjxxList',
        method: 'get',
        params: params,
        // headers:{
        //     'Content-Type':'application/x-frm;charset=utf-8'
        // },
        paramsSerializer: params => {
            return qs.stringify(params, { indices: false })
        }
    });
    return response.data
}

/*  案件管理 【国家级 导出信息列表】
 *   @param {string} ajbh 案件编号
 *   @param {string} ajxz 案件性质
 *   @param {string} afsj 案发时间
 *   @param {string} lasj 立案时间
 *   @param {string} afdd 案发地点
 *   @param {string} ajjb 案件级别
 *   @param {string} ajzt 案件状态
 *   @param {string} badw 办案单位
 *   @param {string} jasj 结案时间
 */
export let getCaseManageExport = (params) => {
    let url = 'srbgs/ajgl/action/exportAjxxList';
    window.location.href = url + params
}

/*
  *    案件管理 【 查看案件详情 】
  *    @param {string} ajbh 案件编号
  * */
export let getCaseDetail = async (ajbh) => {
    let response = await axios({
        url: 'srbgs/ajgl/action/selectAjxx',
        method: 'get',
        params: {
            ajbh:ajbh
        }
    })
    return response.data
}

/**
 * 修改案件信息
 * 
 * @param {string}   
 */
export let getCaseUpdateAjxx = async (params) => {
    let response = await axios({
        url: 'srbgs/ajgl/action/updateAjxx',
        method: 'post',
        params: params
    })
    return response.data
}



/*
  *    案件管理 【 查看涉案对象详细信息 】
  *    @param {string} ajbh 案件编号
  *    @param {string} sf 身份
  *    @param {string} dxbh 对象编号
  * */
export let getCaseObjectInfo = async (params) => {
    let response = await axios({
        url: 'srbgs/ajgl/action/selectSadx',
        method: 'get',
        params: params
    })
    return response.data
}

/*
  *    案件管理 【 查看案件相关的协办案件 】
  *    @param {string} ajbh 案件编号
  * */
export let getCaseRelatedCooperation = async (ajbh) => {
    let response = await axios({
        url: 'srbgs/ajgl/action/selectAjxxXbaj',
        method: 'get',
        params: {
            ajbh:ajbh
        }
    })
    return response.data
}

/*
  *    案件管理 【 查看案件材料 】
  *    @param {string} ajbh 案件编号
  * */
export let getCaseFile = async (ajbh) => {
    let response = await axios({
        url: 'srbgs/ajgl/action/selectAjclList',
        method: 'get',
        params: {
            ajbh:ajbh
        }
    })
    return response.data
}

/*
  *    案件管理 【 案件材料展示 】
  *    @param {string} ajbh 案件编号
  *    @param {string} cllb 材料主题（类别  1,案件材料 2，涉案对象材料按涉案对象分 3，涉案对象按材料类别分）
  *    @param {string} cllx 材料类型（代码）
  *    @param {string} pageNum
  *    @param {string} pageSize
  * */
export let getCaseFileShow = async (params) => {
    let response = await axios({
        url: 'srbgs/ajgl/action/selectAjclByType',
        method: 'get',
        params: params
    })
    return response.data
}

/*
  *    案件管理 【 下载案件材料 】
  *    @param {string} cflj 存放路径
  * */
export let getCaseFileDownload = async (params) => {
    let response = await axios({
        url: 'srbgs/ajgl/action/downloadAjcl',
        method: 'get',
        params: params
    })
    return response.data
}

/*
  *    案件管理 【 删除案件材料 】
  *    @param {string} ajbh 案件编号
  *    @param {string} clbh 材料编号
  * */
export let getCaseFileDelect = async (params) => {
    let response = await axios({
        url: 'srbgs/ajgl/action/deleteAjcl',
        method: 'get',
        params: params
    })
    return response.data
}

/*
  *    案件管理 【 添加案件材料 】
  *    @param {string} ajbh 案件编号
  *    @param {string} wjlx 文件类型，代码
  *    @param {string} cllx 材料类型，代码
  *    @param {string} clzt 材料主题：1 案件材料； 2，涉案对象材料按涉案对象分 3，涉案对象按材料类别分
  *    @param {string} sadxbh 涉案对象编号： （若材料主题为1，该字段传空）
  *    @param {string} sadxmc 涉案对象名称： （若材料主题为1，该字段传空）
  *    @param {MultipartFile} files 上传文件
  *    @param {string} scdw 上传单位
  * */
export let getCaseFileAdd = async (params) => {
    let instance = axios.create();
    let response = await instance({
        url: 'srbgs/ajgl/action/insertAjcl',
        method: 'post',
        data: params,
        processData: false,// 告诉axios不要去处理发送的数据(重要参数)
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        paramsSerializer: data => {
            return qs.stringify(data, { indices: false })
        }
    })
    return response.data
}

/*
  *    案件管理 【 查看结案报告 】
  *    @param {string} ajbh 案件编号
  * */
export let getCaseCloseReport = async (ajbh) => {
    let response = await axios({
        url: 'srbgs/ajgl/action/selectJaxx',
        method: 'get',
        params: {
            ajbh: ajbh
        }
    })
    return response.data
}

/*
  *    案件管理 【 案件评级 】
  *    @param {string} ajbh 案件编号
  *    @param {string} ajjb 案件级别
  *    @param {string} tbdw 填报单位
  * */
export let getCaseRating = async (params) => {
    let response = await axios({
        url: 'srbgs/ajgl/action/updateAjjb',
        method: 'get',
        params: params
    })
    return response.data
}

/*
  *    案件管理 【 添加案件督办 】
  *    @param {string} ajbh 案件编号
  *    @param {string} dblx 督办类型
  *    @param {string} dbsm 督办说明
  *    @param {string} dbdw 督办单位
  * */
export let getCaseSupervisionAdd = async (params) => {
    let response = await axios({
        url: 'srbgs/ajgl/action/insertAjdb',
        method: 'post',
        params: params
    })
    return response.data
}

/*
  *    案件管理 【查询案件信息列表 】
  *    @param {string} ajbh 案件编号
  *    @param {string} lasj 立案时间
  *    @param {string} afsj 案发时间
  *    @param {string} ajxz 案件性质
  *    @param {string} afdd 案发地点
  *    @param {string} badw 办案单位  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  *    @param {string} ajzt 已结案件是 902 未结 901
  * */
export let getCaseInfoList = async (params) => {
    let response = await axios({
        url: 'srbgs/ajgl/action/selectAjxxList',
        method: 'get',
        params: params,
        paramsSerializer: params => {
            return qs.stringify(params, { indices: false })
        }
    })
    return response.data
}

/*
  *    案件管理 【导出案件信息列表 】
  *    @param {string} ajbh 案件编号
  *    @param {string} lasj 立案时间
  *    @param {string} afsj 案发时间
  *    @param {string} ajxz 案件性质
  *    @param {string} afdd 案发地点
  *    @param {string} badw 办案单位  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  * */
export let getCaseInfoFile = async (params) => {
    let url = 'srbgs/ajgl/action/exportAjxxList';
    window.location.href = url + params

}

/*
  *    案件管理 【 新增案件信息 】
  *    @param {string} ajmc 案件名称
  *    @param {string} lyfs 来源方式（代码）
  *    @param {string} afdd 案发地点（代码）
  *    @param {string} ajxz 案件性质（代码）
  *    @param {string} jdfs 鉴定方式（代码）
  *    @param {string} afsj 案发时间
  *    @param {string} lasj 立案时间
  *    @param {string} lajg 立案机构（代码）
  *    @param {string} lar 立案人
  *    @param {string} spr 审批人
  *    @param {string} cbr 承办人
  *    @param {string} aqjj 案情简介
  *    @param {string} aqbz 案情备注
  *    @param {string} bajg 办案机构（代码）
  *
  * */
export let getCaseInfoAdd = async (params) => {
    let response = await axios({
        url: 'srbgs/ajgl/action/insertAjxx',
        method: 'post',
        data: params,
        // transformRequest: [
        //     function(params) {
        //         let ret = '';
        //         for (let it in params) {
        //             ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
        //         }
        //         return ret;
        //     }
        // ],
        // headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded'
        // }
    })
    return response.data
}


// axios.post(url, qs.stringify({jobNumber: '430525', password: '123'}), {headers: {'Content-Type':'application/x-www-form-urlencoded'}});
/*
  *    案件管理 【 查看涉案对象列表 】
  *    @param {string} ajbh 案件编号
  *
  * */
export let getCaseObjectList = async (ajbh) => {
    let response = await axios({
        url: 'srbgs/ajgl/action/selectSadxList',
        method: 'get',
        params: {
            ajbh:ajbh
        }
    })
    return response.data
}

/*
  *    案件管理 【 添加涉案个人 】 注：当添加的涉案个人被锁定时，提示用户是否进行立案审批
  *    @param {string} ajbh 案件编号
  *    @param {string} xm 姓名
  *    @param {string} sasf_dm 涉案个人身份（代码）
  *    @param {string} saxz 涉案性质（代码）
  *    @param {string} zyzg 执业资格（代码）
  *    @param {string} mz 民族
  *    @param {string} gzdw 工作单位
  *    @param {string} zjhm 证件号码
  *    @param {string} xb 性别
  *    @param {string} whcd 文化程度
  *    @param {string} zzmm 政治面貌
  *    @param {string} bz 备注
  *    @param {string} hjd 户籍地
  *    @param {string} lxdh 联系电话
  *    @param {string} lrdw 录入单位
  *    @param {MultipartFile} img 图片
  * */
export let getCaseIndividualAdd = async (params) => {
    let instance = axios.create();
    let response = await instance({
        url: 'srbgs/ajgl/action/insertSagr', 
        method: 'post',  
        headers: {
            'Content-Type':'multipart/form-data'
        },
        data: params,
        // paramsSerializer: params => {
        //     return qs.stringify(params, { indices: false })
        // }
    })
    return response.data
}

/*
  *    案件管理 【 添加涉案单位 】 注：同添加涉案个人
  *    @param {string} ajbh 案件编号
  *    @param {string} sadwmc 涉案单位名称
  *    @param {string} sasf_dm 涉案单位身份，代码
  *    @param {string} saxz 涉案性质
  *    @param {string} frdb 法人代表
  *    @param {string} frdbsfz 法人代表身份证
  *    @param {string} zjlx 证件类型（代码）
  *    @param {string} zjhm 证件号码
  *    @param {string} lxr 联系人
  *    @param {string} lxdh 联系电话
  *    @param {string} gld 管理地
  *    @param {string} bz 备注
  *    @param {string} xxdz 详细信息
  *    @param {string} lrdw 录入单位
  *    @param {string} badw 办案单位
  * */
export let getCaseUnitAdd = async (params) => {
    let response = await axios({
        url: 'srbgs/ajgl/action/insertSadw',
        method: 'post',
        params: params,
        paramsSerializer: data => {
            return qs.stringify(data, { indices: false })
        }
    })
    return response.data
}

/*
  *    案件管理 【 修改涉案个人信息 】
  *    @param {string} ajbh 案件编号
  *    @param {string} sagrbh 涉案个人编号
  *    @param {string} xm 姓名
  *    @param {string} sagrsf 涉案个人身份（代码）
  *    @param {string} saxz 涉案性质（代码）
  *    @param {string} zyzg 执业资格（代码）
  *    @param {string} mz 民族（代码）
  *    @param {string} gzdw 工作单位
  *    @param {string} zjhm 证件号码
  *    @param {string} xb 性别
  *    @param {string} whcd 文化程度
  *    @param {string} zzmm 政治面貌
  *    @param {string} bz 备注
  *    @param {string} hjd 户籍地
  *    @param {string} lxdh 联系电话
  *    @param {MultipartFile} img 图片
  * */
export let getCaseIndividualRevise = async (params) => {
    let response = await axios({
        url: 'srbgs/ajgl/action/updateSagr',
        method: 'post',
        params: params
    })
    return response.data
}

/*
  *    案件管理 【 修改涉案单位信息 】
  *    @param {string} ajbh 案件编号
  *    @param {string} sagwbh 涉案单位编号
  *    @param {string} sadwmc 涉案单位名称
  *    @param {string} sadwsf 涉案单位身份（代码）
  *    @param {string} saxz 涉案性质（代码）
  *    @param {string} frdb 法人代表
  *    @param {string} frdbsfz 法人代表身证证
  *    @param {string} zjlx 证件类型（代码）
  *    @param {string} zjhm 证件号码
  *    @param {string} lxr 联系人
  *    @param {string} lxdh 联系电话
  *    @param {string} gld 管理地（代码）
  *    @param {string} bz 备注
  *    @param {string} xxdz 详细地址
  * */
export let getCaseUnitRevise = async (params) => {
    let response = await axios({
        url: 'srbgs/ajgl/action/updateSadw',
        method: 'post',
        params: params
    })
    return response.data
}

/*
  *    案件管理 【 删除涉案对象 】
  *    @param {string} ajbh 案件编号
  *    @param {string} sf 身份
  *    @param {string} sadxbh 涉案对象编号
  * */
export let getCaseDelect = async (params) => {
    let response = await axios({
        url: 'srbgs/ajgl/action/deleteSadx',
        method: 'post',
        params: params
    })
    return response.data
}

/*
  *    案件管理 【 查看涉案对象处理信息列表 】
  *    @param {string} ajbh 案件编号
  *    @param {string} sadxbh 涉案对象编号
  *    @param {string} pageSize
  *    @param {string} pageNumber
  * */
export let getCaseHandleInfoListShow = async (params) => {
    let response = await axios({
        url: 'srbgs/ajgl/action/selectCfmxList',
        method: 'get',
        params: params
    })
    return response.data
}

/*
  *    案件管理 【 新增涉案对象处理信息 】
  *    @param {string} ajbh 案件编号
  *    @param {string} sadxbh 涉案对象编号
  *    @param {string} sadxmc 涉案对象名称
  *    @param { cfList<String[]> } list 处理信息列表
  *    @param {string} tbdw 当前操作用户
  *
  *    其中 cfList 的值
  *    @param {string} cllx 处理类型
  *    @param {string} clsm 处理说明
  *    @param {string} cldw 处理单位
  *    @param {string} clsj 处理时间
  *    @param {string} fj 附加
  *    @param {string} spare 附加2
  * */
export let getCaseHandleInfoAdd = async (params) => {
    let response = await axios({
        url: 'srbgs/ajgl/action/insertCfmx',
        method: 'post',
        params: params
    })
    return response.data
}

/*
  *    案件管理 【 删除涉案对象处理信息 】
  *    @param {string} ajbh 案件编号
  *    @param {string} sadxbh 涉案对象编号
  *    @param {string} id 处理记录ID
  * */
export let getCaseHandleInfoDelect= async (params) => {
    let response = await axios({
        url: 'srbgs/ajgl/action/deleteCfmx',
        method: 'get',
        params: params
    })
    return response.data
}

/*
  *    案件管理 【 查看案件办理进度列表 】
  *    @param {string} ajbh 案件编号
  *    @param {string} pageNum 页码
  *    @param {string} pageSize 每页数据记录数
  * */
export let getCaseProgressListShow = async (params) => {
    let response = await axios({
        url: 'srbgs/ajgl/action/selectBajdList',
        method: 'get',
        params: params
    })
    return response.data
}

/*
  *    案件管理 【 查看案件办理进度内容 】
  *    @param {string} ajbh 案件编号
  *    @param {string} jdbh 进度编号
  * */
export let getCaseProgressContentShow = async (params) => {
    let response = await axios({
        url: 'srbgs/ajgl/action/selectBajd',
        method: 'get',
        params: params
    })
    return response.data
}

/*
  *    案件管理 【 新增案件办理进度 】
  *    @param {string} ajbh 案件编号
  *    @param {string} jdmc 进度名称
  *    @param {string} jdms 进度说明
  *    @param {string} sbdw 上报单位
  * */
export let getCaseProgressAdd = async (params) => {
    let response = await axios({
        url: 'srbgs/ajgl/action/insertBajd',
        method: 'post',
        params: params
    })
    return response.data
}

/*
  *    案件管理 【 提交案件注销申请 】
  *    @param {string} ajbh 案件编号
  *    @param {string} zxyy 注销原因
  *    @param {string} sqdw 申请单位
  * */
export let getCaseProgressCancel = async (params) => {
    let response = await axios({
        url: 'srbgs/ajgl/action/insertAjZx',
        method: 'post',
        params: params
    })
    return response.data
}

/*
  *    案件管理 【 修改案件信息 】
  *    @param {string} ajbh 案件编号
  *    @param {string} ajmc 案件名称
  *    @param {string} lyfs 来源方式（代码）
  *    @param {string} afdd 案发地点（代码）
  *    @param {string} ajxz 案发性质（代码）
  *    @param {string} jdfs 鉴定方式（代码）
  *    @param {string} afsj 案发时间
  *    @param {string} lasj 立案时间
  *    @param {string} lar 立案人
  *    @param {string} spr 审批人
  *    @param {string} cbr 承办人
  *    @param {string} aqjj 案情简介
  *    @param {string} aqbz 案情备注
  *    @param {string} bajg 办案机构（代码）
  * */
export let getCaseInfoRevise = async (params) => {
    let response = await axios({
        url: 'srbgs/ajgl/action/updateAjxx',
        method: 'post',
        params: params
    })
    return response.data
}

/*
  *    案件管理 【 查看可申请案件移交/协办列表（申请案件移交/协办查询） 】
  *    @param {string} ajbh 案件编号
  *    @param { arr } lasj 立案时间
  *    @param { arr } afsj 案发时间
  *    @param {string} ajxz 案件性质（代码）
  *    @param {string} lyfs 来源方式（代码）
  *    @param {string} afdd 案发地点（代码）
  *    @param {string} pageNum 页码
  *    @param {string} pageSize 每页数据记录数
  *    @param {string} badw 办案单位 当前用户的行政区划
  *    @param {string} type 类型（移交1 / 协办2）
  * */
export let getCaseTeamworkShow = async (params) => {
    let response = await axios({
        url: 'srbgs/ajgl/action/selectApplicableAjxx',
        method: 'get',
        params: params,
        paramsSerializer: params => {
            return qs.stringify(params, { indices: false })
        }
    })
    return response.data
}

/*
  *    案件管理 【 添加结案信息 】
  *    @param {string} ajbh 案件编号
  *    @param {string} aqjj 案件简介 
  *    @param {string} jadw 结案单位
  *    @param {string} jasj 结案时间
  *    @param {string} bar 办案人
  *    @param {string} spr 审批人
  * */
export let getCaseClosingInfoAdd = async (params) => {
    let response = await axios({
        url: 'srbgs/ajgl/action/insertJaxx',
        method: 'post',
        params: params
    })
    return response.data
}


/*
*
* * * * * * * * * * * * * * *
*                           *
*          案件审批         *
*                           *
* * * * * * * * * * * * * * *
*
* */


/*
*   案件审批 【 查询立案申请 】
*   @param {string} ajbh 案件编号
*   @param {string} sadx 涉案对象
*   @param {string} sfsp 响应对象
*   @param {string} sbsj 上报时间
*   @param {string} sbdw 上报单位
*   @param {string} pageNum 页码
*   @param {string} pageSize 每页数据记录数
*   @param {string} spdw 审批单位
* */
export let getFilingApplicationShow  = async (params) => {
    let response = await axios({
        url: 'srbgs/ajsp/action/selectLasqList',
        method: 'get',
        params: params,
        paramsSerializer: params => {
            return qs.stringify(params, { indices: false })
        }
    })
    return response.data
}

/*
*   案件审批 【 查询注销申请 】
*   @param {string} ajbh 案件编号
*   @param {string} sadx 涉案对象
*   @param {string} sfsp 响应对象
*   @param {string} sbsj 上报时间
*   @param {string} sbdw 上报单位
*   @param {string} pageNum 页码
*   @param {string} pageSize 每页数据记录数
*   @param {string} spdw 审批单位
* */

export let getCancelApplicationShow  = async (params) => {
    let response = await axios({
        url: 'srbgs/ajsp/action/selectLasqList',
        method: 'get',
        params: params,
        paramsSerializer: params => {
            return qs.stringify(params, { indices: false })
        }
    })
    return response.data
}


/*
*   案件审批 【 查看详细对比 】
*   @param {string} sadxbh 涉案对象编号
*   @param {string} id 申请编号
* */
export let getSelectAjspDetailInfo = async (params) => {
    let response = await axios({
        url: 'srbgs/ajgl/action/selectAjspDetailInfo',
        method: 'get', 
        params: params
    })
    return response.data
}

/*
*   案件审批 【 审批立案申请 】
*   @param {string} id 涉案对象编号
*   @param {string} sadxbh 涉案对象编号
*   @param {string} spyj 审批意见
*   @param {string} psnr 审批内容
*   @param {string} spdw 审批单位
* */
export let getFilingApplicationAuditing = async (params) => {
    let response = await axios({
        url: 'srbgs/ajsp/action/insertLasp',
        method: 'post',
        params: params
    })
    return response.data
}

/*
*   案件审批 【 查询注销申请 】
*   @param {string} ajbh 案件编号
*   @param {string} sadx 涉案对象
*   @param {string} sfsp 是否审批
*   @param {string} sbsj 上报时间
*   @param {string} sbdw 上报单位
*   @param {string} pageNum 页码
*   @param {string} pageSize 每页数据记录数
*   @param {string} spdw 审批单位
* */
export let getCancellationRequestShow = async (params) => {
    let response = await axios({
        url: 'srbgs/ajsp/action/selectZxsqList',
        method: 'get',
        params: params
    })
    return response.data
}

/*
*   案件审批 【 查看注销申请详细信息 】
*   @param {string} spbh 申请编号
* */
export let getCancellationRequestDetail = async (params) => {
    let response = await axios({
        url: 'srbgs/ajsp/action/selectDetailZxsq',
        method: 'get',
        params: params
    })
    return response.data
}

/*
*   案件审批 【 申请注销审批 】
*   @param {string} id  
*   @param {string} badw 办案单位
*   @param {string} ajbh 案件编号
*   @param {string} state 是否通过
*   @param {string} spnr 审批内容 
* */
export let getApproveLogoutApproval = async (params) => {
    let response = await axios({
        url: 'srbgs/ajsp/action/insertZxspResult',  
        method: 'post',
        params: params
    })
    return response.data
}

/*
*   案件审批 【 导出立案申请查询结果 】
*   @param {string} ajbh 案件编号
*   @param {string} sadx ！！！！！！！！！！！！！！！！！！！！！！
*   @param {string} sfsp ！！！！！！！！！！！！！！！！！！！！！！
*   @param {string} sbsj 上报时间
*   @param {string} sbdw 上报单位
*   @param {string} spdw 审批单位
* */

export let getRequestFilingResultExport = (params) => {
    let url = 'srbgs/ajsp/action/exportLasqList';
    window.location.href = url + params
}
/*
*   案件审批 【 导出注销申请查询结果 】
*   @param {string} ajbh 案件编号
*   @param {string} sadx ！！！！！！！！！！！！！！！！！！！！！！
*   @param {string} sfsp ！！！！！！！！！！！！！！！！！！！！！！
*   @param {string} sbsj 上报时间
*   @param {string} sbdw 上报单位
*   @param {string} spdw 审批单位
* */
export let getRequestCancelResultExport = (params) => {
    let url = 'srbgs/ajsp/action/exportZxsqList';
    window.location.href = url + params
}


/*
*   案件审批 【 添加立案审批 】
*   @param {string} id  
*   @param {string} state 审批意见  1通过2拒绝  
*   @param {string} spms  审批描述
*   @param {string} spdw 审批单位
* */
export let getInsertLaspResult = async (params) => {
    let response = await axios({
        url: 'srbgs/ajsp/action/insertLaspResult',
        method: 'post',
        params: params
    })
    return response.data
}

/*
*
* * * * * * * * * * * * * * *
*                           *
*          案件督办         *
*                           *
* * * * * * * * * * * * * * *
*
* */


/*
*   案件督办 【 查询督办信息列表 】
*   @param {string} ajbh 案件编号
*   @param {string} ajmc 案件名称
*   @param {string} dbsj 督办时间
*   @param {string} dblx 督办类型
*   @param {string} bdbdw 被督办单位
*   @param {string} pageSize 每页数据记录
*   @param {string} pageNum 页码
*   @param {string} dbdw 督办单位
* */
export let getSuperviseInfoListShow= async (params) => {
    let response = await axios({
        url: 'srbgs/ajdb/action/selectDbxxList',
        method: 'get',
        params: params,
        paramsSerializer: params => {
            return qs.stringify(params, { indices: false })
        }
    })
    return response.data
}

/*
*   案件督办 【 查看督办信息 】
*   @param {string} AJMC 案件名称
*   @param {string} DBLX 督办类型
*   @param {string} DBDW_MC 督办单位名称
*   @param {string} DBSM 督办说明
* */
export let getSuperviseInfoDetailShow= async (params) => {
    let response = await axios({
        url: 'srbgs/ajdb/action/selectAjdb/info',
        method: 'get',
        params: params
    })
    return response.data
}

/*
*   案件督办 【 导出督办信息查询结果 】
*   @param {string} ajbh 督办编号
*   @param {string} ajmc 案件名称
*   @param {string} dbsj 督办开始时间
*   @param {string} dblx 督办类型
*   @param {string} bdbdw 被督办单位
*   @param {string} dbdw 督办单位
* */
export let getSuperviseInfoExport = (params) => {
    let url = 'srbgs/ajdb/export';
    window.location.href = url + params;
}

/*
*   案件督办 【 查看解锁记录 】
*   @param {string} jssj 解锁时间
*   @param {string} sqr 申请人
*   @param {string} jsdw 解锁单位
*   @param {string} pageNum 页码
*   @param {string} pageSize 每页数据记录数
* */
export let getUnlockRecordShow= async (params) => {
    let response = await axios({
        url: 'srbgs/ajdb/action/selectUnlockRecord',
        method: 'get',
        params: params,
        // paramsSerializer: params => {
        //     return qs.stringify(params, { indices: false })
        // }
    })
    return response.data
}

/*
*   案件督办 【 导出解锁记录 】
*   @param {string} DBBH 解锁时间
*   @param {string} AJBH 案件编号
*   @param {string} DBLX_DM 督办类型—— 代码
*   @param {string} DBLX_MC 督办类型——名称
*   @param {string} DBSM
*   @param {string} DBRQ
*   @param {string} DBDW_MC
*   @param {string} JSDW_MC
*   @param {string} SFDB
*   @param {string} AJMC
*   @param {string} AJZT
*   @param {string} AJ
*   @param {string} startTime 案发时间
*   @param {string} endTime
*   @param {string} JSRQ
*   @param {string} ZBAJBH
*   @param {string} XBAJBH
*   @param {string} JSSM
*   @param {string} LASJ
* */
export let getExportUnlockRecord = (params) => {
    let url = 'ajdb/action/exportUnlockRecord'
    window.location.href = url + params;
}

/*
*   案件督办 【 案件督办 】
*   @param {string} jssj 解锁时间
*   @param {string} sqr 申请人
*   @param {string} jsdw 解锁单位
* */
export let getAjdbList = async (params) => {
    let response = await axios({ 
        url: 'srbgs/ajdb/action/selectAjdbList',  
        method: 'get',
        params: params
    })
    return response.data
}

/*
*   案件督办 【 导出案件督办 】
*   @param {string} jssj 解锁时间
*   @param {string} sqr 申请人
*   @param {string} jsdw 解锁单位
* */
export let getExportDbxxList = (params) => {
    let url = 'srbgs/ajdb/action/exportDbxxList'
    window.location.href = url + params;
}

/*
*   案件督办 【 接收案件督办 】
*   @param {string} ajbh 案件编号
*   @param {string} ajmc 案件名称
*   @param {string} startTime 督办日期
*   @param {string} endTime 督办日期
*   @param {string} dblx 督办类型
*   @param {string} pageNum 
*   @param {string} pagSize 
*   @param {string} badw 办案单位
* */
export let getSelectJsAjdb = async (params) => {
    let response = await axios({ 
        url: 'srbgs/ajdb/action/selectJsAjdb',  
        method: 'get',
        params: params
    })
    return response.data
}

/*
*   案件督办 【 接收案件导出 】
*   @param {string} ajbh 案件编号
*   @param {string} ajmc 案件名称
*   @param {string} startTime 督办日期
*   @param {string} endTime 督办日期
*   @param {string} dblx 督办类型
*   @param {string} pageNum
*   @param {string} pagSize
*   @param {string} badw 办案单位
* */
export let getExportJsAjdb = async (params) => {
    let url = 'srbgs/ajdb/action/exportJsAjdb';
    window.location.href = url + params
}


/*
*
* * * * * * * * * * * * * * *
*                           *
*          案件移交         *
*                           *
* * * * * * * * * * * * * * *
*
* */


/*
*   案件移交 【 申请案件移交 】
*   @param {string} ajbh 案件编号
*   @param {string} sqdw 申请人
*   @param {string} jsdw 接收单位
*   @param {string} yjsm 移交说明
* */
export let getCaseTransferApplication = async (params) => {
    let response = await axios({
        url: 'srbgs/ajyj/action/insertAjyj',
        method: 'post',
        params: params
    })
    return response.data
}

/*
*   案件移交 【 移交信息查看 】
*   @param {string} ajbh 案件编号
*   @param {string} ajmc 案件名称
*   @param {string} sqsj 申请时间
*   @param {string} sqsjEnd 申请时间
*   @param {string} yjzt 移交状态
*   @param {string} yjdw 移交单位
*   @param {string} pageNum 页码
*   @param {string} pageSize 每页数据记录数
*   @param {string} badw
* */
export let getTransferInfoShow = async (params) => {
    let response = await axios({
        url: 'srbgs/ajyj/action/selectAjyjList',
        method: 'get',
        params: params,
        paramsSerializer: params => {
            return qs.stringify(params, { indices: false })
        }
    })
    return response.data
}

/*
*   案件移交 【 查看被移交案件信息（接收案件移交查询） 】
*   @param {string} ajbh 案件编号
*   @param {string} ajmc 案件名称
*   @param {string} yjsj 移交时间
*   @param {string} yjzt 移交状态
*   @param {string} yjdw 移交单位
*   @param {string} pageNum 页码
*   @param {string} pageSize 每页数据记录数
*   @param {string} jsdw 接收单位
*   @param {string} badw
* */
export let getHandoverInfoShow = async (params) => {
    let response = await axios({
        url: 'srbgs/ajyj/action/selectJsAjyj',
        method: 'get',
        params: params,
        paramsSerializer: params => {
            return qs.stringify(params, { indices: false })
        }
    })
    return response.data
}

/*
*   案件移交 【 查看移交详细信息 】
*   @param {string} yjbh 移交编号
* */
export let getHandoverInfoDetail  = async (params) => {
    let response = await axios({
        url: 'srbgs/ajyj/action/selectDetailAjyj',
        method: 'get',
        params: params
    })
    return response.data
}

/*
*   案件移交 【 处理案件移交 】
*   @param {string} ajbh 案件编号
*   @param {string} yjbh 移交编号
*   @param {string} sfjs 是否接收
*   @param {string} jssm 接收说明
*   @param {string} jsdw 接收单位
* */
export let getCaseHandlingTransfe = async (params) => {
    let response = await axios({
        url: 'srbgs/ajyj/action/insertAjyjCl',
        method: 'post',
        params: params
    })
    return response.data
}


/*
*   案件移交 【 接收案件移交 】
*   @param {string} id 
*   @param {string} ajbh 案件编号
*   @param {string} yjzt 移交状态 3 拒绝  1 同意 
*   @param {string} jssm 接收说明
*   @param {string} jsdw 接收单位
* */
export let getDealJsAjyj = async (params) => {
    let response = await axios({
        url: 'srbgs/ajyj/action/dealJsAjyj',
        method: 'post',
        params: params
    })
    return response.data
}


/*
*   案件移交 【 撤销案件移交申请 】 
*   @param {string} ajbh 案件编号 
*   @param {string} badw 办案单位
* */
export let getCancelAjyj = async (params) => {
    let response = await axios({
        url: 'srbgs/ajyj/action/cancelAjyj',
        method: 'get',
        params: params
    })
    return response.data
}


/*
*
* * * * * * * * * * * * * * *
*                           *
*          案件协办         *
*                           *
* * * * * * * * * * * * * * *
*
* */


/*
*   案件协办 【 申请案件协办 】
*   @param {string} ajbh 案件编号
*   @param {string} sqdw 申请单位
*   @param {string} jsdw 接收单位
*   @param {string} xbyq 协办要求
*   @param {string} sfgk 是否公开
*   @param {string} ajclList 案件材料
*   @param {string} sadxList 涉案对象
* */
export let getCooperationApply = async (params) => {
    let response = await axios({
        url: 'srbgs/ajxb/action/addAjxb',
        method: 'get',
        params: params
    })
    return response.data
}

/*
*   案件协办 【 申请案件协办 】
*   @param {string} ajclList 案件材料 
* */
export let getSqajxbFiles= async (params) => {
    let response = await axios({
        url: 'srbgs/ajgl/action/selectAjclFromAjxb',
        method: 'get',
        params: {
            ajbh: params
        }
    })
    return response.data
}

/*
*   案件协办 【 协办信息查看 】
*   @param {string} zbajbh  主板案件编号
*   @param {string} xbajbh  协办案件编号
*   @param {string} sqsj  申请时间
*   @param {string} sqzt  申请状态
*   @param {string} jsdw  接收单位
*   @param {string} sqdw  申请单位
*   @param {string} pageNum 页码
*   @param {string} pageSize 每页数据记录数
* */
export let getCooperationInfoShow = async (params) => {
    let response = await axios({
        url: 'srbgs/ajxb/action/selectAjxbList',
        method: 'get',
        params: params
    })
    return response.data
}

/*
*   案件协办 【 查看被申请协办案件信息（接收案件协办查询） 】
*   @param {string} ajbh  案件编号
*   @param {string} ajmc  案件名称
*   @param {string} sqsj  申请时间
*   @param {string} sqzt  申请状态
*   @param {string} sqdw  申请单位
*   @param {string} jsdw  接收单位
*   @param {string} pageNum 页码
*   @param {string} pageSize 每页数据记录数
* */
export let getCooperationReceiveInfoShow = async (params) => {
    let response = await axios({
        url: 'srbgs/ajxb/action/selectJsAjxbList',
        method: 'get',
        params: params
    })
    return response.data
}

/*
*   案件协办 【 查看协办详细信息 】
*   @param {string} xbbh  协办编号
* */
export let getCooperationDetailShow  = async (params) => {
    let response = await axios({
        url: 'srbgs/ajxb/action/selectDetailAjxb',
        method: 'get',
        params: params
    })
    return response.data
}

/*
*   案件协办 【 处理案件协办 】
*   @param {string} ajbh  案件编号
*   @param {string} xbbh  协办编号
*   @param {string} sftg  是否通过
*   @param {string} jssm  接收说明
*   @param {string} jsdw  接收单位
* */
export let getCooperationHandle = async (params) => {
    let response = await axios({
        url: 'srbgs/ajxb/action/insertAjxbCl',
        method: 'post',
        params: params
    })
    return response.data
}



/*
*   案件协办 【 接收案件协办 】
*   @param {string} ajbh  案件编号
*   @param {string} ajmc  案件名称
*   @param {string} sqzt  申请状态
*   @param {string} sqrq_start  时间    
*   @param {string} sqrq_end  时间 
*   @param {string} sqdw  申请单位
* */
export let getAjxbList = async (params) => {
    let response = await axios({
        url: 'srbgs/ajxb/action/ajxbList',
        method: 'get',
        params: params
    })
    return response.data
}


/*
*   案件协办 【 协办信息查看 】
*   @param {string} ajbh  案件编号
*   @param {string} ajmc  案件名称
*   @param {string} sqzt  申请状态
*   @param {string} sqrq_start  时间    
*   @param {string} sqrq_end  时间 
*   @param {string} sqdw  申请单位
* */
export let getcreatedAjxbList = async (params) => {
    let response = await axios({
        url: 'srbgs/ajxb/action/createdAjxbList',
        method: 'get',
        params: params
    })
    return response.data
}


/*
*   案件协办 【 协办信息查看 】
*   @param {string} ajbh  案件编号
*   @param {string} ajmc  案件名称
*   @param {string} sqzt  申请状态
*   @param {string} sqrq_start  时间    
*   @param {string} sqrq_end  时间 
*   @param {string} sqdw  申请单位
* */
export let getreviewAjxb = async (params) => {
    let response = await axios({
        url: 'srbgs/ajxb/action/reviewAjxb',
        method: 'get',
        params: params
    })
    return response.data
}



/*
*
* * * * * * * * * * * * * * *
*                           *
*          信息查询         *
*                           *
* * * * * * * * * * * * * * *
*
* */


/*
*   信息查询 【 案件查询 】
*   @param {string} ajbh  案件编号
*   @param {string} ajmc  案件名称
*   @param {string} lasj  立案时间
*   @param {string} ajjb  案件级别
*   @param {string} ajxz  案件性质
*   @param {string} jasj  结案时间
*   @param {string} ajzt  案件状态
*   @param {string} badw  办案单位
*   @param {string} afdd  案发地点
*   @param {string} pageNum  页码
*   @param {string} pageSize  每页数据记录数
* */
export let getCaseInquiry = async (params) => {
    let response = await axios({
        url: 'srbgs/xxcx/action/queryAjxx',
        method: 'get',
        params: params,
        paramsSerializer: params => {
            return qs.stringify(params, { indices: false })
        }
    })
    return response.data
}

/*
*   信息查询 【 案件查询导出 】
*   @param {string} ajbh  案件编号
*   @param {string} ajmc  案件名称
*   @param {string} lasj  立案时间
*   @param {string} ajjb  案件级别
*   @param {string} ajxz  案件性质
*   @param {string} jasj  结案时间
*   @param {string} ajzt  案件状态
*   @param {string} badw  办案单位
*   @param {string} afdd  案发地点
* */
export let getCaseInquiryExport = async (params) => {
    let response = await axios({
        url: 'srbgs/xxcx/action/exportXxcxAjxx',
        method: 'get',
        params: params
    })
    return response.data
}

/*
*   信息查询 【 处理结果查询 】
*   @param {string} badw  办案单位
*   @param {string} cldw  处理单位
*   @param {string} clsj  处理时间
*   @param {Map<String,String[]>} cfxx  处罚选项
*   @param {string} pageNum  页码
*   @param {string} pageSize  每页数据记录数
* */
export let getProcessingResultQuery = async (params) => {
    let response = await axios({
        url: 'srbgs/xxcx/action/queryCfmx',
        method: 'get',
        params: params
    })
    return response.data
}

/*
*   信息查询 【 处理结果查询导出 】
*   @param {string} badw  办案单位
*   @param {string} cldw  处理单位
*   @param {string} clsj  处理时间
*   @param {Map<String,String[]>} cfxx  处罚选项
* */
export let getResultsExport = async (params) => {
    let url = 'srbgs/xxcx/action/exportXxcxCfmx'
    window.location.href = url + params
}

/*
*   信息查询 【 涉案对象查询 】
*   @param {string} xm  姓名
*   @param {string} xb  性别
*   @param {string} zjhm  证件号码
*   @param {string} zzmm  政治面貌
*   @param {string} saxz  涉案性质
*   @param {string} sadxsf  涉案对象身份
*   @param {string} hjd  户籍地
*   @param {string} pageNum  页码
*   @param {string} pageSize  每页数据记录数
* */
export let getSagrQuery = async (params) => {
    let response = await axios({
        url: 'srbgs/xxcx/action/querySagr',
        method: 'get',
        params: params
    })
    return response.data
}

/*
*   信息查询 【 涉案对象查询导出 】
*   @param {string} xm  姓名
*   @param {string} xb  性别
*   @param {string} zjhm  证件号码
*   @param {string>} zzmm  政治面貌
*   @param {string>} saxz  涉案性质
*   @param {string>} sadxsf  涉案对象身份
*   @param {string>} hjd  户籍地
* */
export let getSagrQueryExport = async (params) => {
    let url =  'srbgs/xxcx/action/exportXxcxSagr'
    window.location.href = url + params;
}

/*
*   信息查询 【 涉案单位查询 】
*   @param {string} dwmc  单位名称
*   @param {string} frdb  法人代表
*   @param {string} zjhm  证件号码
*   @param {string>} sadxsf  涉案对象身份
*   @param {string>} saxz  涉案性质
*   @param {string>} gld  管理地
*   @param {string>} pageNum  页码
*   @param {string>} pageSize  每页数据记录数
* */
export let getObjectQuery = async (params) => {
    let response = await axios({
        url: 'srbgs/xxcx/action/querySadw',
        method: 'get',
        params: params
    })
    return response.data
}

/*
*   信息查询 【 涉案单位查询导出 】
*   @param {string} dwmc  单位名称
*   @param {string} frdb  法人代表
*   @param {string} dwxz  单位性质
*   @param {string>} zjhm  证件号码
*   @param {string>} dwlx  单位类型
*   @param {string>} sadxsf  涉案对象身份
*   @param {string>} saxz  涉案性质
*   @param {string>} gld  管理地
* */
export let getObjectUnitExport = async (params) => {
    let url = 'srbgs/xxcx/action/exportXxcxSadw';
    window.location.href = url + params;
}


/*
*   信息查询 【 涉案对象黑名单/涉案单位黑名单 】
*   @param {string} sadxmc  涉案对象名称
*   @param {string} zjhm  证件号码
*   @param {string} hjd  户籍地/管理地
*   @param {string>} sf  身份：1涉案个人2涉案单位
* */
export let getObjectsBlist = async (params) => {
    let response = await axios({
        url: 'srbgs/xxcx/action/querySadxBlack',
        method: 'get',
        params: params
    })
    return response.data
}

/*
*   信息查询 【 涉案个人、单位黑名单导出 】
*   @param {string} sadxmc  涉案对象名称
*   @param {string} zjhm  证件号码
*   @param {string} hjd  户籍地/管理地
*   @param {string>} sf  身份：1涉案个人2涉案单位
* */
export let getObjectsBlistExport = async (params) => {
    let url = 'srbgs/xxcx/action/exportXxcxSadxBlack'
    window.location.href = url + params;
}

/*
*   信息查询 【 跨地处理明细（跨省/省内跨市/市内跨县） 】
*   @param {string} lasj  立案时间
*   @param {string} jasj  结案时间
*   @param {string} badw  办案单位
*   @param {string>} type  跨地类型
* */
export let getCrossBoundaryDetail = async (params) => {
    let response = await axios({
        url: 'srbgs/xxcx/action/queryKdclmx',
        method: 'get',
        params: params
    })
    return response.data
}

/*
*   信息查询 【 跨地处理明细导出 】
*   @param {string} lasj  立案时间
*   @param {string} jasj  结案时间
*   @param {string} badw  办案单位
*   @param {string>} type  跨地类型
* */
export let getCrossBoundaryDetailExport = async (params) => {
    let response = await axios({
        url: 'srbgs/xxcx/action/exportXxcxKdclmx',
        method: 'get',
        params: params
    })
    return response.data
}

/*
*   信息查询 【 移交信息查看 】
*   @param {string} fqsj  发起时间
*   @param {string} jssj  接收时间
*   @param {string} type  查询类型
*   @param {string>} jszt  接收状态
*   @param {string>} fcdw  发出单位
*   @param {string>} jsdw  接收单位
*   @param {string>} dqdw  当前单位
* */
export let getHandoverInfo = async (params) => {
    let response = await axios({
        url: 'srbgs/xxcx/action/queryYjOrXb',
        method: 'get',
        params: params
    })
    return response.data
}

/*
*   信息查询 【 移交信息查看导出 】
*   @param {string} fqsj  发起时间
*   @param {string} jssj  接收时间
*   @param {string} type  查询类型
*   @param {string} jszt  接收状态
*   @param {string} fcdw  发出单位
*   @param {string} jsdw  接收单位
*   @param {string} dqdw  当前单位
* */
export let getHandoverInfoExport = async (params) => {
    let response = await axios({
        url: 'srbgs/xxcx/action/exportYjOrXb',
        method: 'get',
        params: params
    })
    return response.data
}

/*
*   信息查询 【 我的查询 】
*   @param {string}  pageSize
*   @param {string}  pageNum
* */
export let getMyQueryList = async (params) => {
    let response = await axios({
        url: 'srbgs/custom/action/list',
        method: 'get',
        params: params
    })
    return response.data
}

/*
*   信息查询 【 我的查询 修改 】 
*   @param  {string}  id  [required]
*   @param  {string}  name  
*   @param  {string}  context 
* */
export let getMyQueryUpdate = async (params) => {
    let response = await axios({
        url: 'srbgs/custom/action/update',
        method: 'get',
        params: params
    })
    return response.data
}

/*
*   信息查询 【 删除查询 】
*   @param {string} dqdw  当前单位
*   @param {string} queryId 查询编号
* */
export let getDelectQuery = async (params) => {
    let response = await axios({
        url: 'srbgs/xxcx/action/deleteMyQuery',
        method: 'get',
        params: params
    })
    return response.data
}


/*
*   信息查询 【 新增定制 】
*   @param {string} dqdw  当前单位
*   @param {string} queryName 查询名称
*   @param {string} description 查询说明
* */
export let getInsert= async (params) => {
    let response = await axios({
        url: 'srbgs/custom/action/insert',
        method: 'post',
        params: params
    })
    return response.data
}

/*
*   信息查询 【 移交信息查看 】
*   @param {string} cxlx  1协办 2移交
*   @param {string} sqrq_start 发起日期
*   @param {string} sqrq_end 发起日期
*   @param {string} sqzt 申请状态
*   @param {string} jsrq_start 接收日期
*   @param {string} jsrq_end 接收日期
*   @param {string} sqdw 申请单位 
*   @param {string} jsdw 接收单位
*   @param {string} pageNum  
*   @param {string} pageSize 
* */
export let getYjchaxun= async (params) => {
    let response = await axios({
        url: 'srbgs/xxcx/action/yjchaxun',
        method: 'get',
        params: params
    })
    return response.data
}


/*
*
* * * * * * * * * * * * * * *
*                           *
*          报表统计         *
*                           *
* * * * * * * * * * * * * * *
*
* */


/*
*   报表统计 【 系统应用情况表查询 】
*   @param {string} dlsj  登录时间
*   @param {string} tjdw 统计单位
* */ 
export let getSysApplicationQuery = async (params) => {
    let response = await axios({
        url: 'srbgs/bbtj/action/queryXtyyqk',
        method: 'get',
        params: params
    })
    return response.data
}


/*
*   报表统计 【 系统录入情况表查询 】
*   @param {string} lasj  立案时间
*   @param {string} lalrsj 立案录入时间
*   @param {string} jasj 结案时间
*   @param {string} jalrsjs 结案录入时间
*   @param {string} badw 办案单位
* */
export let getSysEnteringQuery = async (params) => {
    let response = await axios({
        url: 'srbgs/bbtj/action/queryXtlrqk',
        method: 'get',
        params: params
    })
    return response.data
}

/*
*   报表统计 【 区域协作表查询 】
*   @param {string} sqsj  申请时间
*   @param {string} jssj  接收时间
*   @param {string} xzfw  协作范围
*   @param {string} xzlx  协作类型
*   @param {string} badw  办案单位
*   @param {string} type  发出/接收
* */
export let getRegionalCollaborationTableQuery = async (params) => {
    let response = await axios({
        url: 'srbgs/bbtj/action/queryQyxzb',
        method: 'get',
        params: params
    })
    return response.data
}

/*
*   报表统计 【 处理结果表查询 】
*   @param {string} lasj  立案时间
*   @param {string} jasj  结案时间
*   @param {string} clsj  处理时间
*   @param {string} badw  办案单位
*   @param {string} clfw  处理范围
*   @param {string} clzl  处理种类
* */
export let getProcessingResultTableQueries = async (params) => {
    let response = await axios({
        url: 'srbgs/bbtj/action/queryCljgb',
        method: 'get',
        params: params
    })
    return response.data
}


/*
*   报表统计 【 应用管理情况表查询 】
*   @param {string} tjsj  统计时间
*   @param {string} tjdw  统计单位
* */
export let getApplicationManagementTableQueries = async (params) => {
    let response = await axios({
        url: 'srbgs/bbtj/action/queryYyglqk',
        method: 'get',
        params: params
    })
    return response.data
}


/*
*   报表统计 【 处理结果明细表查询 】
*   @param {string} lasj  立案时间
*   @param {string} lalrsj  立案录入时间
*   @param {string} jasj  结案时间
*   @param {string} jalrsj  结案录入时间
*   @param {string} badw  办案单位
* */
export let getDetailedTreatmentResultsTableQueries = async (params) => {
    let response = await axios({
        url: 'srbgs/bbtj/action/queryCljgmxb',
        method: 'get',
        params: params
    })
    return response.data
}


/*
*   报表统计 【 省级处理结果汇总表查询 】
*   @param {string} lasj  立案时间
*   @param {string} jasj  结案时间
*   @param {string} clsj  处理时间
*   @param {string} badw  办案单位
*   @param {string} clzl  处理种类
*   @param {string} cldd  处理地点
* */
export let getProvinceDetailedTreatmentResultsTableQueries = async (params) => {
    let response = await axios({
        url: 'srbgs/bbtj/action/querySjcljghz',
        method: 'get',
        params: params
    })
    return response.data
}

/*
*   报表统计 【 案件分布 】
*   @param {string} time   
* */
export let getQuerySumByProvince = async (params) => {
    let response = await axios({
        url: 'srbgs/bbtj/action/querySumByProvince',
        method: 'get',
        params: params
    })
    return response.data
} 


/*
*   报表统计 【 结案率 】
*   @param {string} time   
* */
export let getQueryRateByProvince = async (params) => {
    let response = await axios({
        url: 'srbgs/bbtj/action/queryRateByProvince',
        method: 'get',
        params: params
    })
    return response.data 
}