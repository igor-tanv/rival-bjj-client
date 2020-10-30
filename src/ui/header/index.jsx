import React from "react"
import { Link } from "react-router-dom"


export default function Header() {
  return <div className="header">

    <div className="container">
      <ul className="horizontal">
        <li><Link to="/">Home</Link></li>
        {
          localStorage.getItem("jwt")
            ? <>
              <li><a onClick={
                () => {
                  localStorage.removeItem("jwt")
                  window.location = "/"
                }
              }>Log out</a></li>
              <li><Link to="/profile">My Profile</Link></li>
            </>
            : <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
        }

        <li><Link to="/rules">Rules</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
      </ul>
    </div>


  </div >
}