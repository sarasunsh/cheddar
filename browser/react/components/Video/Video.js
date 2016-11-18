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
          <div id="affdex_elements" style={{width:'640px',height:'480px',textAlign:'center', margin: 'Calc(50vh - 240px) auto'}}>
            <span id='playButton' onClick={(e) => {
              onStart()
              e.target.remove();
            }} style={{fontSize: '200px', margin: '140px', textAlign:'center' }} className="glyphicon glyphicon-play-circle"></span>
          </div>
          <div id="logs"></div>
        </div>
    )
  }
}
