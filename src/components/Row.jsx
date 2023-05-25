import React from "react";

import "./Row.scss";

const Row = ({ sign, value, disabled, onChange, onDelete, onToggle }) => {
  const handleSignChange = (e) => {
    onChange("sign", e.target.value);
  };

  const handleValueChange = (e) => {
    onChange("value", e.target.value);
  };

  return (
    <li>
      <select value={sign} onChange={handleSignChange} disabled={disabled}>
        <option>+</option>
        <option>-</option>
      </select>
      <input
        type="number"
        value={value}
        onChange={handleValueChange}
        disabled={disabled}
      />
      <button className="DeleteButton" onClick={onDelete} disabled={disabled}>
        Delete
      </button>
      <button
        className={`DisableButton ${disabled ? "Enable" : "Disable"}`}
        onClick={onToggle}
      >
        {disabled ? "Enable" : "Disable"}
      </button>
    </li>
  );
};

export default Row;
