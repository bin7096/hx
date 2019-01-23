var showPage = {
    tabClick: function (event) {
        console.log(event.currentTarget.dataset.hi);
        let id = event.currentTarget.dataset.hi;
        let url;
        switch (id) {
            case 1:
                url = '../index/index';
                break;
            case 2:
                url = '../class/index';
                break;
            case 3:
                url = '../index/index';
                break;
            case 4:
                url = '../index/index';
                break;
            default:
                break;
        }
        wx.navigateTo({
            url: url
        })
    }
}
export default showPage;