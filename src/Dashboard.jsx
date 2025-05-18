import React from "react";
import StatCards from "../components/StatCards";
import DateFilter from "../components/DateFilter";
import ProductionChart from "../components/ProductionChart";
import ProductionPie from "../components/ProductionPie";
import ProductionGauge from "../components/ProductionGauge";
import Alerts from "../components/Alerts";
import MachineStatus from "../components/MachineStatus";

import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <DateFilter />
      <StatCards />
      <div className="charts-container">
        <ProductionChart />
        <ProductionPie />
        <ProductionGauge />
      </div>
      <div className="info-section">
        <Alerts />
        <MachineStatus />
      </div>
    </div>
  );
};

export default Dashboard;
