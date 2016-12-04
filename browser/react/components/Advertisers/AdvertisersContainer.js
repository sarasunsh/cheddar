import {connect} from 'react-redux';
import Advertisers from './Advertisers'
import {findAllAdsForAdvertiser} from '../../reducers/adsFromDb';
import {selectAds} from '../../reducers/adFromClick';

const mapStateToProps = (state) => ({
  user: state.auth,
  currentAds: state.currentAds
})

const mapDispatchToProps = (dispatch) => ({
    findAllAdsForAdvertiser: () => {
        // console.log("findAllAdsForAdvertiser running in mapDispatchToProps")
        dispatch(findAllAdsForAdvertiser())
    },
    // We are not using the advertiserId at the moment because we are assuming there is only one advertiser; this will just get ALL of the ads in the database for the moment; the parameter is there for when we need it in the next step


    //selectAd is a function that will be used in the Ads component which
    //, when a choice is clicked, will fire an action to set the store while redirecting to the video page
    selectAd: (theChosenAdObj) => {
        dispatch(selectAds(theChosenAdObj))
    }
})

const AdvertisersContainer = connect(mapStateToProps, mapDispatchToProps)(Advertisers)
export default AdvertisersContainer;
