import { request } from '../../utils/request/index.js'
Page({
  onShow: function () {
    this.tabBar()
  },
  tabBar() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  data:{
    search: '',
    ArticleList: [],
    cardCur: 0,
    type: [],
    swiperList: [{
      id: 0,
      type: 'image',
      url: '../../images/swiper/swiper1.jpg'
    }, {
      id: 1,
      type: 'image',
      url: '../../images/swiper/swiper2.jpg',
    }, {
      id: 2,
      type: 'image',
      url: '../../images/swiper/swiper3.jpg'
    }, {
      id: 3,
      type: 'image',
        url: '../../images/swiper/swiper4.jpg'
    }, {
      id: 4,
      type: 'image',
        url: '../../images/swiper/swiper5.jpg'
    }, {
      id: 5,
      type: 'image',
        url: '../../images/swiper/swiper6.jpg'
    }, {
      id: 6,
      type: 'image',
        url: '../../images/swiper/swiper7.jpg'
    }]
  },
  serch(e){
    let {value} = e.detail
    this.data.search = value
  },
  searchLike(){
    request({
      "url": `picture/article/like/`+this.data.search,
      method: 'get'
    },8120).then(res=>{
      this.setData({
        ArticleList: res.data.data.list
      })
    })
  },
  onLoad() {
    this.getArticle()
  },
  onShow(){
    this.getArticle()
  },
  getArticle() {
    let that = this
    request({
      url: '/picture/article/all',
      methods: 'get'
    }, 8120).then(res => {
      request({
        url: '/picture/article/alltype',
        methods: 'get'
      }, 8120).then(res => {
        that.setData({
          type: res.data.data.type
        })
      })
      that.setData({
        ArticleList: res.data.data.list,
      })
    })
    
  },
  godetail(e) {
    let id = e.currentTarget.dataset.articleid
    wx.navigateTo({
      url: `../index/detail/detail?articleid=${id}`,
    })
  },
})