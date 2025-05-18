import React, { useEffect } from "react";
import { database } from "../firebase";  // Assure-toi que le chemin est correct
import { ref, get } from "firebase/database";

const FirebaseTest = () => {
  useEffect(() => {
    const testRef = ref(database, "productionData/history");

    get(testRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log("🔥 Données reçues :", snapshot.val());
        } else {
          console.log("❌ Aucune donnée trouvée.");
        }
      })
      .catch((error) => {
        console.error("⚠️ Erreur Firebase :", error);
      });
  }, []);

  return <div>Test Firebase en cours... Ouvre la console !</div>;
};

export default FirebaseTest;
