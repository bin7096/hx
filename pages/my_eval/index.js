Page({
    data : {
        orders : [
            // {id : 0, order_no : '4648648564856', status : '5', create_time : '01-06 15:28', goods : [
            //     {id : 0, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
            //     {id : 1, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
            //     {id : 2, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
            //     {id : 3, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
            //     {id : 4, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
            //     {id : 5, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
            // ]},
            // {id : 1, order_no : '4648648564856', status : '5', create_time : '01-06 15:28', goods : [
            //     {id : 0, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
            //     {id : 1, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
            //     {id : 2, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
            //     {id : 3, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
            //     {id : 4, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
            //     {id : 5, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
            // ]},
            // {id : 2, order_no : '4648648564856', status : '4', create_time : '01-06 15:28', goods : [
            //     {id : 0, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
            //     {id : 1, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1}
            // ]},
            // {id : 3, order_no : '4648648564856', status : '4', create_time : '01-06 15:28', goods : [
            //     {id : 0, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
            //     {id : 1, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1}
            // ]},
        ]
    },
    onLoad : function () {
        let app = getApp();
        let obj = this;
        let user_id = app.globalData.user_id;
        wx.request({
            url: `${app.globalData.domain}/mobile/order/getEvals`,  
            header: {
                'content-type': 'application/json' // 默认值
            },
            data: {
                user_id : user_id,
            },
            method: "POST",
            success(res) {
                if (res.data.code === 0) {
                    let data = res.data.data;
                    obj.setData({
                        orders : data
                    });
                }
            }
        });
    },
    toEval : function (event) {
        var oid = event.currentTarget.dataset.oid;
        wx.navigateTo({
            url : `../to_eval/index?id=0&oid=${oid}`,
            success : function (res) {
                console.log('success');
            },
            fail : function (err) {
                console.log('failed');
            }
        });
    },
    showEval : function (event) {
        var oid = event.currentTarget.dataset.oid;
        var id = event.currentTarget.dataset.id;
        wx.navigateTo({
            url : `../to_eval/index?id=${id}&oid=${oid}`,
            success : function (res) {
                console.log('success');
            },
            fail : function (err) {
                console.log('failed');
            }
        });
    }
})