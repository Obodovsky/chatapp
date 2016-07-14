/**
 * Created by pontipilates on 13.07.16.
 */
var rooms = require("./data/rooms.json");
var express = require("express");
var router = express.Router();
var messages=require("./data/messages.json");
var _ = require("lodash");
var uuid= require("node-uuid");
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
            userId: "44f885e8-87e9-4911-973c-4074188f408a",
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