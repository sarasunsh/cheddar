var FileSaver = require('file-saver');


const preSmilyScore = [];
export let isPlaying = false;
export const smilyScore = [0,0]; // first element is the score, second is amount of elements

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

export function log(node_name, txt, speak = false) {
  if (speak){
    let msg = new SpeechSynthesisUtterance(txt);
    window.speechSynthesis.speak(msg);
  }

  const logElement = document.getElementById(node_name);
  logElement.textContent = txt;
  // const logAnimation = document.getElementById("logs_animation");
}

export function saveSmile(canvas,id,txt) {
  canvas.toBlob(function(blob) {
    FileSaver.saveAs(blob, id + ".png");
  });
}

//function executes when Start button is pushed.
export function onStart() {
    if (window.detector && !window.detector.isRunning) {
        log("logs","Loading...");
        window.detector.start();
    }
    // log("logs", "Error...");
}
//function executes when the Stop button is pushed.
export function onStop() {
    if (window.detector && window.detector.isRunning) {
        smilyScore[0] = 0;
        smilyScore[1] = 0;
        isPlaying = false;
        preSmilyScore.length = 0;
        window.detector.removeEventListener();
        window.detector.stop();
    }
}
//function executes when the Reset button is pushed. not being used
export function onReset() {
    log('logs', "Clicked the reset button");
    if (window.detector && window.detector.isRunning) {
        window.detector.reset();
        log('results',"");
    }
}

//Add a callback to receive the results from processing an image.
//The faces object contains the list of the faces detected in an image.
//Faces object contains probabilities for all the different expressions, emotions and appearance metrics

export const startVideo = (theAd) => {
    var theAffdex = document.getElementById('affdex_elements');
    theAffdex && (theAffdex.style.display = 'none');
    theAd.style.display = 'block';
    commandYT('playVideo',theAd)
    isPlaying = true;
    log('logs', "Keep smiling!");
}


export const pauseVideo = (theAd, timestamp) => {
    var theAffdex = document.getElementById('affdex_elements');
    theAffdex && (theAffdex.style.display = 'block');
    if (isPlaying) {
        commandYT("pauseVideo",theAd);
        theAd.style.display = "none";
        if (!window.detector.lastPause) {
          window.detector.lastPause = timestamp;
          log('logs', "Keep watching and smiling!", true);
        } else {
          if (timestamp - window.detector.lastPause > 8){
            log('logs', "Keep watching and smiling!", true);
            window.detector.lastPause = timestamp
          }
          else {
            log('logs', "Keep watching and smiling!");
          }
        }

    }
    isPlaying = false;
}

const commandYT = (commandName, theIframe) => {
    // console.log(`commandYT called with ${commandName}`)
    theIframe = theIframe.contentWindow;
    theIframe.postMessage(`{"event":"command","func":"${commandName}","args":""}`,'*');
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
