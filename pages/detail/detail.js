const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    duanDetail : {},
    page : 0,
    duanID : 0,
    commentList : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('详情页进入');
    this.requestCommonData(options.id);
    this.setData({
      duanDetail : app.globalData.duanDetail,
      duanID : options.id,
    })
  },

  /**
   * 下拉刷新
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

    this.setData({
      page: 0
    })
    //加载最新
    this.requestCommonData();
  },

  /**
   * 加载更多
   */
  bindscrolltolower: function () {
    console.log('到底部')
    this.setData({
      page : this.data.page++
    })
    //加载更多
    this.requestCommonData();
  },

  requestCommonData : function(id){
    var that = this;
    wx.request({
      url: 'http://api.budejie.com/api/api_open.php',
      data: {
        a: 'dataList',
        c: 'comment',
        data_id : id ? id : this.data.duanID
      },
      method: 'GET',
      success: function (res) {
        wx.hideLoading();
        that.setData({
          // 拼接数组
          commentList: that.data.page === 0 ? (res.data.data ? res.data.data : []) : that.data.commentList.concat(res.data.data),
        })

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})