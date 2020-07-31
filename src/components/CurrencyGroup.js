import React, { useState } from 'react';

const CurrencyGroup = ({ currencyOptions, selectedCurrency, onChangeCurrency }) => {
	// const [ query, setText ] = useState('');
	// const handleChange = (query) => {
	// 	setText(query);
	// 	getQuery(query);
	// };
	return (
		<div>
			<input className="input" type="number" />
			<select value={selectedCurrency} className="select" onChange={onChangeCurrency}>
				{currencyOptions.map((option) => {
					return (
						<option key={option} value={option}>
							{option}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default CurrencyGroup;
