$(function() {
    currentPage = 1;
    pageSize = 100;

    var key = tools.getParam("key");
    $(".lt_search input").val(key);

    function render() {
        var type = $('.lt_sort a[data-type].now').data("type");
        var num = $('.lt_sort a[data-type].now').find("span").hasClass("fa-angle-down") ? 2 : 1;

        // 将参数封装成对象
        var obj = {}
        obj.proName = key;
        obj.page = currentPage;
        obj.pageSize = pageSize;

        if (type) {
            obj[type] = num;
        }

        $.ajax({
            type: "get",
            url: "/product/queryProduct",
            data: obj,
            success: function(data) {
                // console.log(data);
                setTimeout(function() {
                    var html = template("tpl", data)
                    $('.lt_product').html(html)
                }, 1000);
            }
        })
    }
    render();
    // 点击搜索
    $('.mui-btn-blue').on("click", function() {
        console.log(8888);
        key = $('.lt_search input').val();
        if (key == "") {
            mui.toast("请输入需要查询的内容");
            return false;
        }

        $('.lt_sort a').removeClass('now').find('span').addClass('fa-angle-down')

        $(".lt_product").html('<div class="loading"></div>');
        render();
    })


    // 价格选项

    $('.lt_sort [data-type]').on("click", function() {
        var $this = $(this);
        if ($this.hasClass("now")) {
            $this.find("span").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
        } else {
            $this.addClass("now").siblings().removeClass("now");
            $(".lt_sort a").find("span").removeClass("fa-angle-up").addClass("fa-angle-down");

        }
        $(".lt_product").html('<div class="loading"></div>');
        render();
    })
})