import React from "react"
import "./styles.css"

export default function TextArea({ value, onChange, placeholder }) {
  return <textarea
    className="__text-field-component"
    placeholder={placeholder}
    value={value}
    onChange={e => onChange(e.target.value)}
  />
}