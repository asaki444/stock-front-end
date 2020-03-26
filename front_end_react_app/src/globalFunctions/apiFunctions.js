import axios from "axios";

export function apiAlphaRequest(urlPurpose,val){
   let urlFunction
   if(urlPurpose === "search"){
    urlFunction = 'SYMBOL_SEARCH'
   }
   else if(urlPurpose === "stock_info"){
     urlFunction = 'GLOBAL_QUOTE'
   }
     const url =  `https://www.alphavantage.co/query?function=${urlFunction}&keywords=${val}&apikey=${process.env.REACT_APP_API_KEY}`
  
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