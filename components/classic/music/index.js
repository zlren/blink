// components/classic/music/index.js
import { classicBeh } from '../classic-beh.js';

const musicManager = wx.getBackgroundAudioManager();

Component({
  behaviors: [classicBeh],
  /**
   * 组件的属性列表
   */
  properties: {
    // 音乐的音频地址
    src: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },

  attached: function() {
    this._recoverStatus();
  },

  detached: function(event) {
    console.log('页面消失');
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function() {
      if (!this.data.playing) {
        console.log('播放');
        this.setData({
          playing: true
        });
        musicManager.title = 'test';
        // 给音乐赋值直接播放
        musicManager.src = this.properties.src;
      } else {
        console.log('暂停');
        this.setData({
          playing: false
        });
        musicManager.pause();
      }
    },
    _recoverStatus: function() {
      if (musicManager.paused) {
        this.setData({
          playing: false
        });
      } else if (musicManager.src == this.properties.src) {
        this.setData({
          playing: true
        });
      }
    }
  }
});
