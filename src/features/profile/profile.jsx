import React from "react"
import Contracts from "./contracts"

export default function Profile(props) {
  return <div>
    <div>Fighter name: {props.firstName} {props.lastName}</div>
    ...

    <Contracts contracts={props.contracts} />
  </div>
}