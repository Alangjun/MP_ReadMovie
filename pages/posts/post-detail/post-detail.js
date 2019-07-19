var postsData = require('../../../data/post-data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    var postData = postsData.postList[postId];
    this.setData({
      postData: postData
    })
    wx.setStorageSync('key1', {
      test: '123'
    })
  
   
  },
  onCollectionTap: function (event) {
    console.log(wx.getStorageSync('key1'))
  },
  onShareTap(){
    wx.removeStorageSync('key1')
  },

 
})