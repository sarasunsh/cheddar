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
        <div className="buffer local">
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>name</label>
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>email</label>
                  <input
                    name="email"
                    type="text"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                    <label>password</label>
                    <input
                      name="password"
                      type="password"
                      className="form-control"
                      required
                    />
                </div>
                <button type="submit" className="btn btn-block btn-primary green lighten-1">Signup</button>
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
