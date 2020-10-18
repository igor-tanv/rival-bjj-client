import React from "react"
import "./styles.css"

export default function Button({ children, disabled = false, type = "button" }) {
  return <button disabled={disabled} className="__rival_button">{children}</button>
}