import { request } from '../../utils/request/index.js'
Page({
  onShow: function () {
    this.tabBar()
  },
  tabBar() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },
  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },
  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  onShow(){
    this.getMyList()
    this.setData({
      name: wx.getStorageSync("userBaseInfo").userKickname
    })
  },
  onLoad(){
    this.getMyList()
    this.setData({
      name: wx.getStorageSync("userBaseInfo").userKickname
    })
  },
  data:{
    myList: [],
    name: '没有名字'
  },
  getMyList(){
    let USER_ID = wx.getStorageSync("userBaseInfo").userId
    request({
      "url": `/picture/article/byId/${USER_ID}`,
      method: 'post'
    }, 8120).then(res=>{
      console.log(res)
      this.setData({
        myList: res.data.data.list
      })
    })
  }, godetail(e) {
    let id = e.currentTarget.dataset.articleid
    wx.navigateTo({
      url: `../index/detail/detail?articleid=${id}`,
    })
  }, delete(e){
    let id = e.currentTarget.dataset.articleid
    request({
      "url": `/picture/article/delete/${id}`,
      method: 'post'
    }, 8120).then(res => {
      this.getMyList()
      return wx.showToast({
        title: res.data.message,
        duration: 2000
      })
    })
  }
})
