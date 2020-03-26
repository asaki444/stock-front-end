import React,  { useState } from 'react';
import Registration from '../Forms/Registration'
import LogIn from '../Forms/LogIn'
import "./FormOnFirstPage.css";
import { UserContext} from '../../context/UserState';
import { Redirect  } from 'react-router-dom';

function FormOnFirstPage(props) {

    const [displayRegister, setDisplayRegister] = useState(false)

   if(props.userState.userState.loggedIn){
       return <Redirect to="/portfolio"/>
   }

    return(
     
        <div className="form-template">
            <h2 className="form-template-header">Stock App Log In Page</h2>
             <UserContext.Consumer>
                { (userState, dispatch) => displayRegister ? 
                  <Registration
                   userState={userState}
                   dispatch={dispatch}/> : 
                 <LogIn
                 userState={userState} 
                 dispatch={dispatch}/>}  
             </UserContext.Consumer>
             {!displayRegister && <p className="register-link" onClick={()=> setDisplayRegister(true)}> Don't have an account? Click Here To Register </p>}
        </div>
    
    )
}


export default FormOnFirstPage