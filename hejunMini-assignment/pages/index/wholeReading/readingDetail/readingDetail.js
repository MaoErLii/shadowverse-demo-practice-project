// pages/index/wholeReading/readingDetail/readingDetail.js
// Created by guohj
// Date: 2018/5/10
// Desc: 同学必读全院/优秀作业作业详情逻辑
Page({

  /**
   * 页面的初始数据
   */
  data: {
    readingData: '',
    id: '',
    token: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var token = options.token;
    // console.log(id);
    // console.log(token);
    var urlStr = "http://test-edu-api.hejun.com/api/front/assignmentreading/" + id;
    wx.request({
      url: urlStr,
      method: 'GET',
      header: {
        token: token,
      },
      data:{
        id:id,
      },
      success: (res) => {
        if (res.statusCode == 200) {
          this.setData({
            readingData: res.data.data,
          })
        }
      }
    })
  },

})
