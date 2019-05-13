/**
 * 封装接口函数调用
 * @param e
 * @param {obj} _this  组件 this指向
 * @param fn 接口函数
 */

// 查看案件详情
export let detailShowModal = (e, _this, fn) => {
    e.preventDefault();
    let params = e.currentTarget.parentNode.parentNode.childNodes[0].innerText;
    fn.call(_this, params)
}

// 查看结案报告
export let caseEndFile = (e,_this,fn,data) =>{
    e.preventDefault();
    fn.call(_this,data)
}

// 时间格式转换
export let parseTime = (date) => {
    if(date == undefined){
    return date = ''
    }else{
        const newDate = date.getFullYear() +''+ (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1)   +''+  (date.getDate()+1 < 10 ? '0'+(date.getDate()) : date.getDate())
        return newDate;
    }
}

// 
export let disabledDate = (current) => {
    // can not select days after today
    return current && current.getTime() > Date.now();
  };


/**
 * 根据键值将数据放置对应的省市县区域代码中
 * @param {Object} obj 区划变更明细对照数据录入界面接口返回数据
 */
export let placeData = (obj, codeRank) => {
    // console.log(obj)
    // console.log(codeRank)
    for (var key in obj) {
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
    return codeRank;
}

/**
 * 根据登录人所在区划来确定下拉框禁用显示
 * @param {string} zoningCode 区划代码
 * @param {string} assigningCode  级次代码
 */
export let selectZoningCode = (zoningCode, assigningCode) => {
    let tempObj = {};
    assigningCode = Number(assigningCode);
    if(assigningCode == 0){
        tempObj[0] = zoningCode;
    }else if(assigningCode == 1){
        tempObj[1] = zoningCode;
    }else if(assigningCode == 2){
        tempObj[2] = zoningCode;
        tempObj[1] = zoningCode.substr(0,2) + "0000000000000";
    }else if(assigningCode == 3){
        tempObj[3] = zoningCode;
        tempObj[2] = zoningCode.substr(0,4) + "00000000000";
        tempObj[1] = zoningCode.substr(0,2) + "0000000000000";
    }
    return tempObj;
}

/**
 * iframe 报表样式  
 * @param {string} src 页面路径
 */

export let FromsIframe = (src)=>{
    let BodyHeight = document.getElementsByTagName('body')[0].offsetHeight,
        fromBoxHeight = document.getElementsByClassName('formBox')[0].offsetHeight;
    document.getElementById('FromsIframeBox').style.height = BodyHeight - 180 - fromBoxHeight +'px';
    document.getElementById('FromsIframe').src = src;  

}
 
/**
 *  根据行政区划代码获取相应级次代码
 * @method  getAssigningCode
 * @param   zoningCode
 * @return java.lang.String
 */
export let gainAssigningCode = (zoningCode) => {

    if (zoningCode == null || zoningCode === ("") || zoningCode.length != 15) {
        return "";
    }
    var assigningCode = "";
    if (zoningCode.substring(0, 2) === ("00")) {
        return "0";
    } else if (zoningCode.substring(2, 4) === ("00")) {
        assigningCode = "1";
    } else if (zoningCode.substring(4, 6) === ("00")) {
        assigningCode = "2";
    } else if (zoningCode.substring(6, 9) === ("000")) {
        assigningCode = "3";
    } else if (zoningCode.substring(9, 12) === ("000")) {
        assigningCode = "4";
    } else if (zoningCode.substring(12, 15) === ("000")) {
        assigningCode = "5";
    } else {
        assigningCode = "6";
    }
    return assigningCode;
}

/**
 * 根据键值将数据放置对应的省市县区域代码中
 * @param {Object} obj 区划代码存放的数组对象 
 * @param {number} levelCode 级次代码 
 */
export let clearData = (obj, levelCode) => {
    // switch (Number(levelCode)) {
    //     case 1:
    //         obj[2] = obj[3] = obj[4] = obj[5] = obj[6] = [];
            
    //         break;
    //     case 2:
    //         obj[3] = obj[4] = obj[5] = obj[6] = [];
    //         break;
    //     case 3:
    //         obj[4] = obj[5] = obj[6] = [];
    //         break;
    //     case 4:
    //         obj[5] = obj[6] = [];
    //         break;
    //     case 5:
    //         obj[6] = [];
    //         break;
    //     default:
    //         break;
    // }

    if (Number(levelCode) == 1) {
        obj[2] = obj[3] = []; 
        if( obj[4]){
            obj[4]  = []
        }
        if( obj[5]){
            obj[5]  = []
        }
        if( obj[6]){
            obj[6]  = []
        }
    }else if (Number(levelCode) == 2) {
        obj[3] = [];

        if( obj[4]){
            obj[4]  = []
        }
        if( obj[5]){
            obj[5]  = []
        }
        if( obj[6]){
            obj[6]  = []
        }
    }else if (Number(levelCode) == 3) { 

        if( obj[4]){
            obj[4]  = []
        }
        if( obj[5]){
            obj[5]  = []
        }
        if( obj[6]){
            obj[6]  = []
        }
    }else if (Number(levelCode) == 4) { 
        if( obj[5]){
            obj[5]  = []
        }
        if( obj[6]){
            obj[6]  = []
        }

    }else if (Number(levelCode) == 5) { 
         if( obj[6]){
            obj[6]  = []
        }
    } 

    return obj
}

/**
 * 根据键值将数据放置对应的省市县区域代码中
 * @param {Object} obj 区划代码存放的对象 
 * @param {number} levelCode 级次代码 
 */
export let clearObj = (obj, levelCode) => {
    if(Number(levelCode) == 0){
        obj[1] = obj[2] = obj[3] = ""; 
        if( obj[4]){
            obj[4]  = ""
        }
        if( obj[5]){
            obj[5]  = ""
        }
        if( obj[6]){
            obj[6]  = ""
        }
    } else if (Number(levelCode) == 1) {
        obj[2] = obj[3] = ""; 
        if( obj[4]){
            obj[4]  = ""
        }
        if( obj[5]){
            obj[5]  = ""
        }
        if( obj[6]){
            obj[6]  = ""
        }
    }else if (Number(levelCode) == 2) {
        obj[3] = "";

        if( obj[4]){
            obj[4]  = ""
        }
        if( obj[5]){
            obj[5]  = ""
        }
        if( obj[6]){
            obj[6]  = ""
        }
    }else if (Number(levelCode) == 3) { 

        if( obj[4]){
            obj[4]  = ""
        }
        if( obj[5]){
            obj[5]  = ""
        }
        if( obj[6]){
            obj[6]  = ""
        }
    }else if (Number(levelCode) == 4) { 
        if( obj[5]){
            obj[5]  = ""
        }
        if( obj[6]){
            obj[6]  = ""
        }

    }else if (Number(levelCode) == 5) { 
         if( obj[6]){
            obj[6]  = ""
        }
    } 

    return obj
}



/**
     * 获取本级区划
     * @param zoningCode 区划代码
     * @return String
     */
export let ownZoningCode = ( zoningCode ) => {


    let assigningCode = getAssigningCode(zoningCode)
 
    console.log(assigningCode)
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

let getAssigningCode = (zoningCode)=>{ 
    let assigningCode = "";
    if (zoningCode == null || zoningCode === ("") || zoningCode.length != 15) {
        return "";
    } 
    if (zoningCode.substring(0, 2) === ("00")) {
        return 0;
    } else if (zoningCode.substring(2, 4) === ("00")) {
        assigningCode = 1;
    } else if (zoningCode.substring(4, 6) === ("00")) {
        assigningCode = 2;
    } else if (zoningCode.substring(6, 9) === ("000")) {
        assigningCode = 3;
    } else if (zoningCode.substring(9, 12) === ("000")) {
        assigningCode = 4;
    } else if (zoningCode.substring(12, 15) === ("000")) {
        assigningCode = 5;
    } else {
        assigningCode = 6;
    }
    return assigningCode;
   
}


/**
 * 给区划补足15位，不足的以0填充
 * @param code
 * @returns {*}
 */

export let addZeroAtTail =  (code) => {
	if (code == null || code === "") {
		throw new Error("传入的区划代码为空！");
	} else { 
		var num = 15 - String(code).length;
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



export let zeroAtTail =  (zoningCode, assigningCode) => {
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

