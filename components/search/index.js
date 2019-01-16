// components/search/index.js
import { KeywordModel } from '../../models/keyword.js';
import { BookModel } from '../../models/book.js';
const keywordModel = new KeywordModel();
const bookModel = new BookModel();

import { paginationBev } from '../behaviors/pagination.js';

Component({
  behaviors: [paginationBev],

  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    inputValue: '',
    loadingCenter: false
  },

  attached() {
    const hotWordsPro = keywordModel.getHot();
    hotWordsPro.then(res => {
      this.setData({
        hotWords: res.hot
      });
    });

    this.setData({
      historyWords: keywordModel.getHistory()
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      if (!this.data.inputValue) {
        return;
      }

      if (this.isLocked()) {
        return;
      }

      if (this.hasMore()) {
        this.lock();
        bookModel.search(this.getCurrentStart(), this.data.inputValue).then(
          res => {
            this.setMoreData(res.books);
            this.unLock();
          },
          () => {
            this.unLock();
          }
        );
      }
    },
    onCancel(event) {
      this.triggerEvent('cancel', {}, {});
      this.init();
    },
    onConfirm(event) {
      this._showResult();
      this._showLoadingCenter();

      // 获取输入文本或者点击tag的文本
      const word = event.detail.value || event.detail.text;

      this.setData({
        inputValue: word
      });

      // 搜索
      bookModel.search(this.getCurrentStart(), word).then(res => {
        this.setTotal(res.total);
        this.setMoreData(res.books);
        keywordModel.addToHistory(word);
        this._hideLoadingCenter();
      });
    },
    onDelete() {
      this.init();

      this._closeResult();
    },
    _showResult() {
      this.setData({ searching: true });
    },
    _closeResult() {
      this.setData({ searching: false, inputValue: '' });
    },

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      });
    },
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      });
    }
  }
});
