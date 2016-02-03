/*
var net = require("net");
net.createServer(function(socket) {
    // new connection
    socket.on('data', function(data) {
        // got data
        console.log("logged in");
    });
    socket.on('end', function(data) {
        // connection closed
        console.log("logged out");
    });
    socket.write(`'Some string'`);
}).listen(4001);
*/

/*
var server = require('net').createServer();
var port = 4001;
server.on('listening', function() {
    console.log('Server is listening on port', port);
});
server.on('connection', function(socket) {
    console.log('Server has a new connection');
    socket.end();
    server.close();
});
server.on('close', function() {
    console.log('Server is now closed');
});
server.on('error', function(err) {
    console.log('Error occurred:', err.message);
});
server.listen(port);
*/

/*
var server = require('net').createServer(function(socket) {
    console.log('new connection');
    socket.setEncoding('UTF-8');
    socket.write("Hello! You can start typing. Type 'quit' to exit.\n");
    socket.on('data', function(data) {
        console.log('got:', data.toString())
        if (data.trim().toLowerCase() === 'quit') {
            socket.write('Bye bye!');
            return socket.end();
        }
        //socket.write(data); which will give double entry in the console        
    });
    socket.on('end', function() {
        console.log('Client connection ended');
    });
}).listen(4001);
*/

/*
var ws = require('fs').createWriteStream('mysocketdump.txt');
require('net').createServer(function(socket) {
    socket.pipe(ws);
}).listen(4001);
*/

/*
require('net').createServer(function(socket) {
    var rs = require('fs').createReadStream('mysocketdump.txt');
    rs.pipe(socket);
    //socket.end();
}).listen(4001);

console.log("Server listening to port 4001...");
*/

/*
// Idle Sockets
var timeout = 60000; // 1 minute
socket.setTimeout(timeout);
socket.on('timeout', function() {
    socket.write('idle timeout, disconnecting, bye!');
    socket.end();
});

// or

socket.setTimeout(60000, function() {
    socket.end('idle timeout, disconnecting, bye!');
});
*/


var net = require('net');
var server = net.createServer();
var sockets = [];
server.on("listening", function(){
   console.log("Server listening to port 4001...");
});
server.on('connection', function(socket) {
    console.log('got a new connection');
    sockets.push(socket);
    socket.on('data', function(data) {
        console.log('got data:', data);
        sockets.forEach(function(otherSocket) {
            if (otherSocket !== socket) {
                otherSocket.write(data);
            }
        });
    });
    socket.on('close', function() {
        console.log('connection closed');
        var index = sockets.indexOf(socket);
        sockets.splice(index, 1);
    });
});
server.on('error', function(err) {
    console.log('Server error:', err.message);
});
server.on('close', function() {
    console.log('Server closed');
});
server.listen(4001);