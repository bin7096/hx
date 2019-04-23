Page({
    data : {
        list : []
    },
    onLoad : function (option) {
        let app = getApp();
        let obj = this;
        wx.request({
            url: `${app.globalData.domain}/mobile/other/helps`, // 仅为示例，并非真实的接口地址
            header: {
                'content-type': 'application/json' // 默认值
            },
            method: "POST",
            success(res) {
                if (res.data.code === 0) {
                    let data = res.data.data;
                    obj.setData({
                        list : data
                    });
                }else{
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                    });
                        
                }
            }
        });
    },
    show : function (event) {
        let k = event.currentTarget.dataset.k;
        console.log(k);
        let list = this.data.list;
        let status = list[k].status;
        list.forEach(l => {
            l.status = false;
        });
        if (status === false) {
            list[k].status = true;
        }
        console.log(list);
        this.setData({
            list : list
        });
    }
})