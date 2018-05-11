// pages/index/assignmentComposition/assignmentDetial/assignmentDetial.js
// Created by guohj
// Date: 2018/5/10
// Desc: 查看作文逻辑
Page({

  /**
   * 页面的初始数据
   */
  data: {
    compositionData:'',
    id:'',
    token:'',   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var token = options.token;
    var urlStr = "http://test-edu-api.hejun.com/api/front/assignmentcomposition/" + id;
    //获取作文详情
    wx.request({
      url: urlStr,
      header:{
        token:token,
      },
      success:(res)=>{
        this.setData({
          compositionData:res.data,
        })
      }
    })
  },

})