let common = require('../../utils/common.js');
Page({
    data: {
        rempx    : 16,
        t_width  : 0,
        t_height : 0,
        c_size   : {width:null,hright:null},
        c_img    : 0,
        dypadding: 0.7,
        dynamic  : 0,
        dr_right : 0,
        v_width  : 0,
        gl_width : 0,
        gl_img_h : 0,
        banners  : [
            {gid : 0, src : '../res/img/banner1.png'},
            // {gid : 1, src : '../res/img/banner2.png'},
            // {gid : 2, src : '../res/img/banner3.png'},
            // {gid : 3, src : '../res/img/banner4.png'},
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
        },
        dy_label : {
            top : ['大黄鱼','雅片鱼','小嘴鱼','多宝鱼','海黑鱼','...'],
            bottom : ['夏夷贝','红里罗','红扇宝','柽子王','大海螺','...']
        },
        goods_list : [
            // {title : '进口基围虾虾球包邮到家500g', src : '../res/img/goods1.jpg', price : 270, sale : 300},
            // {title : '鲜美阳澄湖大闸蟹包邮500g', src : '../res/img/goods2.jpg', price : 270, sale : 300},
            // {title : '进口基围虾虾球包邮到家500g', src : '../res/img/goods1.jpg', price : 270, sale : 300},
            // {title : '鲜美阳澄湖大闸蟹包邮500g', src : '../res/img/goods2.jpg', price : 270, sale : 300},
            // {title : '进口基围虾虾球包邮到家500g', src : '../res/img/goods1.jpg', price : 270, sale : 300},
            // {title : '鲜美阳澄湖大闸蟹包邮500g', src : '../res/img/goods2.jpg', price : 270, sale : 300},
            // {title : '进口基围虾虾球包邮到家500g', src : '../res/img/goods1.jpg', price : 270, sale : 300},
            // {title : '鲜美阳澄湖大闸蟹包邮500g', src : '../res/img/goods2.jpg', price : 270, sale : 300},
        ]
    },
    onReady: function (option) {
        let t_size   = common.getTabSize(4, true);
        let c_size   = common.getTabSize(2, false, false, 0.95, 0.7);
        let c_img    = common.getTabSize(2, true, c_size.width, 1).width;
        let dynamic  = common.getWidth(this.data.dypadding * 2, this.data.rempx);
        let dr_right = common.getWidth(4, this.data.rempx);
        let v_width  = common.getWidth(2, this.data.rempx);
        let gl_width = common.getWidth(2.6, 16);
        let obj = this;
        let app = getApp();
        wx.request({
            url: `${app.globalData.domain}/mobile/classify/topList`, // 仅为示例，并非真实的接口地址
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
                if (res.data.code === 0) {
                    let classify = res.data.data;
                    // console.log(classify);
                    obj.setData({
                        classify : classify
                    });
                }
            }
        });
        wx.request({
            url: `${app.globalData.domain}/mobile/goods/topList`, // 仅为示例，并非真实的接口地址
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
                if (res.data.code === 0) {
                    let goods_list = res.data.data;
                    obj.setData({
                        goods_list : goods_list
                    });
                }
            }
        });
        wx.request({
            url: `${app.globalData.domain}/mobile/other/banners`, // 仅为示例，并非真实的接口地址
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
                if (res.data.code === 0) {
                    let banners = res.data.data;
                    obj.setData({
                        banners : banners
                    });
                }
            }
        });
        obj.setData({
            t_width  : t_size.width,
            t_height : t_size.height,
            c_size   : c_size,
            c_img    : c_img,
            dynamic  : dynamic,
            dr_right : dr_right - 5,
            v_width  : v_width,
            gl_width : gl_width / 2
        });
        console.log(this.data);
    },
    toGoods : function (event) {
        var id = event.currentTarget.dataset.id;
        wx.navigateTo({
            url : `../detail/index?id=${id}`,
            success : function (res) {
                console.log('success');
            },
            fail : function (err) {
                console.log('failed');
            }
        });
    },
    toClassify : function (event) {
        var id = event.currentTarget.dataset.cid;
        console.log(id);
        let app = getApp();
        app.class_id = id;
        wx.switchTab({
            url : `../class/index`,
            success : function (res) {
                console.log('success');
            },
            fail : function (err) {
                console.log('failed');
            }
        });
    }
})