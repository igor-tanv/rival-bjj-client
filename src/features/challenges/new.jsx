import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import ChallengeNote from "./note"
import { apiFetch } from "../../modules/api-fetch"

import GiNoGiDropdown, { giNoGiOptions } from "../../ui/dropdowns/ginogi"
import WeightClassDropdown, { weightClassOptions } from "../../ui/dropdowns/weight-class"

const defaultValues = {
  matchType: Object.values(giNoGiOptions)[0],
  weightClass: Object.values(weightClassOptions)[0],
  location: ""
}

function IssueChallenge({ match }) {
  const [values, setValues] = useState(defaultValues)
  const [opponent, setOpponent] = useState({ firstName: "", lastName: "" })

  useEffect(() => {
    apiFetch(`players/${match.params.id}`).then(json => setOpponent(json.player))
  }, [])

  return <div>
    <h1>Challenge Contract</h1>
    <h3>You are challenging {opponent.firstName} {opponent.lastName} to a match!</h3>

    <ChallengeNote />

    <form onSubmit={e => e.preventDefault()}>

      <div>
        <label>Match type</label>
        <GiNoGiDropdown value={values.matchType} setValue={(val) => {

          setValues(prev => ({
            ...prev, matchType: val
          }))
        }} />
      </div>

      <div>
        <label>Weight class</label>
        <WeightClassDropdown value={values.weightClass} setValue={(val) => {

          setValues(prev => ({
            ...prev, weightClass: val
          }))
        }} />
      </div>

      <div>
        <label>Match location</label>
        <input type="text" value={values.location} onChange={e => {
          const location = e.target.value
          setValues(prev => ({
            ...prev,
            location
          }))
        }} />
      </div>

    </form>

  </div>

}

export default withRouter(IssueChallenge)