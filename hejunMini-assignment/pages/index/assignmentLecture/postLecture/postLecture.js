// pages/index/assignmentLecture/postLecture/postLecture.js
// Created by guohj
// Date: 2018/5/9
// Desc: 演讲作业提交页面逻辑
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dates:'请填写演讲日期',
    times:'请填写演讲时间',
    postTheme:'',
    postData_Time:'',
    postAddress:'',
    postSummary:'',
    upImg:'',
    upImgHost:'',
    upImgPath:'',
    token:'',
    id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = options.token;
    var id = options.id;
    this.setData({
      token:token,
      id:id,
    })
  },

  //获取用户演讲主题内容
  bindTheme:function(e){
    this.setData({
      postTheme:e.detail.value,
    })
  },

  //获取用户演讲地点内容
  bindAddress:function(e){
    this.setData({
      postAddress:e.detail.value,
    })
  },

  //获取用户概况简报内容
  bindSummary:function(e){
    this.setData({
      postSummary: e.detail.value,
    })
  },

  //点击时间组件确定事件
  bindTimeChange:function(e){
    this.setData({
      times:e.detail.value,
    })
  },
  
  //点击日期组件确定事件
  bindDateChange:function(e){
    this.setData({
      dates:e.detail.value,
    })
  },
  
  //上传图片事件
  upImg:function(){
    var token = this.data.token;
    wx.chooseImage({
      count:1,
      success:(res)=>{
        var img = res.tempFilePaths;
        this.setData({
          upImg:img,
        });
        console.log(img[0]);
        wx.uploadFile({
          url: 'http://test-edu-api.hejun.com/api/file/files',
          method:'POST',
          header:{
            token:token,
          },
          filePath: img[0],
          name: 'file',
          success:(result)=>{
            if(result.statusCode == 200){
              var resData = JSON.parse(result.data);
              this.setData({
                upImgHost: resData.host,
                upImgPath: resData.path,
              })
            }
          }
        })
      },
    })
  },

  //提交演讲按键事件
  bindFormSubmit:function(){
    var token = this.data.token;
    var id = this.data.id;
    var postTheme = this.data.postTheme;
    var postTime = this.data.dates + ' ' +this.data.times;
    var postAddress = this.data.postAddress;
    var postSummary = this.data.postSummary;
    var upImgHost = this.data.upImgHost;
    var upImgPath = this.data.upImgPath;
    //提交演讲作业
    wx.request({
      url: 'http://test-edu-api.hejun.com/api/front/assignmentlecture',
      method:'POST',
      data:{
        assignment_id:id,
        subject:postTheme,
        address:postAddress,
        summary:postSummary,
        file_host:upImgHost,
        file_path:upImgPath,
        done_at:postTime,
      },
      header:{
        token:token,
      },
      success:(res)=>{
        if(res.statusCode == 201){
          wx.showToast({
            title: '提交成功',
            icon:'loading',
            duration:2000,
          })
          console.log(res);
          wx.navigateBack({
            delta:2,
          })
        }
      }
    })
  }
 
})