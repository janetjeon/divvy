import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import {Row, Input, Icon, Button} from 'react-materialize';
import '../sass/Login.css';

class Login extends Component {

  
  render() {
    return (
      <div className="login__content">
          <Link to="/dashboard">
            {/* <div className="login__content--logo"> */}
            <h1 className="login__content--logo">Divvy.</h1>
            {/* <p>in progress</p> */}
          </Link>
          <form>
              <input type="text" placeholder="email" required/>
              <input type="password" placeholder="password" required/>
              <Link to="/dashboard">
                <button>Log-in</button>
              </Link>
          </form>
      </div>
    );
  }
}

export default Login;