import React, { Component } from 'react';

import { Image, Col, Carousel } from 'react-bootstrap';


export default function Landing() {
    const carouselText = {
        color: 'red'
    }

    return (
        <div>
         <h3 className="text-center"> Welcome to Cheddar! </h3>
            <h4 className="text-center"> A platform for people to monetize their face. Say cheese to make cheddar.</h4>
            <Carousel>
                <Carousel.Item>
                  <img width={450} height={250} alt="450x250" src="http://www.nicolasfradet.com/wp-content/uploads/2013/02/fake_smile.jpg"/>
                  <Carousel.Caption bsStyle={carouselText}>
                    <h3>Get paid to watch fun videos!</h3>
                    <p>The more you smile, the more you make</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img width={450} height={250} alt="450x250" src="http://insiderlouisville.com/wp-content/uploads/2015/05/mad-men.jpg"/>
                  <Carousel.Caption>
                    <h3>Forge connections with your audience!</h3>
                    <p>Our algorithm will put the right eyeballs on your ad.</p>
                  </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}


