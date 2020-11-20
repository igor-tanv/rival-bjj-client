import React, { useState } from "react"

import TextField from "../../ui/text-field"
import Button from "../../ui/button"
import { apiFetch } from "../../modules/api-fetch"

export default function Update({ }) {
  const defaultValues = {
    firstName: ""
  }
  const [complete, setComplete] = useState(false)
  const [values, setValues] = useState(defaultValues)

  function handleSubmit(e) {
    e.preventDefault()
    apiFetch(`update`, "post", values).then((json) => {
      if (json.errors) {
        debugger
        // const errors = Object.keys(json.errors).reduce((acc, key) => {
        //   acc[key] = [json.errors[key].message]
        //   return acc
        // }, {})

        // setErrors(prev => ({
        //   ...prev,
        //   ...errors
        // }))
        //return
      }
      setComplete(true)
    }).catch(error => {
      debugger
    })
  }

  return <div>
    <h1>Update Your Profile</h1>
    <form onSubmit={handleSubmit} autoComplete="off">
      <TextField
        label="First Name"
        value={values.firstName}
        //validate={() => validate("firstName", validations["firstName"])}
        //errors={errors.firstName}
        onChange={val => {
          const firstName = val
          setValues(prev => ({
            ...prev,
            firstName
          }))
        }}
      />
      <Button>Update Your Profile</Button>
    </form>
  </div>
}
