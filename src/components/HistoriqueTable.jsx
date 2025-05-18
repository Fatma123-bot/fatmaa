import React from 'react';

const HistoriqueTable = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Historique de production</h2>
      <table className="w-full text-sm text-left text-gray-600">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Total</th>
            <th className="py-2 px-4">Conformes</th>
            <th className="py-2 px-4">Non conformes</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td className="py-2 px-4">{entry.date}</td>
              <td className="py-2 px-4">{entry.total}</td>
              <td className="py-2 px-4">{entry.conformes}</td>
              <td className="py-2 px-4">{entry.nonConformes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoriqueTable;
