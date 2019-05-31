// pages/authorize/authorize.js
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    isChecked: true
  },

  onLoad: function() {
    var that = this;
    wx.showLoading({ title: "加载中" });
    setTimeout(wx.hideLoading, 1000);
  },
  //点击授权按钮
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      console.log("click");
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: "警告",
        content: "您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!",
        showCancel: false,
        confirmText: "返回授权",
        success: function(res) {
          if (res.confirm) {
            console.log("用户点击了“返回授权”");
          }
        }
      });
    }
  }
});
