import React, { useState } from "react"
import { withRouter } from "react-router-dom"
import Form from "./form"


function Register({ }) {
  const [complete, setComplete] = useState(false)

  return <div>
    {
      complete ? (<div>
        <h1>Check your email!</h1>
        <p>We just sent you an email at the address you registered. You have 24 hours to confirm your email address or your profile will be deleted.
          This is to help prevent spam. Be sure to check your spam, promotions and social email folders for the confirmation email.</p>
      </div>) : <Form setComplete={setComplete} />
    }
  </div >
}

export default withRouter(Register)