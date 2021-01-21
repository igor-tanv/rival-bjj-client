import React, { useState } from "react"
import { withRouter } from "react-router-dom"
import Form from "./form"
import { Link } from "react-router-dom";
import Button from "../../ui/button";

function Register({ }) {
  const [complete, setComplete] = useState(false)

  return <div>
    {
      complete ? (<div className="register-notice">
        <h1>Check your email!</h1>
        <p>We just sent you an email at the address you registered. You have <span>24 hours</span> to confirm <span> your email address</span> or your profile will be deleted.
          This is to help prevent spam. Be sure to check your spam, promotions and social email folders for the confirmation email.</p>
        <Link to="/">
          <Button>Home</Button>
        </Link>
      </div>) : <Form setComplete={setComplete} />
    }
  </div >
}

export default withRouter(Register)