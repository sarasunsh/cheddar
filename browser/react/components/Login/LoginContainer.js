import React from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import { login } from '../../reducers/auth';

const mapStateLogin = (state) => ({ message: 'Log in', user: state.auth })
const mapDispatchLogin = dispatch => ({
  login: credentials => {
    dispatch(login(credentials));
  }
})


const LoginContainer = connect(mapStateLogin, mapDispatchLogin)(Login);
export default LoginContainer;

