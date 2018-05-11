var host = 'http://test-edu-api.hejun.com';   //域名（测试环境）
//var host = 'https://ospx.hejunweilai.com';  //域名（正式环境） 

var hj_UserInfo  = '';  //和君用户信息
var assignmentList = ''; //作业列表

var header = {};

//网络请求
function httpReq(url, method, data, header, callBack){
  wx.request({
    url: url,
    method:method,
    data:data,
    header:header,
    success:(res)=>{
      callBack(res);
      // callBack(JSON.parse(JSON.stringify(res).replace(/\u00A0|\u2028|\u2029|\uFEFF/g, '')));
    }
  })
}

//页面跳转
path: '$("pages")/';

/**
 * 接口地址
 */

//登录接口(post)
urlLogin: '$(host)/api/login';
//退出登录(get)
urlLogout: '$(host)/api/logout';


//前端-作业任务-列表（get）
urlAssignment: '$(host)/api/front/assignment';
//作业详情(get)  urlAssignment + '/' + id;

/**
 * 前端-大课作业
 */
//大课作业提交(post)
urlCore: '$(host)/api/front/assignmentcourse';
//大课作业详情(get) urlCore + '/' + id;
//大课作业修改(put) urlCore + '/' + id;
//全院作业列表(get) urlCore;

/**
 * 学生端（前端?-同学必读
 */
//同学必读作答(post)
urlReading: '$(host)/api/front/assignmentreading';
//同学必读详情(get) urlReading + '/' + id;
//同学必读修改(put) urlReading + '/' + id;
//同学必读列表(get) urlReading;

/**
 * 前端-演讲作业
 */
//演讲作业添加(post)
urlLecture: '$(host)/api/front/assignmentlecture';
//演讲作业详情(get) urlLecture + '/' + id;
//演讲作业更新（修改?）(put) urlLecture;
//演讲作业班级总览(get) urlLecture;

/**
 * 前端-作文
 */
//作文提交(post)
urlComposition: '$(host)/api/front/assignmentcomposition';
//作文详情(get) urlComposition + '/' + id;
//作文修改(put) urlComposition + '/' + id;
//作文班级总览(get) urlComposition;



module.exports = publicConfig 


