/**
 * Created by HUCC on 2017/11/11.
 */

//区域滚动功能
mui(".mui-scroll-wrapper").scroll({
    indicators: false
});


//轮播图自动播放功能
var gallery = mui('.mui-slider');
gallery.slider({
    interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
});

// 传参数的工具函数的封装

var tools = {
    getParamObj: function() {
        // 获取一个地址
        // 通过location.search可以获取带参数的地址
        var search = location.search;
        // 解码地址
        search = decodeURI(search);

        // 提取地址所需要的字段
        search = search.slice(1);

        // 把&这前后的数组成对象
        var arr = search.split("&");
        var obj = {};

        for (var i = 0; i < arr.length; i++) {
            var k = arr[i].split("=")[0];
            var v = arr[i].split("=")[1];
            obj[k] = v;
        }
        return obj;
    },
    getParam: function(key) {
        return this.getParamObj()[key];
    },
    checkLogin: function(data) {
            if (data.error === 400) {
                location.href = "login.html?retUrl=" + location.href;
            }
        }
        //作业：var obj = {name:"zs", age:18, desc:"呵呵"}  转换成字符串  name=zs&age=18&desc=呵呵
}