import React from 'react';
import ProductionChart from './ProductionChart';
import ProductionPieChart from './ProductionPieChart';
import ProductionGauge from './ProductionGauge';
import './ChartComponent.css'; // Assure-toi d’importer le fichier CSS

const ChartComponent = () => {
  return (
    <div className="charts-row">
      <div className="chart-wrapper">
        <ProductionChart />
      </div>
      <div className="chart-wrapper">
        <ProductionPieChart />
      </div>
      <div className="chart-wrapper">
        <ProductionGauge />
      </div>
    </div>
  );
};

export default ChartComponent;

