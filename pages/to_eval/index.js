Page({
    data : {
        oid : '',
        eval : ''
    },
    onLoad : function () {
        
    },
    inputText : function (event) {
        let val = event.detail.value;
        this.setData({
            eval : val
        });
        console.log(this.data.eval);
    },
    submit : function (event) {
        console.log(this.data.oid);
        console.log(this.data.eval);
    }
})