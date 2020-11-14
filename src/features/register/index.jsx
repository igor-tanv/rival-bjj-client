import React, { useState } from "react"
import { withRouter } from "react-router-dom"
import Dropdown from "../../ui/dropdown"
import { apiFetch } from "../../modules/api-fetch"
import TextField from "../../ui/text-field"
import Button from "../../ui/button"

import "./styles.css"

import weightClasses from "../../data/weight-classes.json"
import giScores from "../../data/gi-scores.json"
import nogiScores from "../../data/nogi-scores.json"
import genders from "../../data/genders.json"

import { toValueLabel } from "../../modules/object"

function isRequired(v) {
  return v && v.length > 0 ? null : "is required"
}

function atLeast(v, n) {
  return v && v.length >= n ? null : `must be at least ${n} characters`
}

function hasSpecial(v) {
  return v && new RegExp(/[\*\@\!\-]/g).test(v) ? null : `must have at least 1 special character (*@-!)`
}

function isPassword(v) {
  const errors = [
    hasSpecial(v),
    atLeast(v, 7)
  ].filter(error => error)

  return errors.length <= 0 ? null : errors.join(", ")
}

function didAgree(checked) {
  return checked ? null : "must be agreed to"
}

// filter out open weight class
const filteredWeightClasses = toValueLabel(weightClasses).filter(obj => obj.value !== "OpenWeight")

// NOTE: Add community tab 
const defaultValues = {
  firstName: "",
  lastName: "",
  birthYear: "",
  email: "",
  password: "",
  weightClass: "",
  school: "",
  gender: "",
  gi: "",
  nogi: "",
  acceptsTos: false
}

function Register({ registration }) {

  const [values, setValues] = useState(defaultValues)


  const validations = {
    firstName: [isRequired],
    lastName: [isRequired],
    birthYear: [isRequired],
    email: [isPassword],
    password: [isPassword],
    school: [isRequired],
    acceptsTos: [didAgree],
  }

  const [errors, setErrors] = useState(Object.keys(validations).reduce((acc, key) => {
    acc[key] = null
    return acc
  }, {}))

  function valid() {
    const errors = Object.keys(validations).flatMap(key => validations[key].map(v => v(values[key])))

    return errors.every(e => e === null)
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
    apiFetch(`players`, "post", values).then(json => {
    }).catch(error => {
      debugger
    })
  }

  return <div>
    <h1>Competitor Registration</h1>
    <form onSubmit={handleSubmit} autoComplete="off">
      <TextField
        label="First Name"
        value={values.firstName}
        validate={() => validate("firstName", validations["firstName"])}
        errors={errors.firstName}
        onChange={val => {
          const firstName = val
          setValues(prev => ({
            ...prev,
            firstName
          }))
        }}
      />

      <TextField
        label="Last Name"
        value={values.lastName}
        validate={() => validate("lastName", validations["lastName"])}
        errors={errors.lastName}
        onChange={val => {
          const lastName = val
          setValues(prev => ({
            ...prev,
            lastName
          }))
        }}
      />

      <TextField
        label="Year of Birth"
        value={values.birthYear}
        validate={() => validate("birthYear", validations["birthYear"])}
        errors={errors.birthYear}
        onChange={birthYear => setValues(prev => ({
          ...prev,
          birthYear
        }))}
      />

      <TextField
        label="Email"
        autoComplete="off"
        type="email"
        value={values.email}
        validate={() => validate("email", validations["email"])}
        errors={errors.email}
        onChange={val => {
          const email = val
          setValues(prev => ({
            ...prev,
            email
          }))
        }}
      />


      <TextField
        label="Password"
        type="password"
        autoComplete="off"
        value={values.password}
        validate={() => validate("password", validations["password"])}
        errors={errors.password}
        onChange={val => {
          const password = val
          setValues(prev => ({
            ...prev,
            password
          }))
        }}
      />


      <Dropdown
        options={filteredWeightClasses}
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


      <Dropdown
        options={toValueLabel(genders)}
        onChange={val => {
          const gender = val
          setValues(prev => ({
            ...prev,
            gender
          }))
        }}
        value={values.gender}
        label="What is your gender?"
      />


      <Dropdown
        options={toValueLabel(giScores)}
        onChange={val => {
          const gi = val
          setValues(prev => ({
            ...prev,
            gi
          }))
        }}
        value={values.gi}
        label="Select your Gi experience"
      />

      <Dropdown
        options={toValueLabel(nogiScores)}
        onChange={val => {
          const nogi = val
          setValues(prev => ({
            ...prev,
            nogi
          }))
        }}
        value={values.nogi}
        label="Select your No Gi experience"
      />

      <TextField
        label="Enter Your School Name"
        value={values.school}
        validate={() => validate("school", validations["school"])}
        errors={errors.school}
        onChange={val => {
          const school = val
          setValues(prev => ({
            ...prev,
            school
          }))
        }}
      />

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
      I have read and agree to follow these <a href=""> rules</a>
        </label>

      </div>
      <Button disabled={!valid()}>Register Your Profile</Button>
    </form>


  </div >
}

export default withRouter(Register)