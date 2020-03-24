import React from 'react';
import "./FormStyles.css";

function Login (props) {
   
    return (
        
           <form className="log-in-form">
             <label for="email"> Email: 
              <input type="email" id="email" placeholder="Email"/>
              </label>
              <label for="email"> Password:
              <input type="password" id="password"  placeholder="Password"/>
              </label>
              <button id="register-button"> Sign In</button>
 
           </form>
    
    )
}

export default Login