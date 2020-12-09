import React from "react"
import Header from "./header"
import Footer from "./footer"

import "./styles.css"

export default function Theme({ children }) {
  return <div>
    <Header />
    <div className="container">
      {children}
    </div>
    <Footer />
  </div>
}