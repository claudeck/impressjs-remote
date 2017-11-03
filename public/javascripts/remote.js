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
        $('#qrcode_canvas').qrcode({
          // render method: 'canvas', 'image' or 'div'
          render: 'canvas',
          // version range somewhere in 1 .. 40
          minVersion: 1,
          maxVersion: 40,
          // error correction level: 'L', 'M', 'Q' or 'H'
          ecLevel: 'H',
          // offset in pixel if drawn onto existing canvas
          left: 0,
          top: 0,
          // size in pixel
          size: 500,
          // code color or image element
          fill: '#000',
          // background color or image element, null for transparent background
          background: null,
          text: ijshost + '/mobile/' + data.slideId,
          // corner radius relative to module width: 0.0 .. 0.5
          radius: 0.5,
          // quiet zone in modules
          quiet: 2,
          // modes
          // 0: normal
          // 1: label strip
          // 2: label box
          // 3: image strip
          // 4: image box
          mode: 2,
          mSize: 0.1,
          mPosX: 0.5,
          mPosY: 0.5,
          label: 'Scan me',
          fontname: 'sans',
          fontcolor: '#ff9818',
          image: null
      });
        $('#qrUrl').text(ijshost + '/mobile/' + data.slideId);
        $.blockUI({
          message: $('#qrDialog'),
          onUnblock: function(){
            $('#qrDialog').remove();
          },
          css: { 
            width: '500px',
            top:  ($(window).height() - 500) /2 + 'px', 
            left: ($(window).width() - 500) /2 + 'px', 
            border: 'none', 
            padding: '15px', 
            '-webkit-border-radius': '10px', 
            '-moz-border-radius': '10px',
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
