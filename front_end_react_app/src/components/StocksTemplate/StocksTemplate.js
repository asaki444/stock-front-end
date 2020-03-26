import React from 'react';
import "./StocksTemplate.css"


function StockListTemplate(props) {
    console.log(props)
    const {list, heading} = props
     
   function renderList(){
    if(!list) return
        if(heading === "Portfolio"){
          return list.map( stock => 
              {
                  //make api request 
              const change = "red";
              console.log(stock.stock_symbol)
              return <tr><td>{stock.stock_symbol}</td><td>Shares: {stock.amount_of_stock}</td>
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