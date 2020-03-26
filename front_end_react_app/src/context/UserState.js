import React, {useReducer} from 'react'
import {UserReducer} from './reducers'


const initialState = {
  loggedIn: false,
  user_id: null,
  stocks: [],
  transactions: [],
  account_balance: 5000
}



export const UserContext = React.createContext();


export const UserProvider = props => {
  const [userState, dispatch] = useReducer(UserReducer, initialState);
    return (
      <UserContext.Provider value={{userState, dispatch}}>
        {props.children}
      </UserContext.Provider>
    )
  
}