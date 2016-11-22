const preSmilyScore = [];
export let isPlaying = false; // to be on the state
export const smilyScore = [0,0]; // to be on the state

export const smilyScoreAvg = (lastSmilyScore) => {
  smilyScore[0] = ((smilyScore[0] * smilyScore[1]) + lastSmilyScore) / (++smilyScore[1])
}


// preSmilyScoreAvg adds the smilyScore to the array preSmilyScore until it reaches 30 elements and then only keeps the most recent 30 samples; returns the most recent average
export const preSmilyScoreAvg = (lastSmilyScore) => {
  preSmilyScore.push(lastSmilyScore);
  if (preSmilyScore.length>30){
    preSmilyScore.shift();
    return preSmilyScore.reduce((a,b) => a+b)/preSmilyScore.length;
  }
  return 0;
}


export function log(node_name, msg) {
  // $(node_name).children().first().replaceWith("<span>" + msg + "</span><br />")
  var logElement = document.getElementById("logs");
  logElement.textContent = msg;
  var logAnimation = document.getElementById("logs_animation");

}
//function executes when Start button is pushed.
export function onStart() {
  if (window.detector && !window.detector.isRunning) {
      $("#logs").html("Loading...");
      window.detector.start();
  }
  log('#logs', "Error...");
}
//function executes when the Stop button is pushed.
export function onStop() {
  if (window.detector && window.detector.isRunning) {
      window.detector.removeEventListener();
      window.detector.stop();
  }
}
//function executes when the Reset button is pushed. not being used
export function onReset() {
  log('#logs', "Clicked the reset button");
  if (window.detector && window.detector.isRunning) {
      window.detector.reset();
      $('#results').html("");
  }
}

//Add a callback to receive the results from processing an image.
//The faces object contains the list of the faces detected in an image.
//Faces object contains probabilities for all the different expressions, emotions and appearance metrics

export const startVideo = () => {
  var theCanvas = document.getElementById('face_video_canvas');
  theCanvas && (theCanvas.style.display = 'none');
  theAd.style.display = 'block';
  commandYT('playVideo')
  isPlaying = true;
  log('#logs', "Keep smiling!");

}

export const pauseVideo = () => {
  var theCanvas = document.getElementById('face_video_canvas');
  theCanvas.style.display = 'block'
  if (isPlaying) {
    commandYT("pauseVideo");
    theAd.style.display = "none";
    log('#logs', "Keep watching and smiling!");
   }
  isPlaying = false;
}

const commandYT = (commandName) => {
  let theIframe = document.getElementById("theAd");
  theIframe = theIframe.contentWindow;
  theIframe.postMessage(`{"event":"command","func":"${commandName}","args":""}`,'*');
}

const onYouTubeStateChange = (state) => {
  if(state.data === YT.PlayerState.ENDED ) {
    theAd.style.display = "none";
    log('#logs', `Congratulations! Your smilyScore was ${Math.trunc(smilyScore[0])}`);
    onStop();
  }

}

//Draw the detected facial feature points on the image
export const drawFeaturePoints = (img, featurePoints) => {
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
