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
    src: String,
    musicTitle: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },

  attached() {
    this._recoverStatus();
    this._monitorSwitch();
  },

  detached(event) {
    console.log('页面消失');
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay() {
      if (!this.data.playing) {
        console.log('播放');
        this.setData({
          playing: true
        });
        musicManager.title = this.properties.musicTitle;
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

    // 监测当前播放的音乐是不是这个卡片的音乐
    // 设置初始图标
    _recoverStatus() {
      if (musicManager.paused) {
        this.setData({
          playing: false
        });
      } else if (musicManager.src == this.properties.src) {
        this.setData({
          playing: true
        });
      }
    },

    _monitorSwitch() {
      musicManager.onPlay(() => {
        this._recoverStatus();
      });
      musicManager.onPause(() => {
        this._recoverStatus();
      });
      musicManager.onStop(() => {
        this._recoverStatus();
      });
      musicManager.onEnded(() => {
        this._recoverStatus();
      });
    }
  }
});
