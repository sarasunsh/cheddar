import {connect} from 'react-redux';
import Analytics from './Analytics'

const mapStateToProps = state => ({
  user: state.auth,
  adChoice: state.adChoice
})

const AnalyticsContainer = connect(mapStateToProps)(Analytics)
export default AnalyticsContainer;
