var app = getApp();
var header = app.globalData.header;
var api = app.globalData.api;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      { 
        "ad_id": 1,
         "img_url": "https://m.hsfuture.cn/wangwang/public/static/images/1.jpg", 
         "link": "../myCoin/myCoin" 
       },
       { 
         "ad_id": 2,
          "img_url": "https://m.hsfuture.cn/wangwang/public/static/images/2.jpg", 
          "link": "../temperatureDetection/temperatureDetection" 
       }
      ],
    autoplay: true,
    interval: 5000,
    duration: 1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkToken()

    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    
    
    
  },
  checkToken:function(){
    if (wx.getStorageSync('token')) {
       this.getBanner()
    } else {
      wx.showModal({
        title: '提示',
        content: '请先授权登陆后在操作',
        showCancel:false,
        success: function (res) {         
            wx.navigateTo({
              url: '../login/login'
            })         
        }
      })      
    }
  },
  getBanner:function(){
    var _this=this;
    try {
      wx.showLoading()
    }
    catch (err) {
      console.log("当前微信版本不支持")
    }
    wx.request({
      url: api + "Advert/getAll",
      method: 'GET',
      header: header,
      data: { session_3rd: wx.getStorageSync('token')},
      success: function (res) {
        try { wx.hideLoading() } catch (err) { console.log("当前微信版本不支持") }
        if (res.data.code == 200) {
          if (res.data.data.length>0){
            _this.setData({
              imgUrls: res.data.data
            })

          }

        } else if (res.data.code == 401) {
          wx.clearStorageSync()
          wx.showModal({
            title: '提示',
            content: '登录过期了，请重新登录！',
            showCancel: false,
            success: function (res) {
              wx.redirectTo({
                url: '../login/login'
              })
            }
          })

        }  else {
          wx.showToast({
            title: res.data.msg,
            icon: 'fail',
            duration: 2000
          })

        }
      },
      fail: function () {
        try { wx.hideLoading() } catch (err) { console.log("当前微信版本不支持") }
        wx.showToast({
          title: '接口调用失败！',
          icon: 'fail',
          duration: 2000
        })
      }
    })
    

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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  goLink:function(e){
    var link=e.currentTarget.dataset.link;
    wx.navigateTo({
      url: link
    })
  }
})