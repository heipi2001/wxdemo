// pages/index/detail/detail.js
import { request } from '../../../utils/request/index.js'
Page({
  onLoad: function (options){
    this.data.commentInfo.articleId = options.articleid
    let userid = wx.getStorageSync("userBaseInfo").userId
    this.data.deleteInfo.userId = userid
    this.setData({
      userid: userid
    })
    request({
      "url": `/picture/article/by/${options.articleid}`,
      method: 'post'
    }, 8120).then(res => {
      let data = res.data.data.data
      this.setData({
        data: data
      })
      this.getComment(data)
    })
  },
  data:{
    data:{},
    userid: '',
    commentList: [],
    deleteInfo: {
      commentId: '',
      userId: ''
    },commentInfo: {
      articleId: '',
      userId: '',
      commentMessage: '',
      userHeadimg: '',
      userKickname: '',
    }
  },
  getComment(data){
    const that = this
    request({
      "url": `/picture/comment/get/${data.articleId}`
    }, 8130).then(res => {
      console.log(res)
      that.setData({
        commentList: res.data.data.comments
      })
    })
  },
  deleComment(e){
    this.data.deleteInfo.commentId = e.currentTarget.dataset.commentid
    request({
      'url': "/picture/comment/deleteOne",
      data: this.data.deleteInfo,
      method: 'post'
    }, 8130).then(res=>{
      console.log(res)
      this.getComment(this.data.data)
      return wx.showToast({
        title: '删除成功！',
      })
    })
  },
  comment(){
    const user = wx.getStorageSync("userBaseInfo")
    this.data.commentInfo.userId = user.userId
    this.data.commentInfo.userHeadimg = user.userHeadimg
    this.data.commentInfo.userKickname = user.userKickname
    request({
      "url": '/picture/comment/save',
      method: "POST",
      data: this.data.commentInfo
    }, 8130).then(res=>{
      this.getComment(this.data.data)
      return wx.showToast({
        title: '发布成功！',
      })
    })
  },
  message(e){
    this.data.commentInfo.commentMessage = e.detail.value
  }
})
