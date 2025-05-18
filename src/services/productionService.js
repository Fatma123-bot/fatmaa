// src/services/productionService.js
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';

export const listenToProductionData = (callback) => {
  const prodRef = ref(database, 'productionData');
  return onValue(prodRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};
