import React from 'react';
import './FormStyles.css';
import SearchAutoComplete from '../SearchAutoComplete/SearchAutoComplete';
import { handleChange } from '../../globalFunctions/globalFunctions';
import { apiAlphaRequest, transactionRequest } from '../../globalFunctions/apiFunctions';
import { Redirect } from 'react-router-dom';

class PurchaseForm extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			ticker        : '',
			Qty           : 0,
			totalPrice    : 0,
			searchResults : [],
			errorMessage  : ''
		};
	}

	handleSelection = (e) => {
		this.setState({
			ticker        : e.target.id,
			searchResults : []
		});
	};

	handleSearch = (e) => {
		this.setState({
			ticker : e.target.value
		});

		apiAlphaRequest('search', e.target.value)
			.then((res) => {
				this.setState({
					searchResults : res.data.bestMatches
				});
			})
			.catch((err) => console.log('search error', err));
	};

	findPriceOfStock = (intQty, ticker) => {
		apiAlphaRequest('stock_info', ticker)
			.then((res) => {
				console.log('find res', res.data['Global Quote']['05. price']);
				let newTotal = intQty * parseInt(res.data['Global Quote']['05. price']);
			  this.setState({
          totalPrice : newTotal
        });
			})
      .catch((err) => console.log('err', err));
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { searchResults, Qty, ticker, totalPrice } = this.state;
    let intQty = parseInt(Qty);
    this.findPriceOfStock(intQty,ticker);
		let checkIfTickerIsValid =
			searchResults.length > 0 && searchResults.filter((sym) => sym['1. symbol'] === this.state.ticker);
		if (checkIfTickerIsValid.length === 0 && ticker !== '') {
			this.setState({
				errorMessage : 'Symbol not found'
			});
			return;
		}
		else if (intQty <= 0) {
			this.setState({
				errorMessage : 'Please select valid Quantity'
			});
			return;
    }
    
		transactionRequest({
			transaction : {
				purchase_amount : totalPrice,
				amount_of_stock : intQty,
				stock_symbol    : ticker
			}
		}).then((res) => {
			const { stock, balance, transaction } = res.data;

			this.props.userState.dispatch({
				type            : 'PURCHASE_STOCK',
				account_balance : balance,
				stock           : stock,
				transaction     : transaction
			});
		});

		return this.setState({
			ticker        : '',
			Qty           : 0,
			totalPrice    : 0,
			searchResults : [],
			errorMessage  : ''
		});
	};

	render () {
		const { account_balance, loggedIn } = this.props.userState.userState;
		if (!loggedIn) {
			return <Redirect to="/" />;
		}
		return (
			<div className="purchase-form-div">
				<h2>Cash: {account_balance} </h2>
				<form className="log-in-form">
					<label for="ticker">
						{' '}
						Ticker:
						<input
							type="text"
							id="ticker"
							placeholder="Ticker"
							value={this.state.ticker}
							onChange={this.handleSearch}
						/>
						<SearchAutoComplete
							searchResults={this.state.searchResults}
							handleSelection={this.handleSelection}
						/>
					</label>
					<label for="number">
						{' '}
						Qty:
						<input
							type="number"
							id="Qty"
							placeholder="Qty"
							onChange={handleChange.bind(this)}
							value={this.state.Qty}
						/>
					</label>
					<button id="register-button" onClick={this.handleSubmit}>
						{' '}
						Buy
					</button>
				</form>
			</div>
		);
	}
}

export default PurchaseForm;
