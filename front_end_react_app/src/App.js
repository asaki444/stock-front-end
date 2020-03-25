import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import FormOnFirstPage from './components/FormOnFirstPage/FormOnFirstPage';
import Portfolio from './components/Portfolio/Portfolio';
import Transactions from './components/Transactions/Transactions';
import { UserProvider} from './context/UserState';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <BrowserRouter>
        <Switch>
          <Route path="/" component={FormOnFirstPage}/>
          <Route path="/portfolio" component={Portfolio} />
          <Route path="/transactions" component={Transactions}/>
        </Switch>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}

export default App;
