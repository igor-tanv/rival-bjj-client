import React from 'react';
import DateTimePicker from '../../ui/date-time-picker';
import weightClasses from '../../data/weight-classes.json';
import matchTypes from '../../data/match-types.json';
import './styles.css';

const getWeightClass = (cls) => {
  return weightClasses[cls].substr(0, weightClasses[cls].indexOf(':'));
};

const renderResultClass = (result) => {
  switch(result) {
    case 'win':
      return 'result-win';
    case 'loss':
      return 'result-loss';
    case 'draw':
      return 'result-draw';
    default:
      return '';
  }
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
            <div className="row-container">
              <div className="col-head">Opponent Name</div>
              <div className="col-head">Method</div>
            </div>
          </td>
          <td>
            <div className="row-container">
              <div className="col-head">Date</div>
              <div className="col-head">Type</div>
            </div>
          </td>
          <td className="col-head">W. Class:</td>
        </tr>
      </thead>
      <tbody>
        {contracts.map((contract, i) => (
          <tr key={i}>
            <td>
              {
                <div className={`result-win margin-auto ${renderResultClass(contract.result)}`}>{contract.result}</div>}
            </td>
            <td>
              <div className="row-container">
                <div className="first-row long-info-row text-truncation">
                  {playerId === contract.playerId
                    ? `${contract.opponentFirstName} ${contract.opponentLastName}`
                    : `${contract.playerFirstName} ${contract.playerLastName}`}
                </div>
                <div className="second-row long-info-row text-truncation">
                  {matchTypes[contract.type]})
                </div>
              </div>
            </td>
            <td>
              <div className="row-container">
                <div className="first-row">
                  <DateTimePicker
                    className="react-datepicker-no-border"
                    dateFormat="MMMM d, yyyy"
                    selected={contract.startsAt}
                    readOnly
                  />
                </div>
                <div className="second-row">{contract.method}</div>
              </div>
            </td>
            <td>{getWeightClass(contract.weightClass)}</td>
          </tr>
        ))}

      </tbody>
    </table>
  );
}

// <tr key="2">
//           <td>
//             <div className="result-loss margin-auto">loss</div>
//           </td>
//           <td>
//             <div className="row-container">
//               <div className="first-row text-truncation">Cameron Willson</div>
//               <div className="second-row text-truncation">Decision (split)</div>
//             </div>
//           </td>
//           <td>
//             <div className="row-container">
//               <div className="first-row text-truncation">Oct 20, 2020</div>
//               <div className="second-row text-truncation">Fighting</div>
//             </div>
//           </td>
//           <td>
//             <div className="first-row text-truncation">Heavy</div>
//           </td>
//         </tr>
//         <tr key="3">
//           <td>
//             <div className="result-draw margin-auto">draw</div>
//           </td>
//           <td>
//             <div className="row-container">
//               <div className="first-row text-truncation long-info-row">Wade Warren</div>
//               <div className="second-row text-truncation long-info-row">Decision (split)</div>
//             </div>
//           </td>
//           <td>
//             <div className="row-container">
//               <div className="first-row text-truncation">Oct 20, 2020</div>
//               <div className="second-row text-truncation">Fighting</div>
//             </div>
//           </td>
//           <td>
//             <div className="first-row text-truncation-second-line">Heavy</div>
//           </td>
//         </tr>
// <tr key="1">
// <td>
//   <div className="result-win margin-auto">Win</div>
// </td>
// <td>
//   <div className="row-container">
//     <div className="first-row long-info-row text-truncation">
//       Jacob T. Jones
//     </div>
//     <div className="second-row long-info-row text-truncation">
//       TKO (punches)
//     </div>
//   </div>
// </td>
// <td>
//   <div className="row-container">
//     <div className="first-row">Oct 20, 2020</div>
//     <div className="second-row">Fighting</div>
//   </div>
// </td>
// <td>
//   <div className="first-row text-truncation-second-line weight-info-row">
//     Heavy
//   </div>
// </td>
// </tr>