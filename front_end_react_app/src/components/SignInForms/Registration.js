import React from 'react';
import "./Registration.css";

function Registration() {

  
    return (
           <form className="log-in-form">
            <label for="name"> Name:  
             <input type="text" id="name" placeholder="Name"/>
             </label>
             <label for="email"> Email: 
              <input type="email" id="email" placeholder="Email"/>
              </label>
              <label for="email"> Password:
              <input type="password" id="password"  placeholder="Password"/>
              </label>
              <label for="email"> Password Confirmation:
              <input type="password" id="password_confirmation" placeholder="Password Confirmation" />
              </label>
              <button id="register-button"> Register</button>
           </form>
    
    )
}

export default Registration