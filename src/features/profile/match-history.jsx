import React from 'react';
import DateTimePicker from '../../ui/date-time-picker';
import weightClasses from '../../data/weight-classes.json';
import matchTypes from '../../data/match-types.json';
import './styles.css';

const getWeightClass = (cls) => {
  if (cls === 'OpenWeight') return 'Open Weight'
  return weightClasses[cls].substr(0, weightClasses[cls].indexOf(':'));
};

const renderResultClass = (contract, playerId) => {
  if (contract.result === 'draw') return 'result-draw'
  if (((contract.result === 'win') && (contract.playerId === playerId)) || ((contract.result === 'loss') && (contract.opponentId === playerId))) return 'result-win'
  return 'result-loss'
};

const renderResult = (contract, playerId) => {
  if (contract.result === 'draw') return 'Draw'
  if (contract.result === 'pending') return 'Pending'
  if (((contract.result === 'win') && (contract.playerId === playerId)) || ((contract.result === 'loss') && (contract.opponentId === playerId))) return 'Win'
  return 'Loss'
}

export default function Contracts({ playerId, contracts }) {
  return (
    <table className="table-match-history">
      <thead>
        <tr>
          <td>
            <div className="col-head result-head">Result</div>
          </td>
          <td>
            <div className="col-head">Opponent Name</div>
          </td>
          <td>
            <div className="row-container">
              <div className="col-head">Date</div>
              <div className="col-head">Type</div>
            </div>
          </td>
          <td className="col-head">Method</td>
          <td className="col-head">W. Class</td>
        </tr>
      </thead>
      <tbody>
        {contracts.map((contract, i) => (
          <tr key={i}>
            <td>
              {
                <div
                  className={`result-win margin-auto ${renderResultClass(
                    contract, playerId
                  )}`}
                >
                  {renderResult(contract, playerId)}
                </div>
              }
            </td>
            <td>
              <div className="row-container">
                <div className="first-row text-truncation-second-line">
                  {playerId === contract.playerId
                    ? `${contract.opponentFirstName} ${contract.opponentLastName}`
                    : `${contract.playerFirstName} ${contract.playerLastName}`}
                </div>
              </div>
            </td>
            <td>
              <div className="row-container">
                <div className="first-row text-truncation">
                  <DateTimePicker
                    className="react-datepicker-no-border"
                    dateFormat="MMMM d, yyyy"
                    selected={contract.startsAt * 1000}
                    readOnly
                  />
                </div>
                <div className="second-row text-truncation">
                  {contract.method}
                </div>
              </div>
            </td>
            <td>
              <div className="single-row text-truncation-second-line">
                {matchTypes[contract.type]}
              </div>
            </td>
            <td className="single-row text-truncation-second-line">{getWeightClass(contract.weightClass)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
