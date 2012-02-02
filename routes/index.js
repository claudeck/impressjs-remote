var impressjsSocket = require('../impressjs_socket');

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.mobile = function(req, res){
  var slide = impressjsSocket.get(req.params.slideId);
  res.render('mobile', { slide: slide })
};