import React, { useEffect, useState } from "react";
import "./App.css";
import ConvertCurrency from "./ConvertCurrency";

let URL =
  "http://apilayer.net/api/live?access_key=29494b4273f9e72c94f68651c13de08d&currencies=EUR,GBP,CAD,PLN&source=USD&format=1";

let toAmount, fromAmount;

function App() {
  const [curreny, setCurrency] = useState([]);
  const [convertFrom, setConvertFrom] = useState();
  const [convertTo, setConvertTo] = useState();
  const [amount, setAmount] = useState(1);
  const [amountFrom, setAmountFrom] = useState(true);
  const [exchangeRate, setExchangeRate] = useState();

  console.log(exchangeRate);

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        const defaultCurrency = Object.keys(data.quotes)[0];
        setCurrency([data.source, ...Object.keys(data.quotes)]);
        setConvertFrom(data.source);
        setConvertTo(defaultCurrency);
        setExchangeRate(data.quotes[defaultCurrency]);
      });
  }, []);

  const handleCurrencyFrom = (e) => {
    setAmount(e.target.value);
    setAmountFrom(true);
  };

  const handleCurrencyTo = (e) => {
    setAmount(e.target.value);
    setAmountFrom(false);
  };

  /*  from and to currency for convert money */

  if (amountFrom) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    if (convertFrom != null && convertTo != null) {
      fetch(`${URL}?source=${convertFrom}&symbols=${convertTo}`)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.quotes[convertTo]));
    }
  }, [convertFrom, convertTo]);
  return (
    <div>
      <h1>Convert Currencies in real-time</h1>
      <ConvertCurrency
        curreny={curreny}
        selectedCurrency={convertFrom}
        onChange={(e) => setConvertFrom(e.target.value)}
        amount={fromAmount}
        onChangeValue={handleCurrencyFrom}
      />
      <ConvertCurrency
        curreny={curreny}
        selectedCurrency={convertTo}
        onChange={(e) => setConvertTo(e.target.value)}
        amount={toAmount}
        onChangeValue={handleCurrencyTo}
      />
    </div>
  );
}

export default App;
