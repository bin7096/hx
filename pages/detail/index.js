let common = require('../../utils/common.js');
Page({
    data : {
        pic_h : 0,
        goods_info : {
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
    onLoad : function () {
        let p_size   = common.getTabSize(1, true);
        console.log(p_size);
        this.setData({
            pic_h : p_size.height
        });
    }
})