import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";

const ProductionStats = () => {
  const [production, setProduction] = useState({
    conformes: 0,
    nonConformes: 0,
    total: 0,
  });

  useEffect(() => {
    const prodRef = ref(database, "productionData/latest");

    onValue(prodRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProduction(data);
      }
    });
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-700">Production</h2>
      <p className="text-green-600 font-semibold text-lg">
        ✅ Conformes : {production.conformes}
      </p>
      <p className="text-red-500 font-semibold text-lg">
        ❌ Non conformes : {production.nonConformes}
      </p>
      <p className="text-blue-500 font-semibold text-lg">
        🔢 Total : {production.total}
      </p>
      <p className="text-gray-500 text-sm">Mis à jour en temps réel</p>
    </div>
  );
};

export default ProductionStats;
