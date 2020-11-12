import React from "react"
import "./styles.css"

export default function Table({ data, renderHead, renderItem }) {
  return <table width="100%" cellSpacing={0} cellPadding={0}>
    <thead>
      {renderHead()}
    </thead>
    <tbody>
      {data.map(row => renderItem(row))}
    </tbody>
  </table >
}