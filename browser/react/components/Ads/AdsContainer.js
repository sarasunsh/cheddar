import React from 'react';
import {connect} from 'react-redux';
import Ads from './Ads'
import {findAds} from '../../reducers/adsFromDb';
import {selectAds} from '../../reducers/adFromClick';




const mapStateToAds = (state) => ({
  user: state.auth,
  currentAds: state.currentAds
})
const mapDispatchToAds = (dispatch) => ({
    findAds: () => {
        dispatch(findAds())
    },
    //selectAd is a function that will be used in the Ads component which
    //, when a choice is clicked, will fire an action to set the store while redirecting to the video page
    selectAd: (theChosenAdObj) => {
        dispatch(selectAds(theChosenAdObj))
    }
})

const AdsContainer = connect(mapStateToAds, mapDispatchToAds)(Ads)
export default AdsContainer;