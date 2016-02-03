var fs = require("fs");
var http = require("http");


http.createServer(function(req, res) {
    var rs = fs.createReadStream('/path/to/big/file');
    rs.on('data', function(data) {
        res.write(data);
    });
    rs.on('end', function() {
        res.end();
    });
}).listen(8080);
console.log("Server listening to port 8080...");

http.createServer( function(req, res) {
    var rs = fs.createReadStream('/path/to/big/file');
    rs.on('data', function(data) {
        if (!res.write(data)) {
            rs.pause();
        }
    });
    res.on('drain', function() {
        rs.resume();
    });
    rs.on('end', function() {
        res.end();
    });
}).listen(8080);
console.log("Server listening to port 8080...");

// using stream.pipe()
http.createServer(function(req, res) {
    var rs = fs.createReadStream('/path/to/big/file');
    rs.pipe(res);
}).listen(8080);

// overriding the default end when using pipe.
http.createServer(function(req, res) {
    var rs = fs.createReadStream('/path/to/big/file');
    rs.pipe(res, { end: false });
    rs.on('end', function() {
        res.write("And that's all, folks!");
        res.end();
    });
}).listen(8080);