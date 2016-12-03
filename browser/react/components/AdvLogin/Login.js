import React from 'react';
import { browserHistory } from 'react-router';


/* -----------------    COMPONENT     ------------------ */

export default class Login extends React.Component {
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
  }

  render() {
    return (
      <div className="signin-container">
        <div className="errorContainer">
        {location.hash === '#failed' ? <span> Username and password were incorrect </span> : null}
        </div>
        <div className="buffer local">
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>email</label>
                  <input
                    name="email"
                    type="email"
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
                <button type="submit" className="btn btn-block btn-primary green lighten-1">Login</button>
            </form>
        </div>

      </div>
    );
  }

  onSubmit(event) {
    event.preventDefault();
    const { login } = this.props;
    const credentials = {
      email: event.target.email.value,
      password: event.target.password.value
    }

    login(credentials);

  }
}
