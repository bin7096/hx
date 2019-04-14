let common = require('../../utils/common.js')
Page({
    getPhoneNumber(e) {
        let obj = this;
        wx.login({
            success: function(res) {
                if (res.code) {
                    let app = getApp();
                    wx.request({
                        url: `${app.globalData.domain}/mobile/user/getMobile`,  
                        header: {
                            'content-type': 'application/json' // 默认值
                        },
                        data: {
                            user_id : app.globalData.user_id,
                            code : res.code,
                            encryptedData : e.detail.encryptedData,
                            iv : e.detail.iv
                        },
                        method: "POST",
                        success(res) {
                            if (res.data.code === 0) {
                                let userinfo = res.data.data;
                                app.globalData.user_id = userinfo.id;
                                app.globalData.nickname = userinfo.nickname;
                                app.globalData.avatarUrl = userinfo.avatarUrl;
                                app.globalData.mobile = userinfo.mobile;
                                obj.setData({
                                    userinfo : userinfo
                                });
                            }
                        }
                    });
                } else {
                    wx.showToast({title: '获取手机失败'});
                }
            },
            fail: function (res) {
                wx.showToast({title: '获取手机失败'});
            }
        });
    },
    data : {
        head_img : '../res/img/class_freezefish.png',
        userinfo : {
            id : null,
            nickname : null,
            mobile : null,
            avatarUrl : null
        },
        tab : 0,
        tab_list : [
            {name : '我的订单', img : '../res/img/my_order.png', uri : '../my_order/index'},
            {name : '我的评价', img : '../res/img/my_eval.png', uri : '../my_eval/index'},
            {name : '我的地址', img : '../res/img/my_addr.png', uri : '../address/index'},
            {name : '积分兑换', img : '../res/img/exchange.png', uri : '../exchange/index'},
            {name : '退款/售后', img : '../res/img/after_sale.png', uri : '../afterSale/index'},
            {name : '客服反馈', img : '../res/img/service.png', uri : '../service/index'},
            {name : '帮助中心', img : '../res/img/help.png', uri : '../help/index'},
            {name : '敬请期待', img : '../res/img/more.png', uri : false},
        ]
    },
    onLoad : function (option) {
        var tabSize = common.getTabSize(4, true);
        this.setData({
            tab  : tabSize.width,
        });
        var obj = this;
        var that = getApp();
        var code = that.globalData.code2;
        if (!that.globalData.user_id) {
            wx.getUserInfo({
                success(res) {
                    let app = that;
                    wx.request({
                        url: `${app.globalData.domain}/mobile/user/login`,  
                        header: {
                            'content-type': 'application/json' // 默认值
                        },
                        data: {
                            code : code,
                            encryptedData : res.encryptedData,
                            iv : res.iv
                        },
                        method: "POST",
                        success(res) {
                            if (res.data.code === 0) {
                                app.globalData.user_id = res.data.data.id;
                                app.globalData.nickname = res.data.data.nickname;
                                app.globalData.avatarUrl = res.data.data.avatarUrl;
                                app.globalData.mobile = res.data.data.mobile;
                                obj.setData({
                                    userinfo : res.data.data
                                })
                            }
                        }
                    });
                }
            });
        }else{
            let app = getApp();
            let userinfo = {
                id : app.globalData.user_id,
                nickname : app.globalData.nickname,
                avatarUrl : app.globalData.avatarUrl,
                mobile : app.globalData.mobile
            }
            this.setData({
                userinfo : userinfo
            });
        }
    },
    jumpTo : function (event) {
        var uri = event.currentTarget.dataset.uri;
        console.log(uri)
        if (uri === false) {
            return;
        }
        wx.navigateTo({
            url : uri,
            success : function (res) {
                console.log('success');
            },
            fail : function (err) {
                console.log('failed');
            }
        });
    }
})