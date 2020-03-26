import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import FormOnFirstPage from './components/FormOnFirstPage/FormOnFirstPage';
import Portfolio from './components/Portfolio/Portfolio';
import Transactions from './components/Transactions/Transactions';
import { UserProvider,  UserContext} from './context/UserState';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
      <div className="App">
        <Switch>
            <Route path={"/portfolio"} component={Portfolio}/>
            <Route path={"/transactions"} component={Transactions}/>
            <Route path={"/homepage"} component={FormOnFirstPage} />
            <Route render={ () => <h1>404 Error</h1> } />

        </Switch>
      </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
