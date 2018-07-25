Page({

  /**
   * 页面的初始数据
   */
  data: {
    indecatorDots : true,
    autoplay : true,
    interval : 3000,
    duration : 1000,
    imgUrls : [
      "http://pic.58pic.com/58pic/14/13/42/61F58PICmRS_1024.jpg",
      "http://img.zcool.cn/community/01711b59426ca1a8012193a31e5398.gif",
      "http://img3.imgtn.bdimg.com/it/u=1766390445,1488273756&fm=27&gp=0.jpg"
    ],
    contents : [
      {
        name : '正在热映',
        movieType: 'in_theaters'
      },
      {
        name: '即将上映',
        movieType: 'coming_soon'
      },
      {
        name: 'Top250',
        movieType: 'top250'
      }
      // {
      //   name: '北美票房榜',
      //   movieType: 'us_box'
      // },
      
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    console.log('下拉加载更多')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('上啦触底')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  go2detail : function (e) {
    console.log(e.currentTarget.dataset.index);
    // 根据点击的条目序号跳转到详情页，并且传入类别名称
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../item/item?type=' + this.data.contents[index].movieType + '&name=' + this.data.contents[index].name
    })
  }
})