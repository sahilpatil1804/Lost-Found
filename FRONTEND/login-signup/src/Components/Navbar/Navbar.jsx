import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileReportOpen, setIsMobileReportOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close report dropdown when main menu is toggled
    setIsMobileReportOpen(false);
  };

  const toggleMobileReport = () => {
    setIsMobileReportOpen(!isMobileReportOpen);
  };

  return (
    <header className="header-navbar">
      <Link to="/" className="logo-navbar">
        Lost & Found
      </Link>

      {/* Mobile Menu Toggle */}
      <div 
        className="mobile-menu-toggle" 
        onClick={toggleMobileMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={`navbar ${isMobileMenuOpen ? 'active' : ''}`}>
        <Link to="/home" className="nav-link" onClick={toggleMobileMenu}>Home</Link>

        {/* Dropdown Menu */}
        <div 
          className={`dropdown ${isMobileReportOpen ? 'mobile-active' : ''}`}
        >
          <span 
            className="dropbtn" 
            onClick={toggleMobileReport}
          >
            Report
          </span>
          <ul className="dropdown-content">
            <li>
              {isAuthenticated ? (
                <Link 
                to="/report-lost-item" 
                className="dropdown-link"
                onClick={toggleMobileMenu}
              >
                Lost Item
              </Link>
              ):(
                <Link 
                to="/" 
                className="dropdown-link"
                onClick={toggleMobileMenu}
              >
                Lost Item
              </Link>
              )}
            </li>
            <li>
              {isAuthenticated ? (
                <Link 
                to="/report-found-item" 
                className="dropdown-link"
                onClick={toggleMobileMenu}
              >
                Found Item
              </Link>
              ):(
                <Link 
                to="/" 
                className="dropdown-link"
                onClick={toggleMobileMenu}
              >
                Found Item
              </Link>
              )}
            </li>
          </ul>
        </div>
        <div 
          className={`dropdown ${isMobileReportOpen ? 'mobile-active' : ''}`}
        >
          <span 
            className="dropbtn" 
            onClick={toggleMobileReport}
          >
            Browse
          </span>
          <ul className="dropdown-content">
            <li>
              {isAuthenticated ? (
                <Link 
                to="/browse-lost-items" 
                className="dropdown-link"
                onClick={toggleMobileMenu}
              >
                Lost Item
              </Link>
              ):(
                <Link 
                to="/" 
                className="dropdown-link"
                onClick={toggleMobileMenu}
              >
                Lost Item
              </Link>
              )}
            </li>
            <li>
              {isAuthenticated ? (
                <Link 
                to="/browse-found-items" 
                className="dropdown-link"
                onClick={toggleMobileMenu}
              >
                Found Item
              </Link>
              ):(
                <Link 
                to="/" 
                className="dropdown-link"
                onClick={toggleMobileMenu}
              >
                Found Item
              </Link>
              )}
            </li>
          </ul>
        </div>
        {isAuthenticated ? (<Link to="/dashboard" className="nav-link" onClick={toggleMobileMenu}>Dashboard</Link>) : (<Link to="/" className="nav-link" onClick={toggleMobileMenu}>Dashboard</Link>)}
        {isAuthenticated ? ( <Link to="/logout" className="nav-link" onClick={()=>dispatch(logout())}>Log Out</Link>):( <Link to="/" className="nav-link" onClick={toggleMobileMenu}>Log In</Link>)}
      </nav>
    </header>
  );
};

export default Navbar;