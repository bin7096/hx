Page({
    data : {
        issueList : [
            {id : 1, title : '123456789'},
            {id : 2, title : '123456789'},
            {id : 3, title : '123456789'},
            {id : 4, title : '123456789'},
            {id : 5, title : '123456789'},
            {id : 6, title : '123456789'},
            {id : 7, title : '123456789'},
            {id : 8, title : '123456789'}
        ]
    },
    onLoad : function () {
        
    },
    showDetail : function (event) {
        let id = event.currentTarget.dataset.id;
        console.log(id);
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