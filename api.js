/**
 * Created by pontipilates on 13.07.16.
 */
var rooms = require("./data/rooms.json");
var express = require("express");
var router = express.Router();
var messages=require("./data/messages.json");
var _ = require("lodash");
var uuid= require("node-uuid");
var users = require("./data/users.json");
module.exports=router;

router.get("/rooms", function(req, res){

    res.json(rooms);

});

router.route("/rooms/:roomId/messages")
    .get(function(req, res){
        var roomId=req.params.roomId;


        var roomMessages=messages
        .filter(function(m){
            return m.roomId===roomId;
        })
        .map(function(m){
            var user =_.find(users, function(u){return u.id===m.userId});
            return {text: user.name + ": "+ m.text}

        });

        var room = _.find(rooms, function (r) {
            return r.id === roomId;
        });
        if (!room) {
            res.sendStatus(404);
            return;
        }

        res.json({
            room: room,
            messages: roomMessages

        })

    })

    .post(function (req, res){
        var roomId=req.params.roomId;
        var message = {
            roomId: roomId,
            text: req.body.text,
            userId: req.user.id,
            id: uuid.v4()
        };
        messages.push(message);
        res.sendStatus(200);

    })
    delete(function(req, res){
        var roomId=req.params.roomId;
        messages = messages.filter(
            function(m){
                return m.roomId!==roomId
            });
        res.sendStatus(200);
    })