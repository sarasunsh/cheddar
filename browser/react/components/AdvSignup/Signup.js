import React from 'react';
import {browserHistory} from 'react-router';

/* -----------------    COMPONENT     ------------------ */

export default class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    if(localStorage.token){
      //if there's a storage token when you hit the sign up route,
      //check if the token is adv or user, and history.push to the appropriate route
      browserHistory.push((localStorage.token === 'adv' ? '/advertisers' : '/ads'))
    }
    $('select').material_select();
  }

  render() {
    return (
      <div className="signin-container">
        <div className="errorContainer">
        {location.hash === '#failed' ? <span> Sign Up Unsuccessful. Perhaps the email was already used. </span> : null}
        </div>
        <div className="buffer local col s6 push-s3 pull-s3">
            <form onSubmit={this.onSubmit}>
                        <div className="input-field">
                            <i className="material-icons prefix">business</i>
                            <label htmlFor="icon_prefix">Company</label>
                            <input
                                id="icon_prefix"
                                name="name"
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="input-field">
                            <i className="material-icons prefix">email</i>
                            <label htmlFor="icon_prefix">Email</label>
                            <input
                                id="icon_prefix"
                                name="email"
                                type="text"
                                className="form-control validate"
                                required
                            />
                        </div>
                        <div className="input-field">
                            <i className="material-icons prefix">lock_outline</i>
                            <label htmlFor="icon_prefix">Password</label>
                            <input
                                id="icon_prefix"
                                name="password"
                                type="password"
                                className="form-control"
                                required
                            />
                        </div>
                <button type="submit" className="btn btn-block btn-primary center-block">Sign up</button>
            </form>
        </div>
      </div>
    );
  }

  onSubmit(event) {
    event.preventDefault();
    const { signup } = this.props;
    const credentials = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value
    }

    signup(credentials);

  }
}
