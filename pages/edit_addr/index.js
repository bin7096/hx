Page({
    data : {
        addr_id : 0,
        pid : 0,
        cid : 0,
        aid : 0,
        label : 1,
        city_index : [0,0],
        area_index : 0,
        city : [['广东省','广西省'],['广州市','深圳市','珠海市','汕头市','惠州市']],
        city_detail : [
            {id : 0, name : '广东省', cities : [
                {id : 0, name : '广州市', areas : [
                    {id : 0, name : '天河区'},
                    {id : 1, name : '白云区'},
                    {id : 2, name : '花都区'},
                    {id : 3, name : '黄浦区'},
                    {id : 4, name : '番禺区'},
                    {id : 5, name : '从化市'},
                ]},
                {id : 1, name : '深圳市', areas : [
                    {id : 0, name : '罗湖区'},
                    {id : 1, name : '福田区'},
                    {id : 2, name : '南山区'},
                    {id : 3, name : '宝安区'},
                    {id : 4, name : '龙华区'},
                    {id : 5, name : '龙岗区'},
                ]},
                {id : 2, name : '珠海市', areas : [
                    {id : 0, name : '斗门区'},
                    {id : 1, name : '金湾区'},
                    {id : 2, name : '香洲区'},
                ]},
                {id : 3, name : '汕头市', areas : [
                    {id : 0, name : '金平区'},
                    {id : 1, name : '龙湖区'},
                    {id : 2, name : '澄海区'},
                    {id : 3, name : '潮阳区'},
                    {id : 4, name : '潮南区'},
                    {id : 5, name : '濠江区'},
                    {id : 5, name : '惠来县'}
                ]},
                {id : 4, name : '惠州市', areas : [
                    {id : 0, name : '惠城区'},
                    {id : 1, name : '惠阳区'},
                    {id : 2, name : '惠东县'},
                    {id : 3, name : '博罗县'},
                    {id : 4, name : '龙门县'}
                ]}
            ]},
            {id : 1, name : '广西省', cities : [
                {id : 0, name : '南宁市', areas : [
                    {id : 0, name : 'xxxxx'}
                ]},
                {id : 1, name : '北海市', areas : [
                    {id : 0, name : 'xxxxx'}
                ]},
                {id : 2, name : '柳州市', areas : [
                    {id : 0, name : 'xxxxx'}
                ]},
                {id : 3, name : '桂林市', areas : [
                    {id : 0, name : 'xxxxx'}
                ]},
                {id : 4, name : '梧州市', areas : [
                    {id : 0, name : 'xxxxx'}
                ]}
            ]}
        ],
        area : ['天河区','白云区','花都区','黄浦区','番禺区','从化市'],
        radio_index : 0,
        radio_vals : [
            {id : 1, name : '家'},
            {id : 2, name : '公司'},
            {id : 3, name : '其他'},
        ],
        name : '',
        address : '',
        mobile : ''
    },
    onLoad : function (option) {
        var city = this.data.city_detail;
        var radio_vals = this.data.radio_vals
        var app = getApp();
        var obj = this;
        if (option === {}) {
            var id = 0;
        }else{
            var id = option.id;
            wx.request({
                url: `${app.globalData.domain}/mobile/areas/getInfo`,  
                header: {
                    'content-type': 'application/json' // 默认值
                },
                data: {
                    id : id
                },
                method: "POST",
                success(res) {
                    if (res.data.code === 0) {
                        var info = res.data.data.info;
                        var name = info.name;
                        var address = info.address;
                        var mobile = info.mobile;
                        var label = parseInt(info.label);
                        obj.setData({
                            name : name,
                            mobile : mobile,
                            address : address,
                            label : label
                        });
                    }else{
                        wx.showToast({
                            title : res.data.msg,
                            icon : 'none'
                        });
                    }
                }
            });
        }
        wx.request({
            url: `${app.globalData.domain}/mobile/areas/getCities`,  
            header: {
                'content-type': 'application/json' // 默认值
            },
            data: {},
            method: "POST",
            success(res) {
                if (res.data.code === 0) {
                    var data = res.data.data;
                    var list = [[],[]];
                    data.forEach(d => {
                        list[0].push(d.name);
                    });
                    data[0].cities.forEach(c => {
                        list[1].push(c.name);
                    });
                    console.log(list);
                    var pid = data[0].id;
                    var cid = data[0].cities[0].id;
                    var aid = data[0].cities[0].areas[0].id;
                    obj.setData({
                        addr_id : id,
                        pid : pid,
                        cid : cid,
                        aid : aid,
                        city : list,
                        city_detail : data
                    });
                    console.log(pid,cid,aid);
                }
            }
        });
        this.setData({
            city_index : [city[0].id, city[0].cities[0].id],
            area_index : city[0].cities[0].areas[0].id,
            radio_index : radio_vals[0].id
        });
        console.log(this.data.city_index);
        console.log(this.data.area_index);
        console.log(this.data.radio_index);
    },
    cityChange : function (event) {
        var info = event.detail.value;
        var city = this.data.city_detail;
        var areas = city[info[0]].cities[info[1]].areas;
        var a = [];
        areas.forEach(as => {
            a.push(as.name);
        });
        var pid = this.data.city_detail[info[0]].id;
        var cid = this.data.city_detail[info[0]].cities[info[1]].id;
        this.setData({
            pid : pid,
            cid : cid,
            city_index : info,
            area : a,
            area_index : 0
        })
    },
    cityColumnChange : function (event) {
        var column = event.detail.column;
        // console.log(column)
        if (column == 0) {
            var value = event.detail.value;
            var city  = this.data.city;
            var detail= this.data.city_detail[value].cities;
            var c = [];
            var area = [];
            detail.forEach(d => {
                c.push(d.name);
            });
            detail[0].areas.forEach(a => {
                area.push(a.name);
            });
            city[1] = c;
            var city_index = [value,0];
            var pid = this.data.city_detail[value].id;
            // var cid = this.data.city_detail[value[0]].cities[value[1]].id;
            console.log(pid);
            this.setData({
                city_index : city_index,
                city : city,
                area : area,
                area_index : 0
            });
        }else{
            return;
        }
    },
    areaChange : function (event) {
        this.setData({
            area_index : event.detail.value
        });
    },
    radioChange : function (event) {
        this.setData({
            radio_index : event.detail.value
        });
    },
    logNumber : function (event) {
        var value = event.detail.value;
        this.setData({
            address : value
        });
    },
    logName : function (event) {
        var value = event.detail.value;
        this.setData({
            name : value
        });
    },
    logMobile : function (event) {
        var value = event.detail.value;
        this.setData({
            mobile : value
        });
    },
    setLabel : function (event) {
        var id = event.currentTarget.dataset.id;
        this.setData({
            label : id
        });
    },
    submit : function (event) {
        var id = this.data.addr_id;
        var pid = this.data.pid;
        var cid = this.data.cid;
        var aid = this.data.aid;
        var name = this.data.name;
        var address = this.data.address;
        var mobile = this.data.mobile;
        var label = this.data.label;
        var app = getApp();
        var user_id = app.globalData.user_id;
        wx.request({
            url: `${app.globalData.domain}/mobile/areas/submitAddr`,  
            header: {
                'content-type': 'application/json' // 默认值
            },
            data: {
                id : id,
                user_id : user_id,
                pid : pid,
                cid : cid,
                aid : aid,
                name : name,
                address : address,
                mobile : mobile,
                label : label
            },
            method: "POST",
            success(res) {
                wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                });
                if (res.data.code === 0) {
                    setTimeout(() => {
                        wx.navigateBack({ changed: true });
                    }, 500);
                }
            }
        });
    }
})