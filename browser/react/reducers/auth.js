import axios from 'axios';
import {browserHistory} from 'react-router';

/* -----------------    ACTIONS     ------------------ */

const SET    = 'SET_CURRENT_USER'
const REMOVE = 'REMOVE_CURRENT_USER'

/* ------------   ACTION CREATORS     ------------------ */

const set     = user => {
    delete user.password_digest
    return {
        type: SET,
        user
    }
}
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
  axios.post('/api/auth/login', credentials)
      .then((res) => {
        localStorage.setItem('token', "user")
        return res.data;
      })
      .then(redirect => browserHistory.push(redirect))
      .catch(err => browserHistory.push('/login#failed'));
}

export const adv_login = credentials => dispatch => {
  axios.post('/api/auth/adv_login', credentials)
      .then((res) => {
        localStorage.setItem('token', "adv")
        return res.data;
      })
      .then(redirect => browserHistory.push(redirect))
      .catch(err => browserHistory.push('/adv_login#failed'));
}

export const signup = credentials => dispatch => {
  axios.post('/api/auth/signup', credentials)
      .then(res => {
        localStorage.setItem('token', "user")
        if(res.status === 200) dispatch(retrieveLoggedInUser());
        //res.data will be the redirect url path
        return res.data;
      })
      .then(redirect => browserHistory.push(redirect))
      .catch(err => {
       console.error(err)
       browserHistory.push('/signup#failed')
     })
}

export const adv_signup = credentials => dispatch => {
  axios.post('/api/auth/adv_signup', credentials)
      .then(res => {
        localStorage.setItem('token', "adv")
        if(res.status === 200) dispatch(retrieveLoggedInUser());
        //res.data will be the redirect url path
        return res.data;
      })
      .then(redirect => browserHistory.push(redirect))
      .catch(err => {
       console.error(err)
       browserHistory.push('/adv_signup#failed')
     })
}

export const retrieveLoggedInUser = (type = localStorage.token) => dispatch => {
  axios.get('/api/auth/me')
      .then(res => {
        dispatch(set(res.data))
      })
      .catch(err => {
        localStorage.removeItem('token');
        if (type === "user"){
          browserHistory.push('/login');
        } else {
          browserHistory.push('/adv_login');
        }
        console.error('retrieveLoggedInUser unsuccessful', err)
      });
}

// optimistic
export const logout = () => dispatch => {
    dispatch(remove())
    localStorage.removeItem('token');
    axios.get('/api/auth/logout')
    .then(res => browserHistory.push('/'))
    .catch(err => console.error('logout unsuccessful', err));
}
