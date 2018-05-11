// pages/index/wholeCore/coreDetail/coreDetail.js
// Created by guohj
// Date: 2018/5/10
// Desc: 大课作业全院/优秀作业作业详情逻辑
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coreData:'',
    id:'',
    token:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var token = options.token;
    var urlStr = "http://test-edu-api.hejun.com/api/front/assignmentcourse/" + id;
    wx.request({
      url: urlStr,
      method:'GET',
      header:{
        token:token,
      },
      success:(res)=>{
        if(res.statusCode == 200){
          this.setData({
            coreData:res.data.data,
          })
        }
      }
    })
  },

})