import React, { Component } from 'react';
import { Link } from 'react-router';
import { Button, Image, Col } from 'react-bootstrap';

export default class Landing extends Component {
  componentDidMount(){
    // Initialize carousel
    $('.carousel').carousel({});

    // Smooth scrolling via https://css-tricks.com/snippets/jquery/smooth-scrolling/
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
                                    <p className='welcome-text'><br></br>A new kind of ad platform, built on <br></br>consumer smiles and customer satisfaction.</p>
                                </div>
                                <div className="card-action">
                                    <a href="#forViewers" className="landing-box bold font-18 padded">For Viewers</a>
                                    <a href="#forAdv" className="landing-box bold font-18 padded">For Advertisers</a>
                                </div>
                           </div>
                       </div>
                    </div>
               </div>
               <div className="section text-center">
                 <div className="container landing">
                   <h5>About Cheddar</h5>
                   <p>We believe the prevailing model of online advertising is broken for both companies and consumers. In the current landscape, the advertisement viewing experience can feel like an inconvenience to the same people who otherwise would be very interested in a product. It shouldn't be that way!</p>
                   <p>With the Cheddar platform, watching branded content becomes a joyful experience. A well-crafted, creative ad should bring a smile to your face. We make sure that happens.
                   </p>
                  <div className="row">
                      <div className="col s4 ">
                        <div className="card hoverable">
                          <div className="card-image">
                            <img src="img/smile/mancomputer.png"></img>
                          </div>
                          <div className="card-content">
                            <span className="text-center font-18">Get Views</span>
                          </div>
                        </div>
                      </div>
                      <div className="col s4">
                        <div className="card hoverable">
                          <div className="card-image">
                            <img src="img/smile/give-money-hand.png"></img>
                          </div>
                          <div className="card-content">
                            <span className="text-center font-18">Earn Money</span>
                          </div>
                        </div>
                      </div>
                      <div className="col s4">
                        <div className="card hoverable">
                          <div className="card-image">
                            <img src="img/smile/smile.jpg"></img>
                          </div>
                          <div className="card-content">
                            <span className="text-center font-18">Be Happy</span>
                          </div>
                        </div>
                      </div>
                  </div>

                 </div>
               </div>
               <div id="forViewers" className="section text-center #90caf9 blue lighten-5">
                  <div className="container landing">
                     <h5> We think your smile is worth something. </h5>
                     <p>You already watch online ads; it's time you started getting paid for it.</p><p> There has never been an easier way to make extra cash online. Simply sign up with Cheddar, pick which videos you would like to watch, and put on a smile. We use cutting-edge facial expression recognition to detect your grin and pay you for every second of smiling. Making money with Cheddar is not only easy, it is fun!</p>

                      <div  style={{textAlign:"center"}}>
                        <Link to='/login' className="waves-effect waves-teal btn padded bold font-18">Log In</Link>

                        <Link to='/signup' className="waves-effect waves-teal btn padded bold font-18">Sign Up</Link>
                      </div>
                  </div>
                  <div className="carousel">
                    <Link className="carousel-item" ><img src="/img/tweet/ben.jpg" /></Link>
                    <Link className="carousel-item" ><img src="/img/tweet/jackson.jpg" /></Link>
                    <Link className="carousel-item" ><img src="/img/tweet/sara.jpg" /></Link>
                    <Link className="carousel-item" ><img src="/img/tweet/david.jpg" /></Link>
                    <Link className="carousel-item" ><img src="/img/tweet/char.jpg" /></Link>
                  </div>
                </div>
                <div id="forAdv" className="section text-center blue lighten-3">
                      <div className="container landing">
                        <div className="pitch ">
                          <h5 style={{textAlign:"center"}}>Your ads deserve to be appreciated.</h5>
                          <img className='center-block' src="/img/smile/megaphone.png" height="250"></img>
                          <p> Your team works hard to craft creative, catchy ads. But in the modern online landscape, it can be hard to get your customers' attention on those ads -- and even harder to keep it! </p>
                        </div>
                        <div className="pitch ">
                          <img className='center-block' src="/img/smile/ppl.png" height="250"></img>
                          <p> Cheddar provides a surefire way to build  engagement, and moreover our approach ensures your target consumer demographics will associate positive emotions with your brand. That's priceless! </p>
                        </div>
                        <div className="pitch ">
                          <img className='center-block' src="/img/smile/face.png" height="250"></img>
                          <p> Here's how it works -- you post an ad, and we use cutting-edge facial recognition technology to ensure that viewers are smiling throughout the ad. Fifty years of psychology research shows that enticing people to smile will change their mood for the better and create strong positive associations. </p>
                        </div>
                        <div className="pitch ">
                          <img className='center-block' src="/img/smile/video.jpeg" height="250"></img>
                          <p> As your ad is served to viewers, their smile is tracked and scored from 0 to 100%. Viewers are rewarded Smile Points based on how much they grin, so both you and your customers will be smiling. </p>
                        </div>
                        <div className="pitch ">
                          <img className='center-block' src="/img/smile/charts.png" height="250"></img>
                          <p> With our advanced analytics dashboard, you can easily see how your ad performs among different demographics and refine your customer targeting. </p>
                        </div>
                        <div className="pitch ">
                         <img className='center-block' src="/img/smile/socialmedia.png" height="250"></img>
                          <p> At Cheddar, we know how important social media engagement is. Each time a viewer watches your ad, we will tweet an image of their smiling face along with your company name. Our service extends beyond our site for full brand benefit.</p>
                        </div>
                          <div className="section text-center" style={{textAlign:"center"}}>
                            <Link to='/adv_login' className="waves-effect waves-teal btn padded bold font-18">Advertiser Log In</Link>
                            <Link to='/adv_signup' className="waves-effect waves-teal btn padded bold font-18">Advertiser Sign Up</Link>
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
