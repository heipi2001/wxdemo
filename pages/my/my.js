const app = getApp()
Page({
  onShow: function () {
    this.tabBar()
  },
  tabBar() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
  },
  data:{
    bgUrl: "https://s1.ax1x.com/2020/10/18/0j2Inx.jpg",
    headImg: "https://s1.ax1x.com/2020/05/12/YtpsfJ.jpg",
    follow: 0,
    like: 0,
    view: 0,
    name: '',
    title: '登录更精彩哦'
  },onShow(){
    this.getArticle()
  }
  ,onLoad: function(){
    let user = wx.getStorageSync("userBaseInfo")
    if (user!=''){
      this.setData({
        bgUrl: user.userBackground,
        name: user.userEmail,
        title: user.userMessage
      })
    } else{
      this.setData({
        bgUrl: "https://s1.ax1x.com/2020/10/18/0j2Inx.jpg",
        name: "",
        title: "登录更精彩哦"
      })
    }
    // this.setData({
    //   bgUrl: app.globalData.userBaseInfo.user_background,
    //   view: app.globalData.userBaseInfo.user_view
    // })
    let i = 0
    let that = this
    num()
    // 函数
    function num() {
      if (i < 20) {
        setTimeout(function () {
          that.setData({
            follow: i,
            like: i,
            view: i
          })
          i++;
          num();
        }, 20)
      } else {
        if (wx.getStorageSync("userBaseInfo").userView === undefined)
        {
          that.setData({
            view: 0,
            like: 0,
            follow: 0
          })
        } else {
          that.setData({
            view: wx.getStorageSync("userBaseInfo").userView,
            like: 0,
            follow: 0
          })
        }
        
        
        // 在缓存里拿
        // let mydata = wx.getStorageSync("data")
        // // 缓存未找到
        // if (!mydata) {
        //   that.setData({
        //     view: 0,
        //     like: 0,
        //     follow: 0
        //   })
        // } else {
        //   // 缓存存在就拿出来
        //   that.setData({
        //     view: that.coutNum(mydata.view),
        //     like: that.coutNum(mydata.like),
        //     follow: that.coutNum(mydata.follow)
        //   })
        // }
      }
    }
  },
  onShow(){
    this.onLoad()
  },
  getuser() {
    let user = wx.getStorageSync("userBaseInfo")
    if (user!='') {
      wx.navigateTo({
        url: './setting/setting',
      })
    } else {
      wx.navigateTo({
        url: './login/login',
      })
    }
  }, goSetting(){
    let user = wx.getStorageSync("userBaseInfo")
    if (user != '') {
      wx.navigateTo({
        url: './setting/setting',
      })
    } else {
      wx.navigateTo({
        url: './login/login',
      })
    }
  }, goAbout() {
    wx.navigateTo({
      url: './about/about',
    })
  },
  outLogin(){
    wx.clearStorageSync()
    this.onLoad()
  }

})
