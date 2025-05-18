import React, { useState, useEffect } from "react";
import { database } from "../firebase"; // ✅ Tu récupères la base de données que tu as exportée
import { ref, onValue } from "firebase/database"; // ✅ Ces fonctions viennent de firebase/database
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";



const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const historyRef = ref(database, "productionData/history");
    onValue(historyRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.entries(data).map(([date, value]) => {
          if (typeof value === "object") {
            return {
              date,
              total: value.total || 0,
              conformes: value.conformes || 0,
              nonConformes: value.nonConformes || 0,
            };
          } else {
            return {
              date,
              total: value,
              conformes: null,
              nonConformes: null,
            };
          }
        });
        setHistoryData(formattedData);
        setFilteredData(formattedData);
      }
    });
  }, []);

  const handleFilter = () => {
    const filtered = historyData.filter((item) => {
      return (
        (!startDate || item.date >= startDate) &&
        (!endDate || item.date <= endDate)
      );
    });
    setFilteredData(filtered);
  };

  const exportToXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData.map((item) => ({
        Date: item.date,
        Total: item.total,
        Conformes: item.conformes,
        "Non conformes": item.nonConformes,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Historique");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(data, "historique_production.xlsx");
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-6">
      {/* ✅ Titre supprimé ici pour éviter la redondance */}

      {/* Filtres */}
      <div className="flex gap-4 mb-4 flex-wrap">
        <div>
          <label className="text-sm text-gray-600">Date de début</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="block border rounded p-1 text-sm"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600">Date de fin</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="block border rounded p-1 text-sm"
          />
        </div>
        <button
          onClick={handleFilter}
          className="self-end px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Filtrer
        </button>
        <button
          onClick={exportToXLSX}
          className="self-end px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Exporter Excel
        </button>
      </div>

      {/* Graphique */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total" stroke="#8884d8" name="Total" />
          <Line
            type="monotone"
            dataKey="conformes"
            stroke="#4CAF50"
            name="Conformes"
          />
          <Line
            type="monotone"
            dataKey="nonConformes"
            stroke="#F44336"
            name="Non conformes"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default History;

