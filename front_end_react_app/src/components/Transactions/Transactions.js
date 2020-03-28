import React from 'react';
import StocksTemplate from '../StocksTemplate/StocksTemplate';
import './Transactions.css';
import { UserContext } from '../../context/UserState';

function Transactions () {
   
    return(
        <div className="transactions-div">
            <UserContext.Consumer>
              {(userState) => 
              <StocksTemplate heading={"Transactions"} list={userState.userState.transactions}/>}
            </UserContext.Consumer>
        </div>
      
    )

}

export default Transactions;