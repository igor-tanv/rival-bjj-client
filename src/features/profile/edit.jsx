import React, { useEffect, useState } from "react"

import { apiFetch } from "../../modules/api-fetch"

import Form from "../register/form"

export default function Update({ }) {

  const [player, setPlayer] = useState({})
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    apiFetch(`players/${localStorage.getItem("playerId")}`).then(json => {
      setPlayer(json.player)
    })
  }, [])

  return <div>

    <Form setComplete={setComplete} />

  </div >

}
