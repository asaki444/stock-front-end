import React from 'react';
import "./FormStyles.css";
import {handleChange} from '../../globalFunctions/globalFunctions';
import axios from "axios";


class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        email: '',
        password: '',
    }
}


loginAPIRequest = () => {
  const {
    email,
    password
} = this.state;
console.log("we got here")
axios.post('http://localhost:3001/sessions', {
    user: {
        email: email,
        password: password
    }
}, {
    withCredentials: true
}).then( (res) => {
   console.log(res)
   const {user} = res.data;
   this.props.userState.dispatch({type: 'LOGIN', user_id: user.id})
}).catch(error => console.log("registration error", error))
}


handleSubmit = (e)=>{
   e.preventDefault()
   this.loginAPIRequest();
}


  render(){
  
    return (
        
      <form className="log-in-form">
        <label for="email"> Email:   </label>
         <input type="email" id="email" placeholder="Email" onChange={handleChange.bind(this)}/>
         <label for="email"> Password: </label>
         <input type="password" id="password"  placeholder="Password" onChange={handleChange.bind(this)}/>
         <button id="register-button" onClick={this.handleSubmit}> Sign In</button>
      </form>

      )
    }
  }


export default Login;