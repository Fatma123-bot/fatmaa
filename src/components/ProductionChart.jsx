import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

const ProductionChart = () => {
  const [productionData, setProductionData] = useState([]);
  const [assemblyData, setAssemblyData] = useState([]);

  useEffect(() => {
    const prodRef = ref(database, "WeeklyProduction"); // ✔️ Corrigé avec majuscule
    onValue(prodRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const daysMap = {
          lun: "Lun",
          mar: "Mar",
          mer: "Mer",
          jeu: "Jeu",
          ven: "Ven",
          sam: "Sam",
          dim: "Dim"
        };

        const prodArray = [];
        const assemblyArray = [];

        Object.keys(daysMap).forEach((key) => {
          const entry = data[key] || {};
          prodArray.push(entry.production || 0);
          assemblyArray.push(entry.assembly || 0);
        });

        setProductionData(prodArray);
        setAssemblyData(assemblyArray);
      }
    });
  }, []);

  const chartData = {
    labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    datasets: [
      {
        label: "Production",
        data: productionData,
        borderColor: "#0d47a1",
        backgroundColor: "rgba(13, 71, 161, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Assemblages",
        data: assemblyData,
        borderColor: "#00695c",
        backgroundColor: "rgba(0, 105, 92, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 20,
          padding: 20,
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Nombre de pièces",
        },
      },
      x: {
        title: {
          display: true,
          text: "Jour de la semaine",
        },
      },
    },
  };

  return (
    <div className="chart-card" style={{ padding: "1rem", backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
      <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>Production Hebdomadaire</h3>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ProductionChart;

