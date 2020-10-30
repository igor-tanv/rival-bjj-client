import React, { useEffect, useState } from "react"
import { Route, withRouter } from "react-router-dom"
import { apiFetch } from "./modules/api-fetch"

function JwtRoute({ history, children, path }) {
  const [valid, setValid] = useState(false)

  useEffect(() => {
    const prevPath = window.location.pathname
    console.dir(prevPath)
    // get the jwt
    const jwt = localStorage.getItem("jwt")
    if (!jwt) history.push("/login")

    apiFetch(`sessions/verify`, "post", { jwt }).then(json => {
      if (json.error) {
        console.dir(json.error)
        localStorage.clear()
        localStorage.setItem("redirectUrl", prevPath)

        history.push("/login")
        return
      }
      setValid(true)
    })
    // verify server response
  }, [])


  return valid && <Route path={path}>{children}</Route>
}

export default withRouter(JwtRoute)