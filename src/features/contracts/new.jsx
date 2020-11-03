import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import moment from "moment"

import ContractNote from "./notes/contract-note"
import FeeNote from "./notes/fee-note"

import DateTimePicker from "../../ui/date-time-picker"
import Dropdown from "../../ui/dropdown"
import TextField from "../../ui/text-field"
import TextArea from "../../ui/text-area"
import Button from "../../ui/button"

import { apiFetch } from "../../modules/api-fetch"
import { toValueLabel } from "../../modules/object"

import weightClasses from "../../data/weight-classes.json"
import matchTypes from "../../data/match-types.json"

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
  weightClass: Object.values(weightClasses)[0],
  location: "",
  refereeName: "",
  rules: Object.values(matchTypes)[0],
  playerComments: "",
  acceptsTos: false
}

function IssueContract({ match }) {
  const [values, setValues] = useState({
    ...defaultValues, playerId: localStorage.getItem("playerId"), opponentId: match.params.id
  })
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
    }).catch(error => {
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
        <Dropdown options={toValueLabel(matchTypes)} onChange={(val) => {

          setValues(prev => ({
            ...prev, rules: val
          }))
        }} value={values.rules} />
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
        <Dropdown options={toValueLabel(weightClasses)} onChange={(val) => {
          setValues(prev => ({
            ...prev, weightClass: val
          }))
        }} value={values.weightClass} />
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

        <TextArea value={values.playerComments} onChange={val => {
          const playerComments = val
          setValues(prev => ({
            ...prev,
            playerComments
          }))
        }} />
      </div>
      <div>
        <label htmlFor="">
          <input
            type="checkbox" onChange={(e) => {
              const acceptsTos = e.target.checked
              setValues(prev => ({
                ...prev, acceptsTos
              }))
            }}
            value={values.acceptsTos} />
      I have <a href="">read and accept the match rules</a>
        </label>
      </div>
      <Button disabled={!valid()}>Send Contract to Opponent</Button>
    </form>
    <FeeNote />


  </div>
}

export default withRouter(IssueContract)