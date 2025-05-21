import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Composants
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

// Pages
import Home from './pages/Home';
import Historique from './pages/Historique';
import Alertes from './pages/Alertes';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // par défaut fermé

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} />

      {/* Zone principale */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <Topbar toggleSidebar={toggleSidebar} />

        {/* Contenu des pages */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4 mt-[60px]">
          {/* mt-[60px] = espace pour la Topbar */}
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




