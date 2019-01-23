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
    console.log(size);
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

module.exports = {
    winSize    : winSize,
    getWidth   : getWidth,
    getHeight  : getHeight,
    getTabSize : getTabSize,
};