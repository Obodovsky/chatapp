/**
 * Created by pontipilates on 15.07.16.
 */

//Подключаем morgan и выводим пути в access.log
var fs= require("fs");
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})
module.exports=require("morgan")("combined", {stream: accessLogStream});