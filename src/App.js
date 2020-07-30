import React from 'react';
import './App.css';
import CurrencyGroup from './components/CurrencyGroup';
function App() {
	return (
		<div className="currency">
			<h1 className="lead">Currency Coverter</h1>
			<CurrencyGroup />
			<div className="equals">=</div>
			<CurrencyGroup />
		</div>
	);
}

export default App;
