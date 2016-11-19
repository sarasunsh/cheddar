//isPLaying could also be called 'AdIsSupposedToBePlaying'
var isPlaying = false;
let smilyScore = [0,0];
let preSmilyScore = [];
var theAd = document.getElementById('theAd')
var context = null;

// SDK Needs to create video and canvas nodes in the DOM in order to function
// Here we are adding those nodes a predefined div.
var divRoot = $("#affdex_elements")[0];
var width = 640;
var height = 480;
var faceMode = affdex.FaceDetectorMode.LARGE_FACES;
//Construct a CameraDetector and specify the image width / height and face detector mode.
var detector = new affdex.CameraDetector(divRoot, width, height, faceMode);
//Enable detection of all Expressions, Emotions and Emojis classifiers.
detector.detectAllEmotions();
detector.detectAllExpressions();
detector.detectAllEmojis();
detector.detectAllAppearance();
//Add a callback to notify when the detector is initialized and ready for running.
detector.addEventListener("onInitializeSuccess", function() {
log('#logs', "Smile to start the video!");  // Dots are first displayed
//Display canvas instead of video feed because we want to draw the feature points on it
$("#face_video_canvas").css("display", "block"); // this is the ID on the <canvas> that actually displays the video
$("#face_video").css("display", "none");  // affdex creates a <video> tag with fae_video to capture video from the webcam but this does not display the video
});

// smilyScore[0] = current rolling average
// smilyScore[1] = number of total samples

const smilyAvg = (lastSmilyScore) => {
  smilyScore[0] = ((smilyScore[0] * smilyScore[1]) + lastSmilyScore) / (++smilyScore[1])
}


// preSmilyScoreAvg adds the smilyScore to the array preSmilyScore until it reaches 30 elements and then only keeps the most recent 30 samples; returns the most recent average
const preSmilyScoreAvg = (lastSmilyScore) => {
  preSmilyScore.push(lastSmilyScore);
  if (preSmilyScore.length>30){
    preSmilyScore.shift();
    return preSmilyScore.reduce((a,b) => a+b)/preSmilyScore.length;
  }
  return 0;
}


function log(node_name, msg) {
  // $(node_name).children().first().replaceWith("<span>" + msg + "</span><br />")
  var logElement = document.getElementById("logs");
  logElement.textContent = msg;

  var logAnimation = document.getElementById("logs_animation");

}
//function executes when Start button is pushed.
function onStart(ctx) {
  context = ctx;

  if (detector && !detector.isRunning) {
      $("#logs").html("Loading...");
      detector.start();
  }
  log('#logs', "Other status message...");
}
//function executes when the Stop button is pushed.
function onStop() {
  log('#logs', "Clicked the stop button");
  if (detector && detector.isRunning) {
      detector.removeEventListener();
      detector.stop();
  }
}
//function executes when the Reset button is pushed. not being used
function onReset() {
  log('#logs', "Clicked the reset button");
  if (detector && detector.isRunning) {
      detector.reset();
      $('#results').html("");
  }
}
//Add a callback to notify when camera access is allowed
detector.addEventListener("onWebcamConnectSuccess", function() {
log('#logs', "Webcam access allowed. Loading...");
});
//Add a callback to notify when camera access is denied
detector.addEventListener("onWebcamConnectFailure", function() {
log('#logs', "webcam denied");
console.log("Webcam access denied");
});
//Add a callback to notify when detector is stopped
detector.addEventListener("onStopSuccess", function() {
log('#logs', "The detector reports stopped");
$("#results").html("");
});
//Add a callback to receive the results from processing an image.
//The faces object contains the list of the faces detected in an image.
//Faces object contains probabilities for all the different expressions, emotions and appearance metrics

function startVideo() {
  var theCanvas = document.getElementById('face_video_canvas');
  theCanvas && (theCanvas.style.display = 'none');
  theAd.style.display = 'block';
  commandYT('playVideo')
  isPlaying = true;

}

const pauseVideo = () => {
  var theCanvas = document.getElementById('face_video_canvas');
  theCanvas.style.display = 'block'
  if (isPlaying) {
    commandYT("pauseVideo");
    theAd.style.display = "none";
   }
  isPlaying = false;
}

//pass iframe to invoke postMessage, and playVideo, pauseVideo
function commandYT(commandName){
  let theIframe = document.getElementById("theAd");
  theIframe = theIframe.contentWindow;
  theIframe.postMessage(`{"event":"command","func":"${commandName}","args":""}`,'*');
}

function onYouTubeIframeAPIReady(){
  player = new YT.Player(theAd, {
    events: {
      'onReady' : console.log.bind(console),
      'onStateChange' : onYouTubeStateChange
    }
  })
}

function onYouTubeStateChange(state) {
  if(state.data === YT.PlayerState.ENDED ) {
    theAd.style.display = "none";
    log('#logs', `Congratulations! Your smilyScore was ${Math.trunc(smilyScore[0])}`);
    console.log("Video completed bitch");
  }

}


// faces is an array, always accessing the first element which is ONE face as opposed to many, first element is an object with the features of the face for ONE frame
// image is unknown (can be checked out later)
detector.addEventListener("onImageResultsSuccess", function(faces, image, timestamp) {
  //checking the average Score, playing the video if its above 50 after 20 samples
  if(faces.length) {
    if (!isPlaying){
      drawFeaturePoints(image, faces[0].featurePoints);
      if (preSmilyScoreAvg(faces[0].expressions.smile) > 50){
        startVideo();
      }
    } else {
      smilyAvg(faces[0].expressions.smile);
      context.setState({determinate: true, progress: `${smilyScore[0]}%`});
      console.log("smilyScore!",smilyScore[0]);
      console.log(faces[0].emojis.dominantEmoji);
    }
  } else {
    pauseVideo();
  }
});

//Draw the detected facial feature points on the image
function drawFeaturePoints(img, featurePoints) {
var contxt = $('#face_video_canvas')[0].getContext('2d');
var hRatio = contxt.canvas.width / img.width;
var vRatio = contxt.canvas.height / img.height;
var ratio = Math.min(hRatio, vRatio);
contxt.strokeStyle = "#FFFFFF";
for (var id in featurePoints) {
    contxt.beginPath();
    contxt.arc(featurePoints[id].x,
    featurePoints[id].y, 2, 0, 2 * Math.PI);
    contxt.stroke();
}
}
