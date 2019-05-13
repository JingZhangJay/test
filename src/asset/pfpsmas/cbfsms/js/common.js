/**
 * 公共方法
 */

/**
 * 根据键值将数据放置对应的省市县区域代码中
 * @param {Object} obj 区划变更明细对照数据录入界面接口返回数据
 */
export let placeData = (obj, codeRank) => {
    // console.log(obj)
    // console.log(codeRank)
    for (const key in obj) {
        switch (key) {
            case "1" || 1:
                codeRank[1] = obj[key];
                break;
            case "2" || 2:
                codeRank[2] = obj[key];
                break;
            case "3" || 3:
                codeRank[3] = obj[key];
                break;
            case "4" || 4:
                codeRank[4] = obj[key];
                break;
            case "5" || 5:
                codeRank[5] = obj[key];
                break;
            case "6" || 6:
                codeRank[6] = obj[key];
                break;
            default:
                break;
        }
    }
}

/**
 * 根据登录人所在区划来确定下拉框禁用显示
 * @param {string} zoningCode 区划代码
 * @param {string} assigningCode  级次代码
 */
export let selectZoningCode = (zoningCode, assigningCode) => {
    let tempObj = {};
    assigningCode = Number(assigningCode);
    if (assigningCode == 0) {
        tempObj[0] = zoningCode;
    } else if (assigningCode == 1) {
        tempObj[1] = zoningCode;
    } else if (assigningCode == 2) {
        tempObj[2] = zoningCode;
        tempObj[1] = zoningCode.substr(0, 2) + "0000000000000";
    } else if (assigningCode == 3) {
        tempObj[3] = zoningCode;
        tempObj[2] = zoningCode.substr(0, 4) + "00000000000";
        tempObj[1] = zoningCode.substr(0, 2) + "0000000000000";
    }
    return tempObj;
}

/**
 * 根据键值将数据放置对应的省市县区域代码中
 * @param {Object} obj 区划代码存放的数组对象 
 * @param {number} levelCode 级次代码 
 */
export let clearData = (obj, levelCode) => {
    if (Number(levelCode) == 1) {
        obj[2] = obj[3] = [];
        if (obj[4]) {
            obj[4] = []
        }
        if (obj[5]) {
            obj[5] = []
        }
        if (obj[6]) {
            obj[6] = []
        }
    } else if (Number(levelCode) == 2) {
        obj[3] = [];

        if (obj[4]) {
            obj[4] = []
        }
        if (obj[5]) {
            obj[5] = []
        }
        if (obj[6]) {
            obj[6] = []
        }
    } else if (Number(levelCode) == 3) {

        if (obj[4]) {
            obj[4] = []
        }
        if (obj[5]) {
            obj[5] = []
        }
        if (obj[6]) {
            obj[6] = []
        }
    } else if (Number(levelCode) == 4) {
        if (obj[5]) {
            obj[5] = []
        }
        if (obj[6]) {
            obj[6] = []
        }

    } else if (Number(levelCode) == 5) {
        if (obj[6]) {
            obj[6] = []
        }
    }

    return obj
}

/**
 * 给区划补足15位，不足的以0填充
 * @param code
 * @returns {*}
 */

export let addZeroAtTail = (code) => {
    if (code == null || code === "") {
        throw new Error("传入的区划代码为空！");
    } else {
        const num = 15 - String(code).length;
        if (num < 0) {
            throw new Error("传入的区划代码长度大于15，非法！");
        } else {
            switch (num) {
                case 15:
                    return "000000000000000";
                case 13:
                    return code + ("0000000000000");
                case 11:
                    return code + ("00000000000");
                case 9:
                    return code + ("000000000");
                case 6:
                    return code + ("000000");
                case 3:
                    return code + ("000");
                case 0:
                    return code;
                default:
                    throw new Error("传入的区划代码为空！");

            }
        }
    }
}

export let zeroAtTail = (zoningCode, assigningCode) => {
    if (assigningCode == "") {
        return "";
    } else if (assigningCode == "1") {
        return zoningCode.substring(0, 2);
    } else if (assigningCode == "2") {
        return zoningCode.substring(2, 4);
    } else if (assigningCode == "3") {
        return zoningCode.substring(4, 6);
    } else if (assigningCode == "4") {
        return zoningCode.substring(6, 9);
    } else if (assigningCode == "5") {
        return zoningCode.substring(9, 12);
    } else if (assigningCode == "6") {
        return zoningCode.substring(12);
    } else {
        return "";
    }
}



// 姓名校验
export let checkNameProps = (rule, value, callback) => {
    const nameReg = /[\u4E00-\u9FA5]/;
    if (!value) {
        callback();
    } else {
        setTimeout(() => {
            if (!nameReg.test(value)) {
                callback("姓名格式有误,必须为汉字!");
            } else {
                callback();
            }
        }, 500);
    }
}

// 校验联系电话 座机
export let checkPhone = (rule, value, callback) => {
    const isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
    const isMob = /^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
    const telephoneReg = /^1[0-9]{10}$/;
    if (!value) {
        callback();
    } else {
        setTimeout(() => {
            if (isMob.test(value) || isPhone.test(value)) {
                callback();
            } else {
                callback("电话号码或座机输入错误,请校验并改正!");
            }
        }, 500);
    }
}

// 校验身份证号
export let checkIdentityType = (rule, idcardnum, callback) => {
    const city = {
        11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 "
    };
    // /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/
    // /^[1-9]\d{5}((1[89]|20)\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dx]$/
    setTimeout(() => {
        if (!idcardnum || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(idcardnum)) {
            callback("身份证号格式错误");
        }

        else if (!city[idcardnum.substr(0, 2)]) {
            callback("地址编码错误");
        }

        else {
            //18位身份证需要验证最后一位校验位
            if (idcardnum.length == 18) {
                idcardnum = idcardnum.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                //校验位
                let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                let sum = 0;
                let ai = 0;
                let wi = 0;
                for (let i = 0; i < 17; i++) {
                    ai = idcardnum[i];
                    wi = factor[i];
                    sum += ai * wi;
                }

                if (parity[sum % 11] != idcardnum[17].toUpperCase()) {
                    {
                        callback("校验位错误");
                    }
                }
            }
            callback();
        }
    }, 2000);
}

// 校验银行账号
export let checkAgencyZoningCode = (rule, value, callback) => {
    value = value.replace(/\s/g, '');
    setTimeout(() => {
        if (value == "") {
            callback("请填写银行卡号");
        }
        if (value.length < 16 || value.length > 19) {
            callback("银行卡号长度必须在16到19之间");
        }
        let num = /^\d*$/; //全数字
        if (!num.exec(value)) {
            callback("银行卡号必须全为数字");
        }
        //开头6位
        let strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
        if (strBin.indexOf(value.substring(0, 2)) == -1) {
            callback("银行卡号开头6位不符合规范");
        }

    }, 2000);
    var lastNum = value.substr(value.length - 1, 1);//取出最后一位（与luhn进行比较）

    var first15Num = value.substr(0, value.length - 1);//前15或18位
    var newArr = new Array();
    for (var i = first15Num.length - 1; i > -1; i--) {    //前15或18位倒序存进数组
        newArr.push(first15Num.substr(i, 1));
    }
    var arrJiShu = new Array();  //奇数位*2的积 <9
    var arrJiShu2 = new Array(); //奇数位*2的积 >9

    var arrOuShu = new Array();  //偶数位数组
    for (var j = 0; j < newArr.length; j++) {
        if ((j + 1) % 2 == 1) {//奇数位
            if (parseInt(newArr[j]) * 2 < 9)
                arrJiShu.push(parseInt(newArr[j]) * 2);
            else
                arrJiShu2.push(parseInt(newArr[j]) * 2);
        }
        else //偶数位
            arrOuShu.push(newArr[j]);
    }

    var jishu_child1 = new Array();//奇数位*2 >9 的分割之后的数组个位数
    var jishu_child2 = new Array();//奇数位*2 >9 的分割之后的数组十位数
    for (var h = 0; h < arrJiShu2.length; h++) {
        jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
        jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
    }

    var sumJiShu = 0; //奇数位*2 < 9 的数组之和
    var sumOuShu = 0; //偶数位数组之和
    var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
    var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
    var sumTotal = 0;
    for (var m = 0; m < arrJiShu.length; m++) {
        sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
    }

    for (var n = 0; n < arrOuShu.length; n++) {
        sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
    }

    for (var p = 0; p < jishu_child1.length; p++) {
        sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
        sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
    }
    //计算总和
    sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

    //计算luhn值
    var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
    var luhn = 10 - k;

    if (lastNum != luhn) {
        callback("银行卡号必须符合luhn校验");
    } else {
        callback();
        return true;
    }
}


