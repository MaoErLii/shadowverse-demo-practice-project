// pages/index/assignmentCoreCourse/writeCoreCourse/writeCoreCourse.js
// Create by guohj
// Data: 2018/5/8
// Desc: 大课作业第一次提交逻辑
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postContent:'',
    id:'',
    token:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var token = options.token;
    // console.log(id);
    // console.log(token);
    this.setData({
      id:id,
      token:token,
    })
  },

  //获取编写作业的内容
  postContent:function(e){
    this.setData({
      postContent:e.detail.value,
    })
  },

  //提交大课作业(第一次提交)
  bindFormSubmit:function(){
    var postContent = this.data.postContent;
    wx.request({
      url: 'http://test-edu-api.hejun.com/api/front/assignmentcourse',
      data:{
        content:this.data.postContent,
        assignment_id:this.data.id,
      },
      header:{
        token:this.data.token,
      },
      success:(res)=>{
        if(res.statusCode == 200){
            
        }
      }
    })
  }
})