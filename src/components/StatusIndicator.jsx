import React from "react";
import "./StatusIndicator.css";

const StatusIndicator = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case "active":
        return "bg-green-500 text-green-700";
      case "paused":
        return "bg-yellow-400 text-yellow-700";
      case "offline":
        return "bg-red-500 text-red-700";
      default:
        return "bg-gray-300 text-gray-700";
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case "active":
        return "Connectée";
      case "paused":
        return "En pause";
      case "offline":
        return "Déconnectée";
      default:
        return "Inconnu";
    }
  };

  return (
    <div className={`status-indicator ${getStatusColor()}`}>
      <span className="dot" /> {getStatusLabel()}
    </div>
  );
};

export default StatusIndicator;
