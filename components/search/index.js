// components/search/index.js
import { KeywordModel } from '../../models/keyword.js';
import { BookModel } from '../../models/book.js';
const keywordModel = new KeywordModel();
const bookModel = new BookModel();

Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching: false,
    inputValue: ''
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
    onCancel(event) {
      this.triggerEvent('cancel', {}, {});
    },
    onConfirm(event) {
      this.setData({ searching: true });

      // 获取输入文本或者点击tag的文本
      const word = event.detail.value || event.detail.text;

      this.setData({
        inputValue: word
      });

      // 搜索
      bookModel.search(0, word).then(res => {
        this.setData({
          dataArray: res.books
        });
        keywordModel.addToHistory(word);
      });
    },
    onDelete() {
      this.setData({ searching: false });
    }
  }
});
