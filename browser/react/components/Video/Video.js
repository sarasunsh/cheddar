import React from 'react';
import * as funcs from './funcs';
import axios from 'axios';
import { browserHistory } from 'react-router'

// Video component for React which loads YouTube ad and face detection technology
export default class Video extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            determinate: true,
            progress: '0%'
        }
        this.clickPlay = this.clickPlay.bind(this);
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);

        this.url = `https://www.youtube.com/embed/${this.props.currentAd.url}?enablejsapi=1&controls=0&showinfo=0&iv_load_policy=3&rel=0`;
        //enablejsapi=1 must be appended to embed url so we can control play/pause
        //showinfo=0 and controls=0 will hide the youtube player controls
        //disablekb=1 will prevent you from skipping ahead with arrow keys
        //iv_load_policy=3 hides video annotations / popups / subscribe now stuff
        //rel=0 prevents related videos from popping up at the end
    }

    clickPlay(e){
        this.setState({determinate: false, progress: '0%'})
        funcs.onStart();
        document.getElementById("affdex_elements").style.display = "block";
        e.target.parentNode.remove();
    }

    onPlayerStateChange(state){
        if(state.data === YT.PlayerState.ENDED ) {
            let finalSmile = funcs.smilyScore[0];
            document.getElementById("theAd").style.display = "none";
            funcs.log('logs', `Congratulations! Your smilyScore was ${Math.trunc(finalSmile)}`);
            funcs.onStop();
            axios.post(`api/views/${this.props.user.id}/${this.props.currentAd.id}`, {smilyScore: finalSmile})
                .catch(err => console.log(err));
            setTimeout(()=>location.pathname = '/ads', 1000);
            //that would be the reacty way to do it, but I'm having problems re-initializing the youtube API, so we'll clear the window when this is over.
            // location.pathname = '/ads'

        }
    }

    componentDidMount(){
        let theAd = document.getElementById('theAd')
        const divRoot = $("#affdex_elements")[0];
        const width = 640,
        height = 480;
        const faceMode = affdex.FaceDetectorMode.LARGE_FACES;
        window.detector = new affdex.CameraDetector(divRoot, width, height, faceMode);
        // window.detector.detectAllEmotions();
        // window.detector.detectAllAppearance();
        window.detector.detectAllExpressions();
        window.detector.detectAllEmojis();

        //Add a callback to notify when camera access is allowed
        window.detector.addEventListener("onWebcamConnectSuccess", () => {
            funcs.log('logs', "Webcam access allowed. Loading...");
        });

        //Add a callback to notify when camera access is denied
        window.detector.addEventListener("onWebcamConnectFailure", () => {
            funcs.log('logs', "webcam denied");
            console.log("Webcam access denied");
        });

        //Add a callback to notify when the detector is initialized and ready for running.
        window.detector.addEventListener("onInitializeSuccess", () => {
            funcs.log('logs', "Smile to start the video!",true);
            //Display canvas instead of video feed because we want to draw the feature points on it
            $("#face_video_canvas").css("display", "block"); // this is the ID on the <canvas> that actually displays the video
            $("#face_video").css("display", "none");  // affdex creates a <video> tag with face_video to capture video from the webcam but this does not display the video
        });


        //Add a callback to notify when detector is stopped
        window.detector.addEventListener("onStopSuccess", () => {
            console.log( "The detector reports stopped");
        });
        // faces is an array, always accessing the first element which is ONE face as opposed to many, first element is an object with the features of the face for ONE frame
        // image is unknown (can be checked out later)
        window.detector.addEventListener("onImageResultsSuccess", (faces, image, timestamp) => {
            //starts ad after 20 smiling samples and at least 1 detected face
            if(faces.length) {
                if (!funcs.isPlaying){
                    funcs.drawFeaturePoints(image, faces[0].featurePoints);
                    if (funcs.preSmilyScoreAvg(faces[0].expressions.smile) > 20){
                        funcs.startVideo(theAd);
                    }
                } else {
                    funcs.smilyScoreAvg(faces[0].expressions.smile);
                    this.setState({determinate: true, progress: `${funcs.smilyScore[0]}%`});
                    // console.log("smilyScore!",funcs.smilyScore[0]);
                    // console.log(faces[0].emojis.dominantEmoji);
                }
            } else {
                funcs.pauseVideo(theAd,timestamp);
            }
        });

        // Load YouTube API only once component is mounted

        // The API will call this function when the page has finished downloading the JavaScript for the player API, which enables you to then use the API on your page.
        window.onYouTubeIframeAPIReady = () => {
            let theAd = document.getElementById("theAd");
            window.player = new YT.Player(theAd, {
                events: {
                    'onStateChange' : this.onPlayerStateChange
                }
            });
        }

        var apiTag = document.createElement('script');
        apiTag.setAttribute('src','https://www.youtube.com/iframe_api');
        apiTag.id = 'apiTag';
        document.head.appendChild(apiTag);
    }

    componentWillUnmount(){
        funcs.onStop();
        let apiTag = document.getElementById('apiTag')
        apiTag.remove();
    }

    render() {
        return (
            <div style={{height:600}}>
              <div id="logs">Click Play when ready . . .</div>
              <div style={{textAlign:"center"}}>
                <i id="playButton" className="large material-icons" onClick={this.clickPlay}>play_circle_outline</i>
              </div>
              <div id="affdex_elements">
                <iframe
                    style={{display: 'none'}}
                    src={this.url}
                    width='640'
                    height='480'
                    frameBorder='0'
                    id='theAd'>
                </iframe>
              </div>
              <div className="progress">
                <div
                    id="logs_animation"
                    className={ this.state.determinate ? "determinate" : "indeterminate" }
                    style={{width: this.state.progress}}>
                </div>
              </div>
            </div>
        )
    }
}
