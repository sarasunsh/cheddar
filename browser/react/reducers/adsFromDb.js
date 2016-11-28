import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */


const SET_NEXT_ADS = 'SET_NEXT_ADS';
const SET_SELECT_ADS = 'SET_SELECT_ADS';



/* ------------   ACTION CREATORS     ------------------ */

const setAds = (ads) => ({type: SET_NEXT_ADS, ads});
//this should be in a different file
//export const selectAds = (select) => ({type: SET_SELECT_ADS, select})

/* ------------       REDUCER     ------------------ */

export default function reducer (currentAds = [], action) {
    switch (action.type){
        case SET_NEXT_ADS: return action.ads
        default: return currentAds;
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



export const findAllAdsForAdvertiser = (advertiserId) => dispatch => {
    //respond to get api ads next should be an array of ad urls
    axios.get(`/api/advertisers/${advertiserId}`)
        .then(res => {
            //the server will return an array of ALL video objects representing ads. url, title, id.
            dispatch(setAds(res.data))
        })
        .catch(err => {
            console.error(err);
          //  dispatch(setAds(['WcwsDJhrREU','MaYv3Y8tyoQ']))
        })
}
