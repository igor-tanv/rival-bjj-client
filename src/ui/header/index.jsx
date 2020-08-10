import React from "react"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"

export default function Header() {
  return <div className="header">
    <Navbar bg="primary" variant="dark">
      <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#profile">My Profile</Nav.Link>
        <Nav.Link href="#login">Login</Nav.Link>
        <Nav.Link href="#register">Register</Nav.Link>
        <Nav.Link href="#rules">Rules</Nav.Link>
        <Nav.Link href="#faq">FAQ</Nav.Link>
      </Nav>
    </Navbar>
  </div>
}