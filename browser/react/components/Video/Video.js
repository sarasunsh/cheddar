import React from 'react';
import * as funcs from './funcs';
import axios from 'axios';

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

        this.url = `https://www.youtube.com/embed/${this.props.currentAd.url}enablejsapi=1`;
        //enablejsapi=1 must be appended to embed url so we can control play/pause
    }

    clickPlay(e){
        this.setState({determinate: false, progress: '0%'})
        funcs.onStart();
        e.target.remove();
    }

    onPlayerStateChange(state){
        if(state.data === YT.PlayerState.ENDED ) {
            let finalSmile = funcs.smilyScore[0];
            document.getElementById("theAd").style.display = "none";
            funcs.log('#logs', `Congratulations! Your smilyScore was ${Math.trunc(finalSmile)}`);
            funcs.onStop();
            axios.post(`api/views/${this.props.user.id}/${this.props.currentAd.id}`, {smilyScore: finalSmile})
                .catch(err => console.log(err))
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
            funcs.log('#logs', "Webcam access allowed. Loading...");
        });

        //Add a callback to notify when camera access is denied
        window.detector.addEventListener("onWebcamConnectFailure", () => {
            funcs.log('#logs', "webcam denied");
            console.log("Webcam access denied");
        });

        //Add a callback to notify when the detector is initialized and ready for running.
        window.detector.addEventListener("onInitializeSuccess", () => {
            funcs.log('#logs', "Smile to start the video!");  // Dots are first displayed
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
            //checking the average Score, playing the video if its above 50 after 20 samples
            if(faces.length) {
                if (!funcs.isPlaying){
                    funcs.drawFeaturePoints(image, faces[0].featurePoints);
                    // if (funcs.preSmilyScoreAvg(faces[0].expressions.smile) > 50){
                        funcs.startVideo(theAd);
                    // }
                } else {
                    funcs.smilyScoreAvg(faces[0].expressions.smile);
                    this.setState({determinate: true, progress: `${funcs.smilyScore[0]}%`});
                    console.log("smilyScore!",funcs.smilyScore[0]);
                    console.log(faces[0].emojis.dominantEmoji);
                }
            } else {
                funcs.pauseVideo(theAd);
            }
        });

        // Load YouTube API only once component is mounted
        var apiTag = document.createElement('script');
        apiTag.setAttribute('src','https://www.youtube.com/iframe_api');
        apiTag.id = 'apiTag';
        document.head.appendChild(apiTag);

        // The API will call this function when the page has finished downloading the JavaScript for the player API, which enables you to then use the API on your page.
        window.onYouTubeIframeAPIReady = () => {
            let theAd = document.getElementById("theAd");
            window.player = new YT.Player(theAd, {
                events: {
                    'onStateChange' : this.onPlayerStateChange
                }
            });
        }
    }

    componentWillUnmount(){
        funcs.onStop();
        let apiTag = document.getElementById('apiTag')
        apiTag.remove();
    }

    render() {
        return (
            <div>
              <div id="affdex_elements">
                <i className="large material-icons" onClick={this.clickPlay}>play_circle_outline</i>
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
              <div id="logs">Click Play when ready . . .</div>
            </div>
        )
    }
}
