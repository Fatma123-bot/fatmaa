
import React, { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa'; 

const DateFilter = ({ onFilterChange }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilter = () => {
    if (onFilterChange) {
      onFilterChange({ startDate, endDate });
    }
  };

  return (
    <div className="date-filter-container">
      <h3 className="date-filter-title">📅 Filtrer par dates</h3>

      <div className="flex flex-col md:flex-row gap-6 w-full justify-center">
        {/* Date de début */}
        <div className="date-filter-input-group">
          <label className="text-gray-600 text-sm mb-1">Date de début</label>
          <div className="date-filter-input">
            <FaCalendarAlt className="date-filter-icon" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
        </div>

        {/* Date de fin */}
        <div className="date-filter-input-group">
          <label className="text-gray-600 text-sm mb-1">Date de fin</label>
          <div className="date-filter-input">
            <FaCalendarAlt className="date-filter-icon" />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {/* Bouton */}
        <button onClick={handleFilter} className="date-filter-button">
          Appliquer
        </button>
      </div>
    </div>
  );
};

export default DateFilter;




