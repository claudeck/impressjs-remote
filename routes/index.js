var impressjsSocket = require('../impressjs_socket');
var Server = require('config').Server;

exports.index = function(req, res){
    console.log('dddddd');
  res.render('index', { title: 'Express', server: Server })
};

exports.mobile = function(req, res){
  var slide = impressjsSocket.get(req.params.slideId);
  res.render('mobile', { slide: slide })
};