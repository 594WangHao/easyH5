module.exports = {
    install: function(Vue, options) {
        Vue.prototype.$utils = {
            getCookie: function(key) {
                var cookie = {};
                var arr = document.cookie.split('; ');
                for (var i = 0; i < arr.length; i++) {
                    var _arr = arr[i].split('=');
                    cookie[_arr[0]] = _arr[1];
                }
                return cookie[key];
            },
            setCookie: function(key, value, minute) {
                var date = new Date();
                var minute = minute ? minute : 2;
                date.setTime(date.getTime() + (minute * 60 * 1000));
                var expires = "expires=" + date.toUTCString();
                document.cookie = name + "=" + value + "; " + expires;
            },
            throwError: function(response) {
                if (response.body.code !== 1) {
                    throw new Error(response.body.message);
                }
                return response;
            }
        }
    }

}
