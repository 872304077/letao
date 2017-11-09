/**
 * Created by HUCC on 2017/11/8.
 */

//关闭进度环
NProgress.configure({ showSpinner: false });

$(document).ajaxStart(function() {
    NProgress.start();
});

//页面一加载，先发送一个判断用户是否登录的请求，如果登录，不做任何的使用，如果没登录，跳转到登录页面。
//非登陆页发送这个ajax请求
if (location.href.indexOf("login.html") == -1) {
    $.ajax({
        type: "get",
        url: "/employee/checkRootLogin",
        success: function(data) {
            if (data.error === 400) {
                location.href = "login.html";
            }
        }
    });

}


$(document).ajaxStop(function() {
    setTimeout(function() {
        NProgress.done();
    }, 500);
});


$(".child").prev().on("click", function() {
    $(this).next().slideToggle();
});
$('.topbar .btn_menu').on('click', function() {
    $('.ad_aside').toggleClass('now');
    $('.main').toggleClass('now');
})

$(".btn_logout").on("click", function() {
    $("#logoutModal").modal("show");
    $('.btn_confirm').off().on('click', function() {

        $.ajax({
            url: '/employee/employeeLogout',
            type: "get",
            success: function(data) {
                console.log(data);
                if (data.success) {
                    location.href = "login.html";
                }
            }
        })
    })
})