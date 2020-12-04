import React, { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"
import { apiFetch } from "../../modules/api-fetch"

import PlayerProfile from "./profile"

function Profile({ match }) {

  const [player, setPlayer] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    apiFetch(`players/${match.params.id || localStorage.getItem("playerId")}`).then(json => {
      setPlayer(json.player)
      setLoaded(true)
    })
  }, [])

  return <div>
    {
      loaded ? (<PlayerProfile {...player} />) : "loading.."
    }
  </div>
}

export default withRouter(Profile)