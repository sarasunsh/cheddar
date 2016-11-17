import axios from 'axios';
import { browserHistory } from 'react-router';

import {toggleEuthanize} from './euthanize';
import { LOAD_ALL_MICE, ADD_NEW_MOUSE, REMOVE_DEAD_MOUSE, TOGGLE_EUTHANIZE } from '../constants';

// ACTION-CREATORS--------------------------------------------------------
export const loadAllMice = function(fetchedMice){
    return {
        type: LOAD_ALL_MICE,
        loadedMice: fetchedMice
    }
}

export const receiveNewMouse = function(newMouse){
    return {
        type: ADD_NEW_MOUSE,
        newMouse: newMouse
    }
}

export const removeDeadMouse = function(deceasedMouse){
    return {
        type: REMOVE_DEAD_MOUSE,
        deceasedMouse
    }
}

// DISPATCHERS/THUNKS --------------------------------------------------------
export const fetchMiceFromServer = function(){
    const thunk = function(dispatch) {
        axios.get('/api/mice')
        .then(res => dispatch(loadAllMice(res.data)))
        .catch(err => console.log(err))
    }
    return thunk;
}

export const addNewMouse = function(data) {
    const thunk = function(dispatch){
        axios.post('/api/mice', data)
        .then(res => {
            if (res.data === 'EUTHANIZE'){
                const action = toggleEuthanize();
                dispatch(action);
            } else {
                const action = receiveNewMouse(res.data);
                dispatch(action);
                browserHistory.push(`/mice/${res.data.id}`);
            }

        })
    }
    return thunk;
}

export const reportMouseDeath = function(mouseID){
    const thunk = function(dispatch){
        axios.put(`/api/mice/${mouseID}`)
        .then(res => {
            dispatch(removeDeadMouse(res.data));
            browserHistory.push(`/mice/`);
        })
        .catch(err => console.log(err))
    }
    return thunk;
}

// REDUCER --------------------------------------------------------
export default function allMiceReducer(state=[], action){
    switch (action.type){
        case LOAD_ALL_MICE: return  action.loadedMice
        case ADD_NEW_MOUSE: return [...state, action.newMouse]
        case REMOVE_DEAD_MOUSE:
            let indx = state.map(x => x.id).indexOf(action.deceasedMouse.id)
            return [...state.slice(0, indx), ...state.slice(indx + 1)]
        default: return state
    }
}
