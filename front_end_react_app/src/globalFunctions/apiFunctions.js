import axios from 'axios'
const backend_url = 'https://fathomless-wave-97372.herokuapp.com'

export function apiAlphaRequest (urlPurpose, val) {
  let urlFunction, param
  if (urlPurpose === 'search') {
    urlFunction = 'SYMBOL_SEARCH'
    param = 'keywords'
  } else if (urlPurpose === 'stock_info') {
    urlFunction = 'GLOBAL_QUOTE'
    param = 'symbol'
  }
  const url = `https://www.alphavantage.co/query?function=${urlFunction}&${param}=${val}&apikey=${process.env.REACT_APP_API_KEY}`
  return axios.get(url)
}

export function sessionRequest (typeOfLogin, objToPost) {
  let url

  if (typeOfLogin === 'registration') {
    url = `${backend_url}/registrations`
  } else if (typeOfLogin === 'login') {
    url = `${backend_url}/sessions`
  }

  return axios.post(url, objToPost, { withCredentials: true })
}

export function transactionRequest (objToPost) {
  return axios.post(`${backend_url}/transactions`, objToPost, {
    withCredentials: true
  })
}

export function logoutRequest () {
  return axios.delete(`${backend_url}/logout`)
}
