var http = require('http');
var fs = require('fs');

// Loading the index.html file displayed to the client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Loading socket.io
var io = require('socket.io').listen(server);

// Console log 
io.sockets.on('connection', function (socket) {
    console.log('Un visiteur est connecté !');
});

// Send a message to the visitor
io.sockets.on('connection', function (socket) {
    socket.emit('message', 'Vous êtes bien connecté !');
});

server.listen(8080);