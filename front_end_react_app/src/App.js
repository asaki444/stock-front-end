import React from 'react';
import './App.css';
import FormOnFirstPage from './components/FormOnFirstPage/FormOnFirstPage';
import StockListTemplate from './components/StocksTemplate/StocksTemplate';

function App() {
  return (
    <div className="App">
      {/* <FormOnFirstPage /> */}
      <StockListTemplate />
    </div>
  );
}

export default App;
