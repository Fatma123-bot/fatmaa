import React from 'react';
import GaugeChart from 'react-gauge-chart';

const ProductionGauge = ({ conformes, objectif }) => {
  const taux = objectif > 0 ? conformes / objectif : 0;

  return (
    <div
      className="gauge-wrapper"
      style={{
        width: "100%",
        maxWidth: "380px",
        padding: "1.5rem",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem", color: "#374151" }}>
        Avancement par rapport à l'objectif
      </h3>
      <GaugeChart
        id="gauge-chart"
        nrOfLevels={20}
        percent={Math.min(taux, 1)}
        textColor="#000"
        arcPadding={0.02}
        cornerRadius={3}
        colors={["#ef4444", "#facc15", "#22c55e"]}
        arcWidth={0.3}
        needleColor="#111"
        needleBaseColor="#111"
      />
      <p style={{ marginTop: "1rem", fontSize: "1rem", color: "#1f2937", fontWeight: "500" }}>
        {conformes} / {objectif} pièces
      </p>
    </div>
  );
};

export default ProductionGauge;


