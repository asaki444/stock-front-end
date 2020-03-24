import React from 'react';
import './App.css';
import FormOnFirstPage from './components/FormOnFirstPage/FormOnFirstPage';
import StockListTemplate from './components/StocksTemplate/StocksTemplate';
import Portfolio from './components/Portfolio/Portfolio';
import Transactions from './components/Transactions/Transactions';

function App() {
  return (
    <div className="App">
      {/* <FormOnFirstPage /> */}
      {/* <StockListTemplate /> */}
      <Portfolio />
       {/* <Transactions /> */}
    </div>
  );
}

export default App;
