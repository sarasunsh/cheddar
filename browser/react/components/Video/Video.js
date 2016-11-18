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
            <span id='playButton' onClick={this.clickPlay} className="glyphicon glyphicon-play-circle"></span>
          </div>
          <div id="logs">Click Play when ready . . .</div>
        </div>
    )
  }
}
