import React from "react"
import Header from "../header"
import Footer from "../footer"

export default function Theme({ children }) {
  return <>
    <Header />
    {children}
    <Footer />
  </>
}