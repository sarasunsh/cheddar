import React, { Component } from 'react';
import { Link } from 'react-router';
import { Button, Image, Col } from 'react-bootstrap';



export default class Landing extends Component {
  componentDidMount(){
    $(function() {
      $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
      });
    });
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
                                    <a href="#forViewers" className="landing-box">For Viewers</a>
                                    <a href="#forAdv" className="landing-box">For Advertisers</a>
                                </div>
                           </div>
                       </div>
                    </div>
               </div>
               <div className="section text-center">
                 <div className="container landing">
                   <h5>ABOUT CHEDDAR</h5>
                   <p>We believe the prevailing model of online advertising is broken for both companies and consumers. In the current landscape, the advertisement viewing experience can feel like an inconvenience to the same people who otherwise would be very interested in a product. It should not be that way! </p>
                   <img src="img/smile/computer-worker.png" height="100"></img>
                   <p>With the Cheddar platform, watching branded content becomes a joyful experience. A well-crafted, creative ad should bring a smile to your face. We make sure that happens.
                   </p>
                 </div>
               </div>
               <div id="forViewers" className="section text-center #90caf9 blue lighten-5">
                     <div className="container landing">
                         <h5>For Viewers</h5>
                         <p>We believe the prevailing model of online advertising is broken for both companies and consumers. In the current landscape, the advertisement viewing experience can feel like an inconvenience to the same people who otherwise would be very interested in a product. It should not be that way! </p>
                         <img src="img/smile/computer-worker.png" height="100"></img>
                         <p>With the Cheddar platform, watching branded content becomes a joyful experience. A well-crafted, creative ad should bring a smile to your face. We make sure that happens.
                         </p>
                          <div className="section text-center" style={{textAlign:"center"}}>
                            <Link to='/login' className="waves-effect waves-teal btn-flat bold">Viewer Log In</Link>
                            <Link to='/signup' className="waves-effect waves-teal btn-flat bold">Viewer Sign Up</Link>
                          </div>
                     </div>
                </div>
                <div id="forAdv" className="section text-center blue lighten-3">
                      <div className="container landing">
                          <h5>For Advertisers</h5>
                          <p>We believe the prevailing model of online advertising is broken for both companies and consumers. In the current landscape, the advertisement viewing experience can feel like an inconvenience to the same people who otherwise would be very interested in a product. It should not be that way! </p>
                          <img src="img/smile/computer-worker.png" height="100"></img>
                          <p>With the Cheddar platform, watching branded content becomes a joyful experience. A well-crafted, creative ad should bring a smile to your face. We make sure that happens.
                          </p>
                          <div className="section text-center" style={{textAlign:"center"}}>
                            <Link to='/adv_login' className="waves-effect waves-teal btn-flat bold">Advertiser Log In</Link>
                            <Link to='/adv_signup' className="waves-effect waves-teal btn-flat bold">Advertiser Sign Up</Link>
                           </div>
                      </div>
                 </div>

               <div className="section text-center blue lighten-1">
                    <div className="container landing">
                        <h5>ABOUT US</h5>
                            <div className="row">
                                <div className="col s3 text-center">
                                    <div className="bio ben">
                                    </div>
                                    <div className="bio-text">
                                        Ben is beatific.
                                    </div>
                                </div>
                                <div className="col s3">
                                    <div className="bio sara">
                                    </div>
                                    <div className="bio-text">
                                       Sara is sassy.
                                    </div>
                                </div>
                                <div className="col s3">
                                    <div className="bio jackson">
                                    </div>
                                    <div className="bio-text">
                                       Jackson is jazzy.
                                    </div>
                                </div>
                                <div className="col s3">
                                    <div className="bio david">
                                    </div>
                                    <div className="bio-text">
                                        David is dope.
                                    </div>
                                </div>
                            </div>
                    </div>
               </div>
               <div className="section text-center">
                    <div className="container footer text-center">
                       <p>Cheddar Inc. Copyright 2016</p>
                    </div>
               </div>

            </div>
        );
    }
}
