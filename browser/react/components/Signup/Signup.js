import React from 'react';


/* -----------------    COMPONENT     ------------------ */

export default class Auth extends React.Component {
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
                <div className="form-group">
                    <label>Age</label>
                    <input
                      name="age"
                      type="number"
                      className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Gender</label>
                    <select name="Gender">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Income</label>
                    <input
                      name="income"
                      type="dropdown"
                      className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-block btn-primary">Signup</button>
            </form>
        </div>
      </div>
    );
  }

  onSubmit(event) {
    event.preventDefault();
    const { signup } = this.props;
    const credentials = {
      email: event.target.email.value,
      password: event.target.password.value
    }

    signup(credentials);

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
