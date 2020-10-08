import React from "react"
import DTP from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css"

export default function DateTimePicker({ className, showTimeSelect = false, dateFormat, selected, onChange }) {
  return <DTP
    className={className}
    showTimeSelect={showTimeSelect}
    dateFormat={dateFormat}
    selected={selected}
    onChange={onChange}
  />
}