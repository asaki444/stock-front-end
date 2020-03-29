import React from 'react';
import './StocksTemplate.css';
import { apiAlphaRequest } from '../../globalFunctions/apiFunctions';


class StockTemplate extends React.Component {
   constructor(props){
       super(props)
       this.state = {
           stockDataRes: [],
           currentPortVal: 0
       }
   }
   
   componentDidMount(){
      this.getPrices()
   }
    

   getPrices()  {
       const {list} = this.props;
       list.forEach( (stock) => {
            apiAlphaRequest('stock_info', stock.stock_symbol).then(
                res => {
                    const{data} = res
                    if(data.Note) return;        
                    let val = stock.amount_of_stock * parseInt(data["Global Quote"]["05. price"]);
                    let change = parseInt(data["Global Quote"]['09. change']);
                    this.setState({
                        currentPortVal: this.state.currentPortVal + val,
                        stockDataRes: [...this.state.stockDataRes, {change: change, price: data["Global Quote"]['05. price']}]
                       }
                    )
                }
            )
         }
       )

     
   }

    indicateValChange(change){
    if(change < 0 ){
        return "price-decrease"
    }
    else if(change > 0 ){
        return "price-increase"
    }
    else{
        return ""
    }
}


   render(){
       const {
           heading,
           list
       } = this.props
       const{
           stockDataRes
       } = this.state

     return(
         <div>
             <h2 className="stock-list-heading">{heading}</h2>
            <table>
                <tbody>
                   {
                   list.map( (stock, i ) =>
                         <tr>
                             <td>
                                 {stock.stock_symbol} - {stock.amount_of_stock} Shares
                               </td>   
                                  { stockDataRes.length === list.length &&
                                          <td className={this.indicateValChange(stockDataRes[i].change)}>
                                          {stockDataRes[i].price} 
                                         </td>
                                  }
                            
                         </tr>)
                   }
                </tbody>
            </table>
         </div>
       
      )

   }
}

export default StockTemplate;