Page({
    data : {
        city_index : [0,0],
        area_index : 0,
        city : [['广东省','广西省'],['广州市','深圳市','珠海市','汕头市','惠州市']],
        city_detail : [
            {id : 0, name : '广东省', cities : [
                {id : 0, name : '广州市', area : [
                    {id : 0, name : '天河区'},
                    {id : 1, name : '白云区'},
                    {id : 2, name : '花都区'},
                    {id : 3, name : '黄浦区'},
                    {id : 4, name : '番禺区'},
                    {id : 5, name : '从化市'},
                ]},
                {id : 1, name : '深圳市', area : [
                    {id : 0, name : '罗湖区'},
                    {id : 1, name : '福田区'},
                    {id : 2, name : '南山区'},
                    {id : 3, name : '宝安区'},
                    {id : 4, name : '龙华区'},
                    {id : 5, name : '龙岗区'},
                ]},
                {id : 2, name : '珠海市', area : [
                    {id : 0, name : '斗门区'},
                    {id : 1, name : '金湾区'},
                    {id : 2, name : '香洲区'},
                ]},
                {id : 3, name : '汕头市', area : [
                    {id : 0, name : '金平区'},
                    {id : 1, name : '龙湖区'},
                    {id : 2, name : '澄海区'},
                    {id : 3, name : '潮阳区'},
                    {id : 4, name : '潮南区'},
                    {id : 5, name : '濠江区'},
                    {id : 5, name : '惠来县'}
                ]},
                {id : 4, name : '惠州市', area : [
                    {id : 0, name : '惠城区'},
                    {id : 1, name : '惠阳区'},
                    {id : 2, name : '惠东县'},
                    {id : 3, name : '博罗县'},
                    {id : 4, name : '龙门县'}
                ]}
            ]},
            {id : 1, name : '广西省', cities : [
                {id : 0, name : '南宁市', area : [
                    {id : 0, name : 'xxxxx'}
                ]},
                {id : 1, name : '北海市', area : [
                    {id : 0, name : 'xxxxx'}
                ]},
                {id : 2, name : '柳州市', area : [
                    {id : 0, name : 'xxxxx'}
                ]},
                {id : 3, name : '桂林市', area : [
                    {id : 0, name : 'xxxxx'}
                ]},
                {id : 4, name : '梧州市', area : [
                    {id : 0, name : 'xxxxx'}
                ]}
            ]}
        ],
        area : ['天河区','白云区','花都区','黄浦区','番禺区','从化市'],
        radio_index : 0,
        radio_vals : [
            {id : 0, name : '家'},
            {id : 1, name : '公司'},
            {id : 2, name : '其他'},
        ],
        input_vals : {
            house_number : '',
            user_name : '',
            mobile : ''
        }
    },
    onLoad : function () {
        var city = this.data.city_detail;
        var radio_vals = this.data.radio_vals
        this.setData({
            city_index : [city[0].id, city[0].cities[0].id],
            area_index : city[0].cities[0].area[0].id,
            radio_index : radio_vals[0].id
        })
    },
    cityChange : function (event) {
        var info = event.detail.value;
        var city = this.data.city_detail;
        var area = city[info[0]].cities[info[1]].area;
        var a = [];
        area.forEach(as => {
            a.push(as.name);
        });
        this.setData({
            city_index : info,
            area : a,
            area_index : 0
        })
    },
    cityColumnChange : function (event) {
        var column = event.detail.column;
        if (column == 0) {
            var value = event.detail.value;
            var city  = this.data.city;
            var detail= this.data.city_detail[value].cities;
            var c = [];
            var area = [];
            detail.forEach(d => {
                c.push(d.name);
            });
            detail[0].area.forEach(a => {
                area.push(a.name);
            });
            city[1] = c;
            var city_index = [value,0];
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
    logInfo : function (event) {
        var name = event.currentTarget.dataset.name;
        var value = event.detail.value;
        var input_vals = this.data.input_vals;
        input_vals[name] = value;
        this.setData({
            input_vals : input_vals
        });
    },
    submit : function (event) {
        console.log(this.data.city_index);
        console.log(this.data.area_index);
        console.log(this.data.input_vals);
    }
})