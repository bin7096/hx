let common = require('../../utils/common.js');
Page({
    data : {
        nickname : '*****',
        mobile : '***********',
        allInt : 0,
        mInt : 0,
        gl_width : 0,
        gl_img_h : 0,
        goods_list : [
            {title : '进口基围虾虾球包邮到家500g', src : '../res/img/goods1.jpg', integral : 3000, price : 270},
            {title : '鲜美阳澄湖大闸蟹包邮500g', src : '../res/img/goods2.jpg', integral : 3000, price : 270},
            {title : '进口基围虾虾球包邮到家500g', src : '../res/img/goods1.jpg', integral : 3000, price : 270},
            {title : '鲜美阳澄湖大闸蟹包邮500g', src : '../res/img/goods2.jpg', integral : 3000, price : 270},
            {title : '进口基围虾虾球包邮到家500g', src : '../res/img/goods1.jpg', integral : 3000, price : 270},
            {title : '鲜美阳澄湖大闸蟹包邮500g', src : '../res/img/goods2.jpg', integral : 3000, price : 270},
            {title : '进口基围虾虾球包邮到家500g', src : '../res/img/goods1.jpg', integral : 3000, price : 270},
            {title : '鲜美阳澄湖大闸蟹包邮500g', src : '../res/img/goods2.jpg', integral : 3000, price : 270},
        ]
    },
    onLoad : function () {
        let gl_width = common.getWidth(2.6, 16);
        console.log(gl_width);
        this.setData({
            gl_width : gl_width / 2
        });
        let app = getApp();
        let obj = this;
        setTimeout(() => {
            let user_id = app.globalData.user_id;
            console.log(app.globalData);
            wx.request({
                url: `${app.globalData.domain}/mobile/integral/getIntegral`, // 仅为示例，并非真实的接口地址
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
                        obj.setData({
                            nickname : app.globalData.nickname,
                            mobile : app.globalData.mobile,
                            allInt : data.allInt,
                            mInt : data.mInt
                        });
                    }
                }
            });
            wx.request({
                url: `${app.globalData.domain}/mobile/integral/getGoods`, // 仅为示例，并非真实的接口地址
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
                            goods_list : data
                        });
                    }
                }
            });
        }, 1000);
    }
})