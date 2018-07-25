//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list: [],
    maxtime: '',
    loadingHidden: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.requestData("newlist");
  },
  /**
   * 上拉刷新
   */
  bindscrolltoupper: function () {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    // this.setData({
    //   loadingHidden: false,
    // })
    // setTimeout(()=>{
    //   this.requestData('newlist');
    // },3000);

    
    //加载最新
    this.requestData('newlist');
  },

  /**
   * 加载更多
   */
  bindscrolltolower: function () {
    console.log('到底部')
    //加载更多
    this.requestData('list');
  },
  /**
   * 请求数据
   */
  requestData: function (a) {
    var that = this;
    console.log(that.data.maxtime)
    wx.request({
      url: 'http://api.budejie.com/api/api_open.php',
      data: {
        a: a,
        c: 'data',
        maxtime: a == 'newlist' ? "" : that.data.maxtime,
        type: '29',
      },
      method: 'GET',
      success: function (res) {
        // console.log('上一页', that.data.list)
        wx.hideLoading();
        that.setData({
          // 拼接数组
          list: a == 'newlist' ? res.data.list : that.data.list.concat(res.data.list),
          // loadingHidden: true,
          maxtime: res.data.info.maxtime
        })

      }
    })
  },
  showDetail : function(e){
    var that = this;
    app.globalData.duanDetail = that.data.list[e.currentTarget.dataset.index];
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + app.globalData.duanDetail.id
    })
  },
  onPullDownRefresh:(e)=>{
    console.log('下拉刷新')
    console.log(e)
    setTimeout(()=>{
      wx.stopPullDownRefresh()
    },3000)
  },
  onReachBottom:(event)=>{
    console.log(event)
    console.log('上啦')
  },
  onShareAppMessage: function () {
    // return custom share data when user share.
    console.log('分享')
    return {title:"fuck ma hua teng"}
  },
  showMess : ()=>{
    // wx.showToast({
    //   title: '成功',
    //   icon: 'success',
    //   duration: 2000,
    //   mask : false
    // })


    // wx.showModal({
    //   title: '提示',
    //   content: '这是一个模态弹窗',
    //   cancelText : '不要',
    //   cancelColor : '#f00',
    //   success: function (res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })


    // wx.showActionSheet({
    //   itemList: ['A', 'B', 'C'],
    //   success: function (res) {
    //     console.log(res.tapIndex)
    //   },
    //   fail: function (res) {
    //     console.log(res.errMsg)
    //   }
    // })


    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.startRecord()
            }
          })
        }
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
