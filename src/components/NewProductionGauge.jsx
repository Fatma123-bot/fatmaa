import React, { useEffect, useState } from "react";
import GaugeChart from "react-gauge-chart";
import "../components/ChartComponent.css";
import { database } from "../firebase"; // Assure-toi que ce chemin est correct
import { ref, onValue } from "firebase/database";

const NewProductionGauge = () => {
  const [conformes, setConformes] = useState(0);
  const [objectif, setObjectif] = useState(1000); // valeur par défaut si absente

  useEffect(() => {
    const conformesRef = ref(database, "productionData/conformes");
    const objectifRef = ref(database, "productionData/objectif");

    // Récupère les conformes
    const unsubscribeConformes = onValue(conformesRef, (snapshot) => {
      const val = snapshot.val();
      if (val !== null) setConformes(val);
    });

    // Récupère l'objectif
    const unsubscribeObjectif = onValue(objectifRef, (snapshot) => {
      const val = snapshot.val();
      if (val !== null) setObjectif(val);
    });

    // Nettoyage (pas obligatoire pour Realtime DB, mais recommandé)
    return () => {
      unsubscribeConformes();
      unsubscribeObjectif();
    };
  }, []);

  const ratio = objectif > 0 ? conformes / objectif : 0;
  const percent = Math.min(ratio, 1);

  const statut =
    percent >= 1 ? "🎯 Objectif atteint" :
    percent >= 0.8 ? "✅ Presque atteint" :
    percent >= 0.5 ? "⏳ En progrès" : "⚠️ En retard";

  const color =
    percent >= 1 ? "#16a34a" :
    percent >= 0.8 ? "#22c55e" :
    percent >= 0.5 ? "#facc15" : "#ef4444";

  return (
    <div className="chart-card" style={{
      height: "280px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <h4 style={{ marginBottom: "0.5rem" }}>Avancement Objectif</h4>
      <GaugeChart
        id="gauge-chart"
        nrOfLevels={20}
        percent={percent}
        colors={["#ef4444", "#facc15", "#22c55e"]}
        arcWidth={0.3}
        needleColor="#111"
        textColor="#000"
        style={{ width: "100%" }}
      />
      <p style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}>
        {conformes} / {objectif} pièces
      </p>
      <p style={{ fontWeight: "bold", color }}>{statut}</p>
    </div>
  );
};

export default NewProductionGauge;
