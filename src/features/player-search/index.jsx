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
  NoGi: "No Gi",
  Gi: "Gi"
}

function search(players) {
  return filterByWeightClass(filterByGoNoGi(players))
}

function filterByGoNoGi(players) {
  return players
}

function filterByWeightClass(players) {
  return players
}

export default function PlayerSearch({ }) {
  const [players, setPlayers] = useState([])
  const [giNoGi, setGiNoGi] = useState(null)

  useEffect(() => {
    apiFetch("players.json").then(json => setPlayers(json.players))
  }, [])


  return <div>
    <div style={{
      display: "flex"
    }}>
      <Dropdown options={Object.keys(giNoGiOptions).map(value => ({
        value, label: giNoGiOptions[value]
      }))}

      />

      <Dropdown options={Object.keys(weightClassOptions).map(value => ({
        value, label: weightClassOptions[value]
      }))} />
    </div>
    <ul>
      {search(players).map(player => {
        const { firstName, lastName, weightClass, win, loss, draw } = player
        return <li>
          <div style={{ display: "flex" }}>
            <div>{firstName} {lastName}</div>
            <div>{weightClass}</div>
            <div>win: {win} loss: {loss} draw: {draw}</div>
          </div>
        </li>
      })}
    </ul>
  </div>
}