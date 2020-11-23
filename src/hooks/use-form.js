import { useState } from "react"

export default function useForm({ validations, values }) {

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

  return {
    errors,
    setErrors,
    valid,
    validate
  }
}