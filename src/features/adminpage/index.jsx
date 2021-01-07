import React, { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"
import { apiFetch } from "../../modules/api-fetch"
import { Redirect } from "react-router-dom"

function Admin() {

  const [admin, setAdmin] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    (async () => {
      const { player } = await apiFetch(`players/${localStorage.getItem("playerId")}`)
      setAdmin(player)
      setLoaded(true)
    })()
  }, [])

  if (!loaded) {
    return "Loading..."
  }

  if (!admin.isAdmin) {
    return <Redirect to="/" />
  }

  return <div>
    <pre>{JSON.stringify(admin, null, 4)}</pre>
  </div>
}

export default withRouter(Admin)