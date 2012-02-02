var slides = {};

function Slide(socket, slideId, slides){
  this.socket = socket;
  this.slideId = slideId;
  this.slides = slides;
}

Slide.prototype.init = function(){
  var _slideId = this.slideId;
  this.socket.on('disconnect', function(){
    delete slides[_slideId];
    console.log('DELETE SLIDE_ID:' + _slideId);
  });

  this.socket.emit('slide_add_success', {slideId: this.slideId});  
}

Slide.prototype.acceptMobileControl = function(){
  this.socket.emit('accept_mobile_control');
}

Slide.prototype.next = function(){
  this.socket.emit('next');
}

Slide.prototype.prev = function(){
  this.socket.emit('prev');
}

exports.addSlide = function(socket, data){
  var slide = new Slide(socket, data.slideId, data.slides);
  slides[data.slideId] = slide;

  slide.init();
}

exports.get = function(slideId){
  return slides[slideId];
}