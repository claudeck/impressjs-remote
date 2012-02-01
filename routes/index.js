
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.mobile = function(req, res){
  res.render('mobile', { slideId: 'Express' })
};