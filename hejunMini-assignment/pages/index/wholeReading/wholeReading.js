// pages/index/wholeReading/wholeReading.js
// Created by guohj
// Dated: 2018 / 5 / 10
// Desc: 同学必读全院作业页面 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    readingData:'',
    token:'',
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var token = options.token;
    //获得同学必读全院作业列表
    wx.request({
      url: 'http://test-edu-api.hejun.com/api/front/assignmentreading',
      method: 'GET',
      data: {
        assignment_id: id,
        orderBy: "updated_at",
        sortedBy: "desc",
      },
      header: {
        token:token,
      },
      success: (res) => {
        var result = JSON.parse(JSON.stringify(res.data).replace(/\u00A0|\u2028|\u2029|\uFEFF/g, ''));
        // console.log(res);
        this.setData({
          readingData:result.reply.data
        })
      }
    })
    //获取系统信息
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          winHeight: res.windowHeight,
          winWidth: res.windowWidth,
        })
      },
    })

  this.setData({
    id:id,
    token:token,
  })

  },

  //滑动切换tab
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    })
  },

  //点击切换tab
  switchNav: function (e) {
    var that = this;
    if (that.data.currentTab == e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  //查看作业详情事件
  toast: function (e) {
    var id = e.target.dataset.id;
    var token = this.data.token;
    wx.navigateTo({
      url: '../wholeReading/readingDetail/readingDetail?id=' + id + '&token=' + token,
    })
  },

  //下拉刷新
  onPullDownRefresh: function () {
    var id = this.data.id;
    var token = this.data.token;
    var search = "assignment_id:" + id;
    console.log(search);
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000,
    })
    setTimeout(() => {
      //获取全院大课作业列表
      wx.request({
        url: 'http://test-edu-api.hejun.com/api/front/assignmentreading',
        method: 'GET',
        header: {
          token: token,
        },
        data: {
          assignment_id: id,
          orderBy: 'updated_at',
          sortedBy: 'desc',
        },
        success: (res) => {
          if (res.statusCode == 200) {
            var result = JSON.parse(JSON.stringify(res.data).replace(/\u00A0|\u2028|\u2029|\uFEFF/g, ''));
            this.setData({
              readingData: result.reply.data,
            })
          }
        }
      })
      wx.stopPullDownRefresh();
    },1000)
  }
})