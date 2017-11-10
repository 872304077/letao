$(function() {

    var currentPage = 1;
    var pageSize = 5;

    function render() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize,
            },
            success: function(data) {
                console.log(data);
                var html = template('tpl', data);
                $('tbody').html(html);

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //指定bootstrap的版本，如果是3，必须指定
                    currentPage: currentPage, //指定当前页
                    totalPages: Math.ceil(data.total / pageSize), //指定总页数
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

    $('.mb_15').on('click', function() {
        $('#addModal').modal('show');
    })
    var $form = $('form');
    $form.bootstrapValidator({
        //小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //校验规则
        fields: {
            categoryName: {

                validators: {
                    //非空
                    notEmpty: {
                        message: "请输入一级分类"
                    }
                }

            }
        }
    });

    $form.on("success.form.bv", function(e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/category/addTopCategory",
            data: $form.serialize(),
            success: function(data) {
                if (data.success) {
                    $('#addModal').modal('hide');
                    currentPage = 1;
                    render();
                    // 清除表单的内容
                    $form.data('bootstrapValidator').resetForm();
                    $form[0].reset();
                }
            }
        });
    })

})