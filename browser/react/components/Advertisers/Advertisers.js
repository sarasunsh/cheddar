import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import Payment from '../Payment/Payment';

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
    this.formatCost = this.formatCost.bind(this)
  }

  componentDidMount(){
    //Something better could go here. findAllAds might be refactored. Pull data for number 2 if user id doesnt happen just so it doesnt throw errors. Like I said. something better, later.
    this.props.findAllAdsForAdvertiser();
    this.retrieveTotalDollarsSpent();
    $('#addAd').modal();
    $('#addMoney').modal();
    $('select').material_select();

  }

  postAd(event){
    event.preventDefault(); //don't reload the page, which is the default submit action.
    let videoId = /\?v=([\w-]*)/
    try{
      let url4db = event.target.url.value.match(videoId)[1]
      let advertiserId = this.props.user.id;
      let cost = +event.target.cost.value.slice(1) //This would look something like "$3.00", the database expects a float. So I'm dropping the dollar sign and coercing to a number with unary +
      let category = event.target.category.value
      let title = event.target.title.value
      console.log(url4db)
      axios.post('/api/ad/', {
        url: url4db,
        advertiserId,
        cost,
        category,
        title
      }).then(()=>{
        // if(this.props.user){
          this.props.findAllAdsForAdvertiser(this.props.user.id);
        // }
      })
      .catch(err => console.log.bind(console))
    }catch(err){
      console.log(err)
      alert('the url wasn\'t what I expected and I didn\'t post it')
    }
  }

  addUrl(event){
    let iframe = document.getElementById('YTiframe');
    let yturl = event.target.value;
    //finds the match after ?v=, just alphanumerics. so it will stop matching it hits slashes, hashes, question marks etc.
    let videoId = /\?v=([\w-]*)/
    //match returns an array. I'm capturing the part I want. But I can only return [1] if it exists... if there's no match, match returns null
    yturl = yturl.match(videoId) ? yturl.match(videoId)[1] : '';

    //so, it will only update if there was a match for v?=
    if(yturl){
      console.log("The youtube ID as far as I can tell is: ", yturl)
      iframe.setAttribute('src', `https://www.youtube.com/embed/${yturl}`);
      iframe.parentElement.style.display = 'block';
    } else {
      iframe.parentElement.style.display = 'none';
    }



  }

  formatCost(event){
    //this is run on blur, so after entering a number, if they click outside of that form,
    //the number will be formatted to look like currency
    let val = event.target.value;
    if(val[0] === '$')  val = val.slice(1)
    val = '$' + Number(val).toFixed(2);
    if (val === '$NaN') val = '';
    event.target.value = val;
  }

  retrieveTotalDollarsSpent (advertiserId) {
    axios.get(`/api/advertiser/totalspend`)
    .then( totalDollarsSpent => {
      this.setState({totalDollarsSpent: totalDollarsSpent.data});
    })
    .catch( err => console.error(err));
  }


  render() {
    let {user, selectAd, currentAds} = this.props;
    //user is an obect with .name, .email etc, selectAd is a function to put the selected ad obj on the store, current Ads is an array of two ad objects to render in the component.

    return (
      <div id="ads">
      {/* This is the sidebar that displays user information and contains a button to activate the modal */}
        <ul id="slide-out" className="side-nav fixed">
          <li>
            <div className="userView">
              <div className="background">
              </div>
              <img className="circle" style={{width:'23px',height:'30px'}}src="img/smile/simplesmile.svg"/>
              <div className="black-text name">{user ? user.name : 'Props didnt happen'} </div>
              <div className="black-text email">{user ? user.email : "Props didnt happen"}</div>
              <div className="black-text">{currentAds.length} Ad{currentAds.length < 2? '':'s'}</div>
              <div className="black-text">${Math.round(this.state.totalDollarsSpent)} Ad Budget Spent</div>
            {/*<a href="#!email"><span className="black-text">${this.props.user && Math.round(this.props.user.totalCharged)} Ad Dollars Deposited</span></a>*/}
            </div>
          </li>
          <li><div className="divider"></div></li>

          <li><a type="button" className="waves-effect modal-trigger" href="#addMoney">Add Money</a></li>
          <li><a className="waves-effect modal-trigger" href="#addAd">Add New Advertisement</a></li>
        </ul>
        {/* This is a modal popup that allows advertisers to add video to database */}
        {/* Overflow: visible so that the dropdown select menu breaks out of the modal popup box  */}
        <div id="addMoney" className="modal">
          <div className="modal-content">
            <Payment/>
          </div>
          <div className="modal-footer">
            <button type='submit' href="#" className="btn modal-action modal-close">Close</button>
            </div>
        </div>

        <div id="addAd" className="modal">
          <form onSubmit={this.postAd}>
            <div className="modal-content">
              <div className="input-field">
                <input onInput={this.addUrl} id="youtubeurl"  name='url' type='text' required/>
                <label htmlFor="youtubeurl">YouTube URL</label>
              </div>
              <div className="evenMoreIframeContainer">
                <div className="YTiframeContainer" style={{display: "none"}}>
                  <iframe id="YTiframe"></iframe>
                </div>
              </div>
              <div className='row'>
                <div className="input-field col s4">
                  <select name='category'>
                    <option disabled defaultValue>Select One</option>
                    <option value="Pets">Pets</option>
                    <option value="Health & Fitness">Health & Fitness</option>
                    <option value="Food & Drink">Food & Drink</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Beauty">Beauty</option>
                  </select>
                  <label>Category</label>
                </div>
                <div className="col s4">
                  <div className="input-field">
                    <input onBlur={this.formatCost} id="cost"  name='cost' type='text' required/>
                    <label htmlFor="cost">Pay per 100% smile</label>
                  </div>
                </div>
                <div className="col s4">
                  <div className="input-field">
                    <input  id="title"  name='title' type='text' required/>
                    <label htmlFor="title">Advertiser's Name</label>
                  </div>
                </div>
              </div>
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
                    <img src={`http://img.youtube.com/vi/${ad.url}/0.jpg`}/>
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
