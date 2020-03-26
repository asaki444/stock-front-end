import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import FormOnFirstPage from './components/FormOnFirstPage/FormOnFirstPage';
import Portfolio from './components/Portfolio/Portfolio';
import Transactions from './components/Transactions/Transactions';
import { UserProvider,  UserContext} from './context/UserState';
require('dotenv').config()

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
      <div className="App">
        <Switch>
          {/* <UserContext.Consumer>
            {(userState)=>  <Route path="/" render={() => <FormOnFirstPage userState={userState} />}/> }
          </UserContext.Consumer> */}
          <Route path="/portfolio" exact component={Portfolio} />
          <Route path="/transactions" component={Transactions}/>
          <Route render={ () => <h1>404 Error</h1> } />
        </Switch>
      </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
