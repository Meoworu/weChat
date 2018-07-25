// Douban API 操作
const douban = require('../../libraries/douban.js')

Page({
  data: {
    movies: [],
    loading: true
  },

  onLoad () {
    douban.find('in_theaters', 1, 3)
      .then(d => this.setData({ movies: d.subjects, loading: false }))
      .catch(e => {
        console.error(e)
        this.setData({ movies: [], loading: false })
      })
  },

  start : function () {
    console.log('kaishi')
    wx.reLaunch({
      url: '../index/index',
    })
  }
})
