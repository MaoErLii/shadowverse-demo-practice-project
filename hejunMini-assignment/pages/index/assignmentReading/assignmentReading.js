// pages/index/assignmentReading/assignmentReading.js
// Created by guohj
// Date: 2018/5/9
// Desc: 同学互读作业需求逻辑
Page({

  /**
   * 页面的初始数据
   */
  data: {
    readingData:'',
    completionStatus:'',
    token:'',
    disabled:'',
    id:'',
    assignment_id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var token = options.token;
    var assignment_id = options.assignment_id;
    var completion_status = options.completion_status;
    var disabled = options.disabled;
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
    wx.request({
      url: urlStr,
      method:'GET',
      data:{
      },
      header:{
        token:token,
      },
      success:(res)=>{
        if(res.statusCode == 200){
          this.setData({
            readingData:res.data.data,
          })
        }
      }
    }),
    this.setData({
      completionStatus:completion_status,
      id:id,
      assignment_id:assignment_id,
      disabled:disabled,
      token:token,
    })
  },

  write:function(){
    var disabled = this.data.disabled;
    var assignment_id = this.data.assignment_id;
    var token = this.data.token;
    var id = this.data.id;
    console.log(assignment_id);
    if(!assignment_id){ //没有写过作业
      if (disabled == 'false') {  //可以提交，跳转到写作业页面
        wx.navigateTo({
          url: '../assignmentReading/postReading/postReading?token=' + token + '&id=' + id,
        })
        // wx.showToast({
        //   title: '作业截止',
        //   icon:'loading',
        //   duration:2000,
        // })
      } else {  //不能提交，不能跳转到查看作业详情页面和写作业页面
        wx.showToast({
          title: '作业截止',
          icon: 'loading',
          duration: 2000,
        })
        // wx.navigateTo({
        //   url: '../assignmentReading/postReading/postReading?token=' + token + '&id=' + id,
        // })
      }
    }else{  //写过作业
      if (disabled == 'false') { //可以提交，跳转到修改作业页面 
        wx.navigateTo({
          url: '../assignmentReading/putReading/putReading?token=' + token + '&id=' + assignment_id,
        })
        // wx.navigateTo({
        //   url: '../assignmentReading/assignmentDetail/assignmentDetail?token=' + token + '&id' + assignment_id,
        // })
      } else {  //不能提交，只能跳转到查看作业详情页面
        wx.navigateTo({
          url: '../assignmentReading/assignmentDetail/assignmentDetail?token=' + token + '&id=' + assignment_id,
        })
        // wx.navigateTo({
        //   url: '../assignmentReading/putReading/putReading?token=' + token + '&id=' + assignment_id,
        // })
      }
    }
  }
})