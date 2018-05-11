// pages/index/assignmentReading/putReading/putReading.js
// Created by guohj
// Data: 2018/5/9
// Desc: 同学必读修改作业逻辑
Page({

  /**
   * 页面的初始数据
   */
  data: {
    readingData:'',
    canEdit:true,
    putContent: '',
    id: '',
    token: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var token = options.token;
    var urlStr = 'http://test-edu-api.hejun.com/api/front/assignmentreading/' + id;
    //获取同学必读作业详情
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
            readingData:res.data.data,
          })
        }
      }
    })
    this.setData({
      id:id,
      token:token,
    })
  },

  //编辑按键事件
  editBtn:function(){
    this.setData({
      canEdit:false,
    })
  },

  //获取用户输入作业内容
  putContent:function(e){
    this.setData({
      putContent:e.detail.value,
    })
  },

  //提交作业按键事件
  bindFormSubmit(){
    var putContent = this.data.putContent;
    var token = this.data.token;
    var id = this.data.id;
    var urlStr = 'http://test-edu-api.hejun.com/api/front/assignmentreading/' + id;
    wx.request({
      url: urlStr,
      method:'PUT',
      data:{
        content:putContent,
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
      }
    })
  }

})