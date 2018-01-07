import React, { Component } from "react";
 
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom"

import {
  get_all_accounts,
  get_account_details,
  get_total_balance
} from './Data'

// These two components are used throughout the application
const NavBar = () => {
  return(
    <header className="navbar navbar-expand-lg navbar-light bg-primary text-primary">
      <span className="navbar-brand text-light">DankBank</span>
    </header>
  )
}

const Header = (props) => {
  return (
    <div className="container mt-4 mb-4 h3 text-center text-dark">
      <div className="row">
        <div className="col">
          <NavLink exact to="/"
                   className={"pull-left" + (props.back==="true"?"":" invisible")}>
            <button className="btn fa fa-chevron-left"/>
          </NavLink>
        </div>
        <div className="col-8">
          {props.text}
        </div>
        <div className="col"/>
      </div>
    </div>
  );
}

// These components constitute the homepage, which lists all accounts: HomePage/AccountList/AccountListItem
const HomePage = (props) => {
  return (
    <div>
      <Header text="All Accounts" back="false"/>
      <AccountList accounts={props.accounts} onClickAccount={props.onClickAccount}/>
    </div>
  );
}

const AccountList = (props) => {
  return (
    <div className="container">
      <ul className="list-group">
        {props.accounts.map(account => (
          <AccountListItem {...account} key={props.id} onClickAccount={props.onClickAccount}/>
        ))}
      </ul>  
    </div>
  );
}

class AccountListItem extends Component {
  handleClick = (event) => {
    const selectedAccountID = this.props.id;
    this.props.onClickAccount({selectedAccountID});
  }

  render () {
    return (
      <NavLink to="/account" onClick={this.handleClick}>
        <span className="list-group-item list-group-item-action">
          {this.props.name}
          <span className="pull-right">{"$" + this.props.balance}</span>
        </span>
      </NavLink>
    )
  }
}

// The two components constitute the single-account-view: AccountPage/AccountDetails
const AccountPage = (props) => {
  return (
    <div>
      <Header text={props.selectedAccount.name} back="true"/>
      <AccountDetails {...props.selectedAccount} />
    </div>
  );
}

const AccountDetails = (props) => {
  return (
    <div className="container">
      <ul className='list-group text-dark'>
        <li className='list-group-item'>
          Account Balance: <span className="pull-right">{"$" + props.balance}</span>
        </li>
        <li className='list-group-item'>
          Sort Code: <span className="pull-right">{props.sort_code}</span>
        </li>
        <li className='list-group-item'>
          Account Number: <span className="pull-right">{props.account_number}</span>
        </li>
        <li className='list-group-item'>
          Date of Creation: <span className="pull-right">{props.created_date}</span>
        </li>
        <li className='list-group-item'>
          Dankness Index: <span className="pull-right">{props.dankness_index}</span>
        </li>
      </ul>
    </div>
  ); 
}

// Top level component, which is responsible for rendering both pages when called upon
class App extends Component {
  state = {
    selectedAccountID: 1,
    accounts: get_all_accounts(),
    selectedAccount: get_account_details(1),
    totalBalance: get_total_balance()
  };

  selectAccount = (selection) => {
    this.setState(prevState => {
      return ({
        selectedAccountID: selection.selectedAccountID,
        accounts: prevState.accounts,
        selectedAccount: get_account_details(selection.selectedAccountID),
        totalBalance: prevState.totalBalance
      });
    })
  }
  
  render() {
    return (
      <HashRouter>
        <div>
          <NavBar />
          <div className="container">
            <Route exact path="/"
                   render={(props) => (
                     <HomePage {...props}
                                  onClickAccount={this.selectAccount}
                                  accounts={this.state.accounts}
                                  totalBalance={this.state.totalBalance}/>
                   )}/>
            <Route path="/account"
                   render={(props) => (
                     <AccountPage {...props}
                                    selectedAccount={this.state.selectedAccount}/>
                   )}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}
 
export default App;
