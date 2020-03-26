import React, {Fragment} from 'react';
import StocksTemplate from '../StocksTemplate/StocksTemplate';
import PurchaseForm from '../Forms/PurchaseForm';
import { UserContext} from '../../context/UserState';
import './Portfolio.css';


function Portfolio (){
  console.log(process.env.REACT_APP_API_KEY)

  

  return (
      <div className="portfolio-div">
      <UserContext.Consumer>  
         {(userState) => 
         <Fragment>
         <StocksTemplate list={userState.userState.stocks} heading={"Portfolio"}/>
         <PurchaseForm userState={userState} />
         </Fragment>
         }
      </UserContext.Consumer>
      
      </div>
  )
}

export default Portfolio;

