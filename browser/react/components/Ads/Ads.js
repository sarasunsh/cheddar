import moment from 'moment'
import axios from 'axios'
import React from 'react';
import { Link } from 'react-router';

export default class Ads extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      adHistory: []
     }
  }
  componentDidMount(){
      //hitting views/adHistory will return an array of watched ads for this user
      //this is fired even before the auth gets set by /api/auth/me, but the server 
      //knows which user because the user.id is on req.session.
      this.props.findAds();
      axios.get(`/api/views/adHistory`)
           .then(res => {
             this.setState({adHistory: res.data})
           })
           .catch(err => console.log(err))
  }

  render() {

    let {user, selectAd, currentAds} = this.props;
    //selectAd is a function to put the selected ad obj on the store, current Ads is an array of two ad objects to render in the component.
    //currentAds is a array of objects. Each object has a url, title, id. Its also represented on the global store.
    let adA = currentAds[0],
        adB = currentAds[1]
    //user is an obect with .name, .email etc, 
    //once there is a user, an earnedPay property will exist. otherwise just put it at $0
    let earnedPay = user ? user.earnedPay : '$0.00'
    //database returns a string representing dollar amount. For user experience, lets give them points instead of pennies.
    //this replace regex just deletes any dollar signs or dots. (g stands for global, ie don't stop after the first find')
    let smilyPoints = Number(earnedPay.replace(/[$.]/g, ''));
    //with replace, '$0.00' becomes '000', and I just want to display 0. Coercing to a number just because Number('000') returns 0.

    return (
      <div id="ads">        
        <ul id="slide-out" className="side-nav fixed">
          <li>
            <div className="userView">
              <div className="background">
              </div>
              {/* This is just displaying user info. Materialize CSS styles a tags specifically, being that this is a navbar component */}
              <a><img className="circle" style={{width:'23px',height:'30px'}}src="img/smile/simplesmile.svg"/></a>
              <a><span className="black-text name">{user ? user.name : 'Props didnt happen'} </span></a>
              <a><span className="black-text email">{user ? user.email : "Props didnt happen"}</span></a>
              <a><span className="black-text">Watched {this.state.adHistory.length} ads</span></a>
              <a><span className="black-text">Earned {smilyPoints} smilyPoints</span></a>
              <a><span className="btn green lighten-1">Cash Out</span></a>
            </div>
          </li>
        </ul>
        <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
        {/* container videocards returns the ad options based off the currentAds array handed down as props. */}
        <div className="container videocards">
          <div className="row">
            {adA ? <div className="col s6">
              <Link  onClick={() => selectAd(adA)} to="/video" >
                <div className="card">
                  <div className="card-image">
                    <img src={`//img.youtube.com/vi/${adA.url}/0.jpg`}/>
                    <span className="card-title">Ad 1</span>
                  </div>
                  <div className="card-content">
                    <p>{adA.title}</p>
                  </div>
                  <div className="card-action">
                    Watch!
                  </div>
                </div>
              </Link>
            </div>
            : <div>No more ads at this time.<hr /></div>
            }
            {adB ? <div className="col s6">
              <Link onClick={() => selectAd(adB)} to="/video" >
                <div className="card">
                  <div className="card-image">
                    <img src={`//img.youtube.com/vi/${adB.url}/0.jpg`}/>
                    <span className="card-title">Ad 2</span>
                  </div>
                  <div className="card-content">
                    <p>{adB.title}</p>
                  </div>
                  <div className="card-action">
                    Watch!
                  </div>
                </div>
              </Link>
            </div>
            : <div></div>
            }
          </div>
          <div className="row">
            <div className="col s12">
                <ul>
                 <li>
                     <div className="row card history">
                        <div className='col s2'>Points</div>
                        <div className='col s7'>Title</div>
                        <div className='col s3'>Time</div>
                     </div>
                  </li>
                {
                  this.state.adHistory.map(each => {
                    return(
                    <li key={each.id}>
                     <div className="row card history">
                        <div className='col s2'>{(each.ad.cost * each.smilyScore).toFixed(0)}</div>
                        <div className='col s7'>{each.ad.title}</div>
                        <div className='col s3' title={moment(each.updatedAt).format('llll')}>{moment(each.updatedAt).fromNow()}</div>
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
