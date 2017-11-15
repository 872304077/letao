$(function() {

    // 点击按钮获取验证码

    $('.btn_getcode').on("click", function(e) {
        e.preventDefault();
        var $this = $(this);

        $(this).addClass("disabled saving").prop("disabled", true).text("正在发送中....");

        $.ajax({
            type: "get",
            url: "/user/vCode",
            success: function(data) {
                console.log(data.vCode);

                // 设置计时器,60秒以后可以再次点击

                var count = 10;

                var timeId = setInterval(function() {
                    count--;
                    $this.text(count + "秒后再次发送");
                    if (count <= 0) {
                        $this.removeClass("disable saving").prop("disabled", false).text("获取验证码");
                        clearInterval(timeId);
                    }
                }, 1000)
            }
        });
    })

    // 点击注册按钮

    $('.btn_register').on("click", function() {

        var username = $('[name="username"]').val();
        var password = $('[name="password"]').val();
        var repassword = $('[name="repassword"]').val();
        var mobile = $('[name="mobile"]').val();
        var vCode = $('[name="vCode"]').val();

        // 校验用户名
        if (!username) {
            mui.toast("请输入用户名");
            return false;
        }
        // 校验密码
        if (!password) {
            mui.toast("请输入密码");
            return false;
        }
        // 校验第二次密码
        if (!repassword) {
            mui.toast("请输入第二次密码");
            return false;
        }
        // 校验两次密码是否相同
        if (password != repassword) {
            mui.toast("两次密码不相同");
            return false;
        }

        //  手机号
        if (!mobile) {
            mui.toast("请输入手机号码")
            return false;
        }

        //正则校验不通过
        if (!/^1[34578]\d{9}$/.test(mobile)) {
            mui.toast("请输入正确的手机号");
            return false;
        }
        if (!vCode) {
            mui.toast("请输入验证码");
            return false;
        }

        $.ajax({
            type: "post",
            url: "/user/register",
            data: {
                username: username,
                password: password,
                vCode: vCode,
                mobile: mobile
            },
            success: function(data) {
                console.log(data);
                if (data.success) {
                    mui.toast("恭喜你注册成功.1秒后跳转登录页面");
                    setTimeout(function() {
                        location.href = "login.html";
                    }, 1000);
                } else {
                    mui.toast(data.message);
                }

            }
        });
    })
})