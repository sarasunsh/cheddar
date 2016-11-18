import React from 'react';
import { connect } from 'react-redux';
import Auth from './Auth';
import { login } from '../../reducers/auth';

const mapStateLogin = (state) => ({ message: 'Log in', user: state.auth })
const mapDispatchLogin = dispatch => ({
  login: credentials => {
    dispatch(login(credentials));
  }
})


const AuthContainer = connect(mapStateLogin, mapDispatchLogin)(Auth);
export default AuthContainer;

