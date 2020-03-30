import React from 'react'
import './FormStyles.css'
import { handleChange } from '../../globalFunctions/globalFunctions'
import { sessionRequest } from '../../globalFunctions/apiFunctions'
import { Redirect } from 'react-router-dom'
import Error from '../Error/Error'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      logInSuccess: false
    }
  }

  loginAPIRequest = () => {
    const { email, password } = this.state

    sessionRequest('login', {
      user: {
        email: email,
        password: password
      }
    })
      .then(res => {
        if (res.data.status === 401) {
          this.setState({ logInSuccess: true })
          return
        }
        const { transactions, stocks, user, account_balance } = res.data

        this.props.userState.dispatch({
          type: 'LOGIN',
          user_id: user,
          account_balance: account_balance,
          transactions: transactions,
          stocks: stocks
        })
      })
      .catch(error => console.log('registration error', error))
  }

  handleSubmit = e => {
    e.preventDefault()
    this.loginAPIRequest()
  }

  render () {
    if (this.props.userState.userState.loggedIn) {
      return <Redirect to='/portfolio' />
    }

    return (
      <form className='log-in-form'>
        <label for='email'> Email:</label>
        <input
          type='email'
          id='email'
          placeholder='Email'
          onChange={handleChange.bind(this)}
        />
        <label for='email'> Password:</label>
        <input
          type='password'
          id='password'
          placeholder='Password'
          onChange={handleChange.bind(this)}
        />
        <button id='register-button' onClick={this.handleSubmit}>
          {' '}
          Sign In
        </button>
        {this.state.logInSuccess && <Error message={'Log in error'} />}
      </form>
    )
  }
}

export default Login
