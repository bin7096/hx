let common = require('../../utils/common.js');
let wxParse = require('../res/wxParse/wxParse.js');
Page({
    data : {
        pic_h : 0,
        goods_info : {
            id : 0,
            pic : [
                '../res/img/class_freezefish.png',
                '../res/img/class_freezefish.png',
                '../res/img/class_freezefish.png',
                '../res/img/class_freezefish.png',
                '../res/img/class_freezefish.png',
            ],
            title : '冻虾（盒）净重量约1.9±0.1kg',
            price : 111,
            original_price : 150,
            active : '直降7.4折',
            active_info : '活动期间(12.30-01.02)每人限购500件',
            evaluates : [
                '非常不错，很好！',
                '非常不错，很好！',
                '非常不错，很好！',
            ],
            detail : ''
        }
    },
    onLoad : function (option) {
        let p_size   = common.getTabSize(1, true);
        let obj = this;
        let app = getApp();
        let user_id = app.globalData.user_id;
        let id = option.id;
        console.log(p_size);
        wx.request({
            url: `${app.globalData.domain}/mobile/goods/detail`,  
            header: {
              'content-type': 'application/json' // 默认值
            },
            data:{
                id : id,
                user_id : user_id
            },
            method: "POST",
            success(res) {
                if (res.data.code === 0) {
                    let goods_info = res.data.data.info;
                    obj.setData({
                        goods_info : goods_info
                    });
                    wxParse.wxParse('detail', 'html', goods_info.detail, obj, 0);
                    console.log(obj.data);
                }else{
                    wx.showToast({title:res.data.msg});
                }
            },

        });
        this.setData({
            pic_h : p_size.height
        });
    },
    addToCar : function (event) {
        var id = event.currentTarget.dataset.id;
        console.log(id);
        let app = getApp();
        if (!app.globalData.mobile) {
            wx.showToast({title:'请先获取微信手机号'});return;
        }
        if (app.globalData.user_id) {
            let user_id = app.globalData.user_id;
            wx.request({
                url: `${app.globalData.domain}/mobile/goods/addToCar`,  
                header: {
                  'content-type': 'application/json' // 默认值
                },
                data: {
                    id : id,
                    user_id : user_id
                },
                method: "POST",
                success(res) {
                    if (res.data.code === 0) {
                        
                    }
                }
            });
        }else{
            wx.showToast({title: '请先登录'});
        }
    }
})