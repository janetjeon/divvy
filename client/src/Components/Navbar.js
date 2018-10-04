import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {

  render() {
    return (
        <div className="main__content--navbar">
          <ul className="navbar__list">
            <Link to="/dashboard">
              <li>
                <div className="navbar__img"><img src="icons/dashboard.png" alt="dashboard icon" /></div>
                <p>Dashboard</p>
              </li>
            </Link>
            <Link to="/upload" className="upload__btn--hide">
              <li>
                <div className="navbar__img"><img src="icons/upload.png" alt="upload icon" /></div>
                <p>Add New Expense</p>
              </li>
            </Link>

            {/* starting here, the links are fillers - temporary! */}
            
            <Link to="#" className="minWidth__hide--link">
                <li>
                    <img src="icons/expenses.png" alt="expenses icon"/>
                    <p>Expenses</p>
                </li>
            </Link>
            <Link to="#" className="minWidth__hide--link">
                <li>
                    <img src="icons/groups.png" alt="roommates icon"/>
                    <p>Roommates</p>
                </li>
            </Link>
            <Link to="#" className="minWidth__hide--link">
                <li>
                    <img src="icons/wallet.png" alt="wallet icon"/>
                    <p>Wallet</p>
                </li>
            </Link>
            <Link to="#" className="minWidth__hide--link">
                <li>
                    <img src="icons/category.png" alt="category icon"/>
                    <p>Manage Categories</p>
                </li>
            </Link>
            <Link to="#">
              <li>
                <div className="navbar__img"><img src="icons/settings.png" alt="settings icon" /></div>
                <p>Settings</p>
              </li>
            </Link>
          </ul>
        </div>
    );
  }
}

export default Navbar;


