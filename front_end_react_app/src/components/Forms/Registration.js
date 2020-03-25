import React from 'react';
import "./FormStyles.css";

class Registration extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
        }
    }

    handleChange = (e)=> {
        let value = e.target.value.trim()
        this.setState({
            [e.target.id]: value
        })
    }

    handleSubmit = (e)=>{
       e.preventDefault()
       console.log(this.props)
    //    this.props.dispatch({type: 'REGISTER', credentials: this.state })
    }
    
    render() {
      const {name, email,password, password_confirmation} = this.state;

        return (
            <form className="log-in-form">
             <label for="name"> Name:      </label>
              <input type="text" id="name" placeholder="Name" value={name} onChange={this.handleChange}/>
          
              <label for="email"> Email:  </label>
               <input type="email" id="email" placeholder="Email" value={email} onChange={this.handleChange}/>
              
               <label for="email"> Password:</label>
               <input type="password" id="password"  placeholder="Password" value={password} onChange={this.handleChange}/>
               
               <label for="email"> Password Confirmation: </label>
               <input type="password" id="password_confirmation" placeholder="Password Confirmation" value={password_confirmation} onChange={this.handleChange}/>
              
               <button id="register-button" onClick={this.handleSubmit}> Register</button>
            </form>
    
       )
    }

}

export default Registration;