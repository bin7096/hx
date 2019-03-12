Page({
    data : {
        oid : '',
        eval : ''
    },
    onLoad : function () {
        
    },
    inputText : function (event) {
        var eval = event.detail.value;
        console.log(eval);
        this.setData({
            eval : eval
        });
    },
    submit : function (event) {
        console.log(this.data.oid);
        console.log(this.data.eval);
    }
})