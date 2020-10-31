import React from "react"
import Dropdown from "react-dropdown"
import 'react-dropdown/style.css';

export const giExperienceOptions = {
  1200: "Under 1 Year",
  1425: "Between 1-2 Years",
  1650: "Between 2-3 Years",
  1875: "Between 3-5 Years",
  2101: "Over 5 years",
  0: "I will not compete in Gi"
}

export default function GiExperienceDropdown({ value, setValue }) {
  return <Dropdown options={
    Object.keys(giExperienceOptions).map(value => ({
      value, label: giExperienceOptions[value]
    }))
  }
    onChange={val => setValue(val.value)}
    value={value}
  />
}
