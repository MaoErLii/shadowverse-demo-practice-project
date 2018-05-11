// pages/index/assignmentComposition/postComposition/postComposition.js
// Created by guohj
// Date: 2018/5/10
// Desc: 提交作文逻辑
Page({

  /**
   * 页面的初始数据
   */
  data: {
    compositionData:'',
    postTitle:'',
    postContent:'',
    id:'',
    token:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var token  = options.token;
    this.setData({
      id:id,
      token:token,
    })
  },

  //获取用户输入的标题
  postTitle: function (e) {
    this.setData({
      postTitle: e.detail.value,
    })
  },

  //获取用户输入的作文内容
  postContent: function (e) {
    this.setData({
      postContent: e.detail.value,
    })
  },

  //提交作业按键事件
  bindFormSubmit:function(){
    var postTitle = this.data.postTitle;
    var postContent = this.data.postContent;
    var token = this.data.token;
    var id = this.data.id;
    //提交作业
    wx.request({
      url: 'http://test-edu-api.hejun.com/api/front/assignmentcomposition',
      method:'post',
      header:{
        token:token,
      },
      data:{
        assignment_id:id,
        title:postTitle,
        content:postContent,
      },
      success:(res)=>{
        if(res.statusCode == 200){
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000,
          });
          wx.navigateBack({
            delta: 2,
          })  
        }
      }
    })
  }

})