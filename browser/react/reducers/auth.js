import axios from 'axios';
import {browserHistory} from 'react-router';

/* -----------------    ACTIONS     ------------------ */

const SET    = 'SET_CURRENT_USER'
const REMOVE = 'REMOVE_CURRENT_USER'

/* ------------   ACTION CREATORS     ------------------ */

const set     = user => ({ type: SET, user })
const remove  = () => ({ type: REMOVE })

/* ------------       REDUCER     ------------------ */

export default function reducer (currentUser = null, action) {
  switch (action.type) {
    case SET: return action.user;
    case REMOVE: return null;
    default: return currentUser;
  }
}

/* ------------       DISPATCHERS     ------------------ */

export const login = credentials => dispatch => {
  axios.post('/login', credentials)
      .then(res => {
        localStorage.setItem('token', JSON.stringify(res.data))
        dispatch(retrieveLoggedInUser());
      })
     .catch(err => console.error('Login unsuccessful', err));
}

export const signup = credentials => dispatch => {
  axios.post('/signup', credentials)
      .then(res => {
        localStorage.setItem('token', JSON.stringify(res.data))
        dispatch(set(res.data))
      })
     .catch(err => console.error('Signup unsuccessful', err));
}

export const retrieveLoggedInUser = () => dispatch => {
  axios.get('api/auth/me')
      .then(res => {
        dispatch(set(res.data))
      })
      .catch(err => console.error('retrieveLoggedInUser unsuccesful', err));
}

// optimistic
export const logout = () => dispatch => {
    dispatch(remove())
    localStorage.removeItem('token');
    axios.get('api/auth/logout')
    .then(res => browserHistory.push('/auth'))
    .catch(err => console.error('logout unsuccessful', err));
}
