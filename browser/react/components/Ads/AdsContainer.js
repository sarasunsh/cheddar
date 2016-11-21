import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Ads extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    console.log(this.props)
  }


  render() {

    let {user} = this.props;
    return (
      <div id="ads">
        <ul id="slide-out" className="side-nav fixed">
          <li>
            <div className="userView">
              <div className="background">
                <img src="img/smile/2.jpg"/>
              </div>
              <a href="#!user"><img className="circle" src="img/smile/1.jpg"/></a>
              <a href="#!name"><span className="black-text name">John Doe</span></a>
              <a href="#!email"><span className="black-text email">{user ? user.email : "Props didnt happen"}</span></a>
              <a href="#!email"><span className="black-text">Watched # ads</span></a>
              <a href="#!email"><span className="black-text">Earned # smilyPoints</span></a>
            </div>
          </li>
          <li><a href="#!"><i className="material-icons">cloud</i>First Link With Icon</a></li>
          <li><a href="#!">Second Link</a></li>
          <li><div className="divider"></div></li>
          <li><a className="subheader">Subheader</a></li>
          <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
        </ul>
        <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>


        <div className="container">
          <div className="row">
            <div className="col s12 m7">
              <div className="card horizontal">
                <div className="card-image">
                  <img src="img/smile/3.jpg"/>
                  <span className="card-title">Ad 1</span>
                </div>
                <div className="card-content">
                  <p>Ad on cool thing #1</p>
                </div>
                <div className="card-action">
                  <a href="#">This is a link</a>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col s12 m7">
              <div className="card horizontal">
                <div className="card-image">
                  <img src="img/smile/4.jpg"/>
                  <span className="card-title">Ad 2</span>
                </div>
                <div className="card-content">
                  <p>Ad on cool thing #2</p>
                </div>
                <div className="card-action">
                  <a href="#">This is a link</a>
                </div>
              </div>
            </div>
          </div>


        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth
})

const AdsContainer = connect(mapStateToProps)(Ads)
export default AdsContainer;