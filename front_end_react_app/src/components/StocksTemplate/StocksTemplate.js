import React from 'react';
import './StocksTemplate.css';
import { apiAlphaRequest } from '../../globalFunctions/apiFunctions';
import {formatMoney} from '../../globalFunctions/globalFunctions';
import { Redirect } from 'react-router-dom';


class StockTemplate extends React.Component {
   constructor(props){
       super(props)
       this.state = {
           stockDataRes: [],
           currentPortVal: 0,
       }
   }
   
   componentDidMount(){
      if(this.props.heading === "Portfolio") {
          this.getPrices()
      }
   }


   getPrices()  {
       const {list} = this.props;
       list && list.forEach( (stock) => {
            apiAlphaRequest('stock_info', stock.stock_symbol).then(
                res => {
                    const{data} = res
                    if(data.Note) return;        
                    let val = stock.amount_of_stock * parseFloat(data["Global Quote"]["05. price"]);
                    let change = parseFloat(data["Global Quote"]['09. change']);
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
           stockDataRes,
           currentPortVal
       } = this.state

       if (!this.props.loggedIn) {
        return <Redirect to="/" />;
        }
     
     return(
         <div>
             <h2 className="stock-list-heading">{heading}</h2>
              {heading === "Portfolio" && <h4 className="portfolio-value">Portfolio Value: {formatMoney(currentPortVal)}</h4>}
            <table className="stocks-container">
                <tbody>
                   {
                   list && list.map( (stock, i ) =>
                         <tr>
                             <td>
                                 {stock.stock_symbol } - {stock.amount_of_stock} Shares
                               </td>   
                                  { stockDataRes.length === list.length && list.length > 0 ?
                                          <td className={this.indicateValChange(stockDataRes[i].change)}>
                                          {stockDataRes[i].price && formatMoney(stockDataRes[i].price)} 
                                         </td> :
                                         <td>
                                             {stock.purchase_amount && formatMoney(stock.purchase_amount)}
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