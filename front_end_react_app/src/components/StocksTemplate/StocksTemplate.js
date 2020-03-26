import React from 'react';
import "./StocksTemplate.css"
import { apiAlphaRequest } from '../../globalFunctions/apiFunctions';


function StockListTemplate(props) {
    console.log("template", props)
    const {list, heading} = props
     
   function renderList(){
    if(!list) return;


        if(heading === "Portfolio"){

          return list.map( stock => 
              {  const{
                    stock_symbol,
                    amount_of_stock,
                  } = stock
              apiAlphaRequest('stock_info', stock_symbol).then(
                  res => console.log(res)
              ).catch(err => console.log("reg", err))
              const change = "red";
              return <tr><td>{stock_symbol}</td><td>Shares: {amount_of_stock}</td>
              <td className={change}></td></tr>
              }  
            )
        }
        else{
            list.map(stock => <tr><td>{stock.name}</td><td>Shares: {stock.shares}</td><td>{stock.cost}</td></tr>)}
        
    }

    return(
        <div className="stock-list">
           <h2 className="stock-list-heading">{heading}</h2>
           <table className="stock-list-table"> 
            <tbody>
              {renderList()}
            </tbody>
           </table>
        </div>
        
    )
}

export default StockListTemplate;