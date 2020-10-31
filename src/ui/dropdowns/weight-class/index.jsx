import React from "react"
import Dropdown from "react-dropdown"
import 'react-dropdown/style.css';

export const weightClassOptions = {
  OpenWeight: "Open Weight",
  Flyweight: "Flyweight: 57.5 and under",
  Lightweight: "Lightweight: 64.1 - 70",
  Welterweight: "Welterweight: 70.1 - 76",
  Middleweight: "Middleweight: 76.1 - 82.3",
  Cruiserweight: "Cruiserweight: 82.4 - 88.3",
  LightHeavyweight: "Light-Heavyweight: 88.4 - 94.3",
  Heavyweight: "Heavyweight: 94.4 - 100.4",
  SuperHeavyweight: "Super-Heavyweight: 100.5 and over"
}

export default function WeightClassDropdown({ value, setValue }) {
  return <Dropdown options={
    Object.keys(weightClassOptions).map(value => ({
      value, label: weightClassOptions[value]
    }))
  }
    onChange={val => setValue(val.value)}
    value={value}
  />
}
