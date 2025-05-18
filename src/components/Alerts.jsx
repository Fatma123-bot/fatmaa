import React, { useState, useEffect } from "react";
import { database } from "../firebase"; // ✅ importer database depuis ton fichier firebase.js
import { ref, onValue } from "firebase/database"; // ✅ ref et onValue depuis firebase/database


const Alerts = () => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const partCountRef = ref(database, "productionData/partCount");
    const errorsRef = ref(database, "productionData/errors");

    // Écoute du nombre de pièces
    onValue(partCountRef, (snapshot) => {
      const partCount = snapshot.val();
      if (partCount === 0) {
        setAlertMessage("⚠️ ALERTE : Production arrêtée !");
      } else {
        setAlertMessage("✅ Production normale");
      }
    });

    // Écoute des erreurs
    onValue(errorsRef, (snapshot) => {
      const error = snapshot.val();
      setErrorMessage(error);
    });
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">🚨 Alertes & Erreurs</h2>

      {alertMessage && (
        <div className={`p-3 rounded mb-3 ${alertMessage.includes("⚠️") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
          {alertMessage}
        </div>
      )}

      {errorMessage && (
        <div className="p-3 rounded bg-yellow-100 text-yellow-800">
          ⚠️ Erreur détectée : <strong>{errorMessage}</strong>
        </div>
      )}
    </div>
  );
};

export default Alerts;
