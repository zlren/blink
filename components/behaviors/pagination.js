const paginationBev = Behavior({
  data: {
    dataArray: [],
    total: null,
    noneResult: false,
    loading: false
  },
  methods: {
    setMoreData(dataArray) {
      const tempArray = this.data.dataArray.concat(dataArray);
      this.setData({
        dataArray: tempArray
      });
    },
    getCurrentStart() {
      return this.data.dataArray.length;
    },
    hasMore() {
      if (this.data.dataArray.length >= this.data.total) {
        return false;
      } else {
        return true;
      }
    },
    setTotal(total) {
      this.data.total = total;

      if (total == 0) {
        this.setData({
          noneResult: true
        });
      }
    },
    init() {
      this.setData({
        dataArray: [],
        noneResult: false,
        loading: false
      });
      this.data.total = null;
    },
    isLocked() {
      return this.data.loading ? true : false;
    },
    lock() {
      this.setData({
        loading: true
      });
    },
    unLock() {
      this.setData({
        loading: false
      });
    }
  }
});

export { paginationBev };
