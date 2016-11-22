import React from 'react';
import {connect} from 'react-redux';
import Ads from './Ads'
import {findAds} from '../../reducers/ads';


const mapStateToAds = (state) => ({
  user: state.auth,
  ads: state.ads
})
const mapDispatchToAds = (dispatch) => ({
    findAds: () => {
        dispatch(findAds())
    }
})

const AdsContainer = connect(mapStateToAds, mapDispatchToAds)(Ads)
export default AdsContainer;