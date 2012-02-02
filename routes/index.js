
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.mobile = function(req, res){
  var slideId = req.params.slideId;
  res.render('mobile', { slideId: slideId })
};