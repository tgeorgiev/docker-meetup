var http = require('http');
var fs = require('fs');

const PORT = 80;

var handleIndex = function(request, response) {
    fs.readFile('./index.html', function(error, data) {
        if (error){
            response.writeHead(404);
            response.end('Page was not found');
        } else{
            response.writeHead(202, {
                'Content-type': 'text/html'
            });
            response.end(data);
        }
    });
};

var handleHello = function(request, response) {
    var getRequest = http.get({
        host: 'hello-service',
        port: '8080',
        path: ''
    }, function(getResponse) {
        var body = '';
        getResponse.on('data', function(d) {
            body += d;
        });
        getResponse.on('end', function() {
            response.end(body);
        });
    });

    getRequest.on('error', function(e) {
        if (e.code === 'ECONNREFUSED') {
            response.end('Connection refused');
        } else if (e.code === 'ENOTFOUND') {
            response.end('Not found');
        } else {
            response.writeHead(400);
            response.end(e.code);
        }
    });
};

var server = http.createServer(function(request, response) {

    if (request.url === '/' || request.url === '/index.html') {
        handleIndex(request, response);
    } else if (request.url === '/hello') {
        handleHello(request, response);
    } else {
        response.writeHead(400);
        response.end('Unknown path ' + request.url);
    }
});

server.listen(PORT, function(){
    console.log('Server listening on port ' + PORT);
});