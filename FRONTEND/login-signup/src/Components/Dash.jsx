import React, { useState } from 'react';
import './Dash.css';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import Dashboard from './Dashboard/Dashboard';

function Dash() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app">
      <Header toggleSidebar={toggleSidebar} />
      <div className="content-container">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <Dashboard />
        </main>
      </div>
    </div>
  );
}

export default Dash;