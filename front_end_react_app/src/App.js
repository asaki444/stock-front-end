import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import FormOnFirstPage from './components/FormOnFirstPage/FormOnFirstPage';
import Portfolio from './components/Portfolio/Portfolio';
import Transactions from './components/Transactions/Transactions';
import NavBar from './components/NavBar/NavBar';
import { UserContext} from './context/UserState';

function App() {
  return (
      <BrowserRouter>
      <div className="App">
         <UserContext.Consumer>
               {(userState) =>  <NavBar loggedIn={userState.userState.loggedIn}/>}
          </UserContext.Consumer>
        <Switch>
            <Route path={"/portfolio"} component={Portfolio}/>
            <Route path={"/transactions"} component={Transactions}/>
            <Route path={"/"} component={FormOnFirstPage} />
            <Route render={ () => <h1>404 Error</h1> } />
        </Switch>
      </div>
      </BrowserRouter>
  );
}

export default App;
