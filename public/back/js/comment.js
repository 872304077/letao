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