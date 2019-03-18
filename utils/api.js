// 基础地址
const BASEURL = "https://douban.uieee.com";


// 请求TOP250高分电影, 方式: GET, 参数: start: 0, count: 10
const TOP250 = BASEURL + "/v2/movie/top250";
// 正在热映
const NOWPLAY = BASEURL +  "/v2/movie/nowplaying";
// 电影本周排行榜  方式: GET, 参数: start: 0, count: 10
const WEEKLY = BASEURL + "/v2/movie/weekly";
// 北美票房榜
const USBOX = BASEURL + "/v2/movie/us_box"  

// 封装请求

const get = ({url,data}) => {
  // 使用ES6  new Promise 实例对象, 已得到成功的函数地址,以及失败的函数地址,并返回
  return new Promise ((resolve,reject) => {
    wx.showLoading({
      title: '加载中',
      mask: true
    }),
    // 配合异步请求
    wx.request({
      url,
      data,
      header: {
        'content-type': 'json' // 默认值
      },
      // 成功
      success: (res) => {
        console.log("成功")
        resolve(res);
      },
      // 失败
      fail(err){
        console.log("失败")
        reject(err)
      },
      // 成功失败都会走
      complete(){
        // console.log("请求成功,失败都会走")
        wx.hideLoading();
      }
    })
  })
}

// 导出
module.exports = {
  BASEURL,
  TOP250,
  NOWPLAY,
  WEEKLY,
  USBOX,
  get,
}