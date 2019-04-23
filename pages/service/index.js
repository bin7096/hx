Page({
    data : {
        issueList : []
    },
    onLoad : function () {
        let app = getApp();
        let obj = this;
        wx.request({
            url: `${app.globalData.domain}/mobile/other/problems`, // 仅为示例，并非真实的接口地址
            header: {
                'content-type': 'application/json' // 默认值
            },
            method: "POST",
            success(res) {
                if (res.data.code === 0) {
                    let data = res.data.data;
                    obj.setData({
                        issueList : data
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
    showDetail : function (event) {
        let id = event.currentTarget.dataset.id;
        let uri = `detail?id=${id}`;
        wx.navigateTo({
            url : uri,
            success : function (res) {
                console.log('success');
            },
            fail : function (err) {
                console.log('failed');
            }
        });
    }
});