// src/services/alertesService.js
import { collection, addDoc, Timestamp, onSnapshot } from 'firebase/firestore';
import { firestore } from '../firebase';

// ✅ Ajouter une alerte dans Firestore
export const addAlerte = async (message, type) => {
  try {
    await addDoc(collection(firestore, 'alertes'), {
      message,
      type,
      date: Timestamp.now(),
    });
    console.log("✅ Alerte ajoutée à Firestore !");
  } catch (error) {
    console.error("❌ Erreur lors de l'ajout :", error);
  }
};

// ✅ Écouter les alertes en temps réel
export const listenToAlertes = (callback) => {
  const alertesRef = collection(firestore, 'alertes');
  return onSnapshot(alertesRef, (snapshot) => {
    const alertes = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(alertes);
  });
};
