import React from 'react';
import './Topbar.css';
import { FaBars } from 'react-icons/fa';

const logo = 'https://via.placeholder.com/100x30?text=Logo';

const Topbar = ({ toggleSidebar }) => {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-button" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <img src={logo} alt="Logo" className="Image4.png" />
      </div>
      <div className="topbar-center">
        <h1 className="topbar-title">Dashboard Production</h1>
      </div>
      <div className="topbar-right">
        <img
          src="https://i.pravatar.cc/150?img=3"
          alt="Profil"
          className="avatar"
        />
      </div>
    </header>
  );
};

export default Topbar;








