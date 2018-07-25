const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    start:0,
    list : [],
    movieType: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 设置导航头标题
    wx.setNavigationBarTitle({
      title: options.name,
    });
    this.setData({
      movieType : options.type
    });
    this.requestData();
  },

  /**
   * 获取数据
   */
  requestData : function() {
    const that = this
    const url = "http://t.yushu.im/v2/movie/" + this.data.movieType
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: url,
      data : {
        start : this.data.start * 10,
        count : 10
      },
      method : 'GET',
      header : {
        'Content-Type' : 'application/json'
      },
      success : function(res) {
        // console.log(res)
        wx.hideLoading();
        that.setData({
          // list : res.data.subjects
          list: that.data.start === 0 ? (res.data.subjects ? res.data.subjects : []) : that.data.list.concat(res.data.subjects),
        })
      }
    })
  },
  /**
   * 显示电影详情页
   */
  goToMovieDetail : function(e){
    // console.log(e.currentTarget.dataset.index);
    const index = e.currentTarget.dataset.index
    let item = this.data.list[index]
    app.globalData.duanDetail = item;
    wx.navigateTo({
      url: '../movieDetail/movieDetail'
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
    console.log('加载更多')
    this.setData({
      page: 0
    })
    this.requestData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('最底下')
    this.setData({
      page: this.data.start++
    })
    this.requestData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})