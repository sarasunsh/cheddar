import React from 'react';
import { connect } from 'react-redux';
import Signup from './Signup';
import { signup } from '../../reducers/auth';

const mapStateLogin = (state) => ({ message: 'Signed up', user: state.auth })
const mapDispatchLogin = dispatch => ({
  signup: credentials => {
    dispatch(signup(credentials));
  }
})


const SignupContainer = connect(mapStateLogin, mapDispatchLogin)(Signup);
export default SignupContainer;
