import React from "react"
import "./styles.css"

export default function TextField({ value, onChange, placeholder }) {
  return <input
    className="__text-field-component"
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={e => onChange(e.target.value)}
  />
}