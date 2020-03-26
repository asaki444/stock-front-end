import React,{Fragment} from 'react';
import "./FormStyles.css";
import axios from "axios";
import {handleChange, checkValidation} from '../../globalFunctions/globalFunctions';
import { sessionRequest } from '../../globalFunctions/apiFunctions';


class Registration extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            duplicateFound: false
    }
}



registerAPIRequest = ()=>{
    console.log(checkValidation(this.state))
    if(checkValidation(this.state)){
        const {
            name,
            email,
            password,
            password_confirmation
        } = this.state


    sessionRequest('login', { user: {
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation
    }})
    .then(
       response => {              
                if(response.data.status === "created"){   
                const {id, account_balance} = response.data.user
                
                this.props.userState.dispatch({type: 'REGISTER', 
                user_id: id, 
                account_balance: account_balance, 
                loggedIn: true})}

                else if(response.data.status ==="duplicate record"){
                    this.setState({
                        duplicateFound: true
                    })
                }
            }
    ).catch(error => console.log("registration error", error));
  }
}

handleSubmit = (e)=>{
    e.preventDefault()
    this.registerAPIRequest();
}
    
    
    render() {
      const {name, email,password, password_confirmation} = this.state;
       console.log("registration Response", this.props.userState.userState);
        return (
            <Fragment>
              <form className="log-in-form">
             <label for="name"> Name:      </label>
              <input type="text" id="name" placeholder="Name" value={name} onChange={handleChange.bind(this)}/>
          
              <label for="email"> Email:  </label>
               <input type="email" id="email" placeholder="Email" value={email} onChange={handleChange.bind(this)}/>
              
               <label for="email"> Password:</label>
               <input type="password" id="password"  placeholder="Password" value={password} onChange={handleChange.bind(this)}/>
               
               <label for="email"> Password Confirmation: </label>
               <input type="password" id="password_confirmation" placeholder="Password Confirmation" value={password_confirmation} onChange={handleChange.bind(this)}/>
              
               <button id="register-button" onClick={this.handleSubmit}> Register</button>
            </form>
            {this.state.duplicateFound && <p className="log-in-link"onClick={()=>this.props.setDisplayRegister(false)}> Seems Like You Already Have an Account. Click Here to Sign In</p>}
        </Fragment>
          
    
       )
    }

}

export default Registration;