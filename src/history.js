// src/components/History.jsx
import React, { useState, useEffect } from "react";
import { database, ref, onValue } from "../firebase";
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

  useEffect(() => {
    const historyRef = ref(database, "productionData/history");

    onValue(historyRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.entries(data).map(([date, values]) => ({
          date,
          conformes: values.conformes || 0,
          nonConformes: values.nonConformes || 0,
        }));
        setHistoryData(formattedData);
      }
    });
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-700 mb-4">
        Historique de Production
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={historyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
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
