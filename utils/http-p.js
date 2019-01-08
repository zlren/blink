import { config } from '../config.js';

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey 无效',
  3000: '期刊不存在',
  1007: 'url 不存在'
};

class HTTP {
  request({ url, data = {}, method = 'GET' }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method);
    });
  }

  _request(url, resolve, reject, data = {}, method = 'GET') {
    wx.request({
      url: config.api_base_url + url,
      method,
      data,
      header: {
        'content-type': 'application/json',
        appkey: config.appkey
      },
      success: res => {
        const code = res.statusCode.toString();
        if (code.startsWith('2')) {
          // 成功响应，返回码为 2xx
          resolve(res.data);
        } else {
          // 服务器异常：返回码非 2xx
          reject();
          const errorCode = res.data.error_code;
          this._showError(errorCode);
        }
      },
      fail: err => {
        reject();
        // API 调用失败
        this._showError(1);
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
