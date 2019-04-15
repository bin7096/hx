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
    onLoad : function (option) {
        let height = common.getHeight(2.5, this.data.rempx);
        let size   = common.winSize();
        console.log((size.width - size.width * 0.72) / 2);
        this.setData({
            height  : height,
            g_img_w : size.width * 0.72 * 0.95 * 0.32,
        });
    },
    onShow : function () {
        let obj = this;
        let app = getApp();
        let id = app.class_id;
        console.log(id);
        wx.request({
            url: `${app.globalData.domain}/mobile/classify/classifys`,  
            header: {
              'content-type': 'application/json' // 默认值
            },
            data: {id : id},
            method: "POST",
            success(res) {
                if (res.data.code === 0) {
                    let classifys = res.data.data;
                    console.log(classifys);
                    obj.setData({
                        classifys : classifys
                    });
                }
            }
        });
        wx.request({
            url: `${app.globalData.domain}/mobile/goods/goodsList`,  
            header: {
              'content-type': 'application/json' // 默认值
            },
            data: {id : id},
            method: "POST",
            success(res) {
                if (res.data.code === 0) {
                    let goods = res.data.data;
                    console.log(goods);
                    obj.setData({
                        goods : goods
                    });
                }
            }
        });
    },
    classTap : function (event) {
        let k = event.currentTarget.dataset.k;
        console.log(k);
        let classify = this.data.classifys;
        let id = classify[k].id;
        let obj = this;
        classify.forEach(item => {
            item.s = '';
        });
        classify[k].s = ' cl-selected';
        let app = getApp();
        wx.request({
            url: `${app.globalData.domain}/mobile/goods/goodsList`,  
            header: {
              'content-type': 'application/json' // 默认值
            },
            data: {id : id},
            method: "POST",
            success(res) {
                if (res.data.code === 0) {
                    let goods = res.data.data;
                    console.log(goods);
                    obj.setData({
                        goods : goods
                    });
                }
            }
        });
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
        });
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
    },
    toDetail : function (event) {
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
    }
})