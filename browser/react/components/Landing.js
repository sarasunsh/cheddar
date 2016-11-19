import React, { Component } from 'react';
import { Link } from 'react-router';
import { Image, Col, Carousel } from 'react-bootstrap';


export default function Landing() {


    return (
        <div>
         <h3 className="center"> Welcome to Cheddar! </h3>
            <h4 className="center"> A platform for people to monetize their face. Say cheese to make cheddar.</h4>
            <div className="carousel carousel-slider">
                <Link className="carousel-item">
                  <img  alt="450x250" src="http://www.nicolasfradet.com/wp-content/uploads/2013/02/fake_smile.jpg"/>
                  <div >
                    <h3>Get paid to watch fun videos!</h3>
                    <p>The more you smile, the more you make</p>
                  </div>
                </Link>

                <Link className="carousel-item">
                  <img  alt="450x250" src="http://insiderlouisville.com/wp-content/uploads/2015/05/mad-men.jpg"/>
                  <div>
                    <h3>Forge connections with your audience!</h3>
                    <p>Our algorithm will put the right eyeballs on your ad.</p>
                  </div>
                </Link>
            </div>
        </div>
    )
}


