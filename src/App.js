import React, { Component } from "react";

import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom"

const Header = (props) => {
  return (
    <div className="page-header">
      <div className="container text-center h3">
        <NavLink exact to="/"
                 className={"pull-left" + (props.back==="true"?"":" hidden")}>
          <button className="btn glyphicon glyphicon-chevron-left"/>
        </NavLink>
        {props.text}
      </div>
    </div>
  );
}

const AccountDetails = (props) => {
  return (
    <div className="container">
      <ul className='list-group'>
        <li className='list-group-item'>
          Account Balance: <span className="pull-right">{props.balance}</span>
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

class AccountPage extends Component {
  render() {
    return (
      <div>
        <Header text={this.props.selectedAccount.name} back="true"/>
        <AccountDetails {...this.props.selectedAccount} />
      </div>
    );
  }
}

class AccountListItem extends Component {
  handleClick = (event) => {
    const selectedAccountID = this.props.id;
    this.props.onClickAccount({selectedAccountID});
  }

  render () {
    return (
      <NavLink to="/account" onClick={this.handleClick}>
        <a className="list-group-item list-group-item-action">
          {this.props.name}
          <span className="pull-right">{this.props.balance}</span>
        </a>
      </NavLink>
    )
  }
}

const AccountList = (props) => {
  return (
    <div className="container">
      <ul className="list-group">
        {props.accounts.map(account => (
          <AccountListItem {...account} onClickAccount={props.onClickAccount}/>
        ))}
      </ul>  
    </div>
  );
}

const HomePage = (props) => {
  return (
    <div>
      <Header text="All Accounts" back="false"/>
      <AccountList accounts={props.accounts} onClickAccount={props.onClickAccount}/>
    </div>
  );
}
 

const accounts = [
  {
    id: 1,
    name: "Checking Account",
    created_date: "06/01/2018",
    balance: "$100,000.53",
    account_number: "00243121",
    sort_code: "30-32-62",
    dankness_index: "8.4"
  },
  {
    id: 2,
    name: "Savings Account",
    created_date: "06/01/2018",
    balance: "$120.32",
    account_number: "01243121",
    sort_code: "30-32-62",
    dankness_index: "3.6"
  },
  {
    id: 3,
    name: "Credit Account",
    created_date: "06/01/2018",
    balance: "$200.00",
    account_number: "39932841",
    sort_code: "30-32-62",
    dankness_index: "6.2"
  }
];


class App extends Component {
  state = {
    selectedAccountID: 1,
    accounts: accounts,
    selectedAccount: accounts.find(account => account.id === 1)
  };

  selectAccount = (selection) => {
    this.setState({
      selectedAccountID: selection.selectedAccountID,
      accounts: accounts,
      selectedAccount: accounts.find(account => account.id === selection.selectedAccountID)
    });
  }
  
  render() {
    return (
      <HashRouter>
        <div>
          <header className="navbar navbar-default">
            <span className="navbar-brand">DankBank</span>
          </header>
          <div className="container">
            <Route exact path="/"
                   render={(props) => (
                        <HomePage {...props}
                                  onClickAccount={this.selectAccount}
                                  accounts={this.state.accounts}/>
                   )}/>
            <Route path="/account"
                   render={(props) => (
                       <AccountPage {...props} selectedAccount={this.state.selectedAccount} />
                   )}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}
 
export default App;
