var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'), // security
    fs = require('fs');

// index.html 
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
  });

// Send a message to the visitor
io.sockets.on('connection', function (socket,pseudo) {
    
     // Pseudo 
     socket.on('newvisitor', function(pseudo) {
        pseudo = ent.encode(pseudo);
        socket.pseudo = pseudo;
        socket.broadcast.emit('newvisitor', pseudo);
    });

    // Send message   
    socket.on('message', function (message) {
        message = ent.encode(message);
        socket.broadcast.emit('message',{pseudo: socket.pseudo, message: message});
    });
});

server.listen(8080);