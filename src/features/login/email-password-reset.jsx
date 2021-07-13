import React, { useState } from "react"

import { apiFetch } from "../../modules/api-fetch"

import TextField from "../../ui/text-field"
import Button from "../../ui/button"

export default function EmailPasswordReset({ }) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  async function onSubmit(e) {
    e.preventDefault();
    setError(null)
    apiFetch(`sessions/reset`, "post", {
      email
    }).then(json => {
      if (json.error) {
        setError(json.error)
        setEmail("")
        return
      }
      setEmail("")
    }).catch(error => {
      setError('Sorry, there was a server error, please contact igor!')
      return
    })
  }

  return (
    <div className='container'>
      <form onSubmit={onSubmit}>
        <p>Enter the email on your account</p>
        {
          error ? <span className='error'>{error}</span> :
            <span className='message'>{message}</span>
        }
        <TextField
          type='text'
          label='Your email'
          value={email}
          onChange={(val) => setEmail(val)}
        />
        <Button type='submit' onClick={() => setMessage('Check your email for the password reset, it may be in your spam')}>Send</Button>
      </form>
    </div>
  )
}