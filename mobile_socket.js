var impressjsSocket = require('./impressjs_socket');

function checkSlideSocketAndCallback(socket, callback){
  var slide = impressjsSocket.get(socket.slideId);
  if(slide == null){
    socket.emit('no_slide_socket');
    return;
  }
  callback(slide);
}

exports.mobileStart = function(socket, data){
  socket.slideId = data.slideId;

  checkSlideSocketAndCallback(socket, function(slide){
    slide.acceptMobileControl(socket);
  });

  socket.on('mobile_next', function(data){
    checkSlideSocketAndCallback(socket, function(slide){
      slide.next();
    });
  });

  socket.on('mobile_prev', function(data){
    checkSlideSocketAndCallback(socket, function(slide){
      slide.prev();
    });
  });

  socket.on('mobile_step', function(data){
    checkSlideSocketAndCallback(socket, function(slide){
      slide.step(data);
    });
  });

  socket.on('mobile_joy', function(data){
    checkSlideSocketAndCallback(socket, function(slide){
      slide.joy(data);
    });
  });
}