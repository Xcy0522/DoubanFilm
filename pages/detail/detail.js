const API = require("../../utils/api");

// pages/detail/detail.js

// page: 页面初始化函数
Page({
  /**
   * 页面的初始数据
   */
  data: {
     title:"",
    url: "",
     subjects: "",
     loading_more: false,
  },
  // 收藏事件处理
  catch_collect(ev){
    console.log(ev.target.dataset);
    
    // 储存事件对象带过来的信息
    let {subject, index} = ev.target.dataset
    this.setData({
      ["subjects[" + index + "].isCollect"]: true,
    })
    console.log(this.data.subjects)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     console.log(options);
    //  获取路由数据
     this.setData({
       title: options.title
     });
    wx.setNavigationBarTitle({
      title: options.title,
    });
    // 请求接口
    // this.request(this.data.title);
    // 触发下拉
    wx.startPullDownRefresh();
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('tag',"下拉触底")
    this.request({
      title:this.data.title,
      data:{
        start:0,
        count:10
      }
      });
    wx.stopPullDownRefresh();
  },
  /**
  * 页面上拉触底事件的处理函数(不用开启)
  */
  onReachBottom: function () {
    console.log("上拉刷新")
    this.request({
      title:this.data.title,
      data:{
         start:this.data.subjects.length,
         count:10
      }
    }),
    this.setData({
      loading_more: true,
    })
  },

  // 请求本页面数据
  request({title,data}){
    if (title == "豆瓣电影Top250") {
      this.setData({
        url: API.TOP250
      })
    } else if (title == "豆瓣电影北美票房榜") {
      this.setData({
        url: API.WEEKLY
      })
    } else if (title == "豆瓣电影本周口碑榜") {
      this.setData({
        url: API.USBOX
      })
    } 
    // console.log(this.data,"data");
    API.get({
      url: this.data.url,
      data,     
    }).then((res) => {
      console.log("数据请求",res)
      if (res.data.subjects) {
        let subjects = data.start ? [...this.data.subjects, ...res.data.subjects] : res.data.subjects;
        this.setData({
          subjects,
        })
      } else { 
        let subjects = data.start ? [...this.data.subjects, ...res.data.subjects.subject] : res.data.subjects.subject;
        this.setData({
          subjects,
        })
      }
     
      console.log("shuju",this.data.subjects)
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  

 

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})