import axios from 'axios';

import { LOAD_ALL_ARMS, ADD_NEW_ARM, DELETE_ARM } from '../constants';

// ACTION-CREATORS--------------------------------------------------------
export const loadAllArms = function(fetchedArms){
    return {
        type: LOAD_ALL_ARMS,
        loadedArms: fetchedArms
    }
}

export const receiveNewArm = function(newArm){
    return {
        type: ADD_NEW_ARM,
        newArm: newArm
    }
}

export const removeDeletedArm = function(deletedArm){
    return {
        type: DELETE_ARM,
        deletedArm: deletedArm
    }
}

// DISPATCHERS/THUNKS --------------------------------------------------------
export const fetchArmsFromServer = function(){
    const thunk = function(dispatch) {
        axios.get('/api/experiment')
        .then(res => dispatch(loadAllArms(res.data)))
        .catch(err => console.log(err))
    }
    return thunk;
}

export const addNewArm = function(data) {
    const thunk = function(dispatch){
        axios.post('/api/experiment', data)
        .then(res => {
            const action = receiveNewArm(res.data);
            dispatch(action)
        })
    }
    return thunk;
}

export const removeArm = function(id) {
    console.log('removeArm', id)
    const thunk = function(dispatch){
        axios.delete(`/api/experiment/${id}`)
        .then(res => {
            const action = removeDeletedArm(res.data)
            dispatch(action)
        })
        .catch(err => console.error(`Removing story: ${id} unsuccesful`, err))
    }
    return thunk;
}


// REDUCER --------------------------------------------------------
export default function experimentArmReducer(state=[], action){
    switch (action.type){
        case LOAD_ALL_ARMS: return  action.loadedArms
        case ADD_NEW_ARM: return [...state, action.newArm]
        case DELETE_ARM: return state.filter(arm => arm.id !== action.deletedArm)
        default: return state
    }
}
