import React, { useState } from "react"
import { apiFetch } from "../../modules/api-fetch"

export default function Login({ }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  async function onSubmit(e) {
    e.preventDefault();
    setError(null)
    apiFetch("sessions", "POST", {
      email, password
    }).then(json => {
      if (json.error) {
        setError(json.error)
        setEmail("")
        setPassword("")
        return
      }
      localStorage.setItem("jwt", json.jwt)
      localStorage.setItem("playerId", json.id)
      const redirectUrl = localStorage.getItem("redirectUrl")
      localStorage.removeItem("redirectUrl")
      window.location = redirectUrl || `/profiles/${json.id}`
    }).catch(error => {
      setError("Sorry, there was a server error, please contact igor!")

      return
    })
  }


  return (
    <div className='login-container'>
      <form onSubmit={onSubmit}>
        <p>Login</p>
        {error && <span className="error">{error}</span>}
        <input
          type='text'
          placeholder='Your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type='password'
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Log in</button>
      </form>
    </div>
  )
}