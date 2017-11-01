define(['jquery', 'socket.io', 'blockUI', 'qrcode'], function($, io){
    var slideSteps = [];  

    processImpressjs();
    connectToServer(slideSteps);

    function getCurrStepId(){
      return window.location.hash.replace(/^#\/?/,"");
    }

    function processImpressjs(){
      var steps = $('#impress .step');
      for(var s = 0; s < steps.length; s++){
        slideSteps.push({
          id: $(steps[s]).attr("id"),
          text: $(steps[s]).text()
        });
      }
    }

    function connectToServer(){
      var socket = io.connect(ijshost);

      var slideId = randomUUID();

      window.addEventListener("hashchange", function(){
        socket.emit('current_step', {currStepId: getCurrStepId()});
      }, false);

      socket.on('connect', function(){
        socket.emit('add_slide', {
          slideId: slideId,
          steps: slideSteps
        });
      });

      socket.on('slide_add_success', function(data){
        $(document.body).append('<div id="qrDialog"><div id="qrcode_canvas"></div><div id="qrUrl"></div></div>')
        $('#qrcode_canvas').qrcode(ijshost + '/mobile/' + data.slideId);
        $('#qrUrl').text(ijshost + '/mobile/' + data.slideId);
        $.blockUI({
          message: $('#qrDialog'),
          onUnblock: function(){
            $('#qrDialog').remove();
          }
        });
      });

      socket.on('accept_mobile_control', function(){
        $.unblockUI();
        socket.emit('current_step', {currStepId: getCurrStepId()});
      });

      socket.on('next', function(){
        var currStepId = getCurrStepId();
        for(var i = 0; i < slideSteps.length; i++){
          if(slideSteps[i].id == currStepId){
            var nextStepId = currStepId;
            if(i + 1 == slideSteps.length){
              nextStepId = slideSteps[0].id;
            }else{
              nextStepId = slideSteps[i + 1].id;
            }
            window.location.hash = "#/" + nextStepId;
            break;
          }
        }
      });

      socket.on('prev', function(){
        var currStepId = getCurrStepId();
        for(var i = 0; i < slideSteps.length; i++){
          if(slideSteps[i].id == currStepId){
            var prevStepId = currStepId;
            if(i == 0){
              prevStepId = slideSteps[slideSteps.length - 1].id;
            }else{
              prevStepId = slideSteps[i - 1].id;
            }
            window.location.hash = "#/" + prevStepId;
            break;
          }
        }
      });

      socket.on('step', function(data){
        window.location.hash = "#/" + data.stepId;
      });

    }
  }
);
