import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import Button from "../../../ui/button";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="header">
      <div onClick={() => setShowMenu(true)} className="menu-icon">
        <img src="/assets/images/category.png" className="menu-icon"></img>
      </div>
      <div className="header-title">Rival</div>
      <div className="logo">
        <Link to="/">
          <img src="/assets/rating-stars/100.png" className="logo"></img>
        </Link>
      </div>

      {showMenu ? (
        <>
          {" "}
          <div
            className="screen-wrapper"
            onClick={() => setShowMenu(false)}
          ></div>
          <div className="menu-popup">
            <div className="close-wrapper">
              <Link onClick={() => setShowMenu(false)}>
                <img src="/assets/images/close.png" className="close-btn" />
              </Link>
            </div>
            <div className="menu-wrapper" onClick={() => setShowMenu(false)}>
              <Link to="/" className="menu-item">
                Home
              </Link>
              {localStorage.getItem("jwt") ? (
                <Link to="/profile" className="menu-item">
                  My Profile
                </Link>
              ) : null}
              <Link to="/rules" className="menu-item">
                Rules
              </Link>
              <Link to="/faq" className="menu-item">
                FAQ
              </Link>
            </div>
            <div className="bottom-wrapper" onClick={() => setShowMenu(false)}>
              {localStorage.getItem("jwt") ? (
                <>
                  <div
                    onClick={() => {
                      localStorage.removeItem("jwt");
                      window.location = "/";
                    }}
                  >
                    <Button isSecondary={true}>Logout</Button>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button>Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button isSecondary={true}>Register</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
