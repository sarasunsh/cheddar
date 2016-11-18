import React from 'react';
import moment from "moment";

export default class Video extends React.Component {

 componentDidMount(){
   var aftag = document.createElement('script');
   aftag.setAttribute('src','/js/af/affdex.js');
   document.head.appendChild(aftag);
   var smileTag = document.createElement('script');
   smileTag.setAttribute('src','/js/smile.js');
   document.head.appendChild(smileTag);
 }

  render() {
    function clickPlay(e){
      onStart();
      e.target.remove();
    }
    return (
        <div>
          <div id="affdex_elements">
            <span id='playButton' onClick={clickPlay} className="glyphicon glyphicon-play-circle"></span>
          </div>
          <div id="logs"><span></span></div>
        </div>
    )
  }
}
