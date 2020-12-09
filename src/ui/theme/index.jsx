import React from "react"
import Header from "./header"
import Footer from "./footer"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css"

export default function Theme({ children }) {
  return <div>
    <Header />
    <div className="container p-4">
      {children}
    </div>
    <Footer />
  </div>
}