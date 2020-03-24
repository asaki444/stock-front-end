import React from 'react';
import './App.css';
import FormOnFirstPage from './components/FormOnFirstPage/FormOnFirstPage';
import StockListTemplate from './components/StocksTemplate/StocksTemplate';
import Portfolio from './components/Portfolio/Portfolio'

function App() {
  return (
    <div className="App">
      {/* <FormOnFirstPage /> */}
      {/* <StockListTemplate /> */}
      <Portfolio />
    </div>
  );
}

export default App;
