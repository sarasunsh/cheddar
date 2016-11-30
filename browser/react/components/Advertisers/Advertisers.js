import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';

export default class Advertisers extends React.Component {

  constructor(props) {
    super(props);
    //the props handed down include a findAds function from reducers/adsFromDb
    //                         and a selectAd function from reducers/adsFromClick
    this.state = {
      totalDollarsSpent: 0
    }
    this.retrieveTotalDollarsSpent = this.retrieveTotalDollarsSpent.bind(this);
    this.addUrl = this.addUrl.bind(this)
    this.postAd = this.postAd.bind(this)
  }

  componentDidMount(){
    //Something better could go here. findAllAds might be refactored. Pull data for number 2 if user id doesnt happen just so it doesnt throw errors. Like I said. something better, later.
    this.props.findAllAdsForAdvertiser(this.props.user ? this.props.user.id : 2);
    this.retrieveTotalDollarsSpent(this.props.user ? this.props.user.id : 2);
     $('#addAd').modal();
  }

  postAd(event){
    event.preventDefault();
    console.log(event.target.url.value)
  }

  addUrl(event){
    let iframe = document.getElementById('YTiframe');
    let yturl = event.target.value;
    //finds the match after ?v=, just alphanumerics. so it will stop matching it hits slashes, hashes, question marks etc.
    let videoId = /\?v=(\w*)/
    //match returns an array. I'm capturing the part I want. But I can only return [1] if it exists... if there's no match, match returns null
    yturl = yturl.match(videoId) ? yturl.match(videoId)[1] : '';
    //so, it will only update if there was a match for v?=
    if(yturl){
      iframe.setAttribute('src', `https://www.youtube.com/embed/${yturl}`);
      iframe.style.display = 'block';
    } else {
      iframe.style.display = 'none';
    }
  }

  retrieveTotalDollarsSpent (advertiserId) {
    axios.get(`api/advertiser/totalspend`)
    .then( totalDollarsSpent => {
      console.log("totalDollarsSpent", totalDollarsSpent);
      this.setState({totalDollarsSpent: totalDollarsSpent.data});
    })
    .catch( err => console.error(err));
  }

  render() {
    let {user, selectAd, currentAds} = this.props;
    //user is an obect with .name, .email etc, selectAd is a function to put the selected ad obj on the store, current Ads is an array of two ad objects to render in the component.


  // CREATE THE VIDEO CARDS

    return (
      <div id="ads">
      {/* This is the sidebar that displays user information and contains a button to activate the modal */}
        <ul id="slide-out" className="side-nav fixed">
          <li>
            <div className="userView">
              <div className="background">
              </div>
              <a href="#!user"><img className="circle" src="img/smile/2.jpg"/></a>
              <a href="#!name"><span className="black-text name">{user ? user.name : 'Props didnt happen'} </span></a>
              <a href="#!email"><span className="black-text email">{user ? user.email : "Props didnt happen"}</span></a>
              <a href="#!email"><span className="black-text">{currentAds.length} Ads</span></a>
              <a href="#!email"><span className="black-text">${Math.round(this.state.totalDollarsSpent)} Ad Budget Spent</span></a>
            </div>
          </li>
          <li><div className="divider"></div></li>
          <li><a className="waves-effect modal-trigger" href="#addAd">Add New Advertisement</a></li>
        </ul>
        {/* This is a modal popup that allows advertisers to add video to database */}
        <div id="addAd" className="modal">
          <form onSubmit={this.postAd}>
            <div className="modal-content"> 
              <div className="form-group">
                <input onInput={this.addUrl} placeholder="YouTube URL" name='url' type='text' required/>
              </div>
              <iframe id="YTiframe" style={{display: "none",marginLeft: "Calc(50% - 278px)"}} width="560" height="315" frameBorder="0"></iframe>
            </div>
            <div className="modal-footer"> 
              <button type='submit' href="#" className="btn modal-action modal-close">Add Ad!</button> 
            </div>
          </form>
        </div>
        {/* This section will contain a list of 'video cards', one for each result pulled from database */}
        <div className="container videocards">
          <h2 className="center">Advertiser Campaign</h2>
          {
            currentAds && currentAds.map( ad => {
              return (

                <div className="card small" key={ad.id}>
                  <div className="card-image">
                    <img src={`http://img.youtube.com/vi/${ad.url}/maxresdefault.jpg`}/>
                    <span className="card-title">{ad.title}</span>
                  </div>
                  <div className="card-content">
                    <p>Cost: ${ad.cost}</p>
                  </div>
                  <div className="card-action">
                    <Link  onClick={() => selectAd(ad)} to={`/advertisers/${ad.id}`} >See Analytics</Link>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
