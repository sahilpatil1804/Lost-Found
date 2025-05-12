import React from 'react';
import './Sidebar.css';
import { 
  FaTimes, FaHome, FaHistory, FaInbox, 
  FaPaperPlane, FaComments, FaUserEdit, 
  FaCog, FaQuestionCircle, FaSignOutAlt 
} from 'react-icons/fa';
import { Link , useNavigate} from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2>Menu</h2>
        <button className="close-button" onClick={toggleSidebar}>
          <FaTimes />
        </button>
      </div>
      <div className="sidebar-content">
        <nav className="sidebar-menu">
          <ul>
            <li className={isActive('/dashboard') ? 'active' : ''} onClick={()=>navigate('/dashboard')}>
                <FaHome className="menu-icon" />
                <span>Dashboard</span>
          
            </li>
            <li>
              <FaHistory className="menu-icon" />
              <span>History</span>
            </li>
            <li className={isActive('/dashboard/incoming') ? 'active' : ''} onClick={()=>navigate('/dashboard/incoming')}>
              <FaInbox className="menu-icon" />
              <span>Incoming Requests</span>
              <span className="menu-badge">3</span>
            </li>
            <li className={isActive('/dashboard/outgoing') ? 'active' : ''} onClick={()=>navigate('/dashboard/outgoing')}>
              <FaPaperPlane className="menu-icon" />
              <span>Outgoing Requests</span>
            </li>
            <li>
              <FaComments className="menu-icon" />
              <span>Chats</span>
              <span className="menu-badge">5</span>
            </li>
            <li>
              <FaUserEdit className="menu-icon" />
              <span>Edit Profile</span>
            </li>
            <li>
              <FaCog className="menu-icon" />
              <span>Settings</span>
            </li>
            <li>
              <FaQuestionCircle className="menu-icon" />
              <span>Help & Support</span>
            </li>
          </ul>
        </nav>
      </div>
      <div className="sidebar-footer">
        <button className="logout-button">
          <FaSignOutAlt className="menu-icon" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;