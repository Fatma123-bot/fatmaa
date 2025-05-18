import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { database } from "../firebase"; // ✅ Assure-toi que le chemin est correct
import { ref, onValue } from "firebase/database";

ChartJS.register(ArcElement, Tooltip, Legend);

const ProductionPie = () => {
  const [conformes, setConformes] = useState(0);
  const [nonConformes, setNonConformes] = useState(0);
  const [assemblages, setAssemblages] = useState(0);

  useEffect(() => {
    const prodRef = ref(database, "productionData");
    const unsubscribe = onValue(prodRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setConformes(data.conformes || 0);
        setNonConformes(data.non_conformes || 0);
        setAssemblages(data.assemblages || 0);
      }
    });

    return () => unsubscribe();
  }, []);

  const data = {
    labels: ["Assemblages", "Conformes", "Non-conformes"],
    datasets: [
      {
        data: [assemblages, conformes, nonConformes],
        backgroundColor: ["#2196f3", "#4caf50", "#f44336"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div
      className="chart-card"
      style={{
        padding: "1rem",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
        Répartition Assemblage & Qualité
      </h3>
      <Pie data={data} options={options} />
    </div>
  );
};

export default ProductionPie;




