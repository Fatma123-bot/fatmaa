// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaHome,
  FaHistory,
  FaBell,
  FaCogs,
  FaSignOutAlt,
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ isSidebarOpen }) => {
  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <h2 className="sidebar-title">🛠️ Dashboard</h2>
      <nav className="sidebar-nav">
        <NavLink to="/" className="sidebar-link">
          <FaHome className="sidebar-icon" />
          Accueil
        </NavLink>
        <NavLink to="/historique" className="sidebar-link">
          <FaHistory className="sidebar-icon" />
          Historique
        </NavLink>
        <NavLink to="/alertes" className="sidebar-link">
          <FaBell className="sidebar-icon" />
          Alertes
        </NavLink>
        <NavLink to="/parametres" className="sidebar-link">
          <FaCogs className="sidebar-icon" />
          Paramètres
        </NavLink>
      </nav>
      <div className="sidebar-footer">
        <button className="sidebar-link logout">
          <FaSignOutAlt className="sidebar-icon" />
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Sidebar;









