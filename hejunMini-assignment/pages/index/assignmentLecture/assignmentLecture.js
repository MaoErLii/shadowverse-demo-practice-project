// pages/index/assignmentLecture/assignmentLecture.js
// Created by guohj
// Date: 2018/5/9
// Desc: 演讲作业作业需求页面
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lectureData:'',
    id:'',
    token:'',
    disabled:'',
    assignment_id:'',
    completionStatue:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var assignment_id = options.assignment_id;
    var token = options.token;
    var disabled = options.disabled;
    var completion_status = options.completion_status;
    if (!assignment_id) {
      console.log("没有assignment_id，作业未提交");
      console.log("可以提交作业:" + disabled);
      console.log("作业完成状态:" + completion_status);
    } else {
      console.log("有assignment_id:" + assignment_id);
      console.log("可以提交作业:" + disabled);
      console.log("作业完成状态:" + completion_status);
    }
    var urlStr = 'http://test-edu-api.hejun.com/api/front/assignment/' + id;
    //获取作业详情
    wx.request({
      url: urlStr,
      method:'GET',
      data:{

      },
      header:{
        token:token,
      },
      success:(res)=>{
        if(res.statusCode == 200){
          console.log(res);
          this.setData({
            lectureData:res.data.data
          })
        }
      }
    });
    this.setData({
      id:id,
      token:token,
      completionStatus:completion_status,
      assignment_id:assignment_id,
      disabled:disabled,
    })
  },

  //写作业按键事件
  write:function(){
    var id = this.data.id;
    var assignment_id = this.data.assignment_id;
    var token = this.data.token;
    var disabled = this.data.disabled;
    if(!assignment_id){ //没有写过作业
      if (disabled == "false") {  //可以提交，跳转到写作业页面
        wx.navigateTo({
          url: '../assignmentLecture/postLecture/postLecture?id=' + id + '&token=' + token,
        })
        // wx.showToast({
        //   title: '作业截止',
        //   icon:'loading',
        //   duration:2000,
        // })
      } else {  //不可以提交，无法跳转到作业详情和写作业页面
        wx.showToast({
          title: '作业截止',
          icon: 'loading',
          duration: 2000,
        })
        // wx.navigateTo({
        //   url: '../assignmentLecture/postLecture/postLecture?id=' + id + '&token=' + token,
        // })
      }
    }else{  //写过作业
      if (disabled == "false") { //可以提交，跳转到修改作业页面 
        wx.navigateTo({
          url: '../assignmentLecture/putLecture/putLecture?id=' + assignment_id + '&token=' + token,
        })
        // wx.navigateTo({
        //   url: '../assignmentLecture/assignmentDetail/assignmentDetail?id=' + assignment_id + '&token=' + token,
        // })
      } else {  //不可以提交，跳转到作业详情页面
        wx.navigateTo({
          url: '../assignmentLecture/assignmentDetail/assignmentDetail?id=' + assignment_id + '&token=' + token,
        })
      // wx.navigateTo({
      //   url: '../assignmentLecture/putLecture/putLecture?id=' + assignment_id + '&token=' + token,
      // })
      }
    }
  }
})