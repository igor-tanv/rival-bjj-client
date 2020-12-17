import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import Button from '../../../ui/button';

export default function Header() {
  const showMenu = true;
  return (
    <div className="header">
      <img src="assets/images/category.png" className="menu-icon"></img>
      <div className="header-title">Rival</div>
      <img src="assets/rating-stars/100.png" className="logo"></img>
      {showMenu ? (
        <>
          {' '}
          <div className="screen-wrapper"></div>
          <div className="menu-popup">
            <div className="close-wrapper">
              <img src="assets/images/close.png" className="close-btn" />
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
