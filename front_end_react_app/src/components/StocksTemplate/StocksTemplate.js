import React, { useState } from 'react';
import "./StocksTemplate.css"
import { apiAlphaRequest } from '../../globalFunctions/apiFunctions';


function StockListTemplate(props) {
    console.log("template", props)
    const {list, heading} = props
    const [currentTotal, setCurrentTotal] = useState(0)


   function renderList(){
    if(!list) return;


        if(heading === "Portfolio"){

          return list.map( stock => 
              {  
                const{
                stock_symbol,
                amount_of_stock
              } = stock
                  
                  let change,price;
               
                  apiAlphaRequest('stock_info', stock_symbol).then(
                  res => {
                       change = parseInt(res.data['Global Quote']['09. change']);
                       price =  amount_of_stock * parseInt(res.data['Global Quote']['05. price'])
                       
                       let newTotal = currentTotal + price
                       setCurrentTotal(newTotal)  
                  }    
              ).catch(err => console.log("reg", err))
              return <tr className="table-row">
                           <td>{stock_symbol}</td>
                           <td>Shares: {stock}</td>
                           <td className={change > 0 ? "price-increase": "price-decrease"}> {price}</td>
                    </tr>
            })
             
      }  
          
        else{
            console.log(list)
            // <tr><td>{stock.name}</td><td>Shares: {stock.shares}</td><td>{stock.cost}</td></tr
            list.map(stock => console.log(stock))}
        
    }

    return(
        <div className="stock-list">
           <h2 className="stock-list-heading">{heading}</h2>
           {currentTotal > 0 && <h2> {currentTotal} </h2>}
           <table className="stock-list-table"> 
            <tbody>
              {renderList()}
            </tbody>
           </table>
        </div>
        
    )
}

export default StockListTemplate;