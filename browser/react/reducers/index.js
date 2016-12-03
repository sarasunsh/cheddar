import { combineReducers } from 'redux';

import auth from './auth';
//the currentAds property of the store is an array of two ads returned from
//a database call made when the Ads Component is mounted
import currentAds from './adsFromDb';
//the adChoice is an object with video title, url, id which is set when a user
//clicks a choice on the ads component.
import adChoice from './adFromClick';

const rootReducer = combineReducers({
  auth, currentAds, adChoice
});

export default rootReducer;
