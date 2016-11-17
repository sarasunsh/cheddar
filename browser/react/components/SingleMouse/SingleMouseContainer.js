import { connect } from 'react-redux';
import SingleMouse from './SingleMouse';
import { reportMouseDeath } from '../../ducks/allMice';


const mapStateToProps = function (state) {
  return {
    mouse: state.currentMouse
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    reportDeath: function (mouseID) {
      const thunk = reportMouseDeath(mouseID);
      dispatch(thunk);
    }
  };
};

const SingleMouseContainer = connect(mapStateToProps, mapDispatchToProps)(SingleMouse);
export default SingleMouseContainer;
