let common = require('../../utils/common.js')
Page({
    data : {
        head_img : '../res/img/class_freezefish.png',
        user_name : '张三丰',
        mobile : '189****5478',
        tab : 0,
        tab_list : [
            {name : '我的订单', img : '../res/img/add.png', uri : '../my_order/index'},
            {name : '我的评价', img : '../res/img/add.png', uri : '../my_eval/index'},
            {name : '我的地址', img : '../res/img/add.png', uri : '../my_addr/index'},
            {name : '积分兑换', img : '../res/img/add.png', uri : '../exchange/index'},
            {name : '签到有惊喜', img : '../res/img/add.png', uri : '../sign/index'},
            {name : '退款/售后', img : '../res/img/add.png', uri : '../afterSale'},
            {name : '客服反馈', img : '../res/img/add.png', uri : '../service/index'},
            {name : '帮助中心', img : '../res/img/add.png', uri : '../help/index'},
        ]
    },
    onLoad : function () {
        var tabSize = common.getTabSize(4, true);
        this.setData({
            tab  : tabSize.width,
        });
    },
    jumpTo : function (event) {
        var uri = event.currentTarget.dataset.uri;
        console.log(uri);
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