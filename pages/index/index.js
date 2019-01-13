const app = getApp()

let common = require('../../utils/common.js');
Page({
    data: {
        t_width  : 0,
        t_height : 0,
        c_size   : {width:null,hright:null},
        c_img    : 0,
        banners  : [
            '../res/img/banner1.png',
            '../res/img/banner2.png',
            '../res/img/banner3.png',
            '../res/img/banner4.png',
        ],
        tabImgs  : [
            {src : '../res/img/index_active.png',   title : '最新活动'},
            {src : '../res/img/index_discount.png', title : '商家动态'},
            {src : '../res/img/index_message.png',  title : '折扣专区'},
            {src : '../res/img/index_integral.png', title : '积分兑换'},
        ],
        classify : {
            top : [
                {title : '海产鱼类', example : '大黄鱼', show_tag : true,  tag : '销量冠军', src : '../res/img/class_seafish.png'},
                {title : '新鲜贝类', example : '夏夷贝', show_tag : false, tag : '销量冠军', src : '../res/img/class_shellfish.png'}
            ],
            bottom : [
                {title : '虾类', example : '基围虾', show_tag : false, tag : '销量冠军', src : '../res/img/class_shrimp.png'},
                {title : '冰鲜', example : '三文鱼', show_tag : false, tag : '销量冠军', src : '../res/img/class_freezefish.png'}
            ]
        }
    },
    onLoad: function () {
        let t_size = common.getTabSize(4, true);
        let c_size = common.getTabSize(2, false, false, 0.95, 0.7);
        let c_img  = common.getTabSize(2, true, c_size.width, 1).width;
        this.setData({
            t_width  : t_size.width,
            t_height : t_size.height,
            c_size   : c_size,
            c_img    : c_img
        });
        console.log(this.data);
    }
})