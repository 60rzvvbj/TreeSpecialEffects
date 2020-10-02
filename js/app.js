var express = require('express');
var fs = require('fs');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var Mock = require('mockjs');
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
    res.send(Mock.mock(template));
});
app.listen(8848);
console.log('服务器已启动 端口号8848');