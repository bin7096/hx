Page({
    data : {
        orders : [
            {id : 0, order_no : '4648648564856', status : '5', create_time : '01-06 15:28', goods : [
                {id : 0, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
                {id : 1, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
                {id : 2, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
                {id : 3, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
                {id : 4, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
                {id : 5, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
            ]},
            {id : 1, order_no : '4648648564856', status : '5', create_time : '01-06 15:28', goods : [
                {id : 0, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
                {id : 1, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
                {id : 2, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
                {id : 3, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
                {id : 4, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
                {id : 5, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
            ]},
            {id : 2, order_no : '4648648564856', status : '4', create_time : '01-06 15:28', goods : [
                {id : 0, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
                {id : 1, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1}
            ]},
            {id : 3, order_no : '4648648564856', status : '4', create_time : '01-06 15:28', goods : [
                {id : 0, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1},
                {id : 1, name : '智利原味三文鱼排', img : '../res/img/class_seafish.png', price : '20.1', number : 1}
            ]},
        ]
    },
    onLoad : function () {
        
    },
    toEval : function (event) {
        var o_id = event.currentTarget.dataset.oid;
        console.log(o_id);
    },
    showEval : function (event) {
        var o_id = event.currentTarget.dataset.oid;
        console.log(o_id);
    }
})