import React from "react"
import { withRouter } from "react-router-dom"
import Contracts from "./contracts"
import { apiFetch } from "../../modules/api-fetch"

function deletePlayer(playerId) {
  apiFetch(`players/${localStorage.getItem("playerId")}`, 'delete', { playerId }).then((json) => {
    if (!json.errors) {
      localStorage.removeItem("jwt")
      window.location = "/"
      return
    }
  }).catch(error => {
    debugger
  })
}

function Profile({ history, _id, avatar, lastName, firstName, wins, losses, draws, school, gi, nogi, weightClass, qualityRating, contracts }) {

  return <div>
    <div>Name: {firstName} {lastName}</div>
    <div>Fight Record (W/L/D): {wins}/{losses}/{draws}</div>
    <div>School: {school}</div>
    <div>Gi Rank: {gi}</div>
    <div>No Gi Rank: {nogi}</div>
    <div>Weight: {weightClass}</div>
    <div>Quality Rating: {qualityRating} / 5</div>

    {avatar ? <div><img src={avatar} alt="" /></div> : <div><img src={process.env.PUBLIC_URL + '/cover.jpg'} alt="" /></div>}

    {localStorage.getItem("playerId") !== _id && <button onClick={() => history.push(`/contracts/new/${_id}`)}>Issue Challenge</button>}
    {localStorage.getItem("playerId") !== _id && <button onClick={() => history.push(`/chat/${_id}`)}>Chat</button>}


    {localStorage.getItem("playerId") === _id && <button onClick={() => history.push(`/contracts`)}>My Contracts</button>}
    {localStorage.getItem("playerId") === _id && <button onClick={() => history.push(`/profile/edit`)}>Update My Profile</button>}
    {localStorage.getItem("playerId") === _id && <button onClick={() => deletePlayer(localStorage.getItem("playerId"))}>Delete</button>}
    <h3>Match history</h3>
    {
      contracts.length > 0 ? <Contracts contracts={contracts} /> : "This fighter has not fought yet"
    }
  </div >
}


export default withRouter(Profile)