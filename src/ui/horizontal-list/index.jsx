import React from "react"
import "./styles.css"

export default function HorizontalList({ items, renderItem, active = null }) {
  return <ul className="horizontal">

    {items.map(item => <li>{renderItem(item)}</li>)}
  </ul>
}