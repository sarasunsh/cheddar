import React from 'react';
import moment from "moment";
//import smiles from '/public/js/smile.js'

export default class Video extends React.Component {

 componentDidMount(){
   var aftag = document.createElement('script');
   aftag.setAttribute('src','/js/af/affdex.js');
   document.head.appendChild(aftag);
   console.log(aftag)
   var smileTag = document.createElement('script');
   smileTag.setAttribute('src','/js/smile.js');
   document.head.appendChild(smileTag);
 }

  render() {
    return (
        <div>
          This is the video component.
          <div id="affdex_elements" style={{width:'680px',height:'480px',textAlign:'center'}}></div>
          <div id="logs"></div>
        </div>
    )
  }
}
