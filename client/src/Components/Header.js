import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {

  state = {
    showMenu: false //initial state of the user profile menu 
  }

  // to toggle open the user profile menu -- no functionality; just for practice and am still working on this project
  openMenu = (e) => {
    e.preventDefault();
    this.setState({
      showMenu: !this.state.showMenu
    })

  }

  render() {
    const users = this.props.users;
    const currentUser = this.props.currentUser;
    const currentUserName = this.props.currentUser.name;
    const userName = currentUserName.firstName;

    // changes the user avatar
    let url = "/icons/users/avatar.png";
    users.map(user => {
      if(currentUser._id === user._id[0]) {url = "/icons/users/avatar.png"}
      else if (currentUser._id === users[1]._id) {url = "/icons/users/may.png"}
      else if (currentUser._id === users[2]._id) {url = "/icons/users/nakisa.png"}
    })
    
    return (
      <div className="header__content">
        <div className="header__content--wrapper">
          <div className="header__content--logo">
            <h1>divvy.</h1>
          </div>
          <div className="header__content--profile">
            <div className="profile__username"><p>Hi, {userName}</p></div>
            <div className="profile__menu">
              <span onClick={this.openMenu}>&#8964;</span>
              {
                this.state.showMenu ? 
                (
                  <ul className="menu__list">
                    <li>Profile</li>
                    <li>Settings</li>
                  </ul>
                ) : (null)
              }
            </div>
            <div className="profile__avatar"><img className="header__avatar" src={`${url}`} alt="profile avatar" /> </div>
          </div>
        </div>
        <div className="secondary__header">
          <h2 className="dashboard__heading">Dashboard</h2>
        </div>
      </div>
    );
  }
}

export default Header;