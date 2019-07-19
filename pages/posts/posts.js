// pages/posts/posts.js
var postData = require('../../data/post-data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  process:function(){
    var date = 'Nov 18 2019'

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
    this.setData({
      posts_content: postData.postList
    })

    console.log('onLoad')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onPostTap: function(event){
    var postId = event.currentTarget.dataset.postid
    console.log(postId)
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId,
    })
  }


 
})