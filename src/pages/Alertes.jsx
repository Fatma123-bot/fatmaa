// src/pages/Alertes.jsx
import React from 'react';
import DateFilter from '../components/DateFilter';
import AlertHistory from '../components/AlertHistory';
import ExportButton from '../components/ExportButton';

const Alertes = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🚨 Historique des alertes</h1>

      <div className="mb-4">
        <DateFilter />
      </div>

      <div className="mb-4 flex justify-end">
        <ExportButton />
      </div>

      <div className="bg-white rounded shadow p-4">
        <AlertHistory />
      </div>
    </div>
  );
};

export default Alertes;
