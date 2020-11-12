import React, { useState, useEffect } from "react"
import { apiFetch } from "../../modules/api-fetch"
import HoriztonalList from "../../ui/horizontal-list"
import ContractTable from "../../ui/table"
import Button from "../../ui/button"
import "./styles.css"

export default function Contracts() {
  const [contracts, setContracts] = useState([])
  const filters = ["All", "Sent", "Received", "Declined", "Accepted"]
  const [filter, setFilter] = useState(filters[0])
  const [openDetails, setOpenDetails] = useState(false)
  const [selectedContract, setSelectedContract] = useState(null)

  useEffect(() => {
    apiFetch(`contracts?playerId=${localStorage.getItem("playerId")}`).then(json => {
      setContracts(json.contracts)
    })
  }, [])

  function accept() {
    apiFetch(`contracts/${selectedContract.id}/accept`, "post").then(json => {
      updateContractStatus(json.contract.status)
    })
  }

  function decline() {
    apiFetch(`contracts/${selectedContract.id}/decline`, "post").then(json => {
      updateContractStatus(json.contract.status)
    })
  }

  function updateContractStatus(status) {
    setContracts(prev =>
      prev.map(contract => contract.id === selectedContract.id
        ? ({
          ...contract,
          status: status
        })
        : contract
      )
    )
    setSelectedContract(null)
    setOpenDetails(false)
  }

  function filterBy(contracts) {
    if (filter === "All") return contracts
    return contracts.filter(contract => {
      console.dir(contract.status)
      if (filter === "Sent" && localStorage.getItem("playerId") === contract.playerId && contract.status === "sent")
        return contract
      if (filter === "Received" && localStorage.getItem("playerId") !== contract.playerId && contract.status === "sent")
        return contract
      if (filter === "Declined" && contract.status === "declined")
        return contract
      if (filter === "Accepted" && contract.status === "accepted")
        return contract

    })
  }

  return <div>
    <h1>My contracts</h1>

    <HoriztonalList
      items={filters}
      renderItem={(item) => <span className={filter === item && "active"} onClick={() => setFilter(item)}>{item}</span>}
    />


    <ContractTable data={filterBy(contracts)} renderHead={() => {
      return <tr>
        <th>Result</th>
        <th>Match type</th>
        <th>Opponent</th>
        <th>Method</th>
        <th></th>
      </tr>
    }} renderItem={(contract) => {
      return <tr>
        <td>{contract.result}</td>
        <td>{contract.type}</td>
        <td>{contract.opponentFirstName} {contract.opponentLastName}</td>
        <td>{contract.method}</td>
        <td>{
          filter === "Received" && <a onClick={() => {
            setSelectedContract(contract)
            setOpenDetails(true)
          }}>See details</a>
        }</td>
      </tr>
    }} />

    <div style={{
      position: "absolute",
      top: "1rem",
      width: "60%",
      zIndex: 100,
      borderRadius: "0.25rem",
      backgroundColor: "white",
      display: openDetails ? "block" : "none",
      border: "1px solid black",
      padding: "2rem",
    }}>

      <div>{selectedContract && selectedContract.playerFirstName} vs. {selectedContract && selectedContract.opponentFirstName}</div>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, voluptatem maxime nam quaerat ut iure sit quam recusandae doloribus voluptas dignissimos quis illo, placeat esse veniam aliquam, quasi nostrum cumque?</p>

      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum blanditiis sapiente, sunt sint animi reiciendis ratione quisquam labore maiores nam aperiam dolorem vero et quibusdam similique enim praesentium aliquid fuga.</p>

      <button type="primary" onClick={accept}>Accept</button>
      <button type="secondary" onClick={decline}>Decline</button>
      <a onClick={() => setOpenDetails(false)}>Cancel, and close</a>

    </div>

    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      display: openDetails ? "block" : "none",
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: "rgba(0,0,0,0.8)",
      zIndex: 99
    }} />

  </div>
}