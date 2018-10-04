import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import moment from 'moment';
// import PropTypes from 'prop-types';

class AddNewExpense extends Component {

  state = {
    roommates: [],
    startDate: null
  }

  // function to add and send a post request
  addNewExpense = (e) => {
    e.preventDefault();

    const {description, type, amount } = e.target;

    let newExpense = {
      description: description.value,
      type: type.value,
      amount: amount.value,
      payer: this.props.currentUser._id,
      owers: this.state.roommates,
      dueDate: this.state.startDate,
      // cannotWait: cannotWait.value === "on" ? true : false, //if it's checked "on", return true, if not return false
      house_id: this.props.currentUser.house_id
    }
    
    // this is to prepare for fetch POST request
    let options = {
      method: 'POST',
      body: JSON.stringify(newExpense), // changes the input values into json string
      headers: {'content-type': 'application/json'}
    }

    // this is the fetch POST request
    fetch('/api/expenses/new', options)
    .then(response => response.json())
    .then(data => {this.props.history.push('/dashboard');}) //once expense is posted, redirects to the dashboard
    .catch(err => {console.log(err)})
  }

  // function to check if the user's names have been selected in the input form 
  isRoomateSelected = (selectedRoomate) => {
    let found = false;
    this.state.roommates.forEach(rm => {
      if (rm._id === selectedRoomate._id) {
        found = true;
      } 
    });
    return found;
  };

  // function to toggle roommate selected and deselected 
  // if deselected, it will check to see if the user's id is already a part of the list when toggled
  selectRoomate = (roommate) => {
    let removedRoomate = false;
    let updatedRoomates = this.state.roommates.filter(rm => {
      if(rm._id === roommate._id) {
        removedRoomate = true;
        return false;
      }
      return true;
    });
    if(!removedRoomate) {
      updatedRoomates.push(roommate);
    }
    this.setState({roommates: updatedRoomates});
  }

  handleChange = (date) => {
    this.setState({startDate: date});
  }

  render() {
    const users = this.props.users;
    // console.log('roommates: ',users);
    const currentUser = this.props.currentUser;        
    // const {firstName, lastName} = currentUser.name;
    // const currentUserName = `${firstName} ${lastName}`;

    // filtering out the current user
    let roommates = users.filter(user => user._id !== currentUser._id)
    // console.log('filtered roomies: ',roommates);        

  
    return (
      
        <div className="expense__input--form">
          {/* <Link to="/dashboard"><h3>Back</h3></Link> */}
          <form onSubmit={this.addNewExpense}>
            <div className="input__form--content">

              <div className="input__form--value input__form--description">
                <img src="/icons/info.png" alt="info icon"/>
                <input type="text" name="description" placeholder="Description"/>
              </div>
              
              <div className="input__form--value input__form--amount">
                <img src="/icons/money.png" alt="money icon"/>
                <input type="text" name="amount" placeholder="Amount"/>
              </div>

              <div className="input__form--selections">
                <div className="input__form--value input__form--duedate">
                  <span>Due date: </span> 
                  <div className="date_selector">
                    <DatePicker selected={this.state.startDate} onChange={this.handleChange} />
                  </div>
                </div>

                <div className="input__form--value">
                  {/* <label htmlFor="type">Type</label> */}
                  <select name="type">
                    <option selected="selected" disabled >Select Category <img src="icons/caret.png" alt="caret icon"/></option>
                    <option value="household items">Household Items</option>
                    <option value="utility">Utility</option>
                    <option value="grocery">Grocery</option>
                    <option value="internet">Internet</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="input__form--value input__form--roommates">
                <span>Split With:</span>
                <div className="roomates__names">
                  {
                    roommates.map(roommate => {
                      const {firstName} = roommate.name;
                      // const name = `${firstName} ${lastName}`;
                      return (
                        <span className={this.isRoomateSelected(roommate) ? 'highlight' : ''}
                              onClick={()=>{this.selectRoomate(roommate)}}> <p>{firstName}</p> </span>
                      );
                    })
                  }
                </div>
              </div>
              
              <div className="add__expense--btn">
                <button className="addExpense__btn" type="submit">Save Expense</button>
              </div>
              
            </div>
          </form>
        </div>
    )
  }
}


export default AddNewExpense;

