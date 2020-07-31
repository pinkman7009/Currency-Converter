import React, { useState, useEffect } from 'react';
import './App.css';
import CurrencyGroup from './components/CurrencyGroup';

const BASE_URL = 'https://api.exchangeratesapi.io/latest';
function App() {
	const [ currencyOptions, setCurrencyOptions ] = useState([]);

	const [ fromCurrency, setFromCurrency ] = useState();
	const [ toCurrency, setToCurrency ] = useState();
	useEffect(() => {
		const fetchItems = async () => {
			const result = await fetch(BASE_URL);

			const data = await result.json();

			const arr = [ data.base, ...Object.keys(data.rates) ];

			setFromCurrency(data.base);
			setToCurrency(Object.keys(data.rates)[0]);
			setCurrencyOptions(arr);
		};

		fetchItems();
	}, []);
	return (
		<div className="currency">
			<h1 className="lead">Currency Coverter</h1>
			<CurrencyGroup
				currencyOptions={currencyOptions}
				selectedCurrency={fromCurrency}
				onChangeCurrency={(e) => setFromCurrency(e.target.value)}
			/>
			<div className="equals">=</div>
			<CurrencyGroup
				currencyOptions={currencyOptions}
				selectedCurrency={toCurrency}
				onChangeCurrency={(e) => setToCurrency(e.target.value)}
			/>
		</div>
	);
}

export default App;
