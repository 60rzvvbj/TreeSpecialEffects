/**
 *
 * 函数功能:获取页面HTML元素
 * 
 * @returns 返回HTML对象
 * @author 60rzvvbj
 */
function getHtml() {
    return document.documentElement;
}

/**
 *
 * 函数功能:获取单个元素
 * 
 * @param {String} str 元素的选择器
 * @param {Node} obj 获取的元素的父节点，不传入默认为document
 * @returns 返回选择器所对应的对象
 * @author 60rzvvbj
 */
function getDQS(str, obj) {
    return obj ? obj.querySelector(str) : document.querySelector(str);
}

/**
 *
 * 函数功能:获取一坨元素
 * 
 * @param {String} str 元素的选择器
 * @param {Node} obj 获取的元素的父节点，不传入默认为document
 * @returns 返回选择器所对应的对象所组成的数组
 * @author 60rzvvbj
 */
function getDQSA(str, obj) {
    return obj ? obj.querySelectorAll(str) : document.querySelectorAll(str);
}

/**
 * 
 * 新增String函数replaceAll
 * 函数功能：替换全部字符串
 * 
 * @param {string} oldStr 要被替换的字符串
 * @param {string} newStr 用于替换的字符串
 * @returns {string} 替换之后的字符串
 * @author 60rzvvbj
 */
String.prototype.replaceAll = function (oldStr, newStr) {
    str = this;
    while (str.replace(oldStr, newStr) != str) {
        str = str.replace(oldStr, newStr);
    }
    return str;
}