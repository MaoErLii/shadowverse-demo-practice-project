// pages/index/wholeCore/wholeCore.js
// Created by guohj
// Date: 2018/5/10
// Desc: 大课作业全院作业逻辑
Page({
  /**
   * 页面的初始数据
   */
  data: {
    coreData:[],
    token:'',
    winWidth:0,
    winHeight:0,
    currentTab:0,
    id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var token = options.token;
    var search = "assignment_id:" +id;
    var that = this;
    //获取全院大课作业列表
    wx.request({
      url: 'http://test-edu-api.hejun.com/api/front/assignmentcourse',
      method:'GET',
      header:{
        token:token,
      },
      data:{
        search:search,
        orderBy:'updated_at',
        sortedBy:'desc',
      },
      success:(res)=>{
        if(res.statusCode == 200){ 
          var result = JSON.parse(JSON.stringify(res.data).replace(/\u00A0|\u2028|\u2029|\uFEFF/g, ''));
          that.setData({
            coreData: result.data,
          })
        }
      }
    })

    //获取系统信息
    wx.getSystemInfo({
      success: (res) =>{
        that.setData({
          winHeight:res.windowHeight,
          winWidth:res.windowWidth,
        })
      },
    })

    that.setData({
      token:token,
      id:id,
    })
  },

  //滑动切换tab
  bindChange:function(e){
    var that = this;
    that.setData({
      currentTab:e.detail.current
    })
  },

  //点击切换tab
  switchNav:function(e){
    var that = this;
    if(that.data.currentTab == e.target.dataset.current){
      return false;
    }else{
      that.setData({
        currentTab:e.target.dataset.current
      })
    }
  },

  //查看作业详情事件
  toast:function(e){
    var id = e.target.dataset.id;
    var token = this.data.token;
    wx.navigateTo({
      url: '../wholeCore/coreDetail/coreDetail?id=' + id + '&token=' + token,
    })
  },

  //下拉刷新
  onPullDownRefresh:function(){
    var id = this.data.id;
    var token = this.data.token;
    var search = "assignment_id:" + id;
    console.log(search);
    wx.showToast({
      title: '加载中',
      icon:'loading',
      duration:1000,
    })
    setTimeout(() => {
    //获取全院大课作业列表
    wx.request({
      url: 'http://test-edu-api.hejun.com/api/front/assignmentcourse',
      method: 'GET',
      header: {
        token: token,
      },
      data: {
        search: search,
        orderBy: 'updated_at',
        sortedBy: 'desc',
      },
      success: (res) => {
        var result = JSON.parse(JSON.stringify(res.data).replace(/\u00A0|\u2028|\u2029|\uFEFF/g, ''));
        if (res.statusCode == 200) {
          this.setData({
            coreData: result.data,
          })
        }
      }
    })
    wx.stopPullDownRefresh();
    },1000)
  }

})