$(function() {
    function getHistory() {
        var history = localStorage.getItem("lt_search_history") || '[]';
        return JSON.parse(history);
    }

    function render() {
        var arr = getHistory();
        var html = template('tpl', { arr: arr });
        // console.log(html);
        $('.lt_history').html(html);
    }
    render();

    // 批量删除搜索记录
    $('.lt_history').on('click', '.btn_empty', function() {
        console.log(88888);
        var $this = $(this);
        mui.confirm("你确定要清空历史记录吗?", "温馨提示", ["取消", "确定"], function(e) {
            if (e.index == 1) {
                localStorage.removeItem("lt_search_history");
                render();
            }
        })
    });


    // 单句删除数据

    $('.lt_history').on("click", '.btn_delete', function() {
        var $this = $(this);
        mui.confirm("你确定要删除这条记录?", "温馨提示", ["否", "是"], function(e) {
            if (e.index == 1) {
                var index = $this.data("index");

                var arr = getHistory();
                console.log(index);
                arr.splice(index, 1);
                localStorage.setItem("lt_search_history", JSON.stringify(arr));
                render();
            }
        })
    })

    // 添加搜索内容

    $('.lt_search button').on('click', function() {
        // console.log(66666);
        var key = $(".lt_search input").val().trim();
        // console.log(key);
        $('.lt_search input').val("");
        if (key == "") {
            mui.toast("请输入你搜索的内容");
            return false;
        }
        // 输入内容后的处理

        var arr = getHistory();
        var index = arr.indexOf(key);

        if (index != -1) {
            arr.splice(index, 1);
        }
        if (arr.length > 10) {
            arr.pop();
        }

        // 无论如何都是从第一个加
        arr.unshift(key);

        localStorage.setItem('lt_search_history', JSON.stringify(arr));
        render();
    })
})