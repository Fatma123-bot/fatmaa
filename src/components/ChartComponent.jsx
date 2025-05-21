// src/components/ChartComponent.jsx
import React from 'react';
import NewProductionChart from './NewProductionChart';
import NewProductionPie from './NewProductionPie';
import NewProductionGauge from './NewProductionGauge';
import './ChartComponent.css';

const ChartComponent = () => {
  return (
    <div className="charts-container">
      <div className="chart-wrapper">
        <NewProductionChart />
      </div>
      <div className="chart-wrapper">
        <NewProductionPie />
      </div>
      <div className="chart-wrapper">
        <NewProductionGauge />
      </div>
    </div>
  );
};

export default ChartComponent;



