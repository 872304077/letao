/**
 * Created by HUCC on 2017/11/8.
 */

//关闭进度环
NProgress.configure({ showSpinner: false });

$(document).ajaxStart(function() {
    NProgress.start();
});

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