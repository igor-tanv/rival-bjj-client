import React, { useEffect, useState } from "react"
import { Route, withRouter } from "react-router-dom"
import { apiFetch } from "./modules/api-fetch"

function JwtRoute({ history, children, path }) {
  const [valid, setValid] = useState(false)
  useEffect(() => {
    // get the jwt
    const jwt = localStorage.getItem("jwt")
    if (!jwt) history.push("/login")

    apiFetch(`sessions/verify`, "post", { jwt }).then(json => {
      if (json.error) {
        localStorage.setItem("redirectUrl", path)
        history.push("/login")
        return
      }
      setValid(true)
    })
    // verify server response
  }, [])


  return valid && <Route route={path}>{children}</Route>
}

export default withRouter(JwtRoute)