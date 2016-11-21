import React, { Component } from 'react';
import { Link } from 'react-router';
import { Image, Col, Carousel } from 'react-bootstrap';


export default function Landing() {


    return (
        <div>
         <h3 className="center"> Welcome to Cheddar! </h3>
            <h4 className="center"> A platform for people to monetize their face. Say cheese to make cheddar.</h4>
            <div className="carousel">
              <Link className="carousel-item" href="#one!"><img src="/img/smile/1.jpg" /></Link>
              <Link className="carousel-item" href="#two!"><img src="/img/smile/2.jpg" /></Link>
              <Link className="carousel-item" href="#three!"><img src="/img/smile/3.jpg" /></Link>
              <Link className="carousel-item" href="#four!"><img src="/img/smile/4.jpg" /></Link>
              <Link className="carousel-item" href="#five!"><img src="/img/smile/5.jpg" /></Link>
              <Link className="carousel-item" href="#six!"><img src="/img/smile/6.jpg" /></Link>
              <Link className="carousel-item" href="#seven!"><img src="/img/smile/7.jpg" /></Link>
            </div>
        </div>
    )
}
