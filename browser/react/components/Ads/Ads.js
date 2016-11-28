import moment from 'moment'
import axios from 'axios'
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

export default class Ads extends React.Component {

  constructor(props) {
    console.log('')
    super(props);
    //yeah so numberOfAds is basically ads.length but this way I can check if the axios happened. numberOfAds is undefined unless it is 0.
    this.state = {
      adHistory: []
     }
    //the props handed down include a findAds function from reducers/adsFromDb
    //                         and a selectAd function from reducers/adsFromClick

  }
  componentDidMount(){
      this.props.findAds();
      axios.get(`/api/views/adHistory`)
           .then(res => {
             this.setState({adHistory: res.data})
             console.log(this.state.adHistory)
           })
           .catch(err => console.log(err))
  }

  render() {
    console.log('rendering')
    let {user, selectAd, currentAds} = this.props;
    //once there is a user, an earnedPay property will exist. otherwise just put it at $0
    let earnedPay = user ? user.earnedPay : '$0.00'
    //database turns a string representing dollar amount. For user experience, lets give them points instead of pennies.
    //split with regex [$.] is just 'split on either a '$' char OR a '.' char
    let smilyPoints = Number(earnedPay.split(/[$.]/).join(''));
    //user is an obect with .name, .email etc, selectAd is a function to put the selected ad obj on the store, current Ads is an array of two ad objects to render in the component.
    let ads = currentAds;
    //ads is a array of objects. Each object has a url, title, id. Its also represented on the global store.
    let urlA = ads[0] ? ads[0].url : "",
        titleA = ads[0] ? ads[0].title : "",
        urlB = ads[1] ? ads[1].url : "",
        titleB = ads[1] ? ads[1].title : "";


    return (
      <div id="ads">
        <ul id="slide-out" className="side-nav fixed">
          <li>
            <div className="userView">
              <div className="background">
              </div>
              <a href="#!user"><img className="circle" style={{width:'23px',height:'30px'}}src="img/smile/simplesmile.svg"/></a>
              <a href="#!name"><span className="black-text name">{user ? user.name : 'Props didnt happen'} </span></a>
              <a href=""><span className="black-text email">{user ? user.email : "Props didnt happen"}</span></a>
              <a href=""><span className="black-text">Watched {this.state.adHistory.length} ads</span></a>
              <a href=""><span className="black-text">Earned {smilyPoints} smilyPoints</span></a>
              <a href=""><span className="btn">Cash Out</span></a>
            </div>
          </li>
{/*          <li><a href="#!"><i className="material-icons">cloud</i>First Link With Icon</a></li>
          <li><a href="#!">Second Link</a></li>
          <li><div className="divider"></div></li>
          <li><a className="subheader">Subheader</a></li>
          <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>*/}
        </ul>
        <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
        <div className="container videocards">
          <div className="row">
            <div className="col s6">
              <div className="card">
                <div className="card-image">
                  <img src={`http://img.youtube.com/vi/${urlA}/maxresdefault.jpg`}/>
                  <span className="card-title">Ad 1</span>
                </div>
                <div className="card-content">
                  <p>{titleA}</p>
                </div>
                <div className="card-action">
                  <Link  onClick={() => selectAd(ads[0])} to="/video" >Watch Option A</Link>
                </div>
              </div>
            </div>
            <div className="col s6">
              <div className="card">
                <div className="card-image">
                  <img src={`http://img.youtube.com/vi/${urlB}/maxresdefault.jpg`}/>
                  <span className="card-title">Ad 2</span>
                </div>
                <div className="card-content">
                  <p>{titleB}</p>
                </div>
                <div className="card-action">
                  <Link onClick={() => selectAd(ads[1])} to="/video" >Watch Option B</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
                <ul>
                 <li>
                     <div className="row card history">
                        <div className='col s1'>Score</div>
                        <div className='col s1'>Earned</div>
                        <div className='col s6'>Title</div>
                        <div className='col s4'>Time</div>
                     </div>
                  </li>
                {
                  this.state.adHistory.map(each => {
                    return(
                    <li key={each.id}>
                     <div className="row card history">
                        <div className='col s1'>{each.smilyScore.toFixed(0)}</div>
                        <div className='col s1'>${(each.ad.cost * (each.smilyScore / 100)).toFixed(2)}</div>
                        <div className='col s6'>{each.ad.title}</div>
                        <div className='col s4'>{moment(each.updatedAt).fromNow()}</div>
                     </div>
                    </li>)
                  })
                }
                </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
