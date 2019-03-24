let common = require('../../utils/common.js');
Page({
    data : {
        gl_width : 0,
        gl_img_h : 0,
        goods_list : [
            {title : '进口基围虾虾球包邮到家500g', src : '../res/img/goods1.jpg', 'int' : 3000, 'price' : 270, 'sale' : 300},
            {title : '鲜美阳澄湖大闸蟹包邮500g', src : '../res/img/goods2.jpg', 'int' : 3000, 'price' : 270, 'sale' : 300},
            {title : '进口基围虾虾球包邮到家500g', src : '../res/img/goods1.jpg', 'int' : 3000, 'price' : 270, 'sale' : 300},
            {title : '鲜美阳澄湖大闸蟹包邮500g', src : '../res/img/goods2.jpg', 'int' : 3000, 'price' : 270, 'sale' : 300},
            {title : '进口基围虾虾球包邮到家500g', src : '../res/img/goods1.jpg', 'int' : 3000, 'price' : 270, 'sale' : 300},
            {title : '鲜美阳澄湖大闸蟹包邮500g', src : '../res/img/goods2.jpg', 'int' : 3000, 'price' : 270, 'sale' : 300},
            {title : '进口基围虾虾球包邮到家500g', src : '../res/img/goods1.jpg', 'int' : 3000, 'price' : 270, 'sale' : 300},
            {title : '鲜美阳澄湖大闸蟹包邮500g', src : '../res/img/goods2.jpg', 'int' : 3000, 'price' : 270, 'sale' : 300},
        ]
    },
    onLoad : function () {
        let gl_width = common.getWidth(2.6, 16);
        console.log(gl_width);
        this.setData({
            gl_width : gl_width / 2
        });
    }
})