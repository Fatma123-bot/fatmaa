import React, { useState, useEffect } from 'react';
import DateFilter from '../components/DateFilter';
import StatCards from '../components/StatCards';
import ChartComponent from '../components/ChartComponent';
import Alerts from '../components/Alerts';
import { firestore } from '../firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import ProductionGoal from '../components/ProductionGoal'; // ✅ Nouveau composant

const Home = () => {
  const [objectif, setObjectif] = useState(1500);
  const [conformes, setConformes] = useState(0);

  // ✅ Écoute en temps réel de l’objectif dans Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(firestore, 'productionData', 'objectif'), (docSnap) => {
      if (docSnap.exists()) {
        setObjectif(docSnap.data().value || 1500);
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Récupération des pièces conformes
  useEffect(() => {
    const fetchConformes = async () => {
      try {
        const docRef = doc(firestore, 'productionStats', 'compteur');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setConformes(data.conformes || 0);
        } else {
          console.warn("Aucune donnée trouvée pour 'compteur'.");
        }
      } catch (error) {
        console.error('Erreur Firebase :', error);
      }
    };

    fetchConformes();
  }, []);

  return (
    <div className="w-full max-w-screen-xl mx-auto p-4 bg-gray-50 min-h-screen">
      {/* Filtre de dates */}
      <div className="mb-4">
        <DateFilter />
      </div>

      {/* 🎯 Objectif de production connecté à Firebase */}
      <div className="mb-6">
        <ProductionGoal />
      </div>

      {/* Statistiques */}
      <div className="mb-6">
        <StatCards />
      </div>

      {/* Graphiques */}
      <div className="mb-6">
        <ChartComponent conformes={conformes} objectif={objectif || 1} />
      </div>

      {/* Alertes */}
      <div>
        <Alerts />
      </div>
    </div>
  );
};

export default Home;
