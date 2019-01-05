import { HTTP } from '../utils/http.js';
import { LikeModel } from './like.js';

class ClassicModel extends HTTP {
  // 获取最新期刊
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: res => {
        sCallback(res);
        this._setLatestIndex(res.index);
      }
    });
  }

  // 将最新的index写入小程序缓存
  // sync是同步写入，一般小数据量用同步就好了，只有较为特殊的需求才会使用异步
  _setLatestIndex(index) {
    wx.setStorageSync('latestIndex', index);
  }

  _getLatestIndex() {
    return wx.getStorageSync('latestIndex');
  }

  _getKey(index) {
    return 'classic_' + index;
  }

  getClassic(index, nextOrPrevious, sCallback) {
    let key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1);
    let classic = wx.getStorageSync(key);
    if (!classic) {
      this.request({
        // 拼出这个 url
        url: `classic/${index}/${nextOrPrevious}`,
        success: res => {
          wx.setStorageSync(this._getKey(res.index), res);
          sCallback(res);
        }
      });
    } else {
      sCallback(classic);
    }
  }

  // 是否是最旧的一期
  isFirst(index) {
    return index == 1 ? true : false;
  }

  // 是否是最新的一期
  isLatest(index) {
    return index == this._getLatestIndex() ? true : false;
  }
}

export { ClassicModel };
