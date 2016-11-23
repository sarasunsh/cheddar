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

export default function reducer (adChoice = {}, action) {
    switch (action.type){
        case SET_SELECT_ADS: return action.select;
        default: return adChoice;
    }
}

/* ------------       DISPATCHERS     ------------------ */

export const findAds = () => dispatch => {
    //respond to get api ads next should be an array of ad urls
    axios.get('/api/videos')
        .then(res => { 
            //the server will return an array of 2 objects representing ads. url, title, id.
            dispatch(setAds(res.data))
        })
        .catch(err => {
            console.error(err);
          //  dispatch(setAds(['WcwsDJhrREU','MaYv3Y8tyoQ']))
        })
}