import React, { Component } from 'react';
import { Link } from 'react-router';
import { Button, Image, Col, Carousel } from 'react-bootstrap';



export default class Landing extends Component {
    componentDidMount(){
        $('.carousel').carousel({});
    }

    render(){
        return (
            <div>

               <div className="section smile" style={{position: "relative"}}>
                    <div className="container" style={{position: "absolute", bottom: "0"}}>
                        <div className="row">
                           <div className="card transparent z-depth-5 welcome">
                                <div className="card-content">
                                    <span className="card-title welcome-title">Say cheese, get cash.</span>
                                    <p className='welcome-text'>A new kind of ad platform, built on <br></br>consumer smiles and customer satisfaction.</p>
                                </div>
                                <div className="card-action">
                                    <a href="#" className="landing-box">For Viewers</a>
                                    <a href="#" className="landing-box">For Advertisers</a>
                                </div>
                           </div>
                       </div>
                    </div>
               </div>

              <div className="section text-center">
                    <div className="container landing">
                        <h5>ABOUT CHEDDAR</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus iaculis augue et ex pellentesque vestibulum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed commodo ligula quis ex dignissim mollis. Fusce ac mi vitae ipsum ornare vestibulum ac ut mauris. Aliquam ut sollicitudin lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc mattis ante risus, nec volutpat nibh blandit et.</p>
                    </div>
               </div>

               <div className="section text-center blue">
                    <div className="container landing">
                        <h5>ABOUT US</h5>
                            <div className="row">
                                <div className="col s3">
                                    <div className="bio ben">
                                    </div>
                                    <span>
                                        Ben is beatific.
                                    </span>
                                </div>
                                <div className="col s3">
                                    <div className="bio sara">
                                    </div>
                                    <span>
                                       Sara is sassy.
                                    </span>
                                </div>
                                <div className="col s3">
                                    <div className="bio jackson">
                                    </div>
                                    <span>
                                       Jackson is jazzy.
                                    </span>
                                </div>
                                <div className="col s3">
                                    <div className="bio david">
                                    </div>
                                    <span>
                                        David is dope.
                                    </span>
                                </div>
                            </div>
                    </div>
               </div>
               <div className="section text-center" style={{textAlign:"center"}}>
                  <Link to='/adv_login' className="waves-effect waves-teal btn-flat">Advertiser Log In</Link>
                  <Link to='/adv_signup' className="waves-effect waves-teal btn-flat">Advertiser Sign Up</Link>
                </div>
               <div className="section text-center green">
                    <div className="container footer">
                        <h5>DISCLAIMER</h5>
                       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus iaculis augue et ex pellentesque vestibulum. </p>
                    </div>
               </div>

            </div>
        );
    }
}
