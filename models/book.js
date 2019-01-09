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
      url: 'book/favor/count'
    });
  }

  getDetail(bid) {
    return this.request({
      url: `book/${bid}/detail`
    });
  }

  getLikeStatus(bid) {
    return this.request({
      url: `book/${bid}/favor`
    });
  }

  getComment(bid) {
    return this.request({
      url: `book/${bid}/short_comment`
    });
  }

  /**
   * 提交评论
   * @param {书籍ID} bid
   * @param {评论} comment
   */
  postComment(bid, comment) {
    return this.request({
      url: 'book/add/short_comment',
      method: 'POST',
      data: {
        book_id: bid,
        content: comment
      }
    });
  }

  search(start, q) {
    return this.request({
      url: 'book/search?summary=1',
      data: {
        q,
        start
      }
    });
  }
}

export { BookModel };
