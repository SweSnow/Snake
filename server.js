var express = require('express'),
app = express(),
server = require('http').createServer(app);

app.use(express.static(__dirname));

server.listen(8080);
console.log('SERVER UP AND RUNNING');