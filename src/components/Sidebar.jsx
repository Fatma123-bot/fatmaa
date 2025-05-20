import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaHistory, FaBell } from 'react-icons/fa';

const Sidebar = ({ isSidebarOpen }) => {
  const location = useLocation();

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-[250px] bg-gray-800 text-white shadow-lg z-50 
        transform transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className="p-6 font-bold text-xl border-b border-gray-700">
        SUSO Dashboard
      </div>

      <nav className="flex flex-col gap-4 p-4">
        <Link
          to="/"
          className={`flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 ${
            location.pathname === '/' ? 'bg-gray-700' : ''
          }`}
        >
          <FaHome />
          Accueil
        </Link>

        <Link
          to="/historique"
          className={`flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 ${
            location.pathname === '/historique' ? 'bg-gray-700' : ''
          }`}
        >
          <FaHistory />
          Historique
        </Link>

        <Link
          to="/alertes"
          className={`flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 ${
            location.pathname === '/alertes' ? 'bg-gray-700' : ''
          }`}
        >
          <FaBell />
          Alertes
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;







