import React, { useEffect, useState } from "react"

import { apiFetch } from "../../modules/api-fetch"

import Form from "../profile/form"

export default function Update({ }) {

  const [player, setPlayer] = useState()

  useEffect(() => {
    apiFetch(`players/${localStorage.getItem("playerId")}`).then(json => {
      setPlayer(json.player)
    })
  }, [])

  return <div>

    {player ? <Form player={player} /> : "loading"}

  </div >

}
