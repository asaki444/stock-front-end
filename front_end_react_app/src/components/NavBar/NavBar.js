import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar(){
   
    return(
        <div className="navigation-bar">
          <Link to="/portfolio">Portfolio</Link>|
          <Link to="/transactions">Transactions</Link>|
          <Link>Logout</Link>
        </div>
    )
}


export default NavBar;