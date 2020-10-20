import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import DateTimePicker from "../../ui/date-time-picker"
import moment from "moment"

import ContractNote from "./notes/contract-note"
import FeeNote from "./notes/fee-note"
import { apiFetch } from "../../modules/api-fetch"
import TextField from "../../ui/text-field"
import TextArea from "../../ui/text-area"
import Button from "../../ui/button"

import GiNoGiDropdown, { giNoGiOptions } from "../../ui/dropdowns/ginogi"
import WeightClassDropdown, { weightClassOptions } from "../../ui/dropdowns/weight-class"


function isRequired(v) {
  return v && v.length > 0 ? null : "is required"
}

function didAgree(checked) {
  return checked ? null : "must be agreed to"
}

const defaultValues = {
  playerId: "",
  opponentId: "",
  dateTime: new Date(),
  weightClass: Object.values(weightClassOptions)[0],
  location: "",
  refereeName: "",
  rules: Object.values(giNoGiOptions)[0],
  playerComments: "",
  acceptsTos: false
}

function IssueContract({ match }) {
  const [values, setValues] = useState({ ...defaultValues, opponentId: match.params.id })
  const [opponent, setOpponent] = useState({ firstName: "", lastName: "" })

  const validations = {
    location: [isRequired],
    refereeName: [isRequired],
    acceptsTos: [didAgree]
  }

  const [errors, setErrors] = useState(Object.keys(validations).reduce((acc, key) => {
    acc[key] = null
    return acc
  }, {}))

  useEffect(() => {
    apiFetch(`players/${match.params.id}`).then(json => setOpponent(json.player))
  }, [])


  function valid() {
    return Object.keys(validations).flatMap(key => validations[key].map(v => v(values[key]))).every(e => e === null)
  }

  function validate(key, validations) {
    const errors = validations.map(v => v(values[key]))
    setErrors(prev => ({
      ...prev,
      [key]: errors
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    apiFetch(`contracts`, "post", values).then(json => {
      debugger
    })
  }

  return <div>
    <h1>Challenge Contract</h1>
    <h3>You are challenging {opponent.firstName} {opponent.lastName} to a match!</h3>

    <ContractNote />

    <form onSubmit={handleSubmit}>

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
          className="__rival_text-field-component"
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
          validate={() => validate("location", validations["location"])}
          errors={errors.location}
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
        <label>Referee Name</label>
        <TextField
          value={values.refereeName}
          validate={() => validate("refereeName", validations["refereeName"])}
          errors={errors.refereeName}
          onChange={val => {
            const refereeName = val
            setValues(prev => ({
              ...prev,
              refereeName
            }))
          }}
        />
      </div>

      <div>
        <label>Comments</label>

        <TextArea value={values.playerComments} onChange={e => {
          const playerComments = e.target.value
          setValues(prev => ({
            ...prev,
            playerComments
          }))
        }} />
      </div>
      <div>
        <label htmlFor="">
          <input type="checkbox" onChange={(e) => {
            const acceptsTos = e.target.checked
            setValues(prev => ({
              ...prev, acceptsTos
            }))
          }} value={values.acceptsTos} />
      I have <a href="">read and accept the match rules</a>
        </label>
      </div>
      <Button disabled={!valid()}>Send Contract to Opponent</Button>
    </form>
    <FeeNote />


  </div>
}

export default withRouter(IssueContract)