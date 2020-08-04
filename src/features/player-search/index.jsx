import React, { useEffect, useState } from "react"
import Dropdown from "react-dropdown"
import 'react-dropdown/style.css';

import { apiFetch } from "../../modules/api-fetch"

const weightClassOptions = {
  Absolute: "Absolute",
  Flyweight: "Flyweight: 57.5 and under",
  Lightweight: "Lightweight: 64.1 - 70",
  Welterweight: "Welterweight: 70.1 - 76",
  Middleweight: "Middleweight: 76.1 - 82.3",
  Cruiserweight: "Cruiserweight: 82.4 - 88.3",
  LightHeavyweight: "Light-Heavyweight: 88.4 - 94.3",
  Heavyweight: "Heavyweight: 94.4 - 100.4",
  SuperHeavyweight: "Super-Heavyweight: 100.5 and over"
}

const giNoGiOptions = {
  nogi: "No Gi",
  gi: "Gi"
}



export default function PlayerSearch({ }) {
  const [players, setPlayers] = useState([])
  const [giNoGi, setGiNoGi] = useState("nogi")
  const [weightClass, setWeightClass] = useState("Absolute")

  useEffect(() => {
    apiFetch("players.json").then(json => setPlayers(json.players))
  }, [])

  function search(players) {
    return filterByWeightClass(sortByGiNoGi(players))
  }

  function sortByGiNoGi(players) {
    return players.sort((a, b) => a[giNoGi] - b[giNoGi])
  }

  function filterByWeightClass(sorted) {
    if (weightClass === "Absolute") return sorted
    return sorted.filter(player => player.weightClass === weightClass)
  }

  const found = search(players)
  return <div>
    <div style={{
      display: "flex"
    }}>
      <Dropdown options={Object.keys(giNoGiOptions).map(value => ({
        value, label: giNoGiOptions[value]
      }))}
        onChange={val => setGiNoGi(val.value)}
        value={giNoGi}
      />
      <Dropdown options={Object.keys(weightClassOptions).map(value => ({
        value, label: weightClassOptions[value]
      }))}
        onChange={val => setWeightClass(val.value)}
        value={weightClass}
      />
    </div>
    <ul>
      {found.length > 0
        ? (found.map(player => {
          const { firstName, lastName, weightClass, wins, losses, draws } = player
          return <li key={player._id}>
            <div style={{ display: "flex" }}>
              <div>{firstName} {lastName}</div>
              <div>{weightClass}</div>
              <div>win: {wins} loss: {losses} draw: {draws}</div>
            </div>
          </li>
        })) : "There are no fighters in that weight class"}

    </ul>
  </div>
}
