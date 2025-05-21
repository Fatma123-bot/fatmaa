import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";
import "../components/ChartComponent.css";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const NewProductionPie = () => {
  const [conformes, setConformes] = useState(0);
  const [nonConformes, setNonConformes] = useState(0);
  const [assemblages, setAssemblages] = useState(0);

  useEffect(() => {
    const refData = ref(database, "productionData");
    onValue(refData, (snapshot) => {
      const data = snapshot.val();
      setConformes(data?.conformes || 0);
      setNonConformes(data?.non_conformes || 0);
      setAssemblages(data?.assemblages || 0);
    });
  }, []);

  const data = {
    labels: ["Conformes", "Non conformes", "Assemblages"],
    datasets: [{
      label: "Répartition",
      data: [conformes, nonConformes, assemblages],
      backgroundColor: ["#4ade80", "#f87171", "#60a5fa"]
    }]
  };

  return (
    <div className="chart-card" style={{ height: "280px" }}>
      <h4 style={{ marginBottom: "0.5rem", textAlign: "center" }}>Répartition</h4>
      <Pie data={data} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default NewProductionPie;
