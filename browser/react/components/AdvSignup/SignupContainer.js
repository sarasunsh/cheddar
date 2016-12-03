import { connect } from 'react-redux';
import Signup from './Signup';
import { adv_signup } from '../../reducers/auth';

const mapStateLogin = state => ({ message: 'Signed up', user: state.auth })
const mapDispatchLogin = dispatch => ({
  signup: credentials => {
    dispatch(adv_signup(credentials));
  }
})


const SignupContainer = connect(mapStateLogin, mapDispatchLogin)(Signup);
export default SignupContainer;
