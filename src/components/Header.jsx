import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold text-blue-800">Tableau de bord</h1>
      <span className="text-sm text-gray-500">Connecté en temps réel</span>
    </div>
  );
};

export default Header;
