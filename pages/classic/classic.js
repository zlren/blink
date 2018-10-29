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
    first: false // 不是最老的期刊，first 为 false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    classicModel.getLatest(res => {
      // 到这里从后端接口那里拿到了数据
      // Page 中的 setData，set 完成后可以在 wxml 中获取（从而传递给组件）
      this.setData({
        classicData: res
      });
    });
  },

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
  onShareAppMessage: function() {},

  /**
   * 捕捉点赞组件事件
   */
  onLike: function(event) {
    let behavior = event.detail.behavior;
    likeModel.like(behavior, this.data.classicData.id, this.data.classicData.type);
  },

  onNext: function(event) {
    console.log('获取较新一期');
  },

  onPrevious: function(event) {
    console.log('获取较旧一期');
  }
});
