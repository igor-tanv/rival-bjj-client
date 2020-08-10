import React from "react"

import Dropdown from "react-dropdown"
import 'react-dropdown/style.css'

export const giNoGiOptions = {
  nogi: "No Gi",
  gi: "Gi"
}

export default function GiNoGi({ value, setValue }) {



  return <Dropdown options={Object.keys(giNoGiOptions).map(value => ({
    value, label: giNoGiOptions[value]
  }))}
    onChange={val => setValue(val.value)}
    value={value}
  />
}