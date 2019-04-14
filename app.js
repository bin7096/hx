//app.js
App({
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs);
        if (!this.globalData.user_id) {
            var app = this;
            wx.login({
                success: function(res) {
                    if (res.code) {
                        app.globalData.code2 = res.code;
                    } else {
                        console.log('获取用户登录态失败：' + res.errMsg);
                        wx.showToast({title: '获取用户登录态失败'});
                    }
                },
                fail: function (res) {
                    wx.showToast({title: '登录失败'});
                }
            });
            // 登录
            wx.login({
                success: function(res) {
                    if (res.code) {
                        let that = app;
                        that.globalData.code = res.code;
                        wx.request({
                            url: `${that.globalData.domain}/mobile/user/getUserInfo`,  
                            header: {
                                'content-type': 'application/json' // 默认值
                            },
                            data: {code : res.code},
                            method: "POST",
                            success(res) {
                                if (res.data.code === 0) {
                                    let userinfo = res.data.data;
                                    app.globalData.user_id = userinfo.id;
                                    app.globalData.nickname = userinfo.nickname;
                                    app.globalData.avatarUrl = userinfo.avatarUrl;
                                    app.globalData.mobile = userinfo.mobile;
                                    app.globalData.isSpreader = userinfo.isSpreader;
                                }
                            }
                        });
                    } else {
                        console.log('获取用户登录态失败：' + res.errMsg);
                        wx.showToast({title: '获取用户登录态失败'});
                    }
                },
                fail: function (res) {
                    wx.showToast({title: '登录失败'});
                }
            });
        }
    },
    globalData: {
      domain: 'http://119.3.1.237:8081'
    }
})