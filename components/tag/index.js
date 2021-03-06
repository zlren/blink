// components/tag/index.js
Component({
  //  启动插槽
  options: {
    multipleSlots: true
  },

  // 外部样式
  externalClasses: ['tag-class'],

  /**
   * 组件的属性列表
   */
  properties: {
    text: String
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
      // 标签被点击，把标签内容传递出去
      this.triggerEvent('tapping', {
        text: this.properties.text
      });
    }
  }
});
