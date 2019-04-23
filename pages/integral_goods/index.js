let common = require('../../utils/common.js');
let wxParse = require('../res/wxParse/wxParse.js');
Page({
    data : {
        pic_h : 0,
        // goods_info : {
        //     id : 0,
        //     pic : [
        //         '../res/img/class_freezefish.png',
        //         '../res/img/class_freezefish.png',
        //         '../res/img/class_freezefish.png',
        //         '../res/img/class_freezefish.png',
        //         '../res/img/class_freezefish.png',
        //     ],
        //     title : '冻虾（盒）净重量约1.9±0.1kg',
        //     integral : 100,
        //     price : 150,
        //     active : '直降7.4折',
        //     active_info : '活动期间(12.30-01.02)每人限购500件',
        //     evaluates : [
        //         '非常不错，很好！',
        //         '非常不错，很好！',
        //         '非常不错，很好！',
        //     ],
        //     detail : ''
        // }
    },
    onLoad : function (option) {
        let p_size   = common.getTabSize(1, true);
        this.setData({
            pic_h : p_size.height
        });
        let obj = this;
        let app = getApp();
        let id = option.id;
        wx.request({
            url: `${app.globalData.domain}/mobile/integral/getGoodsInfo`, // 仅为示例，并非真实的接口地址
            header: {
              'content-type': 'application/json' // 默认值
            },
            data : {
                id : id
            },
            method: "POST",
            success(res) {
                if (res.data.code === 0) {
                    let data = res.data.data;
                    console.log(data);
                    obj.setData({
                        goods_info : data.info
                    });
                    wxParse.wxParse('detail', 'html', data.info.detail, obj, 0);
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