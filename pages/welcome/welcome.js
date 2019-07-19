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
    
  },

  onTap: function(){
    // wx.navigateTo({
    //   url: '../posts/posts',
    // })
    wx.redirectTo({
      url: '../posts/posts',
    })


    console.log('tap')
  }
  
})