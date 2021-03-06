import React, { Fragment } from 'react';
import StocksTemplate from '../StocksTemplate/StocksTemplate';
import PurchaseForm from '../Forms/PurchaseForm';
import { UserContext } from '../../context/UserState';
import './Portfolio.css';

function Portfolio () {
	return (
		<div className="portfolio-div">
			<UserContext.Consumer>
				{(userState) => (
					<Fragment>
						<StocksTemplate list={userState.userState.stocks} loggedIn={userState.userState.loggedIn} heading={'Portfolio'} />
						<PurchaseForm userState={userState} />
					</Fragment>
				)}
			</UserContext.Consumer>
		</div>
	);
}

export default Portfolio;
