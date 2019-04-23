let common = require('../../utils/common.js');
Page({
    data : {
        winHeight : 0,
        address : [
            // {'id' : 0, 'name' : '张某', 'mobile' : '139****4679', 'address' : "山西省太原市山西省太原市山西省太原市"},
            // {'id' : 1, 'name' : '张某', 'mobile' : '139****4679', 'address' : "山西省太原市山西省太原市山西省太原市"},
            // {'id' : 2, 'name' : '张某', 'mobile' : '139****4679', 'address' : "山西省太原市山西省太原市山西省太原市"},
        ],
        back : false
    },
    onLoad : function (option) {
        if (option === {}) {
            
        }else{
            if (option.page === 'car') {
                this.setData({
                    back : true
                });
            }
        }
    },
    onShow : function () {
        var winSize = common.winSize();
        this.setData({
            winHeight : winSize.height
        });
        var obj = this;
        var app = getApp();
        var user_id = app.globalData.user_id;
        console.log(user_id);
        wx.request({
            url: `${app.globalData.domain}/mobile/areas/addrList`,  
            header: {
                'content-type': 'application/json' // 默认值
            },
            data: {
                user_id : user_id
            },
            method: "POST",
            success(res) {
                var data = res.data.data;
                obj.setData({
                    address : data
                });
            }
        });
    },
    addAddr : function () {
        wx.navigateTo({
            url : `../edit_addr/index`,
            success : function (res) {
                console.log('success');
            },
            fail : function (err) {
                console.log('failed');
            }
        });
    },
    delAddr : function (event) {
        var id = event.currentTarget.dataset.id;
        var app = getApp();
        var obj = this;
        wx.request({
            url: `${app.globalData.domain}/mobile/areas/delAddr`,  
            header: {
                'content-type': 'application/json' // 默认值
            },
            data: {
                id : id
            },
            method: "POST",
            success(res) {
                if (res.data.code === 0) {
                    var data = res.data.data;
                    obj.setData({
                        address : data
                    });
                }
                wx.showToast({
                    title: res.data.msg,
                    icon: 'none'
                });
            }
        });
    },
    to_edit : function (event) {
        var id = event.currentTarget.dataset.id;
        wx.navigateTo({
            url : `../edit_addr/index?id=${id}`,
            success : function (res) {
                console.log('success');
            },
            fail : function (err) {
                console.log('failed');
            }
        });
    },
    select_addr : function (event) {
        var back = this.data.back;
        if (back) {
            var id = event.currentTarget.dataset.id;
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2];
            prevPage.setData({
                addr_id : id,
                all_selected : false,
                total_price : 0
            });
            wx.navigateBack({
                delta: 1
            });
        }
    }
})