import React from 'react';
import moment from "moment";

export default class Video extends React.Component {



  constructor(props) {
    super(props);
    this.state = {
      determinate: true,
      progress: '0%'
    }
    this.clickPlay = this.clickPlay.bind(this);
    //this is a hardcoded youtube on the class. Change this to be a this.props thing.
    this.url = 'https://www.youtube.com/embed/WcwsDJhrREU' + '?enablejsapi=1';
    //enablejsapi=1 must be appended to embed url so we can control play/pause via iframe.postMessage
 }

  clickPlay(e){
    this.setState({determinate: false, progress: '0%'})
    onStart(this);
    e.target.remove();
  }



  render() {
    return (
        <div>

          <div id="affdex_elements">
            <i className="large material-icons" onClick={this.clickPlay}>play_circle_outline</i>
            <iframe style={{display: 'none'}} src={this.url} width='640' height='480' frameBorder='0' id='theAd'></iframe>
          </div>
          <div className="progress">
            <div id="logs_animation" className={ this.state.determinate ? "determinate" : "indeterminate" } style={{width: this.state.progress}}></div>
          </div>
          <div id="logs">Click Play when ready . . .</div>
        </div>
    )
  }
}
