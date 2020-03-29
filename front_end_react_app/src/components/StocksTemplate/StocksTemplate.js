import React, { useState, useRef, useEffect } from 'react';
import './StocksTemplate.css';
import { apiAlphaRequest } from '../../globalFunctions/apiFunctions';

function StockListTemplate (props) {
	const { list, heading,userState } = props;
	const [
		currentTotal,
		setCurrentTotal
    ] = useState(0);
    const [
        mount,
        setMount
    ]  = useState (false)
	const tbody = useRef('');

	useEffect(() => {
       
        return setMount(true)
        		
    });


	const renderList = () => {
		if (!list || list.length === 0) return;
      
		if (heading === 'Portfolio') {
		     list.map((stock) => {
			   let change, price;
	          ( async function getPrices() {
               const res = await apiAlphaRequest('stock_info', stock.stock_symbol)
               return (
                <tr className="table-row">
                    <td>{stock.stock_symbol}</td>
                    <td>Shares: {stock.amount_of_stock}</td>
                    <td
                        className={

                                change > 0 ? 'price-increase' :
                                'price-decrease'
                        }
                    >      
                    </td>
                    <td>
                        {price}
                    </td>
                </tr>)
               })();

            
            })
        }
		// else {
		// 	console.log(list);
		// 	// <tr><td>{stock.name}</td><td>Shares: {stock.shares}</td><td>{stock.cost}</td></tr
		// 	list.map((stock) => console.log(stock));
		// }
	}

	return (
		<div className="stock-list">
			<h2 className="stock-list-heading">{heading}</h2>
			{currentTotal > 0 && <h2> {currentTotal} </h2>}
			<table className="stock-list-table">
                <tbody ref={tbody}>
                    { mount && renderList()}
				</tbody>
			</table>
		</div>
	);
}

export default StockListTemplate;
