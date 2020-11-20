import React, { useState } from "react"
import qs from "query-string"
import { withRouter } from "react-router-dom"

import TextField from "../../ui/text-field"
import Button from "../../ui/button"
import { apiFetch } from "../../modules/api-fetch"

function ConfirmEmail({ history }) {
  const params = qs.parse(window.location.search)
  const [code, setCode] = useState(params.code)
  const [error, setError] = useState({ code: null })

  function submit(e) {
    e.preventDefault()
    apiFetch(`confirmations`, "post", {
      code,
    }).then(json => {
      if (json.errors) {
        setError(json.errors)
        return
      }
      history.push("/profile")
    })
  }

  return <form onSubmit={submit}>
    <TextField
      value={code}
      onChange={code => setCode(code)}
      placeholder="enter the code we sent to your email"
      errors={[error && error.code]}
    />
    <Button>Verify my account</Button>
  </form>
}
export default withRouter(ConfirmEmail)