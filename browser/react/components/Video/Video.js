import React from 'react';
import moment from "moment";

export default class Video extends React.Component {

  constructor(props) {
    super(props);
    this.clickPlay = this.clickPlay.bind(this);
  }

  componentDidMount(){
   var aftag = document.createElement('script');
   aftag.setAttribute('src','/js/af/affdex.js');
   document.head.appendChild(aftag);
   var smileTag = document.createElement('script');
   smileTag.setAttribute('src','/js/smile.js');
   document.head.appendChild(smileTag);
  }

  clickPlay(e){
    onStart();
    e.target.remove();
  }

  render() {
    return (
        <div>
          <div id="affdex_elements">
            <i className="large material-icons" onClick={this.clickPlay}>play_circle_outline</i>

          </div>
          <div className="progress">
            <div id="logs_animation" className="indeterminate"></div>
          </div>
          <div id="logs">Click Play when ready . . .</div>
        </div>
    )
  }
}
