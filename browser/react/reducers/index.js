'use strict';

import { combineReducers } from 'redux';

import mice from './allMice';
import currentMouse from './singleMouse';
import exptArms from './experiment';
import euthanize from './euthanize';

const rootReducer = combineReducers({
  mice,
  currentMouse,
  exptArms,
  euthanize
});

export default rootReducer;

