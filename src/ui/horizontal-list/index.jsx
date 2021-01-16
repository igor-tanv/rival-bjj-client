import React from "react"
import "./styles.css"

export default function HorizontalList({ items, renderItem, active = null }) {
  return <div className="horizontal">

    {items.map(item => <>{renderItem(item)}</>)}
  </div>
}