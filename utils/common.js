function getTabSize(tabNum, isEq, parentWidth = false, proportion = 1, wh_proportion = 1) {
    let tabSize = {
        width : null,
        height : null
    };
    wx.getSystemInfo({
        success: function (res) {
            if (!parentWidth) {
                tabSize.width  = Math.floor(res.windowWidth / tabNum * proportion);
            }else{
                tabSize.width  = Math.floor(parentWidth / tabNum * proportion);
            }
            tabSize.height = isEq ? tabSize.width : Math.floor(tabSize.width * wh_proportion);
        }
    });
    return tabSize;
}

module.exports = {
    getTabSize : getTabSize
};