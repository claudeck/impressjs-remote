
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , io = require('socket.io')
  , util = require('util')
  , impressjsSocket = require('./impressjs_socket')
  , mobileSocket = require('./mobile_socket')
  , Server = require('config').Server

var app = module.exports = express.createServer();

var socket = io.listen(app);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {layout: false});
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', routes.index);
app.get('/mobile/:slideId', routes.mobile);

console.log(util.inspect(Server));
app.listen(Server.port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

socket.sockets.on('connection', function(socket){
  
  socket.on('add_slide', function(data){
    impressjsSocket.addSlide(socket, data);
  });

  socket.on('mobile_start', function(data){
    mobileSocket.mobileStart(socket, data);
  });

});