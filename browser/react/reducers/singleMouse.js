import axios from 'axios';
import { LOAD_CURRENT_MOUSE } from '../constants';

// ACTION-CREATORS--------------------------------------------------------
export const loadSingleMouse = function(fetchedMouse){
    return {
        type: LOAD_CURRENT_MOUSE,
        loadedMouse: fetchedMouse
    }
}


// DISPATCHERS/THUNKS --------------------------------------------------------
export const fetchMouseFromServer = function(mouseID){
    const thunk = function(dispatch) {
        axios.get(`/api/mice/${mouseID}`)
        .then(res => dispatch(loadSingleMouse(res.data)))
        .catch(err => console.log(err))
    }
    return thunk;
}


// REDUCER --------------------------------------------------------
export default function singleMouseReducer(state={}, action){
    switch (action.type){
        case LOAD_CURRENT_MOUSE: return action.loadedMouse
        default: return state
    }
}
