import React, { useState } from "react"
import { withRouter } from "react-router-dom"
import Dropdown from "../../ui/dropdown"
import { apiFetch } from "../../modules/api-fetch"
import TextField from "../../ui/text-field"
import Button from "../../ui/button"


//new
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
  avatar: "",
  acceptsTos: false
}

function Register({ registration }) {
  const [values, setValues] = useState(defaultValues)

  const validations = {
    firstName: [isRequired],
    lastName: [isRequired],
    birthDate: [isRequired],
    email: [isPassword],
    password: [isPassword],
    school: [isRequired],
    avatar: [isRequired],
    acceptsTos: [didAgree],
  }

  const [errors, setErrors] = useState(Object.keys(validations).reduce((acc, key) => {
    acc[key] = null
    return acc
  }, {}))

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
    apiFetch(`players`, "post", values).then(json => {
    }).catch(error => {
      debugger
    })
  }

  return <div>
    <h1>Competitor Registration</h1>

    <form onSubmit={handleSubmit} autoComplete="off">

      <div>
        <label>First Name</label>
        <TextField
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
      </div>

      <div>
        <label>Last Name</label>
        <TextField
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
      </div>


      <div>
        <label>Year of Birth</label>
        <TextField
          className="__rival_text-field-component"

          selected={values.birthYear}
          onChange={birthYear => setValues(prev => ({
            ...prev,
            birthYear
          }))}
        />
      </div>

      <div>
        <label>Email</label>
        <TextField
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
      </div>

      <div>
        <label>Password</label>
        <TextField
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
      </div>

      <div>
        <label>Competitor Weight Class</label>
        <Dropdown options={filteredWeightClasses}
          onChange={val => {
            const weightClass = val
            setValues(prev => ({
              ...prev,
              weightClass
            }))
          }}
          value={values.weightClass}
        />
      </div>

      <div>
        <label>Gender</label>
        <Dropdown options={toValueLabel(genders)}
          onChange={val => {
            const gender = val
            setValues(prev => ({
              ...prev,
              gender
            }))
          }}
          value={values.gender}
        />
      </div>

      <div>
        <label>Gi experience</label>
        <Dropdown options={toValueLabel(giScores)}
          onChange={val => {
            const gi = val
            setValues(prev => ({
              ...prev,
              gi
            }))
          }}
          value={values.gi}
        />
      </div>

      <div>
        <label>NoGi experience</label>
        <Dropdown options={toValueLabel(nogiScores)}
          onChange={val => {
            const nogi = val
            setValues(prev => ({
              ...prev,
              nogi
            }))
          }}
          value={values.nogi}
        />
      </div>

      <div>
        <label>School Name</label>
        <TextField
          placeholder="Enter Your School Name"
          value={values.location}
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

      </div>




      <div>
        <label>Avatar</label>
        <TextField
          value={values.avatar}
          validate={() => validate("avatar", validations["avatar"])}
          errors={errors.avatar}
          onChange={val => {
            const avatar = val
            setValues(prev => ({
              ...prev,
              avatar
            }))
          }}
        />
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
      I have read and agree to follow these <a href=""> rules</a>
        </label>
      </div>
      <Button disabled={!valid()}>Register Your Profile</Button>
    </form>


  </div>
}

export default withRouter(Register)