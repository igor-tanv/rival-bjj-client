import React, { useState, useEffect } from "react"
import { apiFetch } from "../../modules/api-fetch"
import Contract from "./contract"

export default function Contracts() {
  const [contracts, setContracts] = useState([])

  useEffect(() => {

    apiFetch(`contracts?player_id=${localStorage.getItem("playerId")}`).then(json => {
      setContracts(json.contracts)
    })
  }, [])

  return <div>
    <h1>My contracts</h1>

    <ul>
      <li>Sent</li>
      <li>Received</li>
      <li>Declined</li>
      <li>Pending</li>
    </ul>

    {contracts.map(contract => <Contract {...contract} />)}

  </div>
}