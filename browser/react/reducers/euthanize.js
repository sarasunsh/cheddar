import axios from 'axios';
import { browserHistory } from 'react-router';

import { TOGGLE_EUTHANIZE } from '../constants';

// ACTION-CREATORS--------------------------------------------------------
export const toggleEuthanize = function(){
    return {
        type: TOGGLE_EUTHANIZE
    }
}


// REDUCER --------------------------------------------------------
export default function euthReducer(state=false, action){
    switch (action.type){
        case TOGGLE_EUTHANIZE: return !state
        default: return state
    }
}
