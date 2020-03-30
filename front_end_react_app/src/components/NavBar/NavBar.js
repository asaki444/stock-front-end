import React, { Fragment } from 'react';
import { Link, Redirect} from 'react-router-dom';
import './NavBar.css';


function NavBar (props) {
	 const loggedIn = props.userState.userState.loggedIn;
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
