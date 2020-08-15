import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"


import { apiFetch } from "../../modules/api-fetch"

import GiNoGiDropdown, { giNoGiOptions } from "../../ui/dropdowns/ginogi"
import WeightClassDropdown, { weightClassOptions } from "../../ui/dropdowns/weight-class"

export default function PlayerSearch({ }) {
  const [players, setPlayers] = useState([])
  const [giNoGi, setGiNoGi] = useState(Object.keys(giNoGiOptions)[0])
  const [weightClass, setWeightClass] = useState(Object.keys(weightClassOptions)[0])

  useEffect(() => {
    apiFetch("players").then(json => setPlayers(json.players))
  }, [])

  function search(players) {
    return filterByWeightClass(sortByGiNoGi(players))
  }

  function sortByGiNoGi(players) {
    return players.sort((a, b) => b[giNoGi] - a[giNoGi])
  }

  function filterByWeightClass(sorted) {
    if (weightClass === "OpenWeight") return sorted
    return sorted.filter(player => player.weightClass === weightClass)
  }

  const found = search(players)
  return <div>
    <div style={{
      display: "flex"
    }}>
      <GiNoGiDropdown value={giNoGi} setValue={setGiNoGi} />
      <WeightClassDropdown value={weightClass} setValue={setWeightClass} />

    </div>
    <ul>
      {found.length > 0
        ? (found.map(player => {
          const { _id, firstName, lastName, weightClass, wins, losses, draws } = player
          return <li key={player._id}>
            <Link to={`/profiles/${_id}`}>
              <div style={{ display: "flex" }}>
                <div>{firstName} {lastName}</div>
                <div>{weightClass}</div>
                <div>win: {wins} loss: {losses} draw: {draws}</div>
              </div>
            </Link>
          </li>
        })) : "There are no fighters in that weight class"}

    </ul>
  </div>
}
