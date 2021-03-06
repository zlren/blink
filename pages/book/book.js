// pages/book/book.js

import { BookModel } from '../../models/book.js';
import { random } from '../../utils/common.js';

const bookModel = new BookModel();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,
    more: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const hostListPro = bookModel.getHotList();
    hostListPro.then(res => {
      this.setData({
        books: res
      });
    });
  },

  onSearching() {
    this.setData({ searching: true });
  },

  onCancel() {
    this.setData({ searching: false });
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
  onShareAppMessage() {},

  // page才有这个方法，通过传递properties属性的方式通知给search组件
  onReachBottom() {
    this.setData({
      more: random(16)
    });
  }
});
