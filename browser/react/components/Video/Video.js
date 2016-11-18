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
    return (
        <div>
          This is the video component.
          <div id="affdex_elements" style={{width:'680px',height:'480px',textAlign:'center', margin: '0 auto'}}>
            <span id='playButton' onClick={() => onStart()} style={{fontSize: '200px', margin: '33%', textAlign:'center' }} className="glyphicon glyphicon-play-circle"></span>
          </div>
          <div id="logs"></div>
        </div>
    )
  }
}
