let common = require('../../utils/common.js');
Page({
    data : {
        addr_id : 0,
        rempx : 16,
        selecteds : [''],
        goods : [
            // {id : 0, title : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', src : '../res/img/class_freezefish.png', specification : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', price : 39.9, number : 10, selected : false},
            // {id : 1, title : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', src : '../res/img/class_freezefish.png', specification : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', price : 39.9, number : 1, selected : false},
            // {id : 2, title : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', src : '../res/img/class_freezefish.png', specification : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', price : 39.9, number : 1, selected : false},
            // {id : 3, title : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', src : '../res/img/class_freezefish.png', specification : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', price : 39.9, number : 1, selected : false},
            // {id : 4, title : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', src : '../res/img/class_freezefish.png', specification : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', price : 39.9, number : 1, selected : false},
            // {id : 5, title : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', src : '../res/img/class_freezefish.png', specification : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', price : 39.9, number : 1, selected : false},
        ],
        total_price : 0,
        all_selected : false,
    },
    onShow : function () {
        // if (this.data.addr_id !== 0) {
        //     return;
        // }
        let obj = this;
        let app = getApp();
        let user_id = app.globalData.user_id;
        console.log(user_id);
        wx.request({
            url: `${app.globalData.domain}/mobile/goods/carList`,  
            header: {
                'content-type': 'application/json' // 默认值
            },
            data: {
                user_id : user_id
            },
            method: "POST",
            success(res) {
                let goods = res.data.data;
                obj.setData({
                    goods : goods
                });
            }
        });
    },
    selected_once : function (event) {
        var id = event.currentTarget.dataset.gid;
        var type = event.currentTarget.dataset.type;
        var total_price = this.data.total_price;
        var goods = this.data.goods;
        var n = 0;
        goods.forEach(g => {
            if (g.id === id) {
                g.selected = type === 'no-selected' ? true : false;
                var price = common.accMul(g.price, g.number);
                total_price = type === 'no-selected' ? common.accAdd(total_price, price) : common.accSub(total_price, price);
            }
            n = g.selected === true ? n+1 : n;
        });
        var all_selected = n === goods.length ? true : false;
        this.setData({
            goods : goods,
            all_selected : all_selected,
            total_price : total_price
        });
    },
    selected_all : function (event) {
        var type = event.currentTarget.dataset.type;
        var total_price = '0';
        var goods = this.data.goods;
        if (type === 'no-all') {
            var all_selected = true;
            goods.forEach(g => {
                g.selected = true;
                var price = common.accMul(g.number, g.price);
                total_price = common.accAdd(total_price, price);
            });
        }else{
            var all_selected = false;
            goods.forEach(g => {
                g.selected = false;
            });
        }
        this.setData({
            goods : goods,
            all_selected : all_selected,
            total_price : total_price
        });
    },
    changeNum : function (event) {
        var id = event.currentTarget.dataset.gid;
        var num = event.detail.value;
        if (num !== '') {
            num = parseInt(num);
        }else{
            num = 0;
        }
        var goods = this.data.goods;
        var total_price = this.data.total_price;
        goods.forEach(g => {
            if (g.id === id && num != g.number) {
                if (g.selected === true) {
                    var price = num < g.number ? common.accMul(g.price, g.number - num) : common.accMul(g.price, num - g.number);
                    total_price = num < g.number ? common.accSub(total_price, price) : common.accAdd(total_price, price);
                }
                g.number = parseInt(num);
            }
        });
        this.setData({
            goods : goods,
            total_price : total_price
        });
    },
    select_addr : function () {
        wx.navigateTo({
            url : `../address/index?page=car`,
            success : function (res) {
                console.log('success');
            },
            fail : function (err) {
                console.log('failed');
            }
        });
    },
    makeOrder : function () {
        var goods = this.data.goods;
        console.log(goods);
        var ids = [];
        goods.forEach(g => {
            if (g.selected) {
                ids.push(g.id);
            }
        });
        if (ids === []) {
            wx.showToast({
                title: '请选择商品',
                icon: 'none',
            });return;
        }
        ids = ids.join(',');
        var app = getApp();
        var obj = this;
        var user_id = app.globalData.user_id;
        var addr_id = this.data.addr_id;
        wx.request({
            url: `${app.globalData.domain}/mobile/order/makeOrder`,  
            header: {
                'content-type': 'application/json' // 默认值
            },
            data: {
                user_id : user_id,
                addr_id : addr_id,
                ids : ids
            },
            method: "POST",
            success(res) {
                if (res.data.code === 0) {
                    let data = res.data.data;
                    console.log(data);
                    wx.requestPayment({
                        'appId' : data.appId,
                        'timeStamp': data.timeStamp,
                        'nonceStr': data.nonceStr,
                        'package': data.package,
                        'signType': 'MD5',
                        'paySign': data.paySign,
                        'success':function(res){
                            wx.showToast({
                                title: '支付成功',
                                icon: 'none'
                            });
                        },
                        'fail':function(res){
                            console.log(res);
                            wx.showToast({
                                title: '支付失败',
                                icon: 'none'
                            });
                        },
                    });
                    wx.request({
                        url: `${app.globalData.domain}/mobile/goods/carList`,  
                        header: {
                            'content-type': 'application/json' // 默认值
                        },
                        data: {
                            user_id : user_id
                        },
                        method: "POST",
                        success(res) {
                            let goods = res.data.data;
                            obj.setData({
                                goods : goods,
                                total_price : 0,
                                all_selected : false
                            });
                        }
                    });
                }else{
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            }
        });
    }
})