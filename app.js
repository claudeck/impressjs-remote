
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , util = require('util')
  , impressjsSocket = require('./impressjs_socket')
  , mobileSocket = require('./mobile_socket')
  , Server = require('config').Server

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

console.log(util.inspect(Server));
server.listen(Server.port);

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/', routes.index);
app.get('/mobile/:slideId', routes.mobile);


io.on('connection', function(socket){
  
  socket.on('add_slide', function(data){
    impressjsSocket.addSlide(socket, data);
  });

  socket.on('mobile_start', function(data){
    mobileSocket.mobileStart(socket, data);
  });

});