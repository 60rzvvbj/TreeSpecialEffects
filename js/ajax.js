/**
 * 
 * 函数功能：ajax
 * 
 * @param options 请求的配置对象
 * 
 * 注意事项：
 * 
 * 传入的对象应满足此格式↓
 * ```js
 * {
 *      type: ('get'/'set'), // 请求方式
 *      url: '', // 请求地址(必填)
 *      data: {}, // 参数(对象形式)
 *      header: {}, // 请求头(对象形式)
 *      success: function() {} , // 成功函数(必填)
 *      error: function() {} // 失败函数
 * }
 * ```
 * @author 60rzvvbj
 */
function ajax(options) {

    // 默认的请求配置对象,再用传入的对象覆盖默认配置对象,这样可以避免传参数的时候需要写所有的属性
    var defaults = {
        type: 'get', // 请求方式
        url: '', // 请求地址
        data: {}, // 参数(对象形式)
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }, // 请求头
        success: function () {}, // 成功函数
        error: function () {} // 失败函数
    }
    Object.assign(defaults, options);

    // 创建XMLHttpRequest对象
    var xhr = new XMLHttpRequest();

    // 拼接参数
    var parameter = '';
    for (var t in defaults.data) {
        parameter += t + '=' + defaults.data[t] + '&';
    }
    parameter = parameter.substring(0, parameter.length - 1);

    // 判断请求方式，并根据请求方式做不同的处理
    if (defaults.type == 'get') {
        defaults.url = defaults.url + '?' + parameter;
        xhr.open(defaults.type, defaults.url);
        xhr.send();
    } else {
        xhr.open(defaults.type, defaults.url);
        var contentType = defaults.header['Content-Type'];
        xhr.setRequestHeader('Content-Type', contentType);
        if (contentType == 'application/json') {
            xhr.send(JSON.stringify(defaults.data));
        } else {
            xhr.send(parameter);
        }
    }

    // 设置onload函数
    xhr.onload = function () {

        // 对返回结果做处理，如果是json就把返回的json字符串转化成json对象
        var contentType = xhr.getResponseHeader('Content-Type');
        var responseText = xhr.responseText;
        if (contentType.includes('application/json')) {
            responseText = JSON.parse(responseText);
        }

        // 判断状态码并根据判断结果调用不同函数
        if (xhr.status == 200) {
            defaults.success(responseText, xhr);
        } else {
            defaults.error(responseText, xhr);
        }
    }
}