import React from 'react';
import "./StocksTemplate.css"


function StockListTemplate() {
    
    const dummyData = [
        {name: "AST",
        shares: 40,
        cost : 55},
        {name: "RET",
        shares: 30,
        cost: 77},
        {name: "WFLE", 
        shares: 30,
        cost: 100}
    ]

    return(
        <div className="stock-list">
           <table className="stock-list-table"> 
            {dummyData.map(stock => <tr><td>{stock.name}</td><td>Shares: {stock.shares}</td><td>{stock.cost}</td></tr>)}
           </table>
        </div>
        
    )
}

export default StockListTemplate;