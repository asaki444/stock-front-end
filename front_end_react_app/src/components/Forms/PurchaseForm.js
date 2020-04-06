import React from 'react'
import './FormStyles.css'
import SearchAutoComplete from '../SearchAutoComplete/SearchAutoComplete'
import Error from '../Error/Error'
import {
  handleChange,
  formatMoney
} from '../../globalFunctions/globalFunctions'
import {
  apiAlphaRequest,
  transactionRequest
} from '../../globalFunctions/apiFunctions'

class PurchaseForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ticker: '',
      Qty: 0,
      searchResults: [],
      errorMessage: ''
    }
  }

  handleSelection = e => {
    this.setState({
      ticker: e.target.id,
      searchResults: []
    })
  }

  handleSearch = e => {
    this.setState({
      ticker: e.target.value
    })

    apiAlphaRequest('search', e.target.value)
      .then(res => {
        this.setState({
          searchResults: res.data.bestMatches
        })
      })
      .catch(err => console.log('search error', err))
  }

  handleSubmit = e => {
    e.preventDefault()
    const { Qty, ticker } = this.state
    let intQty = parseInt(Qty);
    if (intQty < 0 || ticker === '') {
      this.setState({
        errorMessage: 'Invalid Inputs'
      })
    }

    apiAlphaRequest('stock_info', ticker).then(res => {
      if (res.data.Note) return
      let newTotal = intQty * parseInt(res.data['Global Quote']['05. price'])

      transactionRequest({
        transaction: {
          id: this.props.userState.userState.user.id,
          purchase_amount: newTotal,
          amount_of_stock: intQty,
          stock_symbol: ticker
        }
      }).then(res => {
        if (res.data.status === 405) {
          this.setState({ errorMessage: res.data.message })
          return
        }
        const { stocks, balance, transactions } = res.data
        this.props.userState.dispatch({
          type: 'PURCHASE_STOCK',
          account_balance: balance,
          stocks: stocks,
          transactions: transactions
        })
      })
    })
    this.setState({
      ticker: '',
      Qty: 0,
      totalPrice: 0,
      searchResults: [],
      errorMessage: ''
    })
  }

  render () {
    const { account_balance } = this.props.userState.userState;
    return (
      <div className='purchase-form-div' onSubmit={this.handleSubmit}>
        <h2>Cash: {account_balance && formatMoney(account_balance)} </h2>
        <form className='log-in-form'>
          <label for='ticker'>
            Ticker:
            <input
              type='text'
              id='ticker'
              placeholder='Ticker'
              value={this.state.ticker}
              onChange={this.handleSearch}
            />
            <SearchAutoComplete
              searchResults={this.state.searchResults}
              handleSelection={this.handleSelection}
            />
          </label>
          <label for='number'>
            Qty:
            <input
              type='number'
              id='Qty'
              placeholder='Qty'
              onChange={handleChange.bind(this)}
              value={this.state.Qty}
            />
          </label>
          <input type='submit' id='register-button' value='Submit'></input>
        </form>
        <Error message={this.state.errorMessage} />
      </div>
    )
  }
}

export default PurchaseForm
