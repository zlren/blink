// 本质就是一个变量，使用了Behavior关键字
// 这里边的东西跟自己写一个component是一样的，包括properties、data和methods，甚至还有生命周期函数
let classicBeh = Behavior({
  properties: {
    imgUrl: String,
    content: String
  },
  data: {},
  methods: {},
  attached: function() {}
});

export { classicBeh };
