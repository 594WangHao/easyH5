$(function() {
    //登录页登录功能
    $('.login-page form').submit(function() {
        var pdata = $(this).serialize();
        $.post('/user/login', pdata, function(data) {
            data = JSON.parse(data);
            if (data.status == 200) {
                //刷新页面
                GetQueryString('u') === null ? window.location.href = window.location.href : window.location.href = window.location.origin + GetQueryString('u');
            }else {
                //显示错误提示
                alert(data.msg);
            }
        });
        return false;
    });

    /**
     * 获取 url 中get的参数
     * @param {string} name [要获取的get的参数]
     */
    function GetQueryString(name)
    {
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null)return  unescape(r[2]); return null;
    }

});
