import React from "react"
import Header from "./header"
import Footer from "./footer"

import "./styles.css"

export default function Theme({ children }) {
  return <div>
    <Header />
    <div className="__rival_container">
      {children}
    </div>
    <Footer />
  </div>
}