// pages/index/assignmentCoreCourse/assignmentDetailCoreCourse/assignmentDetailCoreCourse.js
// Created by guohj
// Data: 2018/5/9
// Desc: 大课作业查看作业逻辑
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
    var urlStr = 'http://test-edu-api.hejun.com/api/front/assignmentcourse/' + id;
    wx.request({
      url: urlStr,
      method:'GET',
      data:{
        id:id,
      },
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
    });
    this.setData({
      id:id,
      token:token,
    })
  },
})