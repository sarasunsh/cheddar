import React from 'react';
import {connect} from 'react-redux';
import Ads from './Ads'
import {findAds, selectAds} from '../../reducers/ads';


const mapStateToAds = (state) => ({
  user: state.auth,
  currentAds: state.currentAds
})
const mapDispatchToAds = (dispatch) => ({
    findAds: () => {
        dispatch(findAds())
    },
    selectAd: (zeroOrOne) => {
        dispatch(selectAds(zeroOrOne))
    }
})

const AdsContainer = connect(mapStateToAds, mapDispatchToAds)(Ads)
export default AdsContainer;