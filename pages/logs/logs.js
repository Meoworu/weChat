//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  onReady:()=>{
    wx.setNavigationBarTitle({
      title: '新设置的',
    })
  },
  onReachBottom: (e) => {
    console.log(e)
    console.log('上啦')
  },
})
