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
        let date = new Date();
        date.setFullYear(date.getFullYear() - 13);
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 100, // Creates a dropdown of 100 years to control year
            max: date

        });
    }

    onSubmit(event) {
        event.preventDefault();
        const { signup } = this.props;
        const credentials = {
            name: (event.target.first_name.value + " " + event.target.last_name.value).trim(),
            email: event.target.email.value,
            password: event.target.password.value,
            gender: event.target.gender.value || null
        }
        signup(credentials);
    }

    render() {
        return (
            <div className="signin-container">
                {/* This displays error messages*/}
                <div className="errorContainer">
                    {location.hash === '#failed' ? <span> Sign-up unsuccessful. The email you provided is already registered. </span> : null}
                </div>

                {/* This is the main body of the sign-up form*/}
                <div className="buffer local col s6 push-s3 pull-s3">
                    <form onSubmit={this.onSubmit}>
                        <div className="row">
                            <div className="input-field col s6">
                                <i className="material-icons prefix">account_circle</i>
                                <label htmlFor="icon_prefix">First Name</label>
                                <input
                                    id="icon_prefix"
                                    name="first_name"
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                            <div className="input-field col s6">
                                <label>Last Name</label>
                                <input
                                    name="last_name"
                                    type="text"
                                    className="form-control"
                                />
                            </div>
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
                        <div className="input-field">
                            <i className="material-icons prefix">launch</i>
                            <label htmlFor="icon_prefix">Birthdate</label>
                            <input
                                id="icon_prefix"
                                type="date"
                                className="datepicker"
                            />
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <i className="material-icons prefix">work</i>
                                <select>
                                    <option htmlFor="icon_prefix" defaultValue value="">Income</option>
                                    <option value="1">Less than $25,000</option>
                                    <option value="2">$25,000 to $34,999</option>
                                    <option value="3">$35,000 to $49,999</option>
                                    <option value="4">$50,000 to $74,999</option>
                                    <option value="4">$75,000 to $99,999</option>
                                    <option value="5">$100,000 to $149,999</option>
                                    <option value="6">$150,000 or more</option>
                                </select>
                            </div>
                            <div className="input-field col s6">
                                <select>
                                    <option defaultValue value="">Education</option>
                                    <option value="1">Less than high school</option>
                                    <option value="2">High school graduate</option>
                                    <option value="3">Some college, no degree</option>
                                    <option value="4">Associate degree</option>
                                    <option value="4">Bachelor degree</option>
                                    <option value="5">Ph.D.</option>
                                    <option value="6">Graduate or professional degree</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="gender-field">
                                <div className="col s4">
                                    <input className="gender" value="female" type="radio" name="gender" id="female" />
                                    <label htmlFor="female">Female</label>
                                </div>
                                <div className="col s4">
                                    <input className="gender" value="male" type="radio" name="gender" id="male" />
                                    <label htmlFor="male">Male</label>
                                </div>
                                <div className="col s4">
                                    <input className="gender" value="other_decline" type="radio" name="gender" id="other_decline" />
                                    <label htmlFor="other_decline">Other/Decline</label>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="waves-effect waves-teal btn padded">Sign up</button>
                    </form>
                </div>
            </div>
        );
    }
}
