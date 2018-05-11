// pages/index/assignmentReading/assignmentDetail/assignmentDetail.js
// Created by guohj
// Date: 2018/5/10
// Desc: 同学必读作业详情逻辑
Page({

  /**
   * 页面的初始数据
   */
  data: {
    readingData:'',
    id:'',
    token:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var token = options.token;
    console.log(id);
    var urlStr = "http://test-edu-api.hejun.com/api/front/assignmentreading/" + id;
    //获取必读作业详情
    wx.request({
      url: urlStr,
      method:"GET",
      header:{
        token:token,
      },
      data:{
        id:id,
      },
      success:(res)=>{
        var result = JSON.parse(JSON.stringify(res).replace(/\u00A0|\u2028|\u2029|\uFEFF/g, ''));
        console.log(result);
        this.setData({
          readingData:result.data.data,
        })
      }
    })
  },

})