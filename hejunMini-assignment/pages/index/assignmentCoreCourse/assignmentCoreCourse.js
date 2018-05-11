// pages/index/assingmentCoreCourse/assignmentCoreCourse.js

// Create By guohj
// Date: 2018/5/8
// Desc: 大课作业作业需求页面

Page({

  /**
   * 页面的初始数据
   */
  data: {
    coreData:'',            
    disabled:'',
    completionStatus:'',
    token:'',
    id:'',
    assignment_di:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var term_id = options.term_id;
    var token = options.token;
    var assignment_id = options.assignment_id;
    var disabled = options.disabled;
    var completion_status = options.completion_status;
    if(!assignment_id){
      console.log("没有assignment_id，作业未提交");
      console.log("可以提交作业:" + disabled);
      console.log("作业完成状态:" + completion_status);
    }else{
      console.log("有assignment_id:" + assignment_id);
      console.log("可以提交作业:" + disabled);
      console.log("作业完成状态:" + completion_status);
    }
    var urlStr = 'http://test-edu-api.hejun.com/api/front/assignment/' + id;
    wx.request({
      url: urlStr,
      method:'GET',
      data:{
        term_id:term_id,
      },
      header:{
        token:token,
      },
      success:(res)=>{
        if(res.statusCode == 200){
          this.setData({
            coreData:res.data.data,
          });
        }
      },
    });
    this.setData({
      id:id,
      token:token,
      disabled: disabled,
      assignment_id: assignment_id,
      completionStatus: completion_status,
    });
  },

// disabled = true 可以提交作业
// disabled = false 不可以提交作业
  //点击写作业事件
  write:function(){
    var disabled = this.data.disabled;
    var assignment_id = this.data.assignment_id;
    var token = this.data.token;
    var id = this.data.coreData.id;
    if(!assignment_id){ //没有写过作业
      if (disabled == "false") { //可以提交（跳转到写作业页面）
        wx.navigateTo({
          url: '../assignmentCoreCourse/postCoreCourse/postCoreCourse?token=' + token + '&id=' + id,
        })
        // wx.showToast({
        //   title: '没有完成作业',
        //   icon:'loading',
        //   duration:1000,
        // })
      } else {  //不能提交（无法查看自己作业的内容）
        wx.showToast({
          title: '没有完成作业',
          icon: 'loading',
          duration: 1000,
        })
        // wx.navigateTo({
        //   url: '../assignmentCoreCourse/postCoreCourse/postCoreCourse?token=' + token + '&id=' + id,
        // })
      }
    }else{  //写过作业
      if (disabled == "false") { //可以提交(跳转到编辑作业页面)
        wx.navigateTo({
          url: '../assignmentCoreCourse/putCoreCourse/putCoreCourse?token=' + token + '&id=' + assignment_id,
        })
          // wx.navigateTo({
          //   url: '../assignmentCoreCourse/assignmentDetailCoreCourse/assignmentDetailCoreCourse?token=' + token + '&id=' +assignment_id,
          // })
      } else {  //不能提交(可以查看自己的作业内容和成绩)
        wx.navigateTo({
          url: '../assignmentCoreCourse/assignmentDetailCoreCourse/assignmentDetailCoreCourse?token=' + token + '&id=' + assignment_id,
        })
        // wx.navigateTo({
        //   url: '../assignmentCoreCourse/putCoreCourse/putCoreCourse?token=' + token + '&id=' + assignment_id,
        // })
      }
    }
  }

})