import React from 'react';
import './Topbar.css';
import { FaBars } from 'react-icons/fa';

// Logo depuis le dossier public
const logo = '/Image4.png';

const Topbar = ({ toggleSidebar }) => {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-button" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <img src={logo} alt="Logo" className="topbar-logo" />
      </div>
      <div className="topbar-center">
        <h1 className="topbar-title">Dashboard Production</h1>
      </div>
      <div className="topbar-right">
        <img
          src="/suso.png" 
          alt="Profil"
          className="avatar"
        />
      </div>
    </header>
  );
};

export default Topbar;
