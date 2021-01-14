import React, { useState } from "react"

import { apiFetch } from "../../modules/api-fetch"

import Button from "../../ui/button";
import ContractTable from '../../ui/table'
import Dropdown from "../../ui/dropdown"
import TextField from "../../ui/text-field"

import HorizontalList from "../../ui/horizontal-list"

export default function ContractUpdate(contractObj) {

  const { contracts } = contractObj

  const [contractId, setContractId] = useState('')
  const [winner, setWinner] = useState('')
  const [method, setMethod] = useState('')
  const [redRating, setRedRating] = useState('na')
  const [blueRating, setBlueRating] = useState('na')
  const [refereeComments, setrefereeComments] = useState('')

  const winnerOptions = ["red", "blue", "draw", "cancelled"]
  const winMethod = ["Sub", "Points", "DQ", "Forfeit", "Injury", "Advantage"]
  const qualityRating = ["1", "2", "3", "4", "5", "na"]

  // post 
  function handleSubmit(e) {
    e.preventDefault();
    apiFetch(`admin/contracts/update/${contractId}`, "POST",
      {
        contractId, winner, method, redRating, blueRating, refereeComments
      })
      .then((json) => {
        console.log(29, json)
      })
      .catch((error) => {
        console.log(20, error);
      });
  }

  function renderContracts(contract) {
    return <form onSubmit={handleSubmit}>
      <tr>
        <th>Winner</th>
        <th>Method</th>
        <th>Location</th>
        <th>Match type</th>
        <th>Red Corner</th>
        <th>Red QR</th>
        <th>Blue Corner</th>
        <th>Blue QR</th>
        <th>Referee Comments</th>
        <th></th>
      </tr>
      <td>
        <Dropdown
          options={winnerOptions}
          onChange={setWinner}
          value={winner}
        />
      </td>
      <td>
        <Dropdown
          options={winMethod}
          onChange={setMethod}
          value={method}
        />
      </td>
      <td>{contract.location}</td>
      <td>{contract.type}</td>
      <td>{contract.playerFirstName} {contract.playerLastName}</td>
      <td>
        <Dropdown
          options={qualityRating}
          onChange={setRedRating}
          value={redRating}
        />
      </td>
      <td>{contract.opponentFirstName} {contract.opponentLastName}</td>
      <td>
        <Dropdown
          options={qualityRating}
          onChange={setBlueRating}
          value={blueRating}
        />
      </td>
      <td>
        <TextField
          value={refereeComments}
          onChange={(val) => setrefereeComments(val)}
        />
      </td>

      <Button type="submit" onClick={() => setContractId(contract.id)}>Submit Result</Button>
    </form>
  }

  return <HorizontalList
    items={contracts}
    renderItem={renderContracts}
  />

}

{/* <ContractTable
      data={contracts}
      renderHead={() => {
        return (
          <tr>
            <th>Winner</th>
            <th>Method</th>
            <th>Location</th>
            <th>Match type</th>
            <th>Red Corner</th>
            <th>Red QR</th>
            <th>Blue Corner</th>
            <th>Blue QR</th>
            <th>Referee Comments</th>
            <th></th>
          </tr>
        );
      }}
      renderItem={(contract) => {
        return (
          <form onSubmit={handleSubmit}>
            <td>
              <Dropdown
                options={winnerOptions}
                onChange={setWinner}
                value={winner}
              />
            </td>
            <td>
              <Dropdown
                options={winMethod}
                onChange={setMethod}
                value={method}
              />
            </td>
            <td>{contract.location}</td>
            <td>{contract.type}</td>
            <td>{contract.playerFirstName} {contract.playerLastName}</td>
            <td>
              <Dropdown
                options={qualityRating}
                onChange={setRedRating}
                value={redRating}
              />
            </td>
            <td>{contract.opponentFirstName} {contract.opponentLastName}</td>
            <td>
              <Dropdown
                options={qualityRating}
                onChange={setBlueRating}
                value={blueRating}
              />
            </td>
            <td>
              <TextField
                value={refereeComments}
                onChange={setrefereeComments}
              />
            </td>

            <Button type="submit" onClick={() => setContractId(contract.id)}>Submit Result</Button>
          </form>
        );
      }}
    />
  </> */}