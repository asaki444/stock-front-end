import React, { Fragment } from 'react';
import { Link, Redirect} from 'react-router-dom';
import './NavBar.css';
import { logoutRequest } from '../../globalFunctions/apiFunctions';


function NavBar (props) {
	 const loggedIn = props.userState.userState.loggedIn;
	 const dispatch = props.userState.dispatch;
	return (
		<div className="navigation-bar">
			{loggedIn && (
				<Fragment>
					<Link to="/portfolio">Portfolio</Link>|
					<Link to="/transactions">Transactions</Link>
				</Fragment>
			)}
		</div>
	);
}

export default NavBar;
