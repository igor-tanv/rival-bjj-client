import React from "react"

import Dropdown from "react-dropdown"
import 'react-dropdown/style.css'

export const genderOptions = {
  M: "Male",
  F: "Female"
}

export default function GenderDropdown({ value, setValue }) {
  return <Dropdown options={Object.keys(genderOptions).map(value => ({
    value, label: genderOptions[value]
  }))}
    onChange={val => setValue(val.value)}
    value={value}
  />
}