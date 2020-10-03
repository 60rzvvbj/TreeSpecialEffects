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
    childrenId: [12, 13, 14]
});
user.push({
    id: 5,
    userName: '马六',
    childrenId: [9, 10]
});
user.push({
    id: 6,
    userName: '陈七',
    childrenId: [15, 16]
});
user.push({
    id: 7,
    userName: '王八',
    childrenId: [11]
});
user.push({
    id: 8,
    userName: '赵九',
    childrenId: [17]
});
user.push({
    id: 9,
    userName: '周十',
    childrenId: [18]
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
user.push({
    id: 12,
    userName: '十三',
    childrenId: []
});
user.push({
    id: 13,
    userName: '十四',
    childrenId: [19, 20]
});
user.push({
    id: 14,
    userName: '十五',
    childrenId: []
});
user.push({
    id: 15,
    userName: '十六',
    childrenId: [21]
});
user.push({
    id: 16,
    userName: '十七',
    childrenId: [22]
});
user.push({
    id: 17,
    userName: '十八',
    childrenId: []
});
user.push({
    id: 18,
    userName: '智障',
    childrenId: []
});
user.push({
    id: 19,
    userName: '十九',
    childrenId: []
});
user.push({
    id: 20,
    userName: '二十',
    childrenId: []
});
user.push({
    id: 21,
    userName: '二一',
    childrenId: []
});
user.push({
    id: 22,
    userName: '二二',
    childrenId: []
});
user.push({
    id: 23,
    userName: '二三',
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