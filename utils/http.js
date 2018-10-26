import { config } from '../config.js';

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey 无效',
  3000: '期刊不存在'
};

class HTTP {
  request(params) {
    if (!params.method) {
      params.method = 'GET';
    }

    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        'content-type': 'application/json',
        appkey: config.appkey
      },
      success: res => {
        let code = res.statusCode.toString();
        if (code.startsWith('2')) {
          // 成功响应，返回码为 2xx
          params.success(res.data);
        } else {
          // 服务器异常：返回码非 2xx
          wx.showToast({
            title: '错误',
            icon: 'none',
            duration: 1500
          });
        }
      },
      fail: err => {
        // API 调用失败
      }
    });
  }

  _showError(errorCode) {
    if (!errorCode || !tips[errorCode]) {
      errorCode = 1;
    }
    wx.showToast({
      title: tips[errorCode],
      icon: 'none',
      duration: 1500
    });
  }
}

export { HTTP };
