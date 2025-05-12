import React from 'react';
import './Header.css';
import { FaBars, FaBell, FaEnvelope, FaUser } from 'react-icons/fa';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-button" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <h1 className="logo">FinderKeeper</h1>
      </div>
      <div className="header-right">
        <button className="icon-button">
          <FaBell />
          <span className="notification-badge">3</span>
        </button>
        <button className="icon-button">
          <FaEnvelope />
          <span className="notification-badge">5</span>
        </button>
        <div className="user-profile">
          <div className="user-avatar" style={{height: "35px", width: "35px"}} >
            <FaUser />
          </div>
          <span className="user-name" style={{color: "white"}}>John Doe</span>
        </div>
      </div>
    </header>
  );
};

export default Header;