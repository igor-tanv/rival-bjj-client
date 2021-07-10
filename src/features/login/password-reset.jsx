import React, { useState } from "react"
import qs from 'query-string';

import { apiFetch } from "../../modules/api-fetch"

import TextField from "../../ui/text-field"
import Button from "../../ui/button"

export default function PasswordReset({ }) {
  const { token, id } = qs.parse(window.location.search);
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  localStorage.setItem("jwt", token)

  async function onSubmit(e) {
    e.preventDefault();
    setError(null)
    apiFetch(`sessions/reset/newPassword`, "post", {
      password, id, token
    }).then(json => {
      if (json.error) {
        setError(json.error)
        setPassword("")
        return
      }
      localStorage.setItem("jwt", json.jwt)
      localStorage.setItem("playerId", json.id)
      const redirectUrl = localStorage.getItem("redirectUrl")
      localStorage.removeItem("redirectUrl")
      window.location = redirectUrl || `/profiles/${id}`
    }).catch(error => {
      setError('Sorry, there was a server error, please contact igor!')
      return
    })
  }

  return (
    <div className='container'>
      <form onSubmit={onSubmit}>
        <p>Enter a New Password</p>
        {
          error ? <span className='error'>{error}</span> :
            <span className='message'>{message}</span>
        }
        <TextField
          type='password'
          label='New Password'
          value={password}
          onChange={(val) => setPassword(val)}
        />
        <Button type='submit' onClick={() => setMessage('Password reset')}>Submit</Button>
      </form>
    </div>
  )
}