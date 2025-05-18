import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

import Historique from './pages/Historique';
import Alertes from './pages/Alertes';
import Home from './pages/Home';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // par défaut visible

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="app-container flex h-screen overflow-hidden">
      <Sidebar isSidebarOpen={isSidebarOpen} />

      <div className={`main-content flex flex-col flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-[250px]' : 'ml-0'}`}>
        <Topbar toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/historique" element={<Historique />} />
            <Route path="/alertes" element={<Alertes />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;






