// components/like/index.js
Component({
  properties: {
    like: {
      type: Boolean,
      value: false
    },
    count: {
      type: Number
    }
  },

  // 数据绑定
  data: {
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png'
  },

  methods: {
    /**
     * 点击桃心
     */
    onLike() {
      let like = this.properties.like;
      let count = this.properties.count;

      like = !like;
      count = like ? count + 1 : count - 1;

      // 触发渲染
      this.setData({
        count: count,
        like: like
      });

      let behavior = this.properties.like ? 'like' : 'cancel';
      this.triggerEvent('like', { behavior: behavior }, {});
    }
  }
});
