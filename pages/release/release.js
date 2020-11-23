import { request } from '../../utils/request/index.js'
import { FileUpLoad } from '../../utils/upLoad/upload.js'
Page({
  onShow: function () {
    this.tabBar()
  },
  tabBar() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 4
      })
    }
  },
  data:{
    index: null,
    picker: [],
    pickerObject:[],
    articleInfo: {
      imageType: 1,
      imageId: '',
      userId: '',
      userKickname: '',
      userHeadimg: ''
    },
    pictureInfo: {
      type: 1
    }
  },
  // ----------
  textareaBInput(e){
    let { value } = e.detail 
    this.data.articleInfo.articleMessage = value
  },
  textareaBInputTitle(e) {
    let { value } = e.detail
    this.data.articleInfo.articleTitle = value
  },
  PickerChange(e) {
    let value =  e.detail.value
    this.data.pictureInfo.type =  parseInt(value) + 1 
    this.data.articleInfo.imageType = parseInt(value) + 1 
    this.setData({
      index: e.detail.value
    })
  },
  // ----------
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  ChooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        var that = this
        this.setData({
          imgList: res.tempFilePaths
        })
        // wx.uploadFile({
        //   url: 'http://127.0.0.1:3000/updata', //仅为示例，非真实的接口地址
        //   filePath: res.tempFilePaths[0],
        //   name: 'file',
        //   header: {
        //     "Content-Type": "multipart/form-data",
        //   },
        //   success: function (res) {
        //     let imgdata = JSON.parse(res.data)
        //     that.data.articleInfo.imageUrl = imgdata.filename
        //     that.data.pictureInfo.imageUrl = imgdata.filename
        //     return wx.showToast({
        //       title: '图片上传成功',
        //     })
        //   }
        // })
        FileUpLoad(res.tempFilePaths[0]).then(res => {
          let imgdata = JSON.parse(res.data)
            that.data.articleInfo.imageUrl = imgdata.filename
            that.data.pictureInfo.imageUrl = imgdata.filename
            return wx.showToast({
              title: '图片上传成功',
            })
        })

      }
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除图片吗？',
      cancelText: '再看看',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  onLoad(){
    this.getArticle()
  },
  getArticle() {
    let that = this
    request({
      url: '/picture/article/alltype',
      methods: 'get'
    }, 8120).then(res => {
      const that = this
      let typeObject = res.data.data.type
      let temporaryObject = []
      for (let item in typeObject){
        temporaryObject.push(typeObject[item].typeName)
      }
      that.setData({
        picker: typeObject,
        pickerObject: temporaryObject
      })
    })
  },


  release(){
    let that = this
    let user = wx.getStorageSync("userBaseInfo")
    this.data.articleInfo.userHeadimg = user.userHeadimg
    this.data.articleInfo.userId = user.userId
    this.data.articleInfo.userKickname = user.userKickname
    this.data.pictureInfo.userId = user.userId
    request({
      url: "/picture/image/save",
      data: this.data.pictureInfo,
      method: 'post'
    }, 8120).then(res=>{
      let data = res.data.data.data
      that.data.articleInfo.imageId = data.imageId
      that.data.articleInfo.userId = data.userId
      request({
        url: '/picture/article/add',
        data: that.data.articleInfo,
        method: 'post'
      }, 8120).then(res=>{
        wx.switchTab({
          url: '../index/index',
        })
        return wx.showToast({
          title: '发布成功',
        })
      })
    })
  }
})
