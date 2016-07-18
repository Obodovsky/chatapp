/**
 * Created by pontipilates on 15.07.16.
 */

var express = require("express");
var router = express.Router();
var passport = require("passport");
var users = require("./data/users.json");

module.exports = router;

router.get("/login", function(req, res){

    if(req.app.get("env")==="development")
    {
        var user =users[0];
        req.logIn(user,function(err){
            if (err){
                return next(err);
            }
            return res.redirect("/")
        });
        return;
    }
    res.render("login", {
        loginMessage: ""
    });
    
});
router.post("/login",
    passport.authenticate("local",{
            successRedirect: "/",
            failureRedirect:"/login"
    }));

router.get("/logout", function(req, res){
    req.logout();
    res.redirect('/login')
});

