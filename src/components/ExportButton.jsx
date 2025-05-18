import React from 'react';

const ExportButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      Exporter Excel
    </button>
  );
};

export default ExportButton;
