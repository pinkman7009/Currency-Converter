import React, { useState, useEffect } from 'react';
import './App.css';
import CurrencyGroup from './components/CurrencyGroup';

const BASE_URL = 'https://api.exchangeratesapi.io/latest';
function App() {
	const [ currencyOptions, setCurrencyOptions ] = useState([]);

	const [ exchangeRate, setExchangeRate ] = useState('');
	const [ fromCurrency, setFromCurrency ] = useState();
	const [ toCurrency, setToCurrency ] = useState();

	const [ amount, setAmount ] = useState(1);
	const [ amountInFromCurrency, setAmountInFromCurrency ] = useState(true);

	let toAmount, fromAmount;

	if (amountInFromCurrency) {
		fromAmount = amount;
		toAmount = amount * exchangeRate;
	} else {
		toAmount = amount;
		fromAmount = amount / exchangeRate;
	}
	useEffect(() => {
		const fetchItems = async () => {
			const result = await fetch(BASE_URL);

			const data = await result.json();

			const arr = [ data.base, ...Object.keys(data.rates) ];

			const firstCurrency = Object.keys(data.rates)[0];
			setFromCurrency(data.base);
			setToCurrency(firstCurrency);
			setCurrencyOptions(arr);
			setExchangeRate(data.rates[firstCurrency]);
		};

		fetchItems();
	}, []);

	useEffect(
		() => {
			if (fromCurrency !== null && toCurrency != null) {
				const fetchItems = async () => {
					const result = await fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`);

					const data = await result.json();

					setExchangeRate(data.rates[toCurrency]);
				};

				fetchItems();
			}
		},
		[ fromCurrency, toCurrency ]
	);

	const handleChangeFromAmount = (e) => {
		setAmount(e.target.value);
		setAmountInFromCurrency(true);
	};

	const handleChangeToAmount = (e) => {
		setAmount(e.target.value);
		setAmountInFromCurrency(false);
	};
	return (
		<div className="currency">
			<h1 className="lead">Currency Coverter</h1>
			<CurrencyGroup
				currencyOptions={currencyOptions}
				selectedCurrency={fromCurrency}
				onChangeCurrency={(e) => setFromCurrency(e.target.value)}
				onChangeAmount={handleChangeFromAmount}
				value={fromAmount}
			/>
			<div className="equals">=</div>
			<CurrencyGroup
				currencyOptions={currencyOptions}
				selectedCurrency={toCurrency}
				onChangeCurrency={(e) => setToCurrency(e.target.value)}
				onChangeAmount={handleChangeToAmount}
				value={toAmount}
			/>
		</div>
	);
}

export default App;
