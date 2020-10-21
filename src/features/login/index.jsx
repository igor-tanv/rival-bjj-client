import React, { useState } from "react"

export default function Login({ }) {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  async function login({ username, password }) {
    await new Promise((resolve, reject) =>
      setTimeout(() => {
        if (username === 'username' && password === 'password')
          resolve();
        else reject();
      }, 1000),
    );
  }

  // how do we extract login info from e.target and pass to login function? 
  async function onSubmit(e) {
    e.preventDefault();
    try {
      await login({});
    } catch (error) { }
  }


  return (
    <div className='login-container'>
      <form onSubmit={onSubmit}>
        <p>Login</p>
        <input
          type='text'
          placeholder='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type='text'
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Log in</button>
      </form>
    </div>
  )
}