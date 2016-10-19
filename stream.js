/*
node stream.js to run the server
curl -d 'hello' http://localhost:8000
*/

/*var http = require('http');

http.createServer(function(request, response){
	response.writeHead(200);
	request.pipe(response);
}).listen(8000);

//Reading & Writing a File
var fs = require('fs'); //require filestream module
var file = fs.createReadStream("readme.md");
var newFile = fs.createWriteStream("readme_copy.md");

file.pipe(newFile);*/

var fs = require('fs');
var http = require('http');

http.createServer(function(request, response){
	var newFile = fs.createWriteStream("progress_copy.md");
	var fileBytes = request.headers['content-length'];
	var uploadedBytes = 0;

	request.on('readable', function(){
		var chunk = null;
		while(null !== (chunk = request.read())){
			uploadedBytes += chunk.length;
			var progress = (uploadedBytes / fileBytes)*100;
			response.write("progress: " + parseInt(progress, 10) + "%\n");
		}
	});
	
	request.pipe(newFile);

	request.on('end', function(){
		response.end('uploaded!');
	});
}).listen(8000);