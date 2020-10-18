import React, { useState } from "react"
import "./styles.css"

export default function TextField({
  value,
  errors = [],
  validate = () => { },
  onChange = () => { },
  placeholder,

}) {
  const [dirty, setDirty] = useState(false)
  return <div className="__rival_text-field">
    <input
      className="__rival_text-field-component"
      type="text"
      placeholder={placeholder}
      value={value}
      onFocus={() => setDirty(true)}
      onBlur={validate}
      onChange={e => onChange(e.target.value)}
    />
    {errors && dirty ? <div className="errors">{errors.join(", ")}</div> : null}
  </div>
}