import {connect} from 'react-redux';
import Video from './Video';

const mapStateToVideo = (state) => ({
  user: state.auth,
  currentAd: state.adChoice
})

const VideoContainer = connect(mapStateToVideo)(Video)
export default VideoContainer;
