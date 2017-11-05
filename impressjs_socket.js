var slides = {};

function Slide(socket, slideId, steps){
  this.socket = socket;
  this.slideId = slideId;
  this.steps = steps;

  this.mobileSockets = [];
}

Slide.prototype.init = function(){
  var _slideId = this.slideId;
  this.socket.on('disconnect', function(){
    delete slides[_slideId];
    console.log('DELETE SLIDE_ID:' + _slideId);
  });

  var _mobileSockets = this.mobileSockets;
  this.socket.on('current_step', function(data){
    _mobileSockets.forEach(function(mobileSocket){
      mobileSocket.emit('current_step', data);            
    });
  });

  this.socket.emit('slide_add_success', {slideId: this.slideId});  
}

Slide.prototype.acceptMobileControl = function(socket){
  this.socket.emit('accept_mobile_control');
  this.mobileSockets.push(socket);
}

Slide.prototype.next = function(){
  this.socket.emit('next');
}

Slide.prototype.prev = function(){
  this.socket.emit('prev');
}

Slide.prototype.step = function(data){
  this.socket.emit('step', data);
}

Slide.prototype.joy = function(data){
  this.socket.emit('joy', data);
}

exports.addSlide = function(socket, data){
  var slide = new Slide(socket, data.slideId, data.steps);
  slides[data.slideId] = slide;

  slide.init();
}

exports.get = function(slideId){
  return slides[slideId];
}