import axios from "axios";
/*
* * * * * * * * * * * * * * *
*        区划地址代码       *
* * * * * * * * * * * * * * *
* */

/**
 * 获取下级区划
 * @param {string} code 区划代码
 */
export let getFindSonCodes = async (data) => {
    console.log(data)
    let response = await axios({
        url: '/xzqh/action/findSonCodes',
        method: 'get',
        params: data
    })
    return response.data
}

/**
 * 获取本级区划详细信息
 * @param {string} code 区划代码
 */
export let getDetailInfo = async (data) => {
    let response = await axios({
        url: 'xzqh/action/getDetailInfo',
        method: 'get',
        params: data
    })
    return response.data
}

export let getCaseInfoList = async (data) => {
    let response = await axios({
        url: '/ajgl/action/selectAjxxList',
        method: 'get',
        params: data,
        paramsSerializer: params => {
            return qs.stringify(params, { indices: false })
        }
    })
    return response.data
}


/**
 * 奖扶 家庭户新增
 * @param childName — 姓名
 * @param childGender — 性别
 * @param childBirthdate — 出生日期
 * @param childAdoptDate — 抱养日期
 * @param childDeathDate — 死亡日期
 * @param childFatherRelationship — 与父亲关系
 * @param childMotherRelationship — 与母亲关系
 * @param childZoningCode — 家庭住址 
 */
export let getCreateFamily = async (params) => {
    let response = await axios({
        url: 'http://10.1.92.9:8221/JLFZFamilyRegister/createFamily',
        method: 'post',
        params: params
    })
    return response.data
}

/**
* 奖扶 家庭户查询
* @param personName — 父亲姓名
* @param personIdentityNumber — 父亲证件号码
* @param personName — 母亲姓名
* @param personIdentityNumber — 母亲证件号码
* @param childName — 孩子姓名
* @param childGender — 孩子性别
* @param personBirthdate — 孩子出生日期
* @param personStatus — 扶助状态
*/
export let getQueryFamily = async (params) => {
    let response = await axios({
        url: 'http://10.1.92.9:8221/JLFZFamilyMaintenance/queryFamily',
        method: 'get',
        params: params
    })
    return response.data
}

