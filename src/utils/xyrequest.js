const host = require("../env/env.js").testHost;
var getToken = function() {
  const config = wx.getStorageSync("personalConfig"),
    token = config ? "Bearer " + config.token : null;
  return token;
};
/**
 * @method
 * @param {String} url 接口地址
 * @param {Object} data 传参对象
 * @param {boolean} [ignoreAuth] 是否忽略认证
 * @param {boolean} [mode] 是否使用默认host
 * @desc 发起get请求
 * @returns {Promise}
 */
var get = function(url, data, ignoreAuth = false, mode = true) {
  let apiUrl = mode ? host + url : url,
    header = {},
    token = getToken();
  if (token && !ignoreAuth) {
    header.Authorization = token;
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: apiUrl,
      data: data,
      header: header,
      method: "GET",
      dataType: "json",
      responseType: "text",
      success: result => {
        if (result.statusCode == 200) {
          resolve(result);
        } else {
          reject({ error: "请求失败" });
        }
      },
      fail: () => {
        reject({ error: "网络错误" });
      }
    });
  });
};

/**
 * @method
 * @param {String} url 接口地址
 * @param {Object} data 传参对象
 * @param {Number} contentType content-type类型
 * @param {boolean} [ignoreAuth] 是否忽略认证
 * @param {boolean} [mode] 是否使用默认host
 * @desc 发起post请求
 * @returns {Promise}
 */
var post = function(
  url,
  data,
  contentType = 1,
  ignoreAuth = false,
  mode = true
) {
  let apiUrl = mode ? host + url : url,
    header = { "content-type": "application/json" },
    token = getToken();
  if (!contentType) {
    header["content-type"] = "application/x-www-form-urlencoded";
  }
  if (token && !ignoreAuth) {
    header.Authorization = token;
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: apiUrl,
      data: data,
      header: header,
      method: "POST",
      dataType: "json",
      responseType: "text",
      success: result => {
        if (result.statusCode == 200) {
          resolve(result);
        } else {
          reject({ error: "请求失败" });
        }
      },
      fail: () => {
        reject({ error: "网络错误" });
      }
    });
  });
};

module.exports = {
  get: get,
  post: post
};
