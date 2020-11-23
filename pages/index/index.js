//index.js
import { request } from '../../utils/request/index.js'
Page({
  onShow:function(){
    this.tabBar()
  },
  tabBar() {
    if(typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  data:{
    ArticleList:[],
    type: []
  },
  onLoad(){
    this.getArticle()
  },
  getArticle() {
    let that = this
    request({
      url: '/picture/article/all',
      methods: 'get'
    }, 8120).then(res => {
      wx.stopPullDownRefresh()
      that.setData({
        ArticleList: res.data.data.list,
        type: res.data.data.type
      })
    })
  },
  godetail(e){
    let id = e.currentTarget.dataset.articleid
    wx.navigateTo({
      url: `./detail/detail?articleid=${id}`,
    })
  },
  onPullDownRefresh() {
    console.log(1)
    this.getArticle()
  }, 
})
