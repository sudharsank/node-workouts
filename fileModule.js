var fs = require("fs");

// Existence of the Path
fs.exists('./pathModule.js', function(exists) {
    console.log('exists:', exists);
});
fs.exists('/etc/passwd', function(exists) {
    console.log('exists:', exists);
});

// Querying File Statistics
fs.stat('./pathModule.js', function(err, stats){
    console.log(stats);
    console.log(stats.isFile());
    console.log(stats.isDirectory());
    console.log(stats.isBlockDevice());
    //console.log(stats.isSymbolicLink());
    //console.log(stats.isFifo());
    console.log(stats.isSocket());
});

// Opening a File
fs.open('./pathModule.js', 'r', function(err, fd){
   console.log(fd);
});
// r - open file for reading. Stream is at the beginning
// r+ - open the file for reading & writing. Stream is at the beginning
// w - Truncates the file to 0 length or create new file.
// w+ - open the file for reading & writing or create. It is truncated
// a - open the file for writing or create. stream at the end of the file.
// a+ - open for reading and writing or create. Stream at the end of the file.

// Reading from a file
fs.open('./SP2010.log', 'r', function opened(err, fd) {
    if (err) { throw err }
    var readBuffer = new Buffer(1024),
        bufferOffset = 0,
        bufferLength = readBuffer.length,
        filePosition = 100;
    fs.read(fd,
            readBuffer,
            bufferOffset,
            bufferLength,
            filePosition,
            function read(err, readBytes) {
                if (err) { throw err; }
                    console.log('just read ' + readBytes + ' bytes');
                    if (readBytes > 0) {
                        console.log(readBuffer.slice(0, readBytes));
                    }
            });
});

// Writing to a File
fs.open('./chumma1.txt', 'a+', function opened(err, fd) {
    if (err) { throw err; }
    var writeBuffer = new Buffer('writing this string1'),
        bufferPosition = 0,
        bufferLength = writeBuffer.length, 
        filePosition = null;
    fs.write(fd,
             writeBuffer,
             bufferPosition,
             bufferLength,
             filePosition,
             function wrote(err, written) {
                if (err) { throw err; }
                    console.log('wrote ' + written + ' bytes');
            });
});

// Closing a File
function openAndWriteToSystemLog(writeBuffer, callback) {
    fs.open('./chumma1', 'a', function (err, fd) {
        if (err) { return callback(err); }
        function notifyError(err) {
            fs.close(fd, function() {
                callback(err);
            });
        }
        var bufferOffset = 0,
            bufferLength = writeBuffer.length,
            filePosition = null;
        fs.write(fd, writeBuffer, bufferOffset, bufferLength, filePosition,
                 function (err, written) {
                    if (err) { return notifyError(err); }
                    fs.close(fd, function() {
                        callback(err);
                    });
                });
    });
}

openAndWriteToSystemLog(
    new Buffer('writing this string and closing the file.'),
    function done(err) {
        if (err) {
            console.log("error while opening and writing:", err.message);
            return;
        }
        console.log('All done with no errors');
    }
);