import React, { useState } from "react";
import Row from "./Row";

//stylesheet
import "./Calculator.scss";

//assets
import warning from "../assets/warning.png";

const Calculator = () => {
  const [rows, setRows] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleAddRow = () => {
    setRows([...rows, { sign: "+", value: 0, disabled: false }]);
  };

  const handleDeleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const handleToggleRow = (index) => {
    const newRows = [...rows];
    newRows[index].disabled = !newRows[index].disabled;
    setRows(newRows);
  };

  const handleRowChange = (index, property, value) => {
    const newRows = [...rows];
    newRows[index][property] = value;
    setRows(newRows);
  };

  const calculateResult = () => {
    if (rows.length === 0) {
      return null;
    }

    let sum = 0;

    rows.forEach((row) => {
      if (!row.disabled) {
        const value = parseInt(row.value);
        if (!isNaN(value)) {
          sum += row.sign === "+" ? value : -value;
        }
      }
    });
    return sum;
  };

  const handleReset = () => {
    setShowModal(true);
  };

  const confirmReset = () => {
    setRows([]);
    setShowModal(false);
  };

  const cancelReset = () => {
    setShowModal(false);
  };

  return (
    <div className="wrapper">
      <div className="RowButtonContainer">
        <button onClick={handleAddRow}>+ Add row</button>
        {rows.length !== 0 ? (
          <button onClick={handleReset} className="ResetButton">
            Clear all
          </button>
        ) : null}
      </div>
      {rows.length === 0 ? (
        <div className="EmptyRows">No rows found.</div>
      ) : (
        <ul className="CalcRow">
          {rows.map((row, index) => (
            <Row
              key={index}
              sign={row.sign}
              value={row.value}
              disabled={row.disabled}
              onChange={(property, value) =>
                handleRowChange(index, property, value)
              }
              onDelete={() => handleDeleteRow(index)}
              onToggle={() => handleToggleRow(index)}
            />
          ))}
        </ul>
      )}
      {rows.length !== 0 && !isNaN(calculateResult()) && (
        <div class="ResultContauiner">
          Result: <span>{calculateResult()}</span>
        </div>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <img className="warning" src={warning} alt="" />
            <h3>Are you sure you want to clear all?</h3>
            <div className="modal-buttons">
              <button className="confirm" onClick={confirmReset}>
                Yes
              </button>
              <button className="reject" onClick={cancelReset}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;
