var http = require("http");

var express = require("express");
var bodyParser = require('body-parser');
var app = express();

var dataUrl = '';

app.use(express.static(__dirname + "/"));
app.use(bodyParser.json({limit: 10240000}));

app.get("/getDataUrl/", function(req, res){
    res.send(dataUrl);
});

app.post("/setDataUrl/", function(req, res){
    //var dataUrl = req.query.dataUrl;
    //var dataUrl = req.params.dataUrl;
    dataUrl = req.body.dataUrl;
    res.send("");
});

app.listen(8090);
console.log("server started on 8090")
