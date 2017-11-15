$(function() {

    // 获取商品的id
    var productId = tools.getParam("productId");


    $.ajax({
        type: "get",
        url: "/product/queryProductDetail",
        data: {
            id: productId
        },
        success: function(data) {
            console.log(data);
            var html = template('tpl', data);
            // console.log(html);
            $('.mui-scroll').html(html);


            // 重新加载轮播图
            mui(".mui-slider").slider({
                interval: 1000
            });


            // 点击号码效果

            $('.lt_content').on('click', '.lt_size span', function() {
                // console.log(5555);
                $(this).addClass("now").siblings().removeClass("now");
            })

            // 手动数字框初始化
            mui(".mui-numbox").numbox();
        }
    });

    // 点击传数据去购物车页面
    $('.btn_add_cart').on("click", function() {

        //尺码
        var size = $(".lt_size span.now").html();
        if (!size) {
            mui.toast("请选择商品的尺码");
            return false;
        }
        // 数量
        var num = $('.lt_num .mui-numbox-input').val();

        $.ajax({
            type: "post",
            url: "/cart/addCart",
            data: {
                productId: productId,
                size: size,
                num: num
            },
            success: function(data) {
                // console.log(data);
                tools.checkLogin(data)

                if (data.success) {
                    mui.confirm("您的物品已经添加到了购物车", "温馨提示", ["继续购物", "去购物车"], function(e) {
                        if (e.index == 1) {
                            location.href = "cart.html";
                        }
                    })
                }
            }
        });
    })


});