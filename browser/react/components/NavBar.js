import React, { Component } from 'react';
import { Link } from 'react-router'
import {Row, Col, Navbar, Nav, NavItem, FormGroup, FormControl, Button, Glyphicon } from 'react-bootstrap';

export default (props) => {
// 'user' is pulled from the 'auth' property of our state. if exists, we provide a Welcome
// and switch the 'log in' button to a 'log out'. 'logoutHandler' handles a logout request
// on user click
// const { user, logoutHandler } = props;

    return (
        <div className='customNav'>
            <div className='logoDiv navSection'>
                <Link to={`/`}>
                    <img src="./trucker.png" className="logo"/>
                </Link>
            </div>
            <div className='verticalDivider' />
            <div className='searchSection navSection'>
                <input type="text" className="search locationIcon" placeholder="Where are you located?"/>
                <div className='verticalDivider' />
                <input type="text" className="search searchIcon" placeholder="What would you like to eat?" />
                <div className='verticalDivider' />
            </div>
            <div className='navButtonSection navSection'>
                <div className='navButton'>
                    <span>
                        {<Link to={`/mice/`}>{`Welcome, name`}</Link>}
                    </span>
                </div>
                <div className='verticalDivider' />
                <div className='navButton'>
                    Placeholder
                </div>
                <div className='verticalDivider' />
                <div className='navButton'>
                    <img src="./shopping_bag_icon.png" className="shoppingBagIcon"/>
                </div>
                <div className='verticalDivider' />
            </div>
        </div>

    )
}
