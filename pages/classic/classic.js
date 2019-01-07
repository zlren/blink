// pages/classic/classic.js
import { ClassicModel } from '../../models/classic';
import { LikeModel } from '../../models/like';

// ClassicModel 是一个类，不能直接调用其方法，需要先实例化
let classicModel = new ClassicModel();
let likeModel = new LikeModel();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    classicData: null,
    latest: true, // 默认情况下是最新的期刊，latest 为 true
    first: false, // 不是最老的期刊，first 为 false
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    classicModel.getLatest(res => {
      // 到这里从后端接口那里拿到了数据
      // Page 中的 setData，set 完成后可以在 wxml 中获取（从而传递给组件）
      this.setData({
        classicData: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      });
    });
  },

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

  /**
   * 捕捉点赞组件事件
   */
  onLike(event) {
    let behavior = event.detail.behavior;
    likeModel.like(behavior, this.data.classicData.id, this.data.classicData.type);
  },

  _updateClassic(nextOrPrevious) {
    const index = this.data.classicData.index;
    classicModel.getClassic(index, nextOrPrevious, res => {
      this._getLikeStatus(res.id, res.type);
      this.setData({
        classicData: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      });
    });
  },

  _getLikeStatus(artId, category) {
    likeModel.getClassicLikeStatus(artId, category, res => {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      });
    });
  },

  /**
   * 获取较旧一期
   * @param {*} event
   */
  onPrevious(event) {
    this._updateClassic('previous');
  },

  // 获取较新一期
  onNext(event) {
    this._updateClassic('next');
  }
});
