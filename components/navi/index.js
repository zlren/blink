// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    first: Boolean, // 是否是最旧的一期
    latest: Boolean // 是否是最新（后）的一期
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc: 'images/triangle.dis@left.png',
    leftSrc: 'images/triangle@left.png',
    disRightSrc: 'images/triangle.dis@right.png',
    rightSrc: 'images/triangle@right.png'
  },

  attached: function() {
    // console.log(this.properties.first);
    // console.log(this.properties.latest);
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 较新一期
     */
    onLeft: function(event) {
      if (!this.properties.latest) {
        // 触发自定义事件
        this.triggerEvent('left', {}, {});
      }
    },

    /**
     * 较老一期
     */
    onRight: function(event) {
      if (!this.properties.first) {
        this.triggerEvent('right', {}, {});
      }
    }
  }
});
