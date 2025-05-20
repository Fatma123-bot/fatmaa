import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

// Enregistrement des composants nécessaires pour le graphique
ChartJS.register(ArcElement, Tooltip, Legend);

const ProductionPieChart = () => {
  const [conformes, setConformes] = useState(0);
  const [nonConformes, setNonConformes] = useState(0);
  const [assemblages, setAssemblages] = useState(0);

  useEffect(() => {
    const prodRef = ref(database, "productionData");
    onValue(prodRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setConformes(data.conformes || 0);
        setNonConformes(data.non_conformes || 0);
        setAssemblages(data.assemblages || 0);
      }
    });
  }, []);

  const data = {
    labels: ["Conformes", "Non conformes", "Assemblages"],
    datasets: [
      {
        label: "Répartition de production",
        data: [conformes, nonConformes, assemblages],
        backgroundColor: ["#4CAF50", "#F44336", "#2196F3"],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom"
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.parsed;
            return `${context.label}: ${value}`;
          }
        }
      }
    }
  };

  return (
    <div style={{
      maxWidth: "350px",
      height: "350px",
      width: "100%",
      backgroundColor: "#fff",
      padding: "0.8rem",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
    }}>
      <h3 style={{
        textAlign: "center",
        marginBottom: "0.5rem",
        fontSize: "1rem",
        color: "#333"
      }}>
        Répartition
      </h3>
      <div style={{ height: "250px" }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default ProductionPieChart;







