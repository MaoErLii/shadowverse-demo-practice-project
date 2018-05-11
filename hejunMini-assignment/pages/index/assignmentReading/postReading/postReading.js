// pages/index/assignmentReading/postReading/postReading.js
// Created by guohj
// Date: 2018/5/9
// Desc: 同学必读第一次提交作业逻辑
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    token:'',
    postContent:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var token = options.token;
    this.setData({
      id:id,
      token:token,
    })
  },

  //获取用户输入内容
  postContent:function(e){
    this.setData({
      postContent:e.detail.value,
    })
  },

  //提交作业
  bindFormSubmit:function(){
    var postContent = this.data.postContent;
    var id = this.data.id;
    var token = this.data.token; 
    //提交同学必读作业
    wx.request({
      url: 'http://test-edu-api.hejun.com/api/front/assignmentreading',
      method:'POST',
      data:{
        assignment_id: id,
        content: postContent,
      },
      header:{
        token:token,
      },
    })
  }
})