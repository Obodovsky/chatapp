/**
 * Created by pontipilates on 13.07.16.
 */
var rooms = require("./data/rooms.json");
var express = require("express");
var router = express.Router();
var messages=require("./data/messages.json");
var _ = require("lodash");
module.exports=router;

router.get("/rooms", function(req, res){

    res.json(rooms);

});

router.get("/rooms/:roomId/messages", function(req, res){

    var roomId=req.params.roomId;
    var roomMessages=messages
    .filter(function(m){
        return m.roomId===roomId;
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

});