import React from 'react';
import './FormStyles.css';


function PurchaseForm(props){
  
    const balance = 5000;
 
        return (
            <div className="purchase-form-div">
             <h2>Cash: {balance}</h2>
             <form className="log-in-form">
             <label for="ticker"> Ticker:
              <input type="text" id="ticker" placeholder="Ticker"/>
              </label>
              <label for="number"> Qty:
               <input type="number" id="number" placeholder="Qty"/>
               </label>
               <button id="register-button"> Buy</button>
               </form>
             </div>
     
     
     )
    
}

export default PurchaseForm;