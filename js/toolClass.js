/*
 * @Author: 60rzvvbj
 * @Date: 2020/5/8
 */
class Tool {
    constructor(document, window) {
        function textProhibition(documen, window) {
            var wildcard = getDQSA('*');
            for (var i = 0; i < wildcard.length; i++) {
                wildcard[i].addEventListener('selectstart', function (e) {
                    e.preventDefault();
                })
            }
        }
        class MouseDragEffect {
            constructor(document, window) {
                var html = getHtml();
                var insertDot = new InsertDot(document, window);
                var bx, by;

                function move(e) {
                    var x, y;
                    if (e.type == 'scroll') {
                        x = bx + window.pageXOffset;
                        y = by + window.pageYOffset;
                    } else {
                        bx = e.pageX - window.pageXOffset;
                        by = e.pageY - window.pageYOffset;
                        x = bx + window.pageXOffset;
                        y = by + window.pageYOffset;
                    }

                    //x,y是添加小圆点的坐标
                    insertDot.run(x, y, 30);
                }

                /**
                 * 启动鼠标特效
                 * 
                 * @author 60rzvvbj
                 */
                this.on = function () {
                    html.addEventListener('mousemove', move);
                    document.addEventListener('scroll', move);
                }

                /**
                 * 关闭鼠标特效
                 * 
                 * @author 60rzvvbj
                 */
                this.off = function () {
                    html.removeEventListener('mousemove', move);
                    document.removeEventListener('scroll', move);
                }
            }
        }

        /**
         * 开启文本不可选中
         * 
         * @author 60rzvvbj
         */
        this.textProhibition = function () {
            textProhibition(document, window);
        }
        var mdeState = 0;
        var mouseDragEffect = new MouseDragEffect(document, window);

        /**
         * 开启/关闭 鼠标轨迹小圆点特效
         * 
         * @author 60rzvvbj
         */
        this.mouseDragEffect = function () {
            if (mdeState == 0) {
                mdeState++;
                mouseDragEffect.on();
            } else {
                mdeState--;
                mouseDragEffect.off();
            }
        }
    }
}

// 获取变色函数的类
class Discoloration {
    constructor() {

        //变色函数
        var red = 255; // r
        var green = 0; // g
        var blue = 0; // b

        /**
         * 返回一个rgb的值(两端没有括号) 'r,g,b'
         * 
         * @author 60rzvvbj
         */
        this.getColor = function () {
            for (var i = 0; i < 50; i++) {
                if (red == 255 && green != 255) {
                    if (blue == 0) {
                        green++;
                    } else {
                        blue--;
                    }
                } else if (green == 255 && blue != 255) {
                    if (red == 0) {
                        blue++;
                    } else {
                        red--;
                    }
                } else {
                    if (green == 0) {
                        red++;
                    } else {
                        green--;
                    }
                }
            }
            return red + ',' + green + ',' + blue;
        };
    }
}

// 添加小圆点的类
class InsertDot {
    constructor(document, window) {
        var discoloration = new Discoloration();
        var body = getDQS('body');

        /**
         * 在指定位置添加逐渐消失的小圆点
         * 小圆点的CSS样式要这样写(类名必须是dot)
         * 
         * 
         * .dot {
         * 
         *       position: absolute;
         *       border-radius: 50%;
         *       transform: translate(-50%, -50%);
         *       pointer-events: none;
         * }
         * 
         * @param {number} x 指定位置的横坐标
         * @param {number} y 指定位置的纵坐标
         * @param {number} r 小圆点的半径
         * @author 60rzvvbj
         */
        this.run = function (x, y, r) {

            // 创建小圆点
            var dot = document.createElement('div');

            // 添加类名
            addClass(dot, 'dot');

            // 获取颜色值
            var rgb = discoloration.getColor();

            // 添加坐标和颜色
            dot.style.left = x + 'px';
            dot.style.top = y + 'px';
            dot.style.zIndex = '10000';
            dot.style.backgroundColor = 'rgba(' + rgb + ',1)';
            var i = 0;

            // 将初始化好的小圆点添加到body中
            body.appendChild(dot);

            // 添加慢慢变大变透明的定时器
            var timer = setInterval(function () {
                if (i < r) {
                    i++;
                    dot.style.width = i / 12 + 'vw';
                    dot.style.height = i / 12 + 'vw';
                    dot.style.backgroundColor = 'rgba(' + rgb + ',' + (1 - i / r) + ')';
                } else {
                    clearInterval(timer);
                    body.removeChild(dot);
                }
            }, 20)
        }
    }
}

/**
 * 算法类
 */
class Algorithm {

    /**
     * 
     * 函数功能：计算出两个整数的最大公约数
     * 
     * @param {number} a 第一个参数
     * @param {number} b 第二个参数
     * @returns {number} 计算结果
     * @author 60rzvvbj
     */
    static gcd(a, b) {
        return b == 0 ? a : this.gcd(b, a % b);
    }

    /**
     * 
     * 函数功能：计算出两个整数的最小公倍数
     * 
     * @param {number} a 第一个参数
     * @param {number} b 第二个参数
     * @returns {number} 计算结果
     * @author 60rzvvbj
     */
    static lcm(a, b) {
        return a / this.gcd(a, b) * b;
    }

    /**
     * 
     * 函数功能：计算欧拉函数φ(n)
     * 
     * @param {number} n 参数n
     * @returns {number} 计算结果
     * @author 60rzvvbj
     */
    static euler(n) {
        var res = n;
        for (var i = 2; i <= n / i; i++) {
            if (n % i == 0) {
                res = res * (i - 1) / i;
                while (n % i == 0) {
                    n /= i;
                }
            }
        }
        if (n > 1)
            res = res * (n - 1) / n;
        return res;
    }

    /**
     * 
     * 函数功能：求a的b次幂模c <=> (a^b)%c
     * 
     * @param {number} a 参数a
     * @param {number} b 参数b
     * @param {number} c 参数c
     * @returns {number} 计算结果
     * @author 60rzvvbj
     */
    static powMod(a, b, c) {
        var ans = 1;
        a = a % c;
        while (b > 0) {
            if (b & 1)
                ans = (ans * a) % c;
            b >>= 1;
            a = a * a % c;
        }
        return ans;
    }
}

/**
 * 
 * 验证码类
 * 
 */
class verificationCode {
    constructor(codeBox, n) {

        // 将字体范围，颜色范围，旋转范围，平移范围初始化
        var minFontsize = 16;
        var maxFontsize = 16;
        var minColor = 0;
        var maxColor = 0;
        var minRotate = 0;
        var maxRotate = 0;
        var minTranslateX = 0;
        var maxTranslateX = 0;
        var minTranslateY = 0;
        var maxTranslateY = 0;

        /**
         * 
         * 函数功能：设置验证码字体大小的范围（单位默认px）
         * 
         * @param {number} min 最小值
         * @param {number} max 最大值
         */
        this.setFontSize = function (min, max) {
            minFontsize = min;
            maxFontsize = max;
        }

        /**
         * 
         * 函数功能：设置字体颜色范围（0~255）
         * 
         * @param {number} min 最小值
         * @param {number} max 最大值
         */
        this.setColor = function (min, max) {
            minColor = min;
            maxColor = max;
        }

        /**
         * 
         * 函数功能：设置旋转范围（单位默认deg）
         * 
         * @param {number} min 最小值
         * @param {number} max 最大值
         */
        this.setRotate = function (min, max) {
            minRotate = min;
            maxRotate = max;
        }

        /**
         * 
         * 函数功能：设置验证码每个字符的平移范围
         * 
         * @param {number} minX 横坐标最小值
         * @param {number} maxX 横坐标最大值
         * @param {number} minY 纵坐标最小值
         * @param {number} maxY 纵坐标最大值
         */
        this.setTranslate = function (minX, maxX, minY, maxY) {
            minTranslateX = minX;
            maxTranslateX = maxX;
            minTranslateY = minY;
            maxTranslateY = maxY;
        }

        // 让验证码无法被选中
        codeBox.parentNode.addEventListener('selectstart', function (e) {
            e.preventDefault();
        })

        // 初始化验证码字符库
        var arr = new Array();
        arrayAddChar(arr, 65, 26);
        arrayAddChar(arr, 97, 26);
        arrayAddChar(arr, 48, 10);

        /**
         * 
         * 函数功能：生成验证码并返回验证码对应的字符串
         * 
         * @returns {string} 验证码对应的字符串
         * @author 60rzvvbj
         */
        this.run = function () {

            // 初始化用来保存验证码对应的字符串str
            var str = '';

            // 删除所有子节点
            while (codeBox.hasChildNodes()) {
                codeBox.removeChild(codeBox.firstChild);
            }

            // 生成新的验证码
            for (var i = 0; i < n; i++) {
                var span = document.createElement('span');
                span.innerHTML = arr[getIntRandom(0, arr.length - 1)];

                // 根据设置的范围（如果没设置就根据初始化的）设置随机的样式
                span.style.display = 'inline-block';
                span.style.fontSize = getIntRandom(minFontsize, maxFontsize) + 'px';
                span.style.color = 'rgb(' + getIntRandom(minColor, maxColor) + ',' + getIntRandom(minColor, maxColor) + ',' + getIntRandom(minColor, maxColor) + ')';
                span.style.transform = 'translate(' + getIntRandom(minTranslateX, maxTranslateX) + 'px, ' + getIntRandom(minTranslateY, maxTranslateY) + 'px) rotate(' + getIntRandom(minRotate, maxRotate) + 'deg)';

                // 记录生成的验证码
                str += span.innerHTML;
                codeBox.appendChild(span);
            }

            // 返回生成的二维码所对应的字符串
            return str;
        }
    }
}

/**
 * 模块向上滑动特效类
 * 
 * 使用方法：
 * 
 * 创建此类的实例对象后，将要添加特效的模块通过调用提供的add或addArr函数添加到其中
 * 添加好元素之后，调用ready函数开始运行此特效
 */
class GoTopEffect {

    /**
     * 
     * 函数功能：创建向上滑动特效类
     * 
     * @param {number} top 滑动距离
     * @param {number} len 误差距离
     * @param {number} time 滑动时间
     * @author 60rzvvbj
     */
    constructor(top, len, time) {

        // 用一个变量储存当前对象
        var that = this;

        // 创建对象数组
        this.objArr = new Array();

        /**
         * 
         * 函数功能：添加一个元素到对象数组中
         * 
         * @param {Node} obj 对象
         * @author 60rzvvbj
         */
        this.add = function (obj) {
            this.objArr[this.objArr.length] = obj;
        }

        /**
         * 
         * 函数功能：添加一组元素到对象数组中
         * 
         * @param {Array} arr 一组对象
         * @author 60rzvvbj
         */
        this.addArr = function (arr) {
            for (var i = 0; i < arr.length; i++) {
                this.objArr[this.objArr.length] = arr[i];
            }
        }

        /**
         * 
         * 函数功能：已经添加完所有元素之后，调用此函数开始运行特效
         * @author 60rzvvbj
         */
        this.ready = function () {

            // 先给所有模块都事先先把透明度改为0，再向下平移一段距离
            for (var i = 0; i < this.objArr.length; i++) {
                this.objArr[i].style.transform = 'translateY(' + top + 'px)';
                this.objArr[i].style.opacity = '0';
            }

            // 再设置过渡属性
            setTimeout(function () {
                for (var i = 0; i < that.objArr.length; i++) {
                    that.objArr[i].style.transition = 'transform ' + time + 's, opacity ' + time + 's';
                }
            }, 100);

            // 每次页面滚动的时候调用rum函数
            document.addEventListener('scroll', this.run);

            // 事先先调用一次run函数
            this.run();
        }

        /**
         * 
         * 函数功能：运行特效
         * @author 60rzvvbj
         */
        this.run = function () {

            // 初始化用户可视范围
            var l = window.pageYOffset;
            var r = window.innerHeight + l - len;
            l += len;

            // 如果模块当前在可视范围内就将其复原初始状态（也就是向上滑动的效果）
            for (var i = 0; i < that.objArr.length; i++) {
                if (that.objArr[i].offsetTop + that.objArr[i].offsetHeight >= l && that.objArr[i].offsetTop <= r) {
                    that.objArr[i].style.transform = 'translateY(0px)';
                    that.objArr[i].style.opacity = '1';
                }
            }

            // 每次运行完判断一下特效是否运行结束
            that.judge();
        }

        /**
         * 
         * 函数功能：判断特效是否已运行完毕
         * @author 60rzvvbj
         */
        this.judge = function () {

            // 判断是不是所有模块都已经回到原位了，如果是，则清除页面滚动事件
            var flag = true;
            for (var i = 0; i < this.objArr.length; i++) {
                if (this.objArr[i].style.opacity != '1') {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                document.removeEventListener('scroll', this.run);
            }
        }
    }
}