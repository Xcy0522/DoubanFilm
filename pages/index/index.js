const API = require("../../utils/api")
const stringUtil = require("../../utils/stringUtils.js")
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    subjects: [],
    threeBlockInfo:{
      TOP250: {},  // 高分电影
      WEEKLY: {},   // 本周排行榜
      USBOX: {}   // 北美票房榜
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.request({
      start:0,
      count:20
    });
  },
  request(data){
    // 调用封装,请求TOP250
    API.get({
      url: API.TOP250,
      data,
    })
    .then((res) => {
      // stringUtil.processTitle(res.subjects, 8);
      this.data.threeBlockInfo.TOP250 = res.data
      this.setData({
        threeBlockInfo: this.data.threeBlockInfo,
      })
    })
    // 调用封装,请求本周电影排行榜
    API.get({
      url: API.WEEKLY,
      data,
    })
      .then((res) => {
        // stringUtil.processTitle(res.subjects.subject, 8);
        this.data.threeBlockInfo.WEEKLY = res.data
        this.setData({
          threeBlockInfo: this.data.threeBlockInfo,
        })
      })
    // 调用封装,请求北美票房榜
    API.get({
      url: API.USBOX,
      data,
    })
      .then((res) => {
        this.data.threeBlockInfo.USBOX = res.data
        this.setData({
          threeBlockInfo: this.data.threeBlockInfo,
        })
      })

    console.log(this.data.threeBlockInfo);
  }



})
