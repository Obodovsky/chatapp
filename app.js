var express = require("express");
var app =express();

var BodyParser = require("body-parser");

app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(BodyParser.urlencoded({extended: true}));

app.set('view engine', 'jade');
app.set('views', './views');

app.get('/', function (req, res) {
    res.render('index', {
        pagetitle: "Главная"


    });

});

var adminRouter = require('./admin');
app.use("/admin",adminRouter);

app.listen(3010, function(){
    console.log("Чат работает на 3010 порту")

});