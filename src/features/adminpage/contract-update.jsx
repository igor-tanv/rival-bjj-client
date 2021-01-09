import React, { useEffect, useState } from "react"


import { apiFetch } from "../../modules/api-fetch"

import DateTimePicker from "../../ui/date-time-picker"
import Button from "../../ui/button";

export default function ContractUpdate() {

  const [date, setDate] = useState({})

  function handleSubmit(e) {
    e.preventDefault();
    apiFetch(`contracts/${date}`)
      .then((json) => {
        console.log(17, json)
      })
      .catch((error) => {
        console.log(20, error);
      });
  }



  //need to see selected date value, see form.jsx in contracts for reference 
  return <form onSubmit={handleSubmit}>
    <div>
      <label>Match Date and Starting Time</label>
      <DateTimePicker
        className="__rival_text-field-component"
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
        onChange={val => {
          setDate(val)
        }}
      />
    </div>
    <Button type="submit">Search</Button>
  </form>
}