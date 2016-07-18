var express = require("express");
var app =express();
var BodyParser = require("body-parser");
var passport= require("passport");
require("./passport-init");




app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.static("node_modules/jquery/dist"));

app.use(require("./logging.js"));

// Дебаггер
require("express-debug")(app,{});


app.use(BodyParser.urlencoded({extended: true}));
app.use(BodyParser.json());

app.use(require("express-session")({
    secret: "keyboard cat", resave: false, saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'jade');
app.set('views', './views');


var authRouter=require("./auth");
app.use(authRouter);

app.use(function(req, res, next){
    
    res.locals.user=req.user;   
    
    if(req.isAuthenticated()){
        next();
        return;
    }

    res.redirect("/login");

});

app.get('/', function (req, res) {
    res.render('home', {
        pagetitle: "Главная"
        
    });

});

var adminRouter = require('./admin');
app.use("/admin",adminRouter);

var apiRouter=require("./api");
app.use("/api", apiRouter);



app.listen(3010, function(){
    console.log("Чат работает на 3010 порту")

});