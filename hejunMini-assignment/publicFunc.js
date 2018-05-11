const publicConfig = require('/publicConfig.js');

//网络请求
// function httpReq(url, method, data, header, callBack)

//用户登录(data: account, password;  header:)
function userLogin(account, password, callBack){
  var data = {
    account:account,
    password:password,
  };
  publicConfig.urlReq(publicConfig.urlLogin, 'POST',  data, callBack);
}


/**
 * 作业相关函数
 */
//获取用户作业列表(data: term_id; header: token;)
function assignmentList(url, term_id, token, callBack){
  var data = {
    term_id:term_id,
  };
  var header = {
    token:token,
  };
  publicConfig.urlReq(url, 'GET', header, callBack);
}


/**
 * 大课作业相关函数
 */
//大课作业提交
function postCore(url, content, assignment_id, token, callBack){
  var data = {
    content:content,
    assignment_id:assignment_id,
  };
  var header = {
    token:token,
  };
  publicConfig.urlReq(url, 'POST', data, header, callBack);
}

//大课作业详情
function coreDetail(url, id,token, callBack){
  var header = {
    token:token,
  };
  var urlStr = url + '/' + id;
  publicConfig.urlReq(urlStr, 'GET', header, callBack);
}

//大课作业修改
function putCore(url, id,content, token, callBack){
  var urlStr = url + '/' + id;
  var data = {
    content:content,
  };
  var headers = {
    token:token,
  };
  publicConfig.urlReq(urlStr, 'PUT', data, header, callBack);
}

//大课作业全院作业列表
function wholeCore(url, id, token, callBack){
  var search = "assignment_id:" + id;
  var data = {
    search:search,
    orderBy:'updated_at',
    sortedBy:'desc',
  };
  var header = {
    token:token,
  };
  publicConfig.urlReq(url, 'GET', data, header, callBack);
}

/**
 * 同学必读相关函数
 */
//同学必读作业提交
function postReading(url, id, content, token, callBack){
  var data = {
    assignment_id:id,
    content:content,
  };
  var header = {
    token:token,
  };
  publicConfig.urlReq(url, 'POST', data, header, callBack);
}

//同学必读作业详情
function readingDetail(url, id, token, callBack){
  var urlStr = url + '/' + id;
  var data = {
    id:id,
  };
  var header = {
    token:token,
  };
  publicConfig.urlReq(urlStr, 'GET', data, header, callBack);
}

//同学必读作业修改
function putReading(url, id, content, token, callBack){
  var urlStr = url + '/' + id;
  var data = {
    id:id,
  };
  var header = {
    token:token,
  };
  publicConfig.urlReq(urlStr, 'PUT', data, header, callBack);
}

//同学必读全院作业列表
function wholeReading(url, id, token, callBack){
  var search = "assignment_id:" + id;
  var data = {
    search:search,
    orderBy: 'updated_at',
    sortedBy: 'desc',
  };
  var header = {
    token:token,
  };
  publicConfig.urlReq(url, 'GET', data, header, callBack);
}

/**
 * 演讲作业相关函数
 */
//演讲作业提交
function postLecture(url, id, subject, address, summary, file_path, file_host, done_at, token, callBack){
  var data = {
    assignment_id: id,
    subject:subject,
    address:address,
    summary:summary,
    file_host:file_host,
    file_path:file_path,
    done_at:done_at,
    };
  var header = {
      token:token,
    };
    publicConfig.urlReq(url, 'POST', data, header, callBack);
}

//演讲作业修改

//演讲作业详情

//演讲作业班级总览
function classOverview(url, class_id, id, user_id, token, callBack){
  var data = {
      class_id: class_id,
      assignment_id: id,
      user_id: user_id,
    };
  var header = {
    token: token,
    };
    publicConfig.urlReq(url, 'GET', data, header, callBack);
}

/**
 * 作文相关函数
 */
//提交作文
function posComposition(url, id, title, content, token, callBack){
  var header = {
      token: token,
    };
  var data = {
      assignment_id: id,
      title:title,
      content:content,
    };
  publicConfig.urlReq(url, 'POST', data, header, callBack);
}

//修改作文
function putComposition(url, id, title, content, token, callBack){
  var urlStr = url + '/' + id;
  var header = {
      token: token,
    };
  var data = {
      title: title,
      content:content,
    };
    publicConfig.urlReq(urlStr, 'PUT', data, header, callBack);
}

//作文详情页面
function compositionDetail(url, id, token, callBack){
  var urlStr = url + '/' + id;
  var data = {};
  var header = {
      token: token,
    };
    publicConfig.urlReq(urlStr, 'GET', data, header, callBack);
}

//作文列表班级互评
function classAssessment(url, id, class_id, token, callBack){
  var data = {
      assignment_id: id,
      class_id:class_id,
    };
  var header = {
      token: token,
    };
    publicConfig.urlReq(url, 'GET', data, header, callBack);
}