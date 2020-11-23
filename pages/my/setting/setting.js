// pages/my/setting/setting.js
import { request } from '../../../utils/request/index.js'
const app = getApp()
Page({
  onLoad(){
    let user = wx.getStorageSync("userBaseInfo")
    this.setData({
      pageUserInfoData: user,
    })
    for(let e in user){
      if (user[e] !== null) {
        this.data.userInfo[e] = user[e]
      }
    }
  },
  data:{
    userInfo: {},
    pageUserInfoData: {}
  },
  // ----data-----
  textareaBInput(e){
    let { value } = e.detail 
    this.data.userInfo.userMessage = value
  },
  // ------------- 

  // -----image----
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
        wx.uploadFile({
          url: 'http://127.0.0.1:3000/updata', //仅为示例，非真实的接口地址
          filePath: res.tempFilePaths[0],
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data",
          },
          success: function (res) {
            let imgdata = JSON.parse(res.data)
            that.data.userInfo.userBackground = imgdata.filename
            return wx.showToast({
              title: '图片上传成功',
            })
          }
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
  // --------------

  // request
  changeUserInfo(){
    request({
      url: 'picture/user/update',
      method: 'post',
      data: this.data.userInfo,
    }, 8110).then(res => {
      console.log(res)
      if (res.data.code != 20000) {
        return wx.showToast({
          title: '资料更新失败',
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
          title: '修改成功!',
          duration: 2000
        })
        return wx.switchTab({
          url: '../my',
        })
      }
    })  
  }
  //
})