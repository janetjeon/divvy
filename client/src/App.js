import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import components
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import AddNewExpense from './Components/AddNewExpense';
// import ExpenseItem from './Components/ExpenseItem';
// import ExpensesPayable from './Components/ExpensesPayable';
// import ExpensesReceivable from './Components/ExpensesReceivable';
// import stylesheet
// import './sass/App.css';

class App extends Component {

  state = {
    users: [],
    currentUser: {},
    expenses: []
  }

  // get request to get user list and expense list
  componentDidMount() {
    fetch('/api/users')
    .then(resp => resp.json())
    .then(userList => {this.setState({
      users: userList, 
      currentUser: userList[0] //because i don't have an auth system, hardcoding the user
    }) 
  })

    fetch('/api/expenses')
    .then(response => response.json())
    .then(expenseList => {this.setState({expenses: expenseList}) })
  }

  render() {
    if (!this.state.users.length) {return 'loading...'}

    return (
      <div className="content__wrapper">
        <Router>
          <Switch>
            <Route exact path="/" render={ () => <Redirect to='/dashboard'/> } />
            {/* <Route exact path="/" component={Login} /> */}
            
            <Route exact path="/dashboard" render={ () => {
              return (
                <div className="main__content--wrapper">
                  <Navbar />
                  <Dashboard users={this.state.users} currentUser={this.state.currentUser} />
                </div>
              )} } />

            <Route exact path="/upload" render={ (routeProps) => {
              return (
                <div className="main__content--wrapper">
                  <Navbar />
                  <AddNewExpense {...routeProps} users={this.state.users} currentUser={this.state.currentUser} />
                </div>
              )} } />

            {/* <Route exact path="/expenses/:expenseId" render={ (routeProps) => {
              return <ExpenseItem {...routeProps} expenses={this.state.expenses} users={this.state.users}/>} } /> */}

          </Switch>
        </Router>
        {/* { this.props.mathch.params !== '/login' && <Navbar />} */}
      </div>
    );
  }
}

export default App;
