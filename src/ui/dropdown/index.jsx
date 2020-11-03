import React from "react"

import ReactDropdown from "react-dropdown"
import 'react-dropdown/style.css'

export default function Dropdown({ options, value, onChange }) {

  return <ReactDropdown options={options}
    onChange={option => onChange(option.value)}
    value={value}
  />
}
