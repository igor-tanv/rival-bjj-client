import React, { useState, useRef } from "react"

import useForm from "../../hooks/use-form";

import Dropdown from "../../ui/dropdown"

import TextField from "../../ui/text-field"
import Button from "../../ui/button"

import weightClasses from "../../data/weight-classes.json"
import giScores from "../../data/gi-scores.json"
import nogiScores from "../../data/nogi-scores.json"
import genders from "../../data/genders.json"
import communities from "../../data/communities.json"

import { toValueLabel } from "../../modules/object"
import { isRequired, isValidAge, isPassword, didAgree } from "../../modules/validations";
import { apiFetch } from "../../modules/api-fetch"

import "./styles.css"

// filter out open weight class
const filteredWeightClasses = toValueLabel(weightClasses).filter(obj => obj.value !== "OpenWeight")

const defaultValues = {
  firstName: "",
  lastName: "",
  birthYear: "",
  email: "",
  password: "",
  weightClass: "",
  school: "",
  gender: "",
  avatar: "",
  gi: "",
  nogi: "",
  community: "",
  acceptsTos: false
}

const validations = {
  firstName: [isRequired],
  lastName: [isRequired],
  weightClass: [isRequired],
  community: [isRequired],
  gender: [isRequired],
  gi: [isRequired],
  nogi: [isRequired],
  birthYear: [isValidAge],
  email: [isPassword],
  password: [isPassword],
  school: [isRequired],
  acceptsTos: [didAgree],
}

export default function RegisterForm({ setComplete }) {
  const [values, setValues] = useState(defaultValues)
  const { errors, setErrors, valid, validate } = useForm({
    validations,
    values,
  });
  const fileRef = useRef()

  function imageChanged() {
    const file = fileRef.current && fileRef.current.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function (e) {
      setValues(prev => ({
        ...prev,
        avatar: reader.result
      }))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    apiFetch(`players`, "post", values).then((json) => {
      if (json.errors) {
        const errors = Object.keys(json.errors).reduce((acc, key) => {
          acc[key] = [json.errors[key].message]
          return acc
        }, {})

        setErrors(prev => ({
          ...prev,
          ...errors
        }))
        return
      }
      setComplete(true)
    }).catch(error => {
      debugger
    })
  }

  return <>
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


      <div>
        <label>Avatar</label>
        <div>
          <input type="file" ref={fileRef} onChange={imageChanged} />
        </div>
        {
          values.avatar
            ? <div><img src={values.avatar} alt="" width={100} /> </div >
            : ""
        }
      </div>



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
        validate={() => validate("weightClass", validations["weightClass"])}
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
        validate={() => validate("gender", validations["gender"])}
        label="What is your gender?"
      />

      <Dropdown
        options={toValueLabel(communities)}
        onChange={val => {
          const community = val
          setValues(prev => ({
            ...prev,
            community
          }))
        }}
        value={values.community}
        validate={() => validate("community", validations["community"])}
        label="Select your competition community"
      />
      <p>Dont't see your community? Contact admin@rival-bjj.com and we'll add your community.</p>

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
        validate={() => validate("gi", validations["gi"])}
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
        validate={() => validate("nogi", validations["nogi"])}
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
      <Button type="submit" disabled={!valid()}>Register Your Profile</Button>
    </form>
  </>
}