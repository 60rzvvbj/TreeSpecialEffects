var tool = new Tool(document, window);
tool.textProhibition();
var body = getDQS('body');
var dot1 = getDQS('.dot1');
var dot2 = getDQS('.dot2');
var dot3 = getDQS('.dot3');
var dot4 = getDQS('.dot4');
var dot5 = getDQS('.dot5');
var dot6 = getDQS('.dot6');
var children = new Array();
children[0] = dot2;
children[1] = dot3;
children[2] = dot4;
// children[3] = dot5;
// children[4] = dot6;
var nowNode;
var constLen = 200;
var childLen = 150;
var bfb = 0.8;
var lineDownColor = 'rgb(246, 255, 80)';
var lineUpColor = '#aaa';
var lineColor = lineUpColor;
for (var i = 0; i < children.length; i++) {
    children[i].line = document.createElement('div');
    children[i].style.left = getIntRandom(0, 1600) + 'px';
    children[i].style.top = getIntRandom(0, 700) + 'px';
}
dot1.style.left = getIntRandom(0, 1600) + 'px';
dot1.style.top = getIntRandom(0, 700) + 'px';
dot1.x = dot1.offsetLeft;
dot1.y = dot1.offsetTop;
dot5.style.left = getIntRandom(0, 1600) + 'px';
dot5.style.top = getIntRandom(0, 700) + 'px';
dot5.x = dot5.offsetLeft;
dot5.y = dot5.offsetTop;
dot6.style.left = getIntRandom(0, 1600) + 'px';
dot6.style.top = getIntRandom(0, 700) + 'px';
dot6.x = dot6.offsetLeft;
dot6.y = dot6.offsetTop;
dot5.addEventListener('mousedown', function (e) {
    mx = e.clientX;
    my = e.clientY;
    nowNode = this;
    nowNode.style.boxShadow = '0px 0px 30px ' + lineDownColor;
    document.addEventListener('mousemove', move2);
})
dot6.addEventListener('mousedown', function (e) {
    mx = e.clientX;
    my = e.clientY;
    nowNode = this;
    nowNode.style.boxShadow = '0px 0px 30px ' + lineDownColor;
    document.addEventListener('mousemove', move2);
})
for (var i = 0; i < children.length; i++) {
    children[i].x = children[i].offsetLeft;
    children[i].y = children[i].offsetTop;
}

function move1(e) {
    var cx = e.clientX;
    var cy = e.clientY;
    dot1.x = dot1.x + cx - mx;
    dot1.y = dot1.y + cy - my;
    dot1.style.left = dot1.x + 'px';
    dot1.style.top = dot1.y + 'px';
    mx = cx;
    my = cy;
}

function move2(e) {
    var cx = e.clientX;
    var cy = e.clientY;
    nowNode.x = nowNode.x + cx - mx;
    nowNode.y = nowNode.y + cy - my;
    mx = nowNode.x;
    my = nowNode.y;
}
dot1.addEventListener('mousedown', function (e) {
    nowNode = this;
    mx = e.clientX;
    my = e.clientY;
    dot1.x = dot1.offsetLeft;
    dot1.y = dot1.offsetTop;
    lineColor = lineDownColor;
    dot1.style.boxShadow = '0px 0px 30px ' + lineDownColor;
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
    if (nowNode) {
        nowNode.style.boxShadow = 'none';
    }
    nowNode = null;
    document.removeEventListener('mousemove', move1);
    document.removeEventListener('mousemove', move2);
})

for (var i = 0; i < children.length; i++) {
    children[i].addEventListener('mousedown', function (e) {
        mx = e.clientX;
        my = e.clientY;
        nowNode = this;
        nowNode.style.boxShadow = '0px 0px 30px ' + lineDownColor;
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
    if (node1 == nowNode) {
        node1.line.style.backgroundColor = lineDownColor;
    } else {
        node1.line.style.backgroundColor = lineColor;
    }
    body.appendChild(node1.line);
}

function setPosition(node) {
    node.style.left = node.x + 'px';
    node.style.top = node.y + 'px';
}
var constraintArr = new Array();
var setLineArr = new Array();

function addSetLine(node1, node2) {
    setLineArr.push([node1, node2]);
}

function addConstraint(node1, node2, type, len) {
    constraintArr.push([node1, node2, type, len]);
}

function runConstraint(node1, node2, type, len) {
    if (type == 1) { //定长约束
        if (node1 == nowNode || node2 == nowNode) {
            if (node2 == nowNode) {
                var t = node2;
                node2 = node1;
                node1 = t;
            }
            if (node1.x == node2.x && node1.y == node2.y) {
                node1.x += 0.00001;
                node1.y += 0.00001;
            }
            var x2 = node1.x;
            var x3 = node2.x;
            var y2 = node1.y;
            var y3 = node2.y;
            var cslen = Math.sqrt((x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2));
            if (cslen != len) {
                var tlen = len - (len - cslen) * bfb;
                var cbl = tlen / cslen;
                node2.x = node1.x + (node2.x - node1.x) * cbl;
                node2.y = node1.y + (node2.y - node1.y) * cbl;
                setPosition(node1);
                setPosition(node2);
            }
        } else {
            if (node1.x == node2.x && node1.y == node2.y) {
                node1.x += 0.00001;
                node1.y += 0.00001;
            }
            var x2 = node1.x;
            var x3 = node2.x;
            var y2 = node1.y;
            var y3 = node2.y;
            var cslen = Math.sqrt((x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2));
            if (cslen != len) {
                var tlen = len - (len - cslen) * bfb;
                var cbl = tlen / cslen;
                var zx = (x2 + x3) / 2;
                var zy = (y2 + y3) / 2;
                node2.x = zx - (zx - x3) * cbl;
                node1.x = zx - (zx - x2) * cbl;
                node2.y = zy - (zy - y3) * cbl;
                node1.y = zy - (zy - y2) * cbl;
                setPosition(node1);
                setPosition(node2);
            }
        }
    } else if (type == 2) { //最小长度约束
        if (node1 == nowNode || node2 == nowNode) {
            if (node2 == nowNode) {
                var t = node2;
                node2 = node1;
                node1 = t;
            }
            if (node1.x == node2.x && node1.y == node2.y) {
                node1.x += 0.00001;
                node1.y += 0.00001;
            }
            var x2 = node1.x;
            var x3 = node2.x;
            var y2 = node1.y;
            var y3 = node2.y;
            var cslen = Math.sqrt((x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2));
            if (cslen < len) {
                var tlen = len - (len - cslen) * bfb;
                var cbl = tlen / cslen;
                node2.x = node1.x + (node2.x - node1.x) * cbl;
                node2.y = node1.y + (node2.y - node1.y) * cbl;
                setPosition(node1);
                setPosition(node2);
            }
        } else {
            if (node1.x == node2.x && node1.y == node2.y) {
                node1.x += 0.00001;
                node1.y += 0.00001;
            }
            var x2 = node1.x;
            var x3 = node2.x;
            var y2 = node1.y;
            var y3 = node2.y;
            var cslen = Math.sqrt((x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2));
            if (cslen < len) {
                var tlen = len - (len - cslen) * bfb;
                var cbl = tlen / cslen;
                var zx = (x2 + x3) / 2;
                var zy = (y2 + y3) / 2;
                node2.x = zx - (zx - x3) * cbl;
                node1.x = zx - (zx - x2) * cbl;
                node2.y = zy - (zy - y3) * cbl;
                node1.y = zy - (zy - y2) * cbl;
                setPosition(node1);
                setPosition(node2);
            }
        }
    }
}

for (var i = 0; i < children.length; i++) {
    addConstraint(dot1, children[i], 1, constLen);
    addSetLine(children[i], dot1);
    addConstraint(dot5, children[i], 2, childLen);
    addConstraint(dot6, children[i], 2, childLen);
    for (var j = i + 1; j < children.length; j++) {
        addConstraint(children[i], children[j], 2, childLen);
    }
}

addConstraint(dot4, dot5, 1, constLen);
addConstraint(dot4, dot6, 1, constLen);
addConstraint(dot5, dot6, 2, childLen);
addSetLine(dot5, dot4);
addSetLine(dot6, dot4);
addConstraint(dot5, dot1, 2, childLen);
addConstraint(dot6, dot1, 2, childLen);
setInterval(function () {
    for (var i = 0; i < constraintArr.length; i++) {
        var node1 = constraintArr[i][0];
        var node2 = constraintArr[i][1];
        var type = constraintArr[i][2];
        var len = constraintArr[i][3];
        runConstraint(node1, node2, type, len);
    }
}, 5);
setInterval(function () {
    for (var i = 0; i < setLineArr.length; i++) {
        var node1 = setLineArr[i][0];
        var node2 = setLineArr[i][1];
        setline(node1, node2);
    }
}, 5);