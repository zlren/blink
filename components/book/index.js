// components/book/index.js
// 每个book组件对应一本图书
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book: Object
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event) {
      const bookId = this.properties.book.id;
      // 点击图书引发页面跳转
      // 通过url的形式传递参数，bid 是属性值
      // 在页面的onLoad的options中可以取到

      // 降低了组件的通用性
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?bid=${bookId}`
      });
    }
  }
});
