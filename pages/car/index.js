let common = require('../../utils/common.js');
Page({
    data : {
        rempx : 16,
        selecteds : [''],
        goods : [
            {title : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', src : '../res/img/class_freezefish.png', specification : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', 'price' : 39.9, 'number' : 3, 'selected' : false},
            {title : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', src : '../res/img/class_freezefish.png', specification : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', 'price' : 39.9, 'number' : 3, 'selected' : false},
            {title : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', src : '../res/img/class_freezefish.png', specification : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', 'price' : 39.9, 'number' : 3, 'selected' : false},
            {title : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', src : '../res/img/class_freezefish.png', specification : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', 'price' : 39.9, 'number' : 3, 'selected' : false},
            {title : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', src : '../res/img/class_freezefish.png', specification : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', 'price' : 39.9, 'number' : 3, 'selected' : false},
            {title : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', src : '../res/img/class_freezefish.png', specification : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', 'price' : 39.9, 'number' : 3, 'selected' : false},
        ],
        total_price : 0,
        all_selected : false,
    },
    onLoad : function () {

    },
    selected_all : function (event) {
        var type = event.currentTarget.dataset.type;
        var total_price = '0';
        var goods = this.data.goods;
        if (type === 'no-all') {
            var all_selected = true;
            goods.forEach(g => {
                g.selected = true;
                total_price = common.accAdd(total_price, g.price);
            });
        }else{
            var all_selected = false;
            goods.forEach(g => {
                g.selected = false;
            });
        }
        this.setData({
            goods : goods,
            all_selected : all_selected,
            total_price : total_price
        });
    }
})