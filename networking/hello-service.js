var http = require('http');
var os = require("os");

const PORT = 8080;

const MESSAGE = 'Hello from ' + os.hostname();

var server = http.createServer(function(request, response) {
    response.end(MESSAGE);
});

server.listen(PORT, function(){
    console.log('Server listening on port ' + PORT + ' with message: ' + MESSAGE);
});