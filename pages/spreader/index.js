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
        user_id : '',
        admin_id : '',
        account : '暂无可供绑定的推广者',
        realname : '',
        email : '',
        avatarUrl : '../res/img/null.jpg',
        nickname : '请先获取微信昵称',
        mobile : '请先获取手机号码',
        showSuccess : false,
        successText : ''
    },
    onLoad : function () {
        let app = getApp();
        let obj = this;
        wx.request({
            url: `${app.globalData.domain}/mobile/user/getSpreader`,  
            header: {
                'content-type': 'application/json' // 默认值
            },
            data: {},
            method: "POST",
            success(res) {
                if (res.data.code === 0) {
                    console.log(res.data)
                    let info = res.data.data;
                    obj.setData({
                        admin_id : info.admin_id,
                        account : info.account,
                        realname : info.realname,
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
                        mobile = that.globalData.mobile,
                        isSpreader = that.globalData.isSpreader;
                        console.log(isSpreader);
                    if (isSpreader === '1') {
                        obj.setData({
                            user_id : user_id,
                            nickname : nickname,
                            avatarUrl : avatarUrl,
                            mobile : mobile,
                            showSuccess : true,
                            successText : "此账号已绑定推广者"
                        });
                    }else{
                        obj.setData({
                            user_id : user_id,
                            nickname : nickname,
                            avatarUrl : avatarUrl,
                            mobile : mobile
                        });
                    }
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
                                let userinfo = res.data.data,
                                    isSpreader = userinfo.isSpreader;
                                    if (isSpreader === '1') {
                                        obj.setData({
                                            user_id : userinfo.user_id,
                                            nickname : userinfo.nickname,
                                            avatarUrl : userinfo.avatarUrl,
                                            showSuccess : true,
                                            successText : "此账号已绑定推广者"
                                        });
                                    }else{
                                        obj.setData({
                                            user_id : userinfo.user_id,
                                            nickname : userinfo.nickname,
                                            avatarUrl : userinfo.avatarUrl,
                                        });
                                    }
                                console.log(obj.data);
                            }
                        }
                    });
                }
            }
        });
    },
    setRealname : function (event) {
        let realname = event.detail.value;
        console.log(realname);
        this.setData({
            realname : realname
        });
    },
    setEmail : function (event) {
        let email = event.detail.value;
        console.log(email);
        this.setData({
            email : email
        });
    },
    submitInfo : function () {
        let user_id  = this.data.user_id;
        let admin_id = this.data.admin_id;
        let realname = this.data.realname;
        let email    = this.data.email;
        if (user_id === '') {
            wx.showToast({
                title : "请获取用户信息",
                icon : "none"
            });return;
        }
        let app = getApp();
        let obj = this;
        wx.request({
            url: `${app.globalData.domain}/mobile/user/bindSpreader`,  
            header: {
                'content-type': 'application/json' // 默认值
            },
            data: {
                user_id : user_id,
                admin_id : admin_id,
                realname : realname,
                email : email
            },
            method: "POST",
            success(res) {
                if (res.data.code === 0) {
                    obj.setData({
                        showSuccess : true,
                        successText : "提交成功"
                    });
                    console.log(obj.data);
                }else{
                    wx.showToast({
                        title : res.data.msg,
                        icon : "none"
                    });
                }
            },
            fail : function () {
                wx.showToast({
                    title : "提交失败",
                    icon : "none"
                });
            }
        });
    }
})