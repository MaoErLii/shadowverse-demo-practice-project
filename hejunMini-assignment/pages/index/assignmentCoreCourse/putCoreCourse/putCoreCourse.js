// pages/index/assignmentCoreCourse/putCoreCourse/putCoreCourse.js
// Created by guohj
// Date: 2018/5/8
// Desc: 修改大课作业逻辑层
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canEdit:true,
    coreData:'',
    putContent:'',
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
    //获取用户大课作业详情
    wx.request({
      url: urlStr,
      method:"GET",
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
    });
  },

  //获取编辑后的大课作业内容
  putContent:function(e){
    this.setData({
      putContent:e.detail.value,
    })
  },

  //点击提交作业按钮事件
  bindFormSubmit:function(){
    var id = this.data.id;
    var token = this.data.token;
    //提交修改后的大课作业
    var urlStr = "http://test-edu-api.hejun.com/api/front/assignmentcourse/" + id;
    wx.request({
      url: urlStr,
      method:'PUT',
      data:{
        content:this.data.putContent,
      },
      header:{
        token:token,
      },
      success:(res)=>{
        if(res.statusCode == 200){
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000,
          });
          wx.navigateBack({
            delta: 2,
          })
        }
      },
    })
  },

  //点击编辑按钮事件
  editBtn:function(){
    this.setData({
      canEdit:false,
    })
  }
})