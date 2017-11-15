$(function() {
    $.ajax({
        type: "get",
        url: "/user/queryUserMessage",
        success: function(data) {
            console.log(data);
            tools.checkLogin(data);
            var html = template("tpl", data);
            $('.mui_login').html(html);
        }
    });

    // 退出功能
    $('.btn_logout').on("click", function() {
        $.ajax({
            type: "get",
            url: "/user/logout",
            success: function(data) {
                console.log(data);
                if (data.success) {
                    location.href = "login.html";
                }
            }
        });
    })
})