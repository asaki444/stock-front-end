import React from 'react';
import StocksTemplate from '../StocksTemplate/StocksTemplate';
import PurchaseForm from '../Forms/PurchaseForm';
import './Portfolio.css'


function Portfolio (){

  return (
      <div className="portfolio-div">
         <StocksTemplate heading={"Portfolio"}/>
         <PurchaseForm />
      </div>
  )
}

export default Portfolio;

