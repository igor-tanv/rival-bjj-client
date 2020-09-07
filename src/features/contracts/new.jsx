import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import DateTimePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment"

import ContractNote from "./notes/contract-note"
import FeeNote from "./notes/fee-note"
import { apiFetch } from "../../modules/api-fetch"
import TextField from "../../ui/text-field"

import GiNoGiDropdown, { giNoGiOptions } from "../../ui/dropdowns/ginogi"
import WeightClassDropdown, { weightClassOptions } from "../../ui/dropdowns/weight-class"

const defaultValues = {
  playerId: "",
  opponentId: "",
  dateTime: new Date(),
  weightClass: Object.values(weightClassOptions)[0],
  location: "",
  refereeFirstName: "",
  refereeLastName: "",
  rules: Object.values(giNoGiOptions)[0],
  playerComments: ""
}

function IssueContract({ match }) {
  const [values, setValues] = useState(defaultValues)
  const [opponent, setOpponent] = useState({ firstName: "", lastName: "" })

  useEffect(() => {
    apiFetch(`players/${match.params.id}`).then(json => setOpponent(json.player))
  }, [])

  return <div>
    <h1>Challenge Contract</h1>
    <h3>You are challenging {opponent.firstName} {opponent.lastName} to a match!</h3>

    <ContractNote />

    <form onSubmit={e => e.preventDefault()}>

      <div>
        <label>Match type</label>
        <GiNoGiDropdown value={values.rules} setValue={(val) => {

          setValues(prev => ({
            ...prev, rules: val
          }))
        }} />
      </div>

      <div>
        <label>Match Date and Starting Time</label>
        <DateTimePicker
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          selected={values.dateTime}
          onChange={val => {
            const dateTime = val

            if (moment(new Date()) > moment(val)) {
              alert("You cant select a time in the past")
              return
            }

            setValues(prev => ({
              ...prev,
              dateTime
            }))
          }}
        />
      </div>

      <div>
        <label>Weight class</label>
        <WeightClassDropdown value={values.weightClass} setValue={(val) => {
          setValues(prev => ({
            ...prev, weightClass: val
          }))
        }} />
      </div>

      <div>
        <label>Match Location</label>
        <TextField
          placeholder="Enter the School Name"
          value={values.location}
          onChange={val => {
            const location = val
            setValues(prev => ({
              ...prev,
              location
            }))
          }}
        />

      </div>

      <div>
        <label>Referee First Name</label>
        <TextField
          value={values.refereeFirstName}
          onChange={val => {
            const refereeFirstName = val
            setValues(prev => ({
              ...prev,
              refereeFirstName
            }))
          }}
        />
      </div>

      <div>
        <label>Referee Last Name</label>
        <TextField
          value={values.refereeLastName}
          onChange={val => {
            const refereeLastName = val
            setValues(prev => ({
              ...prev,
              refereeLastName
            }))
          }}
        />
      </div>

      <div>
        <label>Comments</label>

        <textarea value={values.playerComments} onChange={e => {
          const playerComments = e.target.value
          setValues(prev => ({
            ...prev,
            playerComments
          }))
        }} />
      </div>
    </form>
    <FeeNote />
  </div>
}

export default withRouter(IssueContract)