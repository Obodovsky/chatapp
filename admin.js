/**
 * Created by pontipilates on 10.06.16.
 */

var uuid= require("node-uuid");
var _ = require("lodash");
var rooms = require("./data/rooms.json");
var express = require("express");
var router = express.Router();
module.exports=router;



router.get('/rooms', function (req, res) {
        res.render('rooms', {
            pagetitle: "Комнатки админов",
            rooms: rooms
        });

});

router.get('/rooms/add', function (req, res) {
        res.render('add');

    });

router.post('/rooms/add', function (req, res) {
        var room = {
            name: req.body.name,
            id: uuid.v4()
        };

        rooms.push(room);

        res.redirect(req.baseUrl+"/rooms");

});

router.route("/rooms/edit/:id").all(function(req, res,next){
    var roomId = req.params.id;

    var room = _.find(rooms, function (r) {
        return r.id === roomId;
    });
    if (!room) {
        res.sendStatus(404);
        return;
    }
    res.locals.room=room;
    next();
})
    .get(function (req, res) {

        res.render('edit');

})
    .post(function (req, res) {
        
        res.locals.room.name = req.body.name;

        res.redirect(req.baseUrl+"/rooms");

});

router.get("/rooms/delete/:id", function (req, res) {
        var roomId = req.params.id;


        rooms = rooms.filter(function (r) {
            return r.id !== roomId;
        });
        res.redirect(req.baseUrl+"/rooms");

    });



