// pages/book-detail/book-detail.js
import { BookModel } from '../../models/book.js';
import { LikeModel } from '../../models/like.js';
const bookModel = new BookModel();
const likeMoldel = new LikeModel();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading();

    // 在这里取参数
    const bid = options.bid;

    const detailPro = bookModel.getDetail(bid);
    const commentsPro = bookModel.getComment(bid);
    const likeStatusPro = bookModel.getLikeStatus(bid);

    Promise.all([detailPro, commentsPro, likeStatusPro]).then(res => {
      this.setData({
        book: res[0],
        comments: res[1].comments,
        likeStatus: res[2].like_status,
        likeCount: res[2].fav_nums
      });

      wx.hideLoading();
    });
  },

  onLike(event) {
    // trigger发出的事件
    const like_or_cancel = event.detail.behavior;
    likeMoldel.like(like_or_cancel, this.data.book.id, 400);
  },

  onFakePost(event) {
    this.setData({
      posting: true
    });
  },

  onCancel(event) {
    this.setData({
      posting: false
    });
  },

  onPost(event) {
    // 直接点击标签 手动输入
    const comment = event.detail.text || event.detail.value;

    if (!comment) {
      return;
    }

    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多 12 个字',
        icon: 'none'
      });
      return;
    }

    bookModel.postComment(this.data.book.id, comment).then(res => {
      wx.showToast({
        title: '+ 1',
        icon: 'none'
      });

      this.data.comments.unshift({
        content: comment,
        nums: 1
      });

      this.setData({
        comments: this.data.comments,
        posting: false
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
