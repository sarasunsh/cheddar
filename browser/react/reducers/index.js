'use strict';

import { combineReducers } from 'redux';

import auth from './auth';
import ads from './ads';

const rootReducer = combineReducers({
  auth, ads
});

export default rootReducer;

