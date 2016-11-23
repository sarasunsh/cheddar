import React from 'react';
import {connect} from 'react-redux';
import Video from './Video';
// import {findAds} from '../../reducers/ads';


const mapStateToVideo = (state) => ({
  user: state.auth,
  currentAd: state.adChoice
})



const VideoContainer = connect(mapStateToVideo)(Video)
export default VideoContainer;
