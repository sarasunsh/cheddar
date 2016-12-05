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
        <div className="buffer local col s6 push-s3 pull-s3">
            <form onSubmit={this.onSubmit}>
                <div className="input-field">
               <i className="material-icons prefix">email</i>
               <label htmlFor="icon_prefix">Email</label>
                <input
                    id="icon_prefix"
                    name="email"
                    type="email"
                    className="form-control"
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
                <button type="submit" className="btn btn-block btn-primary center-block">Log in</button>
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
