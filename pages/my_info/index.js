let common = require('../../utils/common.js')
Page({
    data : {
        head_img : '../res/img/class_freezefish.png',
        user_name : '张三丰',
        mobile : '189****5478',
        tabWidth : 0,
        tabHeight : 0
    },
    onLoad : function () {
        var tabSize = common.getTabSize(4, true);
        this.setData({
            tabWidth  : tabSize.width,
            tabHeight : tabSize.height
        });
    }
})