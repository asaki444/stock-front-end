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
    


	function renderList () {
		if (!list || list.length === 0) return;
      
		if (heading === 'Portfolio') {
            console.log('this runs', list)
			return list.map((stock) => {
				let change, price;
                console.log(stock)
				apiAlphaRequest('stock_info', stock.stock_symbol)
					.then((res) => {
						if (res.data.Note) return;
						change = parseInt(res.data['Global Quote']['09. change']);
						price = stock.amount_of_stock * parseInt(res.data['Global Quote']['05. price']);

						let newTotal = currentTotal + price;
                        setCurrentTotal(newTotal);
                        console.log(`price: ${price}, newTotal: ${newTotal}, change: ${change}`)
					})
					.catch((err) => console.log('reg', err));
				console.log('we ran', price);
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
	
							{price}
						</td>
					</tr>
				);
			});
		}
		else {
			console.log(list);
			// <tr><td>{stock.name}</td><td>Shares: {stock.shares}</td><td>{stock.cost}</td></tr
			list.map((stock) => console.log(stock));
		}
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
