import React from "react"
import moment from "moment"

import ContractNote from "./notes/contract-note"
import FeeNote from "./notes/fee-note"

import DateTimePicker from "../../ui/date-time-picker"
import Dropdown from "../../ui/dropdown"
import TextField from "../../ui/text-field"
import TextArea from "../../ui/text-area"
import Button from "../../ui/button"
import { toValueLabel } from "../../modules/object"



export default function Form({
  opponent,
  handleSubmit,
  values,
  setValues,
  matchTypes,
  weightClasses,
  validations,
  validate,
  errors,
  valid }) {

  return <>
    <h3>You are challenging {opponent.firstName} {opponent.lastName} to a match!</h3>

    <ContractNote />

    <form onSubmit={handleSubmit}>

      <div>
        <label>Match type</label>
        <Dropdown
          options={toValueLabel(matchTypes)}
          onChange={(val) => {
            setValues(prev => ({
              ...prev, rules: val
            }))
          }}
          value={values.rules} />
      </div>

      <div>
        <label>Match Date and Starting Time</label>
        <DateTimePicker
          className="__rival_text-field-component"
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          selected={values.startsAt}
          onChange={val => {
            const startsAt = val
            if (moment(new Date()) > moment(val)) {
              alert("You cant select a time in the past")
              return
            }
            setValues(prev => ({
              ...prev,
              startsAt
            }))
          }}
        />
      </div>


      <Dropdown
        options={toValueLabel(weightClasses)}
        onChange={val => {
          const weightClass = val
          setValues(prev => ({
            ...prev,
            weightClass
          }))
        }}
        value={values.weightClass}
        label="Select your competition weight class"
      />


      <TextField
        label="Enter the School Name"
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


      <TextField
        label="Enter Referee Name"
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

      <div>
        <label>Request Rule Exceptions</label>
        <TextArea
          value={values.ruleExceptions}
          onChange={val => {
            const ruleExceptions = val
            setValues(prev => ({
              ...prev,
              ruleExceptions
            }))
          }}
          placeholder="e.g. No Heel Hooks" />
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
  </>
}