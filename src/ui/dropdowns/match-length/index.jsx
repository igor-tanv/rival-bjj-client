import React from "react"
import Dropdown from "react-dropdown"
import 'react-dropdown/style.css';

export const matchLengthOptions = {
  Six: "6 minutes",
  Eight: "8 minutes",
  Ten: "10 minutes"
}

export default function MatchLengthDropdown({ value, setValue }) {
  return <Dropdown options={
    Object.keys(matchLengthOptions).map(value => ({
      value, label: matchLengthOptions[value]
    }))
  }
    onChange={val => setValue(val.value)}
    value={value}
  />
}