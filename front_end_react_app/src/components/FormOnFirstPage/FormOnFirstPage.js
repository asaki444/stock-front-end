import React,  { useState } from 'react';
import Registration from '../SignInForms/Registration'
import LogIn from '../SignInForms/LogIn'
import "./FormOnFirstPage.css";

function FormOnFirstPage() {

    const [displayRegister, setDisplayRegister] = useState(false)
    console.log(displayRegister)
    return(
        <div className="form-template">
            <h2 className="form-template-header">Stock App Log In Page</h2>
             {displayRegister ? <Registration /> : <LogIn/>} 
             {!displayRegister && <p className="register-link" onClick={()=> setDisplayRegister(true)}> Don't have an account? Click Here To Register </p>}
        </div>
    )
}


export default FormOnFirstPage