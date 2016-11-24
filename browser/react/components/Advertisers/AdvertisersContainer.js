import React from 'react';
import {connect} from 'react-redux';
import Advertisers from './Advertisers'
import {findAds} from '../../reducers/adsFromDb';
import {selectAds} from '../../reducers/adFromClick';




const mapStateToAds = (state) => ({
  user: state.auth
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

const AdvertiersContainer = connect(mapStateToAds, mapDispatchToAds)(Advertisers)
export default AdvertisersContainer;
