import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import Dropdown from "../../ui/dropdown"

import { apiFetch } from "../../modules/api-fetch"
import { toValueLabel } from "../../modules/object"

import weightClasses from "../../data/weight-classes.json"
import matchTypes from "../../data/match-types.json"
import communities from "../../data/communities.json"

import Button from "../../ui/button"
import Banner from "../../ui/banner"

export default function PlayerSearch({ }) {
  const [players, setPlayers] = useState([])
  const [giNoGi, setGiNoGi] = useState(Object.keys(matchTypes)[0])
  const [weightClass, setWeightClass] = useState(Object.keys(weightClasses)[0])
  const [community, setCommunity] = useState(Object.keys(communities)[0])

  useEffect(() => {
    apiFetch("players").then(json => setPlayers(json.players))
  }, [])

  function search(players) {
    return sortByWeightClass(sortByGiNoGi(sortByCommunity(players)))
  }

  function sortByCommunity(players) {
    return players.filter(player => player.community === community)
  }

  function sortByGiNoGi(playersSortedByGiNoGi) {
    return playersSortedByGiNoGi.sort((a, b) => b[giNoGi] - a[giNoGi])
  }

  function sortByWeightClass(communityPlayersSortedByGiNoGi) {
    if (weightClass === "OpenWeight") return communityPlayersSortedByGiNoGi
    return communityPlayersSortedByGiNoGi.filter(player => player.weightClass === weightClass)
  }

  const found = search(players)
  return <div>
    <Banner/>
    <div style={{
      display: "flex"
    }}>
      <Dropdown options={toValueLabel(communities)} onChange={setCommunity} value={community} />
      <Dropdown options={toValueLabel(matchTypes)} onChange={setGiNoGi} value={giNoGi} />
      <Dropdown options={toValueLabel(weightClasses)} onChange={setWeightClass} value={weightClass} />
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
                <Button>Primary</Button>
              </div>
            </Link>
          </li>
        })) : "There are no fighters in that weight class"}

    </ul>
  </div>
}
