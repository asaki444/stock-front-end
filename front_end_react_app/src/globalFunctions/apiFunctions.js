import axios from "axios";

export function apiAlphaRequest(urlPurpose,val){
   console.log("this fired")
   let urlFunction,param;
   if(urlPurpose === "search"){
    urlFunction = 'SYMBOL_SEARCH'
    param = 'keywords'
   }
   else if(urlPurpose === "stock_info"){
     urlFunction = 'GLOBAL_QUOTE'
     param = 'symbol'
   }
     const url =  `https://www.alphavantage.co/query?function=${urlFunction}&${param}=${val}&apikey=${process.env.REACT_APP_API_KEY}`
    return axios.get(url)
}

export function sessionRequest(typeOfLogin, objToPost){
   let url;
   
   if(typeOfLogin === 'registration'){
       url = 'http://localhost:3001/registrations'
   }
   else if(typeOfLogin === 'login'){
      url = 'http://localhost:3001/sessions'
   }
 
     return axios.post(url,
        objToPost, 
        {withCredentials: true})  
}

export function transactionRequest(objToPost){
    return axios.post('http://localhost:3001/transactions', objToPost, {withCredentials: true})
}

export function logoutRequest(){
  return axios.delete('http://localhost:3001/logout')
}