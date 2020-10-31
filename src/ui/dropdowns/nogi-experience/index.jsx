import React from "react"
import Dropdown from "react-dropdown"
import 'react-dropdown/style.css';

export const nogiExperienceOptions = {
  1200: "White",
  1425: "Blue",
  1650: "Purple",
  1875: "Brown",
  2101: "Black",
  0: "I will not compete in No-Gi"
}

export default function NoGiExperienceDropdown({ value, setValue }) {
  return <Dropdown options={
    Object.keys(nogiExperienceOptions).map(value => ({
      value, label: nogiExperienceOptions[value]
    }))
  }
    onChange={val => setValue(val.value)}
    value={value}
  />
}
