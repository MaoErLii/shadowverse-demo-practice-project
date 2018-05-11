// pages/index/assignmentComposition/putComposition/putComposition.js
// Created by guohj
// Date: 2018/5/9
// Desc: 作文修改逻辑
Page({

  /**
   * 页面的初始数据
   */
  data: {
    compositionData:'',
    canEdit:true,
    id:'',
    token:'',
    putContent:'',
    putTitle:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var token = options.token;
    var urlStr = "http://test-edu-api.hejun.com/api/front/assignmentcomposition/" + id;
    //获取用户作业详情
    wx.request({
      url: urlStr,
      method:'GET',
      header:{
        token:token,
      },
      data:{
      },
      success:(res)=>{
        if(res.statusCode == 200){
          this.setData({
            compositionData:res.data,
          })
        }
      }
    })
    this.setData({
      id:id,
      token:token,
    })
  },

  //点击修改/编辑按键事件
  editBtn:function(){
    this.setData({
      canEdit:false,
    })
  },
  
  //获取用户输入的标题
  putTitle:function(e){
    this.setData({
      putTitle:e.detail.value,
    })
  },

  //获取用户输入的作文内容
  putContent:function(e){
    this.setData({
      putContent:e.detail.value,
    })
  },

  //点击提交作业按键事件
  bindFormSubmit:function(){
    var putTitle = this.data.putTitle;
    var putContent = this.data.putContent;
    var id = this.data.id;
    var token = this.data.token;
    var urlStr = 'http://test-edu-api.hejun.com/api/assignmentcomposition/' + id;
    //提交修改后的作文
    wx.request({
      url: urlStr,
      method:'PUT',
     header:{
        token:token,
      },
      data:{
        title:putTitle,
        content:putContent,
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
      }
    })
  }

})