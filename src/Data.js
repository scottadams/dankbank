const accounts = [
  {
    id: 1,
    name: "Checking Account",
    created_date: "06/01/2018",
    balance: 10000.00,
    account_number: "00243121",
    sort_code: "30-32-62",
    dankness_index: "8.4"
  },
  {
    id: 2,
    name: "Savings Account",
    created_date: "06/01/2018",
    balance: 125.32,
    account_number: "01243121",
    sort_code: "30-32-62",
    dankness_index: "3.6"
  },
  {
    id: 3,
    name: "Credit Account",
    created_date: "06/01/2018",
    balance: 200.00,
    account_number: "39932841",
    sort_code: "30-32-62",
    dankness_index: "6.2"
  }
]


function get_all_accounts() {
  return (accounts);
}


function get_account_details(accountID) {
  return (accounts.find(account => account.id === accountID))
}


function get_total_balance() {
  function balance(item){
    return item.balance;
  }

  function sum(prev, next){
    return prev + next;
  }

  return (accounts.map(balance).reduce(sum))
}


export {get_all_accounts, get_account_details, get_total_balance};