Page({
    data : {
        oid : 0,
        eval_id : 0,
        eval : ''
    },
    onLoad : function (option) {
        let id = option.id;
        let oid = option.oid;
        console.log(id);
        console.log(oid);
        if (id !== '0') {
            let app = getApp();
            let obj = this;
            wx.request({
                url: `${app.globalData.domain}/mobile/order/evalInfo`,  
                header: {
                    'content-type': 'application/json' // 默认值
                },
                data: {
                    id : id,
                },
                method: "POST",
                success(res) {
                    if (res.data.code === 0) {
                        let evaluation = res.data.data.eval;
                        obj.setData({
                            eval : evaluation
                        });
                    }else{
                        wx.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        });
                    }
                }
            });
        }
        this.setData({
            oid : oid,
            eval_id : id
        });
    },
    inputText : function (event) {
        let val = event.detail.value;
        this.setData({
            eval : val
        });
        console.log(this.data.eval);
    },
    submit : function (event) {
        let oid = this.data.oid;
        let eval_id = this.data.eval_id;
        let evaluation = this.data.eval;
        let app = getApp();
            wx.request({
                url: `${app.globalData.domain}/mobile/order/submitEval`,  
                header: {
                    'content-type': 'application/json' // 默认值
                },
                data: {
                    oid : oid,
                    eval : evaluation
                },
                method: "POST",
                success(res) {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                }
            });
    }
})