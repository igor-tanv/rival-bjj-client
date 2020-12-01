import React from "react"
import { Link } from "react-router-dom"
import "./styles.css"


export default function Header() {
  return <header className="header">

    <div className="container">
      <ul className="horizontal-list">
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
    </div >


  </header >
}