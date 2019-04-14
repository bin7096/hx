Page({
    getPhoneNumber(e) {
        console.log(this.data);
        if (this.data.user_id === '') {
            wx.showToast({
                title : "请先获取用户信息",
                icon : "none"
            });return;
        }
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
                            user_id : obj.data.user_id,
                            code : res.code,
                            encryptedData : e.detail.encryptedData,
                            iv : e.detail.iv
                        },
                        method: "POST",
                        success(res) {
                            if (res.data.code === 0) {
                                let userinfo = res.data.data;
                                obj.setData({
                                    user_id : userinfo.id,
                                    avatarUrl : userinfo.avatarUrl,
                                    nickname : userinfo.nickname,
                                    mobile : userinfo.mobile
                                });
                            }else{
                                wx.showToast({
                                    title:"获取手机号码失败",
                                    icon : "none"
                                });
                            }
                        }
                    });
                } else {
                    wx.showToast({
                        title: "获取手机号码失败",
                        icon : "none"
                    });
                }
            },
            fail: function (res) {
                wx.showToast({
                    title: "获取手机号码失败",
                    icon : "none"
                });
            }
        });
    },
    data : {
        sid : '',
        realname : '推广者名称',
        user_id : '',
        avatarUrl : '../res/img/null.jpg',
        nickname : '请先获取微信昵称',
        mobile : '请先获取手机号码',
        showSuccess : false,
        successText : ''
    },
    onLoad : function (option) {
        let sid;
        if (option === undefined) {
            sid = '';
        }else{
            sid = option.sid
        }
        sid = 3;
        this.setData({
            sid : sid
        });
        console.log(this.data);
        let app = getApp();
        let obj = this;
        wx.request({
            url: `${app.globalData.domain}/mobile/user/spreaderInfo`, 
            header: {
                'content-type': 'application/json' // 默认值
            },
            data: {
                sid : sid
            },
            method: "POST",
            success(res) {
                if (res.data.code === 0) {
                    let realname = res.data.data.realname;
                    obj.setData({
                        realname : realname
                    });
                }
            }
        });
    },
    onGetUserInfo : function () {
        let app = getApp();
        let obj = this;
        wx.getUserInfo({
            success(res) {
                let that = getApp();
                let code = that.globalData.code2;
                if (that.globalData.user_id !== undefined && that.globalData.user_id !== null) {
                    let user_id = that.globalData.user_id,
                        nickname = that.globalData.nickname,
                        avatarUrl = that.globalData.avatarUrl,
                        mobile = that.globalData.mobile ? that.globalData.mobile : '请先获取手机号码';
                    obj.setData({
                        user_id : user_id,
                        nickname : nickname,
                        avatarUrl : avatarUrl,
                        mobile : mobile
                    });
                    console.log(obj.data);
                }else{
                    console.log(code);
                    wx.request({
                        url: `${that.globalData.domain}/mobile/user/login`,  
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
                                let userinfo = res.data.data;
                                obj.setData({
                                    user_id : userinfo.user_id,
                                    nickname : userinfo.nickname,
                                    avatarUrl : userinfo.avatarUrl,
                                });
                                console.log(obj.data);
                            }
                        }
                    });
                }
            }
        });
    },
    submitInfo : function () {
        let sid = this.data.sid;
        let app = getApp();
        let user_id = app.globalData.user_id;
        if (user_id === undefined || user_id === '') {
            wx.showToast({
                title : "请先获取用户信息",
                icon : "none"
            });
        }else{
            if (sid !== undefined && sid !== '') {
                wx.request({
                    url: `${app.globalData.domain}/mobile/user/focus`,  
                    header: {
                    'content-type': 'application/json' // 默认值
                    },
                    data : {
                        sid : sid,
                        user_id : user_id
                    },
                    success(res) {
                        if (res.data.code !== 0) {
                            wx.showToast({
                                title: '关注失败',
                                icon: 'none',
                            });
                        }
                    }
                });
            }
        }
    }
})