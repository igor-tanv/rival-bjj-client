import React, { useState } from "react"

import { apiFetch } from "../../modules/api-fetch"

import convertDateToUnix from "../../hooks/convert-date-to-unix"

import DateTimePicker from "../../ui/date-time-picker"
import Button from "../../ui/button";

import ContractUpdate from "./contract-update"

export default function ContractSearch() {

  const [date, setDate] = useState(new Date())
  const [contracts, setContracts] = useState([])

  function handleSubmit(e) {
    e.preventDefault();
    apiFetch(`admin/contracts/${convertDateToUnix(date)}`)
      .then((json) => {
        setContracts(json.contracts)
      })
      .catch((error) => {
        console.log(20, error);
      });
  }

  return <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Match Date and Starting Time</label>
        <DateTimePicker
          className="__rival_text-field-component"
          showTimeSelect
          selected={date}
          dateFormat="MMMM d, yyyy h:mm aa"
          onChange={val => setDate(val)}
        />
      </div>
      <Button type="submit">Search</Button>
    </form>
    {contracts.length ? <ContractUpdate contracts={contracts} /> : 'not found'}
  </div>

}