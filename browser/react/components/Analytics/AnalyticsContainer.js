import React from 'react';
import {connect} from 'react-redux';
import Analytics from './Analytics'
// import {findAllAdsForAdvertiser} from '../../reducers/adsFromDb';
// import {selectAds} from '../../reducers/adFromClick';

const mapStateToProps = (state) => ({
  user: state.auth,
  adChoice: state.adChoice
})

const AnalyticsContainer = connect(mapStateToProps)(Analytics)
export default AnalyticsContainer;
