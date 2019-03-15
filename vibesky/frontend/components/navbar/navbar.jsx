import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import SearchContainer from '../search/search_container';
class Navbar extends React.Component {
  constructor(props){
    super(props);

    this.logged_in_left = this.logged_in_left.bind(this);
    this.logged_in_right = this.logged_in_right.bind(this);

  }

  logged_in_left() {
    return (
      <div className="navbar-left">
        <a href="/#/tracks" className="header-logo">
          <div className="staff-logo-li"></div>
        </a>
        <a href="/#/tracks" className="header-item">Explore</a>
        <a href={`/#/users/${this.props.currentUser.id}`} className="header-item">Profile</a>
      </div>
    );
  }

  logged_in_right() {
    return (
      <div className="navbar-right">
        <div className="dropdown">
          <Link to='/tracks/new' className="header-item">Upload</Link>
          <div className="dropdown-content">
            <Link to='/tracks/new/sample' className="">Upload Sample</Link>
            <Link to='/tracks/new/sampler' className="">Upload Track</Link>
          </div>
        </div>
        <Link to='/home' className="header-item" onClick={this.props.logout}>Logout</Link>
      </div>
    );
  }


  render(){
    
      // carosel = 'header-carousel-off';

    return <div id="header-carousel-off">
        <div className="backbar">
          <div className="navbar">
            {this.logged_in_left()}
            <SearchContainer />
            {this.logged_in_right()}
          </div>
        </div>
      </div>;
  }
}

export default Navbar;
