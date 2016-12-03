import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const SET_SELECT_ADS = 'SET_SELECT_ADS';

/* ------------   ACTION CREATORS     ------------------ */
//selectAds will be imported to AdsContainer and handed down as props
//the Ads component will call the selectAds function onClick per ad option
//it will be passed the object from the currentAds array which was set by
//the adsFromDb reducer when the Ads component was mounted.
export const selectAds = (select) => ({type: SET_SELECT_ADS, select})

/* ------------       REDUCER     ------------------ */

export default function reducer (adChoice = {url: "", title: "", id: 0}, action) {
    switch (action.type){
        case SET_SELECT_ADS: return action.select;
        default: return adChoice;
    }
}

