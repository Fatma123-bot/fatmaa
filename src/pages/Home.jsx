/**
 * Home.jsx - Page d'accueil du dashboard
 * Contient : filtre de dates, objectif modifiable, cartes statistiques, graphiques, alertes.
 */

import React, { useState } from 'react';
import DateFilter from '../components/DateFilter';
import StatCards from '../components/StatCards';
import ProductionChart from '../components/ProductionChart';
import ProductionPie from '../components/ProductionPie';
import ProductionGauge from '../components/ProductionGauge';
import Alerts from '../components/Alerts';

const Home = () => {
  const [objectif, setObjectif] = useState(1500);
  const [enEdition, setEnEdition] = useState(false);
  const [nouvelObjectif, setNouvelObjectif] = useState(objectif);

  const handleSaveObjectif = () => {
    setObjectif(nouvelObjectif);
    setEnEdition(false);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Filtre de dates */}
      <div className="mb-4">
        <DateFilter />
      </div>

      {/* Objectif Production */}
      <div className="bg-blue-50 p-4 rounded-md text-center mb-6">
        <h2 className="text-lg font-semibold">🎯 Objectif de production : {objectif}</h2>
        {enEdition ? (
          <div className="mt-4 flex items-center justify-center space-x-2">
            <input
              type="number"
              className="border rounded px-2 py-1 w-24 text-center"
              value={nouvelObjectif}
              onChange={(e) => setNouvelObjectif(Number(e.target.value))}
            />
            <button
              className="px-4 py-1 bg-green-500 text-white rounded"
              onClick={handleSaveObjectif}
            >
              Valider
            </button>
            <button
              className="px-4 py-1 bg-gray-300 text-black rounded"
              onClick={() => {
                setNouvelObjectif(objectif);
                setEnEdition(false);
              }}
            >
              Annuler
            </button>
          </div>
        ) : (
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setEnEdition(true)}
          >
            Modifier Objectif
          </button>
        )}
      </div>

      {/* Statistiques */}
      <div className="mb-6">
        <StatCards />
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <ProductionChart />
        <ProductionPie />
        <ProductionGauge objectif={objectif} />
      </div>

      {/* Alertes */}
      <div>
        <Alerts />
      </div>
    </div>
  );
};

export default Home;
