var isPlaying = false;
    var smilyScore = [0,0];
    var frameString = `<iframe width="640" height="480" src="https://www.youtube.com/embed/MaYv3Y8tyoQ?autoplay=1" frameborder="0" allowfullscreen=""></iframe>`
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
    //Add a callback to notify when the detector is initialized and ready for runing.
    detector.addEventListener("onInitializeSuccess", function() {
    log('#logs', "The detector reports initialized");
    //Display canvas instead of video feed because we want to draw the feature points on it
    $("#face_video_canvas").css("display", "block");
    $("#face_video").css("display", "none");
    });
    function smilyAvg(lastSmilyScore) {
    smilyScore[0] = ((smilyScore[0] * smilyScore[1]) + lastSmilyScore) / (++smilyScore[1])
    }
    function log(node_name, msg) {
    $(node_name).append("<span>" + msg + "</span><br />")
    }
    //function executes when Start button is pushed.
    function onStart() {
    if (detector && !detector.isRunning) {
        $("#logs").html("");
        detector.start();
    }
    log('#logs', "Clicked the start button");
    }
    //function executes when the Stop button is pushed.
    function onStop() {
    log('#logs', "Clicked the stop button");
    if (detector && detector.isRunning) {
        detector.removeEventListener();
        detector.stop();
    }
    };
    //function executes when the Reset button is pushed.
    function onReset() {
    log('#logs', "Clicked the reset button");
    if (detector && detector.isRunning) {
        detector.reset();
        $('#results').html("");
    }
    };
    //Add a callback to notify when camera access is allowed
    detector.addEventListener("onWebcamConnectSuccess", function() {
    log('#logs', "Webcam access allowed");
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
    detector.addEventListener("onImageResultsSuccess", function(faces, image, timestamp) {
        //checking the average Score, playing the video if its above 50 after 20 samples
        if(faces.length > 0 && !isPlaying && smilyScore[0] > 50 && smilyScore[1] > 20){
        var theCanvas = document.getElementById('face_video_canvas');
        theCanvas.style.display = 'none';
        var theAd = document.createElement('iframe');
        theAd.setAttribute('src','https://www.youtube.com/embed/MaYv3Y8tyoQ?autoplay=1');
        theAd.id = 'theAd';
        theAd.setAttribute('width', 640);
        theAd.setAttribute('frameborder', 0);
        theAd.setAttribute('height', 480);
        var theContainer = document.getElementById('affdex_elements');
        theContainer.appendChild(theAd);
        isPlaying = true;
        } else {
            if(isPlaying && (faces.length === 0 || smilyScore[0] < 50)){
            var theCanvas = document.getElementById('face_video_canvas');
            theCanvas.style.display = 'block'
            var theAd = document.getElementById('theAd')
            theAd.remove();
            isPlaying = false;
            }
        }
    if (faces.length > 0) {
        smilyAvg(faces[0].expressions.smile);
        console.log("smilyScore!",smilyScore[0]);
        console.log(faces[0].emojis.dominantEmoji);
        // drawFeaturePoints(image, faces[0].featurePoints);
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
