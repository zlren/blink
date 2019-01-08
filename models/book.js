import { HTTP } from '../utils/http-p.js';

class BookModel extends HTTP {
  // 这里无需加入为了回调函数而写的参数
  getHotList() {
    // return Promise
    return this.request({
      url: 'book/hot_list'
    });
  }

  getMyBookCount() {
    return this.request({
      url: '/book/favor/count'
    });
  }
}

export { BookModel };