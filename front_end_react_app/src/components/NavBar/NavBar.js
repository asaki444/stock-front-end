import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { logoutRequest } from '../../globalFunctions/apiFunctions';


function NavBar (props) {
	const { loggedIn } = props;

	return (
		<div className="navigation-bar">
			{loggedIn && (
				<Fragment>
					<Link to="/portfolio">Portfolio</Link>|
					<Link to="/transactions">Transactions</Link>|
					<Link onClick={logoutRequest.bind(this)} to='/'>Logout</Link>
				</Fragment>
			)}
		</div>
	);
}

export default NavBar;
