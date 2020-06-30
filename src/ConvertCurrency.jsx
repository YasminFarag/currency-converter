import React from "react";

export default function ConvertCurrency(props) {
  const { curreny, selectedCurrency, onChange, amount, onChangeValue } = props;
  return (
    <div className="form">
      <input
        type="number"
        className="inpt"
        value={amount}
        onChange={onChangeValue}
      />
      <select value={selectedCurrency} onChange={onChange}>
        {curreny.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
