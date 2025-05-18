import React, { useEffect, useState } from "react";
import { database } from "../firebase"; // ajuste si besoin
import { onValue, ref } from "firebase/database";

const ProductionGauge = () => {
  const [poinconnage, setPoinconnage] = useState(0);
  const [assemblage, setAssemblage] = useState(0);
  const [objectif, setObjectif] = useState(1); // éviter division par zéro

  useEffect(() => {
    const prodRef = ref(database, "productionData");
    const unsubscribe = onValue(prodRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPoinconnage(data.conformes || 0);
        setAssemblage(data.assemblages || 0);
        setObjectif(data.objectif || 1);
      }
    });

    return () => unsubscribe();
  }, []);

  const getPourcentage = (valeur) => Math.min((valeur / objectif) * 100, 100);

  return (
    <div className="chart-card" style={{ padding: "1rem", backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
      <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>Taux de Réalisation</h3>

      {/* Barre Poinçonnage */}
      <p style={{ marginBottom: "0.5rem" }}>Poinçonnage : {poinconnage} / {objectif}</p>
      <div style={{ height: "20px", background: "#e0e0e0", borderRadius: "8px", marginBottom: "1rem", position: "relative" }}>
        <div
          style={{
            width: `${getPourcentage(poinconnage)}%`,
            height: "100%",
            background: "#2196f3",
            borderRadius: "8px",
            transition: "width 0.5s ease",
          }}
        />
        <span style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontWeight: "bold",
          color: "white",
          fontSize: "12px"
        }}>
          {Math.round(getPourcentage(poinconnage))}%
        </span>
      </div>

      {/* Barre Assemblage */}
      <p style={{ marginBottom: "0.5rem" }}>Assemblage : {assemblage} / {objectif}</p>
      <div style={{ height: "20px", background: "#e0e0e0", borderRadius: "8px", position: "relative" }}>
        <div
          style={{
            width: `${getPourcentage(assemblage)}%`,
            height: "100%",
            background: "#4caf50",
            borderRadius: "8px",
            transition: "width 0.5s ease",
          }}
        />
        <span style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontWeight: "bold",
          color: "white",
          fontSize: "12px"
        }}>
          {Math.round(getPourcentage(assemblage))}%
        </span>
      </div>
    </div>
  );
};

export default ProductionGauge;
