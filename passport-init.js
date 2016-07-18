/**
 * Created by pontipilates on 17.07.16.
 */
var passport = require("passport");
var LocalStrategy= require("passport-local").Strategy;
var users = require("./data/users.json");
var _=require("lodash");

passport.use(new LocalStrategy(function(username, password, done){
        
        var user = _.find(users, function(u){return u.name===username});
        

        if(!user || user.password !== password)
            {

                done(null, false);
                
                return;
                
            }

        done(null, user);

}));

passport.serializeUser(function(user, done) {
    done(null, user.id)
});

passport.deserializeUser(function(id, done){
    var user=_.find(users, function(u){return u.id===id});
    done(null, user);
});

