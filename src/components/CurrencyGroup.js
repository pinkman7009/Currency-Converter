import React from 'react';

const CurrencyGroup = ({ currencyOptions, selectedCurrency, onChangeCurrency, onChangeAmount, value }) => {
	return (
		<div>
			<input className="input" type="number" onChange={onChangeAmount} value={value} />
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
