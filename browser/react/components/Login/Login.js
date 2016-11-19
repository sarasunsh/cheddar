import React from 'react';


/* -----------------    COMPONENT     ------------------ */

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    return (
      <div className="signin-container">
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
                <button type="submit" className="btn btn-block btn-primary">Login</button>
            </form>
        </div>

      </div>
    );
  }

  onSubmit(event) {
    event.preventDefault();
    const { login, signup } = this.props;
    const credentials = {
      email: event.target.email.value,
      password: event.target.password.value
    }

    login(credentials);

  }
}


/* OAuth code that was inside Render which can be put back

<div className="or buffer">
          <div className="back-line">
            <span>OR</span>
          </div>
        </div>
        <div className="buffer oauth">
          <p>
            <a target="_self"
               href="/auth/google"
               className="btn btn-social btn-google">
            <i className="fa fa-google"></i>
            <span>{message} with Google</span>
            </a>
          </p>
        </div>


*/

