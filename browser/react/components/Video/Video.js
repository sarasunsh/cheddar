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

        this.progressBar = this.progressBar.bind(this);
        this.width = 640,
        this.height = 480;
        this.url = `https://www.youtube.com/embed/${this.props.currentAd.url}?`;
        this.url += 'enablejsapi=1&' // must be appended to embed url so we can control play/pause
        this.url += 'showinfo=0&' // and controls=0 will hide the youtube player controls
        // this.url += 'disablekb=1&' // will prevent you from skipping ahead with arrow keys
        this.url += 'iv_load_policy=3&' // hides video annotations / popups / subscribe now stuff
        this.url += 'rel=0' // prevents related videos from popping up at the end
    }

    clickPlay(e){
        this.setState({determinate: false, progress: '0%'})
        funcs.onStart();
        document.getElementById("affdex_elements").style.display = "block";
        e.target.parentNode.remove();
    }

    onPlayerStateChange(state){
        console.log('player state is ', state)
        if(state.data === YT.PlayerState.ENDED ) {
            let finalSmile = funcs.smilyScore[0];
            document.getElementById("theAd").style.display = "none";
            const canvas = document.getElementById('best_smile');
            canvas.height = 480;
            canvas.style.paddingTop = "20px";
            const ctx = canvas.getContext('2d');
            ctx.putImageData(window.top_smile[1], 0, 0);
            ctx.font = "48px Happy Monkey";
            ctx.textAlign="center";
            ctx.shadowColor = '#FFF';
            ctx.shadowOffsetX = 3;
            ctx.shadowOffsetY = 2;
            ctx.shadowBlur    = 3;
            ctx.fillText(this.props.currentAd.title.split(" ")[0] + " makes me smile!", 320, 60, 600);

            funcs.log('logs', `Congratulations! Your smilyScore was ${Math.trunc(finalSmile)}`);
            funcs.onStop();
            funcs.saveSmile(canvas,this.props.user.id + "_" + this.props.currentAd.id, this.props.currentAd.title.split(" ")[0] + " makes me smile!");
            axios.post(`api/views/${this.props.user.id}/${this.props.currentAd.id}`, {smilyScore: finalSmile})
                .catch(err => console.log(err))
                .then( () =>{
                  axios.post(`api/tweet/`, {text: this.props.currentAd.title.split(" ")[0] + " makes me smile! 😀 #smile", smile: canvas.toDataURL("image/png").replace(/^data:image\/(png|jpg);base64,/, "")})
                    .then(() => setTimeout(() => location.pathname='/ads', 5000))
                    .catch(err => console.log(err))
                })
        }
    }

    componentDidMount(){
        //if there is not a url on the current ad, then this page was retrieved in error.
        //Like. the video component should ONLY be rendered as a result of setting
        //the store from the ads component. So. Redirect ill gotten requests.
        if(!this.props.currentAd.url){
            browserHistory.push('/ads')
        }

        let theAd = document.getElementById("theAd")
        const affdexContainer = document.getElementById("affdex_elements");
        window.top_smile = [0,null];

        const faceMode = affdex.FaceDetectorMode.LARGE_FACES;
        window.detector = new affdex.CameraDetector(affdexContainer, this.width, this.height, faceMode);
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
            funcs.log('logs', "Say Cheeeeeese!",true);
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
                    if (funcs.preSmilyScoreAvg(faces[0].expressions.smile) > 10){
                        funcs.startVideo(theAd);
                    }
                } else {
                    funcs.smilyScoreAvg(faces[0].expressions.smile);
                    this.setState({determinate: true, progress: `${funcs.preSmilyScoreAvg(faces[0].expressions.smile)}%`});
                    // this.setState({determinate: true, progress: `${funcs.smilyScore[0]}%`});

                    // console.log("smilyScore!",funcs.smilyScore[0]);
                    // console.log(faces[0].emojis.dominantEmoji);
                    if(window.top_smile[0] <  faces[0].expressions.smile){
                      window.top_smile[0] = faces[0].expressions.smile;
                      window.top_smile[1] = image;
                    }
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
        console.log('componentWillUnmount')
    }

    progressBar(){

        if(this.state.determinate) {

            if(+this.state.progress.slice(0,-1) > 66) {
                return "determinate green";
            }
            else if (+this.state.progress.slice(0,-1) > 33) {
                return "determinate yellow";
            }
            else {
                return "determinate red";
            }
        } else {
            return "indeterminate";

        }

    }

    render() {
        return (
            <div style={{height: this.height}}>
              <div style={{textAlign:"center"}}>
                <canvas id="best_smile" height="1px" width={this.width}></canvas>
              </div>
              <div id="logs"> Click Play when ready . . .</div>
              <div style={{textAlign:"center"}}>
                  <i id="playButton"
                  className="large material-icons"
                  onClick={this.clickPlay}>
                  play_circle_outline
                  </i>
              </div>
              <div id="affdex_elements">
              </div>

              <iframe
                  style={{display: 'none'}}
                  src={this.url}
                  width={this.width}
                  height={this.height}
                  frameBorder='0'
                  id='theAd'>
              </iframe>

              <div className="progress grey lighten-2" >
                <div
                    id="logs_animation"
                    className={ this.progressBar()    }
                    style={{width: this.state.progress}}>
                </div>
              </div>
              <div className={this.state.determinate && this.state.progress != "0px" ? "btn green" : "btn disabled"} style={{float: "right"}}>
                SmileMeter
              </div>
            </div>
        )
    }
}
