import React from "react"

function toSentence(camelCase) {
  const result = camelCase.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}

export default function Contracts({ contracts }) {
  return <table>
    <thead>
      <tr>
        {Object.keys(contracts[0]).map(key => <td style={{
          border: "1px solid black"
        }}>{toSentence(key)}</td>)}
      </tr>
    </thead>
    <tbody>
      {contracts.map(contract => <tr>
        <td>{contract.result}</td>
        <td>{contract.type}</td>
        <td>{contract.opponent.firstName} {contract.opponent.lastName}</td>
        <td>{contract.method}</td>
      </tr>)}
    </tbody>
  </table>
}