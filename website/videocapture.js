navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL;

$(function(){
  var canvas = $('#canvas');
  var video = $('#video');
  var ctx = canvas[0].getContext('2d');
  var localMediaStream, dataURL, imageURL;

  $("#save").click(function(e) {
    e.preventDefault();
    ctx.drawImage(video[0], 0, 0);
    $('#image-url-input').val(canvas[0].toDataURL('image/png'));
    $("form").submit();
  })

  var noStream = function (err) {
    alert('Could not get camera stream.');
    console.log('Error: ', err);
  }

  var gotStream = function (stream) {
    if (window.URL) {
      video[0].src = window.URL.createObjectURL(stream);
    } else {
      video[0].src = stream; // Opera support.
    }
  }

  if (navigator.getUserMedia) {
    // Get video stream.
    navigator.getUserMedia({video: true}, gotStream, noStream);
  } else {
    alert('Your browser does not support getUserMedia API.');
  }
})
