import React, { Component } from 'react';

import { Image, Col, Carousel } from 'react-bootstrap';


export default function Landing() {
    const carouselText = {
        color: 'red'
    }

    return (
        <div>
         <h3 className="text-center"> Welcome to MouseTrap! </h3>
            <h4 className="text-center"> Easy-to-use mouse colony management software, made for scientists by scientists</h4>
            <Carousel>
                <Carousel.Item>
                  <img width={450} height={250} alt="450x250" src="/whitelabmouse.jpg"/>
                  <Carousel.Caption bsStyle={carouselText}>
                    <h3>Track your colony</h3>
                    <p>Add new litters and report survival statistics.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img width={450} height={250} alt="450x250" src="/cuteMouse.jpg"/>
                  <Carousel.Caption>
                    <h3>Flexible experimental design</h3>
                    <p>Our algorithm will generate arm assignments for each animal.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img width={450} height={250} alt="450x250" src="/confusedMouse.jpg"/>
                  <Carousel.Caption>
                    <h3>Ad-hoc analytics</h3>
                    <p>Easily generate Gantt charts and Kaplan-Meier survival curves.</p>
                  </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}



