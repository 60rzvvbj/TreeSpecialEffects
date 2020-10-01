var wildcard = document.querySelectorAll('*');
for (var i = 0; i < wildcard.length; i++) {
    wildcard[i].addEventListener('selectstart', function (e) {
        e.preventDefault();
    })
}
var body = document.querySelector('body');
var dot1 = document.querySelector('.dot1');
var dot2 = document.querySelector('.dot2');
var dot3 = document.querySelector('.dot3');
var dot4 = document.querySelector('.dot4');
var dot5 = document.querySelector('.dot5');
var dot6 = document.querySelector('.dot6');
var children = new Array();
children[0] = dot2;
children[1] = dot3;
children[2] = dot4;
children[3] = dot5;
children[4] = dot6;
var nowChild;
var constLen = 200;
var childLen = 150;
var bfb = 0.95;
var lineDownColor = 'rgb(246, 255, 80)';
var lineUpColor = '#aaa';
var lineColor = lineUpColor;
for (var i = 0; i < children.length; i++) {
    children[i].line = document.createElement('div');
}
var x1, y1;
x1 = dot1.offsetLeft;
y1 = dot1.offsetTop;
for (var i = 0; i < children.length; i++) {
    children[i].x = children[i].offsetLeft;
    children[i].y = children[i].offsetTop;
}

function linkRoot(node) {
    if (node != nowChild) {
        var slen = Math.sqrt((node.x - x1) * (node.x - x1) + (node.y - y1) * (node.y - y1));
        var tlen = constLen + (slen - constLen) * bfb;
        var bl = tlen / slen;
        node.x = x1 + (node.x - x1) * bl;
        node.y = y1 + (node.y - y1) * bl;
        node.style.left = node.x + 'px';
        node.style.top = node.y + 'px';
        setline(node, dot1);
    } else {
        node.style.left = node.x + 'px';
        node.style.top = node.y + 'px';
        setline(node, dot1);
    }
}

function move1(e) {
    var cx = e.clientX;
    var cy = e.clientY;
    x1 = x1 + cx - mx;
    y1 = y1 + cy - my;
    dot1.style.left = x1 + 'px';
    dot1.style.top = y1 + 'px';
    for (var i = 0; i < children.length; i++) {
        linkRoot(children[i]);
    }
    mx = cx;
    my = cy;
}

function move2(e) {
    var cx = e.clientX;
    var cy = e.clientY;
    nowChild.x = nowChild.x + cx - mx;
    nowChild.y = nowChild.y + cy - my;
    linkRoot(nowChild);
    mx = nowChild.x;
    my = nowChild.y;
}
dot1.addEventListener('mousedown', function (e) {
    mx = e.clientX;
    my = e.clientY;
    x1 = dot1.offsetLeft;
    y1 = dot1.offsetTop;
    lineColor = lineDownColor;
    dot1.style.boxShadow = '0px 0px 20px ' + lineDownColor;
    for (var i = 0; i < children.length; i++) {
        children[i].line.style.backgroundColor = lineDownColor;
    }
    document.addEventListener('mousemove', move1);
})

document.addEventListener('mouseup', function () {
    lineColor = lineUpColor;
    for (var i = 0; i < children.length; i++) {
        children[i].line.style.backgroundColor = lineUpColor;
    }
    dot1.style.boxShadow = 'none';
    if (nowChild) {
        nowChild.style.boxShadow = 'none';
    }
    document.removeEventListener('mousemove', move1);
    nowChild = null;
    document.removeEventListener('mousemove', move2);
})

for (var i = 0; i < children.length; i++) {
    children[i].addEventListener('mousedown', function (e) {
        mx = e.clientX;
        my = e.clientY;
        nowChild = this;
        nowChild.style.boxShadow = '0px 0px 20px ' + lineDownColor;
        document.addEventListener('mousemove', move2);
    })
}

function setline(node1, node2) {
    try {
        body.removeChild(node1.line);
    } catch (e) {}
    node1.line = document.createElement('div');
    var x1 = node1.offsetLeft + node1.offsetWidth / 2;
    var y1 = node1.offsetTop + node1.offsetHeight / 2;
    var x2 = node2.offsetLeft + node2.offsetWidth / 2;
    var y2 = node2.offsetTop + node2.offsetHeight / 2;
    var lineLen = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    var xz = (x1 + x2) / 2;
    var yz = (y1 + y2) / 2;
    var k = (y2 - y1) / (x2 - x1);
    var jd = Math.atan(k) * 180 / Math.PI;
    node1.line.style.width = lineLen + 'px';
    node1.line.style.height = '2px';
    node1.line.style.position = 'absolute';
    node1.line.style.left = xz - lineLen / 2 + 'px';
    node1.line.style.top = yz - 1 + 'px';
    node1.line.style.transform = 'rotate(' + jd + 'deg)';
    node1.line.style.backgroundColor = lineColor;
    body.appendChild(node1.line);
}

function separateChild(ch1, ch2) {
    if (ch1 == nowChild || ch2 == nowChild) {
        if (ch2 == nowChild) {
            var t = ch2;
            ch2 = ch1;
            ch1 = t;
        }
        if (ch1.x == ch2.x && ch1.y == ch2.y) {
            ch1.x += 0.00001;
            ch1.y += 0.00001;
        }
        var x2 = ch1.x;
        var x3 = ch2.x;
        var y2 = ch1.y;
        var y3 = ch2.y;
        var cslen = Math.sqrt((x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2));
        if (cslen < childLen) {
            var tlen = childLen - (childLen - cslen) * bfb;
            var cbl = tlen / cslen;
            ch2.x = ch1.x + (ch2.x - ch1.x) * cbl;
            ch2.y = ch1.y + (ch2.y - ch1.y) * cbl;
            linkRoot(ch1);
            linkRoot(ch2);
        }
    } else {
        if (ch1.x == ch2.x && ch1.y == ch2.y) {
            ch1.x += 0.00001;
            ch1.y += 0.00001;
        }
        var x2 = ch1.x;
        var x3 = ch2.x;
        var y2 = ch1.y;
        var y3 = ch2.y;
        var cslen = Math.sqrt((x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2));
        if (cslen < childLen) {
            var tlen = childLen - (childLen - cslen) * bfb;
            var cbl = tlen / cslen;
            var zx = (x2 + x3) / 2;
            var zy = (y2 + y3) / 2;
            ch2.x = zx - (zx - x3) * cbl;
            ch1.x = zx - (zx - x2) * cbl;
            ch2.y = zy - (zy - y3) * cbl;
            ch1.y = zy - (zy - y2) * cbl;
            linkRoot(ch1);
            linkRoot(ch2);
        }
    }
}
setInterval(function () {
    for (var i = 0; i < children.length; i++) {
        for (var j = i + 1; j < children.length; j++) {
            separateChild(children[i], children[j]);
        }
    }
    for (var i = 0; i < children.length; i++) {
        linkRoot(children[i]);
    }
}, 5);