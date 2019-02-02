let common = require('../../utils/common.js');
Page({
    data : {
        rempx : 16,
        selecteds : [''],
        goods : [
            // {title : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', src : '../res/img/class_freezefish.png', specification : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', 'price' : 39.9, 'number' : 3},
            // {title : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', src : '../res/img/class_freezefish.png', specification : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', 'price' : 39.9, 'number' : 3},
            // {title : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', src : '../res/img/class_freezefish.png', specification : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', 'price' : 39.9, 'number' : 3},
            // {title : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', src : '../res/img/class_freezefish.png', specification : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', 'price' : 39.9, 'number' : 3},
            // {title : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', src : '../res/img/class_freezefish.png', specification : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', 'price' : 39.9, 'number' : 3},
            // {title : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', src : '../res/img/class_freezefish.png', specification : '美威 智利原味三文鱼排（大西洋鲑）240g/袋 4片装 海鲜水产', 'price' : 39.9, 'number' : 3},
        ],
        total_price : 0,
    },
    onLoad : function () {

    },
    selected_all : function (event) {
        console.log(event.currentTarget.dataset.type);
    }
})