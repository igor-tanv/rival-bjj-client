import React from "react"
import "./styles.css"

export default function Button({ children, disabled = false, type = "button", onClick }) {
  return <button onClick={onClick} disabled={disabled} className="__rival_button">{children}</button>
}