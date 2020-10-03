var express = require('express');
var fs = require('fs');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var Mock = require('mockjs');
var user = new Array();
user.push({
    id: 1,
    userName: '张三',
    childrenId: [2, 3, 4]
});
user.push({
    id: 2,
    userName: '李四',
    childrenId: [5, 6]
});
user.push({
    id: 3,
    userName: '王五',
    childrenId: [7, 8]
});
user.push({
    id: 4,
    userName: '狗蛋',
    childrenId: []
});
user.push({
    id: 5,
    userName: '马六',
    childrenId: [9, 10]
});
user.push({
    id: 6,
    userName: '陈七',
    childrenId: []
});
user.push({
    id: 7,
    userName: '王八',
    childrenId: [11]
});
user.push({
    id: 8,
    userName: '赵九',
    childrenId: []
});
user.push({
    id: 9,
    userName: '周十',
    childrenId: []
});
user.push({
    id: 10,
    userName: '十一',
    childrenId: []
});
user.push({
    id: 11,
    userName: '十二',
    childrenId: []
});
var template = {
    id: "@id()",
    username: "@cname()",
    email: "@email()"
}
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static('C:\\Users\\Lenovo\\Desktop\\lsjs'));

app.get('/', function (req, res) {
    fs.readFile('../index.html', 'utf8', function (err, doc) {
        if (err == null) {
            res.send(doc);
        }
    });
});
app.get('/node', function (req, res) {
    var id = req.query.id;
    var judge = false;
    for (var i = 0; i < user.length; i++) {
        if (user[i].id == id) {
            res.send(user[i]);
            judge = true;
            break;
        }
    }
    if (!judge) {
        res.send(false);
    }
});
app.listen(8848);
console.log('服务器已启动 端口号8848');