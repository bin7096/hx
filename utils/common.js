function getTabSize(tabNum, isEq, parentWidth = false, proportion = 1, wh_proportion = 1) {
    var tabSize = {
        width : null,
        height : null
    };
    var size = winSize();
    if (!parentWidth) {
        tabSize.width  = Math.floor(size.width / tabNum * proportion);
    }else{
        tabSize.width  = Math.floor(parentWidth / tabNum * proportion);
    }
    tabSize.height = isEq ? tabSize.width : Math.floor(tabSize.width * wh_proportion);
    return tabSize;
}

function getWidth(refund_rem, rempx){
    var size = winSize();
    return Math.floor(size.width - (rempx * refund_rem));
}
function getHeight(refund_rem, rempx) {
    var size = winSize();
    return Math.floor(size.height - (rempx * refund_rem));
}

function winSize() {
    var size = {width:null,height:null};
    wx.getSystemInfo({
        success: function (res) {
            size.width  = res.windowWidth;
            size.height = res.windowHeight;
        }
    });
    return size;
}

function accAdd(arg1,arg2){ 
    var r1,r2,m;  
    try{
        r1=arg1.toString().split(".")[1].length;
    }catch(e){
        r1=0;
    }
    try{
        r2=arg2.toString().split(".")[1].length;
    }catch(e){
        r2=0;
    }
    m=Math.pow(10,Math.max(r1,r2));
    return (arg1*m+arg2*m)/m;
}

function accSub(arg1,arg2){
    var r1,r2,m,n;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    //last modify by deeka
    //动态控制精度长度
    n=(r1>=r2)?r1:r2;
    return ((arg1*m-arg2*m)/m).toFixed(2);
}

function accMul(arg1,arg2){
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}

module.exports = {
    accAdd     : accAdd,
    accSub     : accSub,
    accMul     : accMul,
    winSize    : winSize,
    getWidth   : getWidth,
    getHeight  : getHeight,
    getTabSize : getTabSize,
};