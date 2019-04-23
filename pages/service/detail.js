Page({
    data : {
        info : {
            title : "", 
            value : ""
        }
    },
    onLoad : function (option) {
        let id = option.id;
        let app = getApp();
        let obj = this;
        wx.request({
            url: `${app.globalData.domain}/mobile/other/problemInfo`, // 仅为示例，并非真实的接口地址
            header: {
                'content-type': 'application/json' // 默认值
            },
            data : {
                id : id
            },
            method: "POST",
            success(res) {
                if (res.data.code === 0) {
                    let info = res.data.data.info;
                    obj.setData({
                        info : info
                    });
                }else{
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                    });
                        
                }
            }
        });
    }
})