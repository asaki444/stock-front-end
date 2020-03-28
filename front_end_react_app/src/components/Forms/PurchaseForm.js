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



	handleSubmit = (e) => {
		e.preventDefault();
		const {  Qty, ticker} = this.state;
    let intQty = parseInt(Qty);
   
    apiAlphaRequest('stock_info', ticker).then( (res)=> {
      console.log(res.data)
     if(res.data.Note) return;
      let newTotal = intQty * parseInt(res.data['Global Quote']['05. price']);

		transactionRequest({
			transaction : {
				purchase_amount : newTotal,
				amount_of_stock : intQty,
				stock_symbol    : ticker
			}
		}).then((res) => {

			const { stock_symbol, balance, transaction } = res.data;

			this.props.userState.dispatch({
				type            : 'PURCHASE_STOCK',
				account_balance : balance,
				stock           : stock_symbol,
				transaction     : transaction
			});
    });
     }
    )
	 this.setState({
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
			<div className="purchase-form-div" onSubmit={this.handleSubmit}>
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
           <input type="submit" id="register-button" value="Submit">
					</input>
				</form>
			</div>
		);
	}
}

export default PurchaseForm;
