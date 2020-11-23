// pages/my/login/login.js
import { request } from '../../../utils/request/index.js'
import { FileUpLoad } from '../../../utils/upLoad/upload.js'
const app = getApp()
Page({
  onLoad:function(){
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    this.data.registerInfo.userHeadimg = e.detail.userInfo.avatarUrl
    this.data.registerInfo.userKickname = e.detail.userInfo.nickName
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  data: {
    userInfo: {},
    imgList: '',
    loginInfo:{
      userEmail: '',
      userPassword: ''
    },
    registerInfo:{
      userKickname:'',
      userPassword:'',
      userEmail:'',
      userMessage:'',
      userBackground:'',
      userHeadimg: ''
    },
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isregister: false
  },

  // ----data----
  getEmail(e){
    let { value } = e.detail 
    if (this.data.isregister){
      this.data.registerInfo.userEmail = value
    } else {
      this.data.loginInfo.userEmail = value
    }
  },
  getPassword(e){
    let { value } = e.detail 
    if (this.data.isregister) {
      this.data.registerInfo.userPassword = value
    } else {
      this.data.loginInfo.userPassword = value
    }
  },
  textareaBInput(e){
    let { value } = e.detail 
    if (this.data.isregister) {
      this.data.registerInfo.userMessage = value
    } else {
      return
    }
  },
  // ------------
  // ---登录注册---
  register(){
    if (!this.data.isregister){
      this.setData({
        isregister: true
      })
    } else {
      request({
        url: 'picture/user/register',
        method: 'post',
        data: this.data.registerInfo,
      }, 8110).then(res=>{
        if(res.data.code != 20000){
          return wx.showToast({
            title: '注册失败!',
            icon: 'none',
            duration: 2000,
            mask: true,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        } else {
          wx.showToast({
            title: '注册成功!',
          })
          return wx.switchTab({
            url: '../my',
          })
        }
      })
    }
  },login(){
    if (this.data.isregister) {
      this.setData({
        isregister: false
      })
    } else {
      request({
        url: 'picture/user/login',
        method: 'post',
        data: this.data.loginInfo,
      }, 8110).then(res => {
        if (res.data.code != 20000) {
          return wx.showToast({
            title: '账号密码错误',
            icon: 'none',
            duration: 2000,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        } else {
          wx.setStorageSync("userBaseInfo", res.data.data.user)
          wx.showToast({
            title: '登录成功!',
            duration: 2000
          })
          return wx.switchTab({
            url: '../my',
          })
        }
      })
    }
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
        //     that.data.registerInfo.userBackground = imgdata.filename
        //     return wx.showToast({
        //       title: '图片上传成功',
        //     })
        //   }
        // })
        FileUpLoad(res.tempFilePaths[0]).then(res=>{
          let imgdata = JSON.parse(res.data)
            that.data.registerInfo.userBackground = imgdata.filename
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
})