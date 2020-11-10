import React from "react";

export default function Contract({
  playerId,
  playerFirstName,
  playerLastName,
  opponentFirstName,
  opponentLastName,
  type,
  ruleExceptions,
  datetime,
  weightClass,
}) {
  return <div className="contract">
    <div>{playerFirstName}</div>
    <div>{playerLastName}</div>
  </div>
}
