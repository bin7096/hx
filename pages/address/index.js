let common = require('../../utils/common.js');
Page({
    data : {
        winHeight : 0,
        address : [
            {'id' : 0, 'name' : '张某', 'mobile' : '139****4679', 'address' : "山西省太原市山西省太原市山西省太原市"},
            {'id' : 1, 'name' : '张某', 'mobile' : '139****4679', 'address' : "山西省太原市山西省太原市山西省太原市"},
            {'id' : 2, 'name' : '张某', 'mobile' : '139****4679', 'address' : "山西省太原市山西省太原市山西省太原市"},
        ]
    },
    onLoad : function () {
        var winSize = common.winSize();
        this.setData({
            winHeight : winSize.height
        })
    }
})