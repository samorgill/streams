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
	var newFile = fs.createWriteStream("readme_copy.md");
	request.pipe(newFile);

	request.on('end', function(){
		response.end('uploaded!');
	});
}).listen(8000);