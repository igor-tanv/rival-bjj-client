import React, { useState } from "react"
import { withRouter } from "react-router-dom"
import Form from "./form"


function Register({ }) {
  const [complete, setComplete] = useState(false)

  return <div>

    {
      complete ? (<div>
        <h1>Check your email!</h1>
        <p>We just sent you an email at the address you registered. This is to help prevent spam. Please click the link inside of that email to continue.</p>
      </div>) : <Form setComplete={setComplete} />
    }
  </div >
}

export default withRouter(Register)