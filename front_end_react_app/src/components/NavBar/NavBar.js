import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar(props){
  console.log("props", props)
   const {loggedIn} = props;
   
    return(
       <div className="navigation-bar">
         {loggedIn && <Fragment>
           <Link to="/portfolio">Portfolio</Link>|
          <Link to="/transactions">Transactions</Link>|
          <Link>Logout</Link>
         </Fragment>}
        
        </div>
    )
}


export default NavBar;