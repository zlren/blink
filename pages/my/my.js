import { ClassicModel } from '../../models/classic.js';

import { BookModel } from '../../models/book.js';

const classModel = new ClassicModel();
const bookModel = new BookModel();

// pages/my/my.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.userAuthorized();
    this.getMyBookCount();
  },

  getUserInfo(event) {
    console.log(event);
  },

  getMyBookCount() {
    bookModel.getMyBookCount().then(res => {
      this.setData({
        bookCount: res.count
      });
    });
  },

  // 判断用户是否授权
  userAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              });
            }
          });
        }
      }
    });
  },

  onGetUserInfo(event) {
    // 点击弹窗的同意或者拒绝后，v-image组件就会把triggerevent传到这里
    let userInfo = event.detail.userInfo;
    // 只有点击了同意，userInfo才会有值
    if (userInfo) {
      this.setData({
        authorized: true,
        userInfo
      });
    }
  },

  onJumpToAbout(event) {
    wx.navigateTo({
      url: '/pages/about/about'
    });
  },

  onStudy: function(event) {
    wx.navigateTo({
      url: '/pages/course/course'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {}
});
