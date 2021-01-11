import React from "react";

import DateTimePicker from "../../ui/date-time-picker";

import weightClasses from "../../data/weight-classes.json";
import matchTypes from "../../data/match-types.json";

import "./styles.css";

const getWeightClass = (cls) => {
  return weightClasses[cls].substr(0, weightClasses[cls].indexOf(":"));
};

export default function Contracts({ playerId, contracts }) {
  return (
    <table className="table-match-history">
      <thead>
        <tr>
          <td>Result:</td>
          <td>Type:</td>
          <td>Opponent Name:</td>
          <td>Method:</td>
          <td>Date:</td>
          <td>Weight Class:</td>
        </tr>
      </thead>
      <tbody>
        {contracts.map((contract, i) => (
          <tr key={i}>
            <td>{contract.result}</td>
            <td>{matchTypes[contract.type]}</td>
            <td>
              {playerId === contract.playerId
                ? `${contract.opponentFirstName} ${contract.opponentLastName}`
                : `${contract.playerFirstName} ${contract.playerLastName}`}
            </td>
            <td>{contract.method}</td>
            <td>
              <DateTimePicker
                className="react-datepicker-no-border"
                dateFormat="MMMM d, yyyy"
                selected={contract.startsAt * 1000}
                readOnly
              />
            </td>
            <td>{getWeightClass(contract.weightClass)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
