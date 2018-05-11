// pages/index/assignmentComposition/assignmentComposition.js
// Created by guohj
// Date: 2018/5/9
// Desc: 作文作业需求页面逻辑
Page({

  /**
   * 页面的初始数据
   */
  data: {
    compositionData:'',
    id:'',
    assignment_id:'',
    token:'',
    completionStatus:'',
    disabled:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var assignment_id = options.assignment_id;
    var token = options.token;
    var disabled = options.disabled;
    var completion_status = options.completion_status;
    var term_id = options.trem_is;
    if (!assignment_id) {
      console.log("没有assignment_id，作业未提交");
      console.log("可以提交作业:" + disabled);
      console.log("作业完成状态:" + completion_status);
    } else {
      console.log("有assignment_id:" + assignment_id);
      console.log("可以提交作业:" + disabled);
      console.log("作业完成状态:" + completion_status);
    }
    var urlStr = 'http://test-edu-api.hejun.com/api/front/assignment/' + id;
    //获取用户作业详情
    wx.request({
      url: urlStr,
      method:'GET',
      data:{
        term_id:term_id,
      },
      header:{
        token:token,
      },
      success:(res)=>{
        if(res.statusCode == 200){
          this.setData({
            compositionData:res.data.data,
          })
        }
      }
    })
    this.setData({
      id:id,
      disabled: disabled,
      assignment_id: assignment_id,
      completionStatus: completion_status,
      token:token,
    })
  },

  //点击按键事件
  write:function(){
    var id = this.data.id;
    var token = this.data.token;
    var assignment_id = this.data.assignment_id;
    var disabled = this.data.disabled;
    if(!assignment_id){ //没有写过作业
      if (disabled == 'false') {  //可以提交，跳转到写作业页面
        wx.navigateTo({
          url: '../assignmentComposition/postComposition/postComposition?token=' + token + '&id=' + id,
        })
        // wx.showToast({
        //   title: '没有完成作业',
        //   icon: 'loading',
        //   duration: 1000,
        // })
      } else {  //不可以提交作业，不能跳转作业详情页面和写作业页面
        wx.showToast({
          title: '没有完成作业',
          icon: 'loading',
          duration: 1000,
        })
        // wx.navigateTo({
        //   url: '../assignmentComposition/postComposition/postComposition?token=' + token + '&id=' + id,
        // })
      }
    }else{  //写过作业
      if (disabled == 'false') {  //可以提交，跳转到修改作业页面
        wx.navigateTo({
          url: '../assignmentComposition/putComposition/putComposition?token=' + token + '&id=' + assignment_id,
        })
          // wx.navigateTo({
          //   url: '../assignmentComposition/assignmentDetial/assignmentDetial?token=' + token + '&id=' + assignment_id,
          // })
      } else {  //不可以提交，跳转到作业详情页面
        wx.navigateTo({
          url: '../assignmentComposition/assignmentDetial/assignmentDetial?token=' + token + '&id=' + assignment_id,
        })
          // wx.navigateTo({
          //   url: '../assignmentComposition/putComposition/putComposition?token=' + token + '&id=' + assignment_id,
          // })
      }
    }
  }
})