$(function() {
    var currentPage = 1;
    var pageSize = 5;

    function render() {
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function(data) {
                console.log(data);
                var html = template('tpl', data);
                $('tbody').html(html);

                // 渲染分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //指定bootstrap的版本，如果是3，必须指定
                    currentPage: currentPage,
                    totalPages: Math.ceil(data.total / pageSize),
                    onPageClicked: function(a, b, c, page) {
                        //page指的是点击的页码,修改了当前页
                        currentPage = page;
                        //重新渲染
                        render();
                    }
                });
            }
        });
    }
    render();

    $('tbody').on('click', '.btn', function() {
        // console.log("呵呵呵");
        $("#savingModal").modal("show");
        var id = $(this).parent().data('id');
        // 判断是0还是1,然后再发送出去
        var isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
        $(".btn_edit").off().on("click", function() {
            //发送ajax请求
            $.ajax({
                type: "post",
                url: "/user/updateUser",
                data: {
                    id: id,
                    isDelete: isDelete
                },
                success: function(data) {
                    if (data.success) {

                        //操作成功
                        //模态框关闭
                        $("#savingModal").modal("hide");
                        //重新渲染
                        render();

                    }
                }
            });
        });

    })
})