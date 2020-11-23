// custom-tab-bar/index.js
Component({
  data:{
    // 高亮
    selected: 0,
    tabList: [
      {
        "pagePath": "pages/index/index",
        "text": "index"
      },
      {
        "pagePath": "pages/find/find",
        "text": "find"
      }, {
        "pagePath": "pages/friend/friend",
        "text": "friend"
      },
      {
        "pagePath": "pages/my/my",
        "text": "my"
      },
      {
        "pagePath": "pages/release/release",
        "text": "release"
      }
    ]
  },methods:{
    // 底部切换
    switchTab(e){
      let key = Number(e.currentTarget.dataset.index)
      let tabList = this.data.tabList
      let selected = this.data.selected

      if(selected !== key){
        this.setData({
          selected: key
        })
      wx.switchTab({
        url: `/${tabList[key].pagePath}`
      })
      }
    }
  }
})
