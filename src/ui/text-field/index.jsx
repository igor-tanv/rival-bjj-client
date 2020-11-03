import React, { useState, useRef } from "react"
import "./styles.css"

export default function TextField({
  type = "text",
  value,
  errors = [],
  validate = () => { },
  onChange = () => { },
  placeholder,
  label
}) {
  const [dirty, setDirty] = useState(false)
  const [focused, setFocused] = useState(false);
  const ref = useRef(null)

  return <div className={`__rival_text-field ${focused ? 'is-focused' : ''}
      ${value ? 'has-value' : ''}`}>
    <div className="control">
      <label onClick={() => ref.current.focus()}>{label}</label>
      <input
        ref={ref}
        className="__rival_text-field-component"
        type={type}
        placeholder={placeholder}
        value={value}
        onFocus={() => {
          setDirty(true)
          setFocused(true)
        }}
        onBlur={() => {
          validate()
          setFocused(false)
        }}
        onChange={e => onChange(e.target.value)}

      />
      {errors && dirty ? <div className="errors">{errors.join(", ")}</div> : null}
    </div>
  </div>
}