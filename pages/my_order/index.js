Page({
    data : {
        orders : [
            // {id : 0, order_no : '4648648564856', status : '1', create_time : '01-06 15:28', goods : [
            //     {id : 0, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
            //     {id : 1, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
            //     {id : 2, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
            //     {id : 3, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
            //     {id : 4, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
            //     {id : 5, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
            // ]},
            // {id : 1, order_no : '4648648564856', status : '2', create_time : '01-06 15:28', goods : [
            //     {id : 0, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
            //     {id : 1, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
            //     {id : 2, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
            //     {id : 3, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
            //     {id : 4, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
            //     {id : 5, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
            // ]},
            // {id : 2, order_no : '4648648564856', status : '3', create_time : '01-06 15:28', goods : [
            //     {id : 0, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
            //     {id : 1, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1}
            // ]},
            // {id : 3, order_no : '4648648564856', status : '4', create_time : '01-06 15:28', goods : [
            //     {id : 0, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
            //     {id : 1, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1}
            // ]},
        ]
    },
    onLoad : function(){
        let app = getApp();
        let obj = this;
        let user_id = app.globalData.user_id;
        wx.request({
            url: `${app.globalData.domain}/mobile/order/getOrders`, // 仅为示例，并非真实的接口地址
            header: {
            'content-type': 'application/json' // 默认值
            },
            data : {
                user_id : user_id
            },
            method: "POST",
            success(res) {
                if (res.data.code === 0) {
                    let data = res.data.data;
                    console.log(data);
                    obj.setData({
                        orders : data
                    });
                }else{
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                    });
                    
                }
            }
        });
    },
    toPay : function (event) {
        let id = event.currentTarget.dataset.id;
        console.log(id);
    },
    toCar : function (event) {
        let app = getApp();
        let obj = this;
        let id = event.currentTarget.dataset.id;
        let user_id = app.globalData.user_id;
        wx.request({
            url: `${app.globalData.domain}/mobile/order/orderToCar`, // 仅为示例，并非真实的接口地址
            header: {
            'content-type': 'application/json' // 默认值
            },
            data : {
                user_id : user_id,
                id : id
            },
            method: "POST",
            success(res) {
                if (res.data.code === 0) {
                    wx.showToast({
                        title: "添加到购物车成功",
                        icon: 'none',
                    });
                    wx.switchTab({
                        url : `../car/index`,
                        success : function (res) {
                            console.log('success');
                        },
                        fail : function (err) {
                            console.log('failed');
                        }
                    });
                }else{
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                    });
                }
            }
        });
    },
    toDetail : function (event) {
        let id = event.currentTarget.dataset.id;
        wx.navigateTo({
            url : `../detail/index?id=${id}`,
            success : function (res) {
                console.log('success');
            },
            fail : function (err) {
                console.log('failed');
            }
        });
    }
})