import React from 'react'
import './FormStyles.css'
import axios from 'axios'
import SearchAutoComplete from '../SearchAutoComplete/SearchAutoComplete';
import { handleChange } from '../../globalFunctions/globalFunctions';


class PurchaseForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ticker: '',
      Qty: 0,
      totalPrice: 0,
      searchResults: [],
      tickerValid: true
    }
  }


  handleSelection = (e) => {
     this.setState({
         ticker: e.target.id,
         searchResults: []
     })
  }

   handleSearch = e => {

    this.setState({
        ticker: e.target.value
    })

    axios
      .get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${e.target.value}&apikey=${process.env.REACT_APP_API_KEY}`
      )
      .then(res =>
        {
        this.setState({
          searchResults: res.data.bestMatches
        })
        }
      )
      .catch(err => console.log('search error', err))
  }


  handleSubmit = e => {
    e.preventDefault();
    const {searchResults} = this.state;
    let checkIfTickerIsValid = searchResults.filter(sym => sym["1. symbol"] === this.state.ticker)
    if(checkIfTickerIsValid.length > 0 ){
        this.setState({
            tickerValid: false
        })
      return
    }
    axios
    .get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.state.ticker}&apikey=${process.env.REACT_APP_API_KEY}`)
    .then(res => 
        { let newTotal = this.state.Qty *res.data["Global Quote"]["05. price"] 
            this.setState({
                totalPrice: newTotal
            })
         }
     )
     
     const {totalPrice, Qty, ticker} = this.state
     axios.post('http://localhost:3001/transactions', {

        transaction: {
            purchase_amount: totalPrice,
            amount_of_stock: Qty,
            stock_symbol: ticker
        }
     }, {withCredentials: true}).then(
         res => {
             console.log(res)
         }
     )
   
    }

  render () {
    console.log(this.state)
    return (
      <div className='purchase-form-div'>
        <h2>Cash: BALANCE </h2>
        <form className='log-in-form'>
          <label for='ticker'>
            {' '}
            Ticker:
            <input type='text' id='ticker' placeholder='Ticker' value={this.state.ticker} onChange={this.handleSearch}/>
            <SearchAutoComplete searchResults={this.state.searchResults} handleSelection={this.handleSelection} />
          </label>
          <label for='number'>
            {' '}
            Qty:
            <input type='number' id='Qty' placeholder='Qty' onChange={handleChange.bind(this)}/>
          </label>
          <button id='register-button' onClick={this.handleSubmit}> Buy</button>
        </form>
      </div>
    )
  }
}

export default PurchaseForm
