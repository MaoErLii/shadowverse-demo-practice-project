// pages/index/classOverview/classOverview.js
// Created by guohj
// Date: 2018/5/10
// Desc: 班级总览逻辑
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lectureData:'',
    token:'',
    currentLimit:'',
    totalLecture:'',
    id:'',
    user_id:'',
    class_id:'',
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var class_id = options.class_id;
    var token = options.token;
    var user_id = options.user_id;
    //班级总览列表
    wx.request({
      url: 'http://test-edu-api.hejun.com/api/front/assignmentlecture',
      method: 'GET',
      data: {
        class_id: class_id,
        assignment_id: id,
        user_id: user_id,
      },
      header: {
        token: token,
      },
      success: (res) => {
        var result = JSON.parse(JSON.stringify(res).replace(/\u00A0|\u2028|\u2029|\uFEFF/g, ''));
        this.setData({
          lectureData: result.data.data,
          currentLimit: result.data.data.length,
          totalLecture: result.data.total,
        })
        console.log("limit:" + this.data.currentLimit);
        console.log("total:" + this.data.totalLecture);
      }
    })
    this.setData({
      id:id,
      class_id:class_id,
      user_id:user_id,
      token:token,
    })
  },

  //演讲详情页面
  toast:function(e){
    var token = this.data.token;
    var id = e.target.dataset.user_id;
    wx.navigateTo({
      url: '../classOverview/lectureDetail/lectureDetail?token=' + token + '&id=' + id,
    })
  },


  /**
     * 页面上拉触底事件的处理函数(刷新作业列表加载更多作业)
     */
  onReachBottom: function () {
    var total = this.data.totalLecture;
    var limit = this.data.currentLimit;
    var id = this.data.id;
    var token = this.data.token;
    var class_id = this.data.class_id;
    var user_id = this.data.user_id;
    if (limit < total) {
      limit = limit + 15;
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 1000,
      })
      //班级总览列表
      wx.request({
        url: 'http://test-edu-api.hejun.com/api/front/assignmentlecture',
        method: 'GET',
        data: {
          class_id: class_id,
          assignment_id: id,
          user_id: user_id,
          limit:limit,
        },
        header: {
          token: token,
        },
        success: (res) => {
          var result = JSON.parse(JSON.stringify(res).replace(/\u00A0|\u2028|\u2029|\uFEFF/g, ''));
          this.setData({
            lectureData: result.data.data,
            currentLimit: result.data.data.length,
          })
        }
      })
    } else {
    }
  },
})