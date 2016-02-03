var fs = require("fs");
var percentWaited = 0;

var sourceFilePath = "./Old/SP2010-20160111-0930.log";

//console.log("Reading File...\n");

function writeWaitingPercent(p) {
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	process.stdout.write(`waiting ... ${p}%`);
}

fs.readFile(sourceFilePath, "UTF-8", function(err, contents){
   if(err) 
       console.log(err);
    else{
        var fileLength = contents.length;
        //console.log(fileLength);
        var fileStream = fs.createReadStream(sourceFilePath, "UTF-8");
        
        var stream = fs.createWriteStream("SP2010-20160111-0930.log");
        
        var currentLength = 0;
                

        fileStream.once('data', function(){
           console.log("\n\nStarted reading the file...\n\n");
        });

        fileStream.on('data', function(chunk){
            currentLength += chunk.length;
            stream.write(`${chunk}`);
            //console.log("Chunk Length: ", chunk.length);
            //console.log("File Length: ", fileLength);
            percentWaited = Math.floor((currentLength/fileLength)*100);
            //console.log(percentWaited);
            writeWaitingPercent(percentWaited);
            
        });

        fileStream.on('end', function(){
            stream.close();
            console.log(`\n\n finished reading the file ${fileLength} \n\n`);
        });
    }
});
/*

*/