import React, { useState, useEffect } from "react"
import { apiFetch } from "../../modules/api-fetch"
import Contract from "./contract"
import HoriztonalList from "../../ui/horizontal-list"

export default function Contracts() {
  const [contracts, setContracts] = useState([])
  const filters = ["Sent", "Received", "Declined", "Pending"]

  useEffect(() => {
    apiFetch(`contracts?playerId=${localStorage.getItem("playerId")}`).then(json => {

      setContracts(json.contracts)
    })
  }, [])

  function filterBy(type) {
    console.dir("filtering by " + type)
    return filters
  }

  return <div>
    <h1>My contracts</h1>

    <HoriztonalList
      items={filters}
      renderItem={(item) => <li onClick={() => filterBy(item)}>{item}</li>}
    />


    {contracts.map(contract => <Contract {...contract} />)}

  </div>
}