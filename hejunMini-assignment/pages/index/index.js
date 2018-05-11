//index.js
// Created by guohj
// Date: 2018/5/8
// Desc: 作业列表逻辑

//获取应用实例
const app = getApp();

Page({
  data: {
    userInfo:'',
    logged:false,
    courseData:'',
    currentTab:0,
    currentLimit:'',
    totalCourse:'',
    hasMore:false,
    winWidth: 0,
    winHeight: 0,
  },

  onLoad:function(options){
    //用户登录
    wx.request({
      url: 'http://test-edu-api.hejun.com/api/login',
      method: "POST",
      data: {
        account: "13346180918",
        password: "123456"
      },
      //用户登录成功
      success: (res) => {
        if (res.statusCode == 200) {
          app.globalData.userInfo = res.data.data;
          app.globalData.logged = true;
          this.setData({
            logged: app.globalData.logged,
            userInfo: app.globalData.userInfo,
          })
          //获取用户课程列表
          wx.request({
            url: 'http://test-edu-api.hejun.com/api/front/assignment',
            method: "GET",
            data: {
              term_id: this.data.userInfo.term_id,
            },
            header: {
              token: this.data.userInfo.access_token
            },
            //获取用户课程列表成功
            success: (res) => {
              if (res.statusCode == 200) {
                this.setData({
                  courseData: res.data.data,
                  currentLimit:res.data.data.length,
                  totalCourse:res.data.total,
                })
              }
            }
          })
        }
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
  },

  /**
  * 滑动切换tab
  */
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },

  /**
   * 点击tab切换
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  //点击右侧按钮
  writeTask: function (e) {
    var courseData = e.target.dataset.coursedata;
    var termId = this.data.userInfo.term_id;
    var token = this.data.userInfo.access_token;
    var completion_status = courseData.completion_status;
    switch(courseData.assignment_type_id){
      //大课作业
      case 1: 
        wx.navigateTo({
          url: '../index/assignmentCoreCourse/assignmentCoreCourse?id=' + courseData.id +'&term_id=' + termId + '&token=' + token + '&assignment_id=' + courseData.assignment_id + '&disabled=' + courseData.disabled + '&completion_status=' + completion_status,
        });
      break;
      //同学必读
      case 2: 
        wx.navigateTo({
          url: '../index/assignmentReading/assignmentReading?id=' + courseData.id + '&term_id=' + termId + '&token=' + token + '&assignment_id=' + courseData.assignment_id + '&disabled=' + courseData.disabled + '&completion_status=' + completion_status,
        })
      break;
      //演讲作业
      case 3: 
        wx.navigateTo({
          url: '../index/assignmentLecture/assignmentLecture?id=' + courseData.id + '&term_id=' + termId + '&token=' + token + '&assignment_id=' + courseData.assignment_id + '&disabled=' + courseData.disabled + '&completion_status=' + completion_status,
        })
      break;
      //作文
      case 4: 
        wx.navigateTo({
          url: '../index/assignmentComposition/assignmentComposition?id=' + courseData.id + '&term_id=' + termId + '&token=' + token + '&assignment_id=' + courseData.assignment_id + '&disabled=' + courseData.disabled + '&completion_status=' + completion_status,
        })
      break;
      default: break;
    }
  },

  //点击左侧按键事件
    assignmentOverview:function(e){
      var courseData = e.target.dataset.coursedata;
      var token = this.data.userInfo.access_token;
      var class_id = this.data.userInfo.class_id;
      switch(courseData.assignment_type_id){
        //大课(全院作业)
        case 1: 
        wx.navigateTo({
          url: '../index/wholeCore/wholeCore?token=' + token + '&id=' + courseData.id,
        })    
        break;
        //同学必读（全院作业）
        case 2: 
        wx.navigateTo({
          url: '../index/wholeReading/wholeReading?token=' + token + '&id=' + courseData.id,
        })
        break;
        //演讲（班级总览）
        case 3: 
        wx.navigateTo({
          url: '../index/classOverview/classOverview?token=' + token + '&id=' + courseData.id + '&assignment_id=' + courseData.assignment_id + '&class_id=' + class_id + '&user_id=' + courseData.user_id,
        })
        break;
        //作文（班级互拼）
        case 4: 
        wx.navigateTo({
          url: '../index/classAssessment/classAssessment?token=' + token + '&id=' + courseData.id + '&class_id=' + class_id,
        })
        break;
        default: break;
      }
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



  /**
   * 页面相关事件处理函数--监听用户下拉动作（刷新作业页面）
   */
  onPullDownRefresh: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000,
    })
    setTimeout(()=>{
      //获取用户课程列表
      wx.request({
        url: 'http://test-edu-api.hejun.com/api/front/assignment',
        method: "GET",
        data: {
          term_id: this.data.userInfo.term_id,
        },
        header: {
          token: this.data.userInfo.access_token
        },
        //获取用户课程列表成功
        success: (res) => {
          if (res.statusCode == 200) {
            this.setData({
              courseData: res.data.data,
              currentLimit: res.data.data.length,
              totalCourse: res.data.total,
            })
          }
        }
      });
      wx.stopPullDownRefresh();
    },1000)
    
  },

  /**
   * 页面上拉触底事件的处理函数(刷新作业列表加载更多作业)
   */
  onReachBottom: function () {
    var total = this.data.totalCourse;
    var limit = this.data.currentLimit;
    if(limit < total){
      limit = limit + 15;
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 1000,
      })
      //获取用户课程列表
      wx.request({
        url: 'http://test-edu-api.hejun.com/api/front/assignment',
        method: "GET",
        data: {
          term_id: this.data.userInfo.term_id,
          limit: limit,
        },
        header: {
          token: this.data.userInfo.access_token
        },
        //获取用户课程列表成功
        success: (res) => {
          if (res.statusCode == 200) {
            this.setData({
              courseData: res.data.data,
              currentLimit: res.data.data.length,
            })
          }
        },
      })
    }else{
    }
  },
})
