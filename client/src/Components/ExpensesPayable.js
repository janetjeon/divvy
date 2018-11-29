import React, { Component } from 'react';

class ExpensesPayable extends Component {
  render() {

    const { type, description, amount, payer, owers, id } = this.props;

     // to set different icons for each category
    let url = '/icons/categories/other.png';
    if (type === 'household items') {url = '/icons/categories/rent.png'} 
    else if (type === 'utility') {url = '/icons/categories/utility.png'} 
    else if (type === 'grocery') {url = '/icons/categories/grocery.png'} 
    else if (type === 'other') {url = '/icons/categories/other.png'} 
    else if (type === 'internet') {url = '/icons/categories/internet.png'} 
    
    // to set a colour for each category
    let color = '#ffa200';
    if (type === 'household items') {color = '#b57a54'} 
    else if (type === 'utility') {color = '#45a7e6'} 
    else if (type === 'grocery') {color = '#f964a0'} 
    else if (type === 'other') {color = '#6e8fb2'} 
    else if (type === 'internet') {color = '#60d0ca'} 

    // let userColor = "#000";
    // if

    // add payer + owers to get the amount for each person
    let payerArr = [];
    payerArr.push(payer);
    let divvy = payerArr.length + owers.length;
    // console.log('div',divvy);
    // to get the first name of the payer
    let users = this.props.users;
    let userName = users.map(user => {
      if(user._id === payer) {
        return user.name.firstName
      }
    })

    return (
      <div className="expenses__content">
        <div className="expenses__content--wrapper" style={{borderLeftColor: color}}>
          {/* <Link to={`/expenses/${id}`}> */}
            <div className="expenses__content--left">
              <h4>{description}</h4>
              <div className="expenses__content--details">
                <div className="expenses__content--category" style={{borderColor: color}}>
                  <img className="category__icons" src={`${url}`} alt="category icons"/>
                  <span style={{color: color}}>{type}</span>
                </div>
                <p style={{borderColor: color, color: color}}>You owe <span className="pay_to_firstname">{userName}</span></p>
              </div>
            </div>

          <div className="expenses__content--right" style={{color: color}}>
            <h4><span>$</span> {(amount / divvy).toFixed(2)} <span class="pp">/person</span></h4>
          </div>
        </div>
      </div>
    );
  }
}

export default ExpensesPayable;
