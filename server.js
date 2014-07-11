var http = require("http");

var express = require("express");
var bodyParser = require('body-parser');
var app = express();

var arr = [];

app.use(express.static(__dirname + "/"));
app.use(bodyParser.json({limit: 102400000}));

app.get("/getDataUrl/", function(req, res){
    var dataUrl = arr.pop();
    arr = [];
    res.send(dataUrl || "");
});

app.post("/setDataUrl/", function(req, res){
    //var dataUrl = req.query.dataUrl;
    //var dataUrl = req.params.dataUrl;
    var dataUrl = req.body.dataUrl;
    arr = [];
    arr.push(dataUrl);
    res.send("");
});

app.listen(8090);
console.log("server started on 8090")
