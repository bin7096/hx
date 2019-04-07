let common = require('../../utils/common.js');
Page({
    data : {
        rempx : 16,
        height : 0,
        g_img_w : 0,
        g_right : 0,
        classifys : [
            {id : 0 , name : '店内活动' , s : ''},
            {id : 1 , name : '为你优选' , s : ' cl-selected'},
            {id : 2 , name : '单品优惠' , s : ''},
            {id : 3 , name : '满额促销' , s : ''}
        ],
        goods : [
            {id : 0, title : '美威 智利原味三文鱼排（大西洋鲑）240g/袋', info : '月售3件 好评100%', active : '满30减5', price : '19.8', pic : '../res/img/class_freezefish.png'},
            {id : 1, title : '泰国活冻黑虎虾400g', info : '月售98件 好评100%', active : '秒杀7.52折', price : '29.9', pic : '../res/img/class_freezefish.png'},
            {id : 2, title : '冷冻大连蚬子肉250g', info : '月售8件 好评100%', active : '秒杀8.49折', price : '49.9', pic : '../res/img/class_freezefish.png'},
            {id : 3, title : '美威 智利原味三文鱼排（大西洋鲑）240g/袋', info : '月售3件 好评100%', active : '满30减5', price : '19.8', pic : '../res/img/class_freezefish.png'},
            {id : 4, title : '美威 智利原味三文鱼排（大西洋鲑）240g/袋', info : '月售3件 好评100%', active : '满30减5', price : '19.8', pic : '../res/img/class_freezefish.png'},
            {id : 5, title : '美威 智利原味三文鱼排（大西洋鲑）240g/袋', info : '月售3件 好评100%', active : '满30减5', price : '19.8', pic : '../res/img/class_freezefish.png'},
            {id : 6, title : '美威 智利原味三文鱼排（大西洋鲑）240g/袋', info : '月售3件 好评100%', active : '满30减5', price : '19.8', pic : '../res/img/class_freezefish.png'},
            {id : 7, title : '美威 智利原味三文鱼排（大西洋鲑）240g/袋', info : '月售3件 好评100%', active : '满30减5', price : '19.8', pic : '../res/img/class_freezefish.png'},
            {id : 8, title : '美威 智利原味三文鱼排（大西洋鲑）240g/袋', info : '月售3件 好评100%', active : '满30减5', price : '19.8', pic : '../res/img/class_freezefish.png'},
            {id : 9, title : '美威 智利原味三文鱼排（大西洋鲑）240g/袋', info : '月售3件 好评100%', active : '满30减5', price : '19.8', pic : '../res/img/class_freezefish.png'},
            {id : 10, title : '美威 智利原味三文鱼排（大西洋鲑）240g/袋', info : '月售3件 好评100%', active : '满30减5', price : '19.8', pic : '../res/img/class_freezefish.png'},
            {id : 11, title : '美威 智利原味三文鱼排（大西洋鲑）240g/袋', info : '月售3件 好评100%', active : '满30减5', price : '19.8', pic : '../res/img/class_freezefish.png'},
            {id : 12, title : '美威 智利原味三文鱼排（大西洋鲑）240g/袋', info : '月售3件 好评100%', active : '满30减5', price : '19.8', pic : '../res/img/class_freezefish.png'},
        ]
    },
    onLoad : function () {
        let height = common.getHeight(2.5, this.data.rempx);
        let size   = common.winSize();
        console.log((size.width - size.width * 0.72) / 2);
        let obj = this;
        wx.request({
            url: 'http://119.3.1.237:8081/mobile/classify/classifys', // 仅为示例，并非真实的接口地址
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
                if (res.data.code === 0) {
                    let classifys = res.data.data;
                    obj.setData({
                        classifys : classifys
                    });
                }
            }
        });
        this.setData({
            height  : height,
            g_img_w : size.width * 0.72 * 0.95 * 0.32,
        });
    },
    classTap : function (event) {
        var id = event.currentTarget.dataset.cid;
        var classify = this.data.classifys;
        classify.forEach(item => {
            item.s = '';
        });
        classify[id].s = ' cl-selected';
        this.setData({
            classifys : classify
        });
    },
    addToCar : function (event) {
        var id = event.currentTarget.dataset.gid;
        console.log(id);
        wx.showTabBarRedDot({
            index : 2,
            success : function (res) {
                console.log(res);
            },
            fail : function (res) {
                console.log(res);
            }
        })
    }
})