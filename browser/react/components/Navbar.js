import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Button, Popover, OverlayTrigger } from 'react-bootstrap';
import { logout } from '../reducers/auth'

class Navbar extends React.Component {
    render(){
        return (
          <div className='navbar-fixed'>
            <nav>
              <div className="nav-wrapper">
                  <Link className="brand-logo" to='/'> Cheddar </Link>
                    <ul className="right hide-on-med-and-down">
                    {this.props.user ?
                    <div>
                      <li><Link className="name-pop" to={localStorage.token === "adv"?'/advertisers':'/ads'}>{this.props.user.name || this.props.user.email}</Link></li>
                      <li><Link to='/' className='btn nav waves-effect waves-teal btn-flat' onClick={this.props.logoutClick}>Log out</Link></li>
                    </div>
                    :
                    <div>
                      <li><Link className='btn nav waves-effect waves-teal btn-flat' to="/login">Log in</Link></li>
                      <li><Link className='btn nav waves-effect waves-teal btn-flat' to="/signup">Sign Up</Link></li>
                    </div>
                    }
                  </ul>
              </div>
            </nav>
          </div>
        )
    }
}

const mapStateToProps = (state) => ({
  user: state.auth
})

const mapDispatch = dispatch => ({
  logoutClick: () => {
    dispatch(logout());
  }
})
const NavbarContainer = connect(mapStateToProps, mapDispatch)(Navbar);
export default NavbarContainer;
