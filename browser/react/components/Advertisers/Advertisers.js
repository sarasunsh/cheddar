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
  }

  componentDidMount(){
    console.log("COMPONNNNEENENENT did mount")
    // console.log("this.props.auth.id", this.props.auth.id);

    // HARD CODED THE ADVERTISER ID UNTIL AUTH FOR ADVERTISER BUILT; this.props.auth.id
    this.props.findAllAdsForAdvertiser(2);
    this.retrieveTotalDollarsSpent(2);
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
        </ul>
        <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
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
                    <Link  onClick={() => selectAd(ad)} to="/metrics" >See Analytics</Link>
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
