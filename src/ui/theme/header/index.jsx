import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import Button from '../../../ui/button';

export default function Header() {

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="header">
      <Link onClick={() => setShowMenu(true)} className="menu-icon"><img src="assets/images/category.png" className="menu-icon"></img></Link>
      <div className="header-title">Rival</div>
      <img src="assets/rating-stars/100.png" className="logo"></img>
      {showMenu ? (
        <>
          {' '}
          <div className="screen-wrapper"></div>
          <div className="menu-popup" onClick={() => setShowMenu(false)}>
            <div className="close-wrapper">
              <Link onClick={() => setShowMenu(false)}><img src="assets/images/close.png" className="close-btn" /></Link>
            </div>
            <div className="menu-wrapper">
              <Link to="/" className="menu-item">
                Home
              </Link>
              {localStorage.getItem('jwt') ? (
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
            <div className="bottom-wrapper">
              {localStorage.getItem('jwt') ? (
                <>
                  <div
                    onClick={() => {
                      localStorage.removeItem('jwt');
                      window.location = '/';
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
