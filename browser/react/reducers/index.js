'use strict';

import { combineReducers } from 'redux';

import auth from './auth';
import currentAds from './ads';

const rootReducer = combineReducers({
  auth, currentAds
});

export default rootReducer;

