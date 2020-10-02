var tool = new Tool(document, window);
tool.textProhibition();
var body = getDQS('body');
var dot1 = getDQS('.dot1');
var dot2 = getDQS('.dot2');
var dot3 = getDQS('.dot3');
var dot4 = getDQS('.dot4');
var dot5 = getDQS('.dot5');
var dot6 = getDQS('.dot6');
var dot7 = getDQS('.dot7');
var dot8 = getDQS('.dot8');
var dot9 = getDQS('.dot9');
dot1.childArr = [dot2, dot3, dot4];
dot2.childArr = [dot5];
dot4.childArr = [dot6, dot7];
dot6.childArr = [dot8, dot9];
var nowNode;
var nodeConstLen = 120;
var nodeMinLen = 100;
var bfb = 0.9;
var lineDownColor = 'rgb(246, 255, 80)';
var lineUpColor = '#aaa';
var lineColor = lineUpColor;
var constraintArr = new Array();
var setLineArr = new Array();
var mx, my;
var topBoundary = 0;
var leftBoundary = 0;
var bottomBoundary = 700;
var rightBoundary = 1500;
var boundaryMinLength = 100;

function move(e) {
    var cx = e.clientX;
    var cy = e.clientY;
    nowNode.x = nowNode.x + cx - mx;
    nowNode.y = nowNode.y + cy - my;
    mx = nowNode.x;
    my = nowNode.y;
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
        body.appendChild(node1.line);
        var t = nowNode;
        while (t.father) {
            if (t.father.line) {
                t.father.line.style.backgroundColor = lineDownColor;
                body.appendChild(t.line);
            }
            t = t.father;
        }
    } else {
        node1.line.style.backgroundColor = lineColor;
        body.appendChild(node1.line);
    }
}

function setPosition(node) {
    node.style.left = node.x - node.offsetWidth / 2 + 'px';
    node.style.top = node.y - node.offsetHeight / 2 + 'px';
}

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
    } else if (type == 3) {
        var x2 = node1.x;
        var y2 = node1.y;
        if (x2 < leftBoundary + boundaryMinLength) {
            node1.x = node1.x + (leftBoundary + boundaryMinLength - node1.x) * bfb;
        } else if (x2 > rightBoundary - boundaryMinLength) {
            node1.x = node1.x - (node1.x - rightBoundary + boundaryMinLength) * bfb;
        }
        if (y2 - topBoundary < boundaryMinLength) {
            node1.y = node1.y + (topBoundary + boundaryMinLength - node1.y) * bfb;
        } else if (bottomBoundary - y2 < boundaryMinLength) {
            node1.y = node1.y - (node1.y - bottomBoundary + boundaryMinLength) * bfb;
        }
        setPosition(node1);
    }
}
var nodeSet = new Array();

function addTreeConstraint(root, n) {
    if (!root.father) {
        root.addEventListener('mousedown', function () {
            lineColor = lineDownColor;
        });
        root.father = null;
    }
    root.layer = n;
    root.x = root.offsetLeft;
    root.y = root.offsetTop;
    root.addEventListener('mousedown', function (e) {
        mx = e.clientX;
        my = e.clientY;
        nowNode = this;
        nowNode.style.boxShadow = '0px 0px 30px ' + lineDownColor;
        var t = nowNode;
        while (t.father) {
            t.father.style.boxShadow = '0px 0px 30px ' + lineDownColor;
            t = t.father;
        }
        document.addEventListener('mousemove', move);
    });
    nodeSet.push(root);
    var arr = root.childArr;
    if (arr) {
        for (var i = 0; i < arr.length; i++) {
            arr[i].father = root;
            addConstraint(arr[i], root, 1, nodeConstLen);
            addSetLine(arr[i], root);
            addTreeConstraint(arr[i], n + 1);
        }
    }
}
addTreeConstraint(dot1, 0);
for (var i = 0; i < nodeSet.length; i++) {
    nodeSet[i].style.left = getIntRandom(0, 1600) + 'px';
    nodeSet[i].style.top = getIntRandom(0, 700) + 'px';
    nodeSet[i].x = nodeSet[i].offsetLeft;
    nodeSet[i].y = nodeSet[i].offsetTop;
    addConstraint(nodeSet[i], null, 3, null);
    for (var j = i + 1; j < nodeSet.length; j++) {
        if ((nodeSet[i].father != nodeSet[j]) && (nodeSet[j].father != nodeSet[i])) {
            addConstraint(nodeSet[i], nodeSet[j], 2, nodeMinLen);
        }
    }
}
document.addEventListener('mouseup', function () {
    if (nowNode) {
        nowNode.style.boxShadow = 'none';
        var t = nowNode;
        while (t.father) {
            t.father.style.boxShadow = 'none';
            t = t.father;
        }
    }
    nowNode = null;
    lineColor = lineUpColor;
    document.removeEventListener('mousemove', move);
})

setInterval(function () {
    for (var i = 0; i < constraintArr.length; i++) {
        var node1 = constraintArr[i][0];
        var node2 = constraintArr[i][1];
        var type = constraintArr[i][2];
        var len = constraintArr[i][3];
        runConstraint(node1, node2, type, len);
    }
}, 2);
setInterval(function () {
    for (var i = 0; i < setLineArr.length; i++) {
        var node1 = setLineArr[i][0];
        var node2 = setLineArr[i][1];
        setline(node1, node2);
    }
}, 2);