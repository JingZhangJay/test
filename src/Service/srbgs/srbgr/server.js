import axios  from "axios";
import qs from "qs";

/**
 *  出生性别比 【map 】
 *  params {string} year
 * */
export let getQueryByYear = async (params) => {
    let response = await axios({
        url: 'srbgs/csxbb/action/queryByYear',
        method: 'get',
        params: params
    })
    return response.data
}

/**
 *  出生性别比 【map  导出】
 *  params {string} year
 * */
export let getExportByYear= async (params) => {
    let url = 'srbgs/csxbb/action/exportByYear';
    window.location.href = url + params
}

/**
 *  出生性别比 【bar, Table 】
 *  params {string}  year
 *  params {string} xzqh
 * */
export let getQueryByMonths = async (params) => {
    let response = await axios({
        url: 'srbgs/csxbb/action/queryByMonths',
        method: 'get',
        params: params
    })
    return response.data
}

/**
 *  出生性别比 【bar, Table  导出】
 *  params {string}  year
 *  params {string} xzqh
 * */
export let getExportByMonths = async (params) => {
    let url = 'srbgs/csxbb/action/exportByMonths';
    window.location.href = url + params
}

