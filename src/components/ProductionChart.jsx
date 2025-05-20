import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { database } from "../firebase"; // adapte si chemin différent
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

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

const ProductionChart = () => {
  const [productionData, setProductionData] = useState([]);
  const [assemblyData, setAssemblyData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const prodRef = ref(database, "WeeklyProduction");
      const unsubscribe = onValue(prodRef, (snapshot) => {
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

          const prodArray = new Array(7).fill(0);
          const assemblyArray = new Array(7).fill(0);

          Object.keys(daysMap).forEach((key, index) => {
            if (data[key]) {
              prodArray[index] = Number(data[key].production) || 0;
              assemblyArray[index] = Number(data[key].assembly) || 0;
            }
          });

          setProductionData(prodArray);
          setAssemblyData(assemblyArray);
          setError(null);
        }
      }, (error) => {
        console.error("Erreur de lecture Firebase:", error);
        setError("Erreur de chargement des données");
      });

      // Cleanup function
      return () => unsubscribe();
    } catch (err) {
      console.error("Erreur:", err);
      setError("Une erreur est survenue");
    }
  }, []);

  // Si les données ne sont pas encore chargées ou s'il y a une erreur
  if (error) {
    return (
      <div className="chart-card" style={{
        padding: "0.8rem",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        height: "250px",
        maxWidth: "600px",
        margin: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <p style={{ color: "#f44336" }}>{error}</p>
      </div>
    );
  }

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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 15,
          padding: 10,
          font: {
            size: 11,
            family: "Arial"
          }
        }
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
        titleFont: {
          size: 11,
          family: "Arial"
        },
        bodyFont: {
          size: 11,
          family: "Arial"
        }
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
        min: 0,
        title: {
          display: true,
          text: "Nombre de pièces",
          font: {
            size: 11,
            family: "Arial"
          }
        },
        ticks: {
          font: {
            size: 10
          },
          stepSize: 1
        }
      },
      x: {
        title: {
          display: true,
          text: "Jour de la semaine",
          font: {
            size: 11,
            family: "Arial"
          }
        },
        ticks: {
          font: {
            size: 10
          }
        }
      },
    },
  };

  return (
    <div
      className="chart-card"
      style={{
        padding: "0.8rem",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        height: "400px",  // Réduit de 320px à 250px
        maxWidth: "500px", // Réduit de 750px à 600px
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "0.5rem", color: "#333", fontSize: "1rem" }}>
        Production Hebdomadaire
      </h3>
      <div style={{ flex: 1 }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ProductionChart;

