// pages/book-detail/book-detail.js
import { BookModel } from '../../models/book.js';
const bookModel = new BookModel();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 在这里取参数
    const bid = options.bid;

    const detailPro = bookModel.getDetail(bid);
    const commentsPro = bookModel.getComment(bid);
    const likeStatusPro = bookModel.getLikeStatus(bid);

    detailPro.then(res => {
      this.setData({
        book: res
      });
    });

    commentsPro.then(res => {
      this.setData({
        comments: res.comments
      });
    });

    likeStatusPro.then(res => {
      this.setData({
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
