import React from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import { adv_login } from '../../reducers/auth';

const mapStateLogin = (state) => ({ message: 'Log in', user: state.auth })
const mapDispatchLogin = dispatch => ({
  login: credentials => {
    dispatch(adv_login(credentials));
  }
})


const LoginContainer = connect(mapStateLogin, mapDispatchLogin)(Login);
export default LoginContainer;
