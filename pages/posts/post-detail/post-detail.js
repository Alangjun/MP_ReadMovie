var postsData = require('../../../data/post-data.js')
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPostId: '',
    collected: false,
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var globalData = app.globalData
    console.log(globalData)
    this.addReadingNum(options.id)

    var postId = options.id;
    var postData = postsData.postList[postId];
    this.setData({
      postData: postData,
      currentPostId: postId
    })

    var postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected){
      var collected = postsCollected[postId]
      this.setData({
        collected: collected
      })
    } else{
      postsCollected = {}
      postsCollected[postId] = false
      wx.setStorageSync('posts_collected', postsCollected)
    }

  
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId == postId){

      this.setData({
        isPlayingMusic: true
      })
    }
    this.setMusicMonitor()

  },

  //自定义方法
  addReadingNum: function(postId){
    let readingNumObj = wx.getStorageSync('readingNumObj')
    console.log(readingNumObj)
    if (!readingNumObj[postId]) {
      console.log('不存在')
      readingNumObj[postId] = 1
    } else {
      readingNumObj[postId] += 1
    }
    wx.setStorageSync('readingNumObj', readingNumObj)
  },
  setMusicMonitor: function(){
    wx.onBackgroundAudioPlay(() => { // 监听音乐播放器播放事件
      this.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true
      app.globalData.g_currentMusicPostId = this.data.currentPostId
    })
    wx.onBackgroundAudioPause(() => {
      this.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false
      app.globalData.g_currentMusicPostId = null
    })
  },

  onCollectionTap: function (event) {
    var postsCollected = wx.getStorageSync('posts_collected')
    var postCollected = postsCollected[this.data.currentPostId]
    postCollected = !postCollected
    postsCollected[this.data.currentPostId] = postCollected
    wx.setStorageSync('posts_collected', postsCollected)
    this.setData({
      collected: postCollected
    })

    wx.showToast({
      title: postCollected?'收藏成功':'取消成功',
      icon: 'success',
      duration: 1000
    })

  },
  onShareTap(){
    wx.showActionSheet({
      itemList: ['分享给微信好友', '分享到朋友圈', '分享到微博'],
      itemColor: '#405f80',
      success(res) {
        console.log(res)
        console.log(res.tapIndex)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })


  },
  onMusicTap: function(){
    var isPlayingMusic = this.data.isPlayingMusic
    var currenPostId = this.data.currentPostId
    var postData = postsData.postList
    if (isPlayingMusic){
      wx.pauseBackgroundAudio()
      this.setData({
        isPlayingMusic: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: postData[currenPostId].music.url,
        title: postData[currenPostId].music.title,
        coverImgUrl: postData[currenPostId].music.coverImg
      })
      this.setData({
        isPlayingMusic: true
      })
    }
   
    

  }


 
})