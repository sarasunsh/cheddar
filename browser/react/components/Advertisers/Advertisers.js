import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

export default class Advertisers extends React.Component {

  constructor(props) {
    super(props);
    //the props handed down include a findAds function from reducers/adsFromDb
    //                         and a selectAd function from reducers/adsFromClick

  }

  componentDidMount(){
    this.props.findAllAdsForAdvertiser();
  }

  render() {
    let {user, selectAd, currentAds} = this.props;
    //user is an obect with .name, .email etc, selectAd is a function to put the selected ad obj on the store, current Ads is an array of two ad objects to render in the component.
    let ads = currentAds;
    //ads is a array of objects. Each object has a url, title, id. Its also represented on the global store.
    console.log("currentAds", currentAds);

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
              <a href="#!email"><span className="black-text"># Ads</span></a>
              <a href="#!email"><span className="black-text">$ Ad Budget</span></a>
              <a href="#!email"><span className="black-text">$ Ad Budget Spent</span></a>
            </div>
          </li>
          <li><a href="#!"><i className="material-icons">cloud</i>First Link With Icon</a></li>
          <li><a href="#!">Second Link</a></li>
          <li><div className="divider"></div></li>
          <li><a className="subheader">Subheader</a></li>
          <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
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
