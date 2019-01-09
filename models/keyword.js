import { HTTP } from '../utils/http-p.js';
class KeywordModel extends HTTP {
  key = 'q';

  getHistory() {
    const words = wx.getStorageSync(this.key);
    if (!words) {
      return [];
    }
    return words;
  }

  getHot() {
    return this.request({
      url: 'book/hot_keyword'
    });
  }

  addToHistory(keyword) {
    let words = this.getHistory();
    // 如果本地缓存已经存在，那么应该把它提到第一个位置
    // 否则直接放在第一个位置
    if (words.includes(keyword)) {
      words = words.filter(item => {
        return item != keyword;
      });
    }
    words.unshift(keyword);
    wx.setStorageSync(this.key, words.slice(0, 5));
  }
}

export { KeywordModel };
