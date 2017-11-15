$(function() {
    mui.init({
        pullRefresh: {
            container: ".mui-scroll-wrapper", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                style: 'circle', //必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                auto: true, //可选,默认false.首次加载自动上拉刷新一次
                //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据
                callback: function() {
                    // ajax获取新数据

                    $.ajax({
                        type: "get",
                        url: "/cart/queryCart",
                        success: function(data) {
                            console.log(data);
                            setTimeout(function() {
                                tools.checkLogin(data);

                                var html = template("tpl", { data: data })
                                $('.mui-table-view').html(html);

                                $('.total').text("00.00");

                                mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
                            }, 1000)
                        }
                    });
                }
            }
        }
    });

    // 删除商品

    $('.lt_content').on("tap", ".btn_delete_cart", function() {
        $this = $(this);

        var id = $this.data('id');
        mui.confirm("你确定删除此项商品?", "温馨提示", ["是", "否"], function(e) {
            if (e.index === 0) {

                console.log(5555);

                $.ajax({
                    type: "get",
                    url: "/cart/deleteCart",
                    data: {
                        id: id,
                    },

                    success: function(data) {
                        console.log(data);
                        if (data.success) {

                            mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                        }
                    }
                });
            }
        })
    })

    // 编辑商品
    $(".lt_content").on("tap", ".btn_edit_cart", function() {

        var data = this.dataset;

        //渲染一个模板，修改商品
        var html = template("tpl2", data);
        //去除html中所有的换行，
        html = html.replace(/\n/g, "");

        //显示confirm框
        mui.confirm(html, "编辑商品", ["确定", "取消"], function(e) {
            if (e.index === 0) {
                //点击了确定按钮，获取参数，发送ajax请求
                var id = data.id;
                var size = $(".lt_edit_size span.now").html();
                var num = $(".lt_edit_num .mui-numbox-input").val();

                $.ajax({
                    type: "post",
                    url: "/cart/updateCart",
                    data: {
                        id: id,
                        size: size,
                        num: num
                    },
                    success: function(data) {
                        if (data.success) {
                            //手动下拉刷新
                            mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                        }
                    }
                });
            }
        });

        //选择尺码，lt_edit_size下span注册
        $(".lt_edit_size span").on("tap", function() {
            $(this).addClass("now").siblings().removeClass("now");
        });


        //初始化数字框
        mui(".mui-numbox").numbox();


    });



    //给要所有的checkbox注册点击事件
    $(".lt_content").on("change", ".ck", function() {

        //获取到选中的checkbox

        //计算总金额
        var total = 0;
        $(".ck:checked").each(function() {

            //获取当前元素的价钱和数量。
            total += this.dataset.price * this.dataset.num;

        });

        //保留2位小数
        $(".lt_total .total").html(total.toFixed(2));

    });

})