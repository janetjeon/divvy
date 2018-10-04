import React, { Component } from 'react';
import {Link} from 'react-router-dom';
// import Components
import Header from './Header';
import ExpensesReceivable from './ExpensesReceivable';
import ExpensesPayable from './ExpensesPayable';


class Dashboard extends Component {

  state = {
    expensesPayable: [], //iou
    expensesReceivable: [] //uome
  }

  // when component mounts, 
  // get the expenses that needs to be paid/owed to the current user
  componentDidMount() {
    this.getExpensesPaidandOwed();
    // this.getExpenses();
  }

  getExpensesPaidandOwed = () => {
    // pass this.props.currentUser.id as a query parameter to backend

    // expenses paid by the current user that needs to be owed by others
    fetch(`/api/expenses/monthly/paid?id=${this.props.currentUser._id}`)
    .then(resp => resp.json())
    .then(expensesPaid => { 
      this.setState({expensesReceivable: expensesPaid}) 
    })

    // expenses owed by the current user
    fetch(`/api/expenses/monthly/owed?id=${this.props.currentUser._id}`)
    .then(resp => resp.json())
    .then(expensesOwed => { 
      this.setState({expensesPayable: expensesOwed}) 
    })
  }

  render() {
      
    const expensesReceivable = this.state.expensesReceivable;
    const expensesPayable = this.state.expensesPayable;
    console.log('iou:',expensesPayable);
    console.log('uome:',expensesReceivable);
    
    let expensesReceivableListJSX = expensesReceivable.map(expense => {
      return (
        <ExpensesReceivable description={expense.description}
                            type={expense.type}
                            amount={expense.amount}
                            owers={expense.owers}
                            payer={expense.payer}
                            id={expense._id}
                            key={expense._id} 
                            expense={expense}
                            users={this.props.users} />
      )
    })
    let expensesReceivableList = [...expensesReceivableListJSX].reverse(); //reverse will list the most recently posted item

    let expensesPayableListJSX = expensesPayable.map(expense => {
      return (
        <ExpensesPayable description={expense.description}
                         type={expense.type}
                         amount={expense.amount}
                         owers={expense.owers}
                         payer={expense.payer}
                         id={expense._id}
                         key={expense._id}
                         users={this.props.users} />
      )
    })
    let expensesPayableList = [...expensesPayableListJSX].reverse();

    return (
        <div className="main__content--dashboard">
          <Header users={this.props.users} currentUser={this.props.currentUser} />
          
          <div className="main__content--overview">
            <div id="content__expenses--payable">
              <div className="addNewExpense">
                <h3>Expenses Payable</h3>
                <div className="dashboard__addExpense dashboard__uploadbtn--hide">
                  <Link to="/upload">Add a new Expense</Link>
                </div>
              </div>
              {expensesPayableList}
            </div>
              
            <div id="content__expenses--receivable">
              <h3>Expenses Receivable</h3>
              {expensesReceivableList}
            </div>
          </div>
        </div>
    );
  }
}

export default Dashboard;