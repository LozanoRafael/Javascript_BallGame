var express = require('express');

var app = express();
var server = app.listen(4000);
app.use(express.static('public'));

console.log('My socket server is running!');

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connect', function(socket) {
    var sessionid = socket.id;
});
io.sockets.on('connection', newConnection);


var players = {};
var count = 1;

function newConnection(socket) {
//    console.log(socket);
    
    let playerNum = count;
    
    players['players'+playerNum] = {id: socket.id};
    
    
    
    console.log('new connection: ' + socket.id);
    console.log('player count: ' + count);
    
    
    socket.on('player', playerMsg);
    
    function playerMsg(data) {
        players['players'+playerNum].x = data.x;
        players['players'+playerNum].y = data.y;
        socket.broadcast.emit('players', players);
        
    }
    
    socket.on('disconnect', endConnection);
    
    function endConnection() {
    //    console.log(socket);
        socket.broadcast.emit('delete', socket.id);
        delete players['players'+playerNum];
        console.log('ended connection: ' + socket.id);
        
    }
    
    count++;
}



