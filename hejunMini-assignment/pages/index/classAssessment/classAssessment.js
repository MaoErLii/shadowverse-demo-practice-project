// pages/index/classAssessment/classAssessment.js
// Created by guohj
// Date: 2018/5/10
// Desc: 班级互评作文列表逻辑
Page({

  /**
   * 页面的初始数据
   */
  data: {
    compositionData:'',
    id:'',
    token:'',
    class_id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var token = options.token;
    var class_id = options.class_id;  
    //获取作文列表
    wx.request({
      url: 'http://test-edu-api.hejun.com/api/front/assignmentcomposition',
      method:'GET',
      data:{
        assignment_id:id,
        class_id:class_id,
      },
      header:{
        token:token,
      },
      success:(res)=>{
        this.setData({
          compositionData:res.data.data,
        })
      }
    })
    this.setData({
      token:token,
      id:id,
    })
  },

  toast:function(e){
    var id = e.target.dataset.id;
    var token = this.data.token;
    wx.navigateTo({
      url: '../classAssessment/compositionData/compositionData?token=' + token +'&id=' + id,
    })
  }

})