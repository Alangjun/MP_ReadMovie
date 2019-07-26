// pages/posts/posts.js
var postData = require('../../data/post-data.js')

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

    this.setData({
      posts_content: postData.postList
    })

    console.log(this.data.posts_content)
  },
  onShow(){
   
    let readingNumObj = wx.getStorageSync('readingNumObj')
    for (let index in postData.postList){
      if (!readingNumObj[index]){
        postData.postList[index]['readingNum'] = 0
      } else {
        postData.postList[index]['readingNum'] = readingNumObj[index]
      }
    }
    this.setData({
      posts_content: postData.postList
    })
 
  },

  
  onPostTap: function(event){
    var postId = event.currentTarget.dataset.postid
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId,
    })
  },
  onSwiperTap: function(event){
    var postId = event.target.dataset.postid
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
    console.log(event)
  }



 
})