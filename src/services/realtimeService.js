// src/services/realtimeService.js
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';

export const listenToRealtimeData = (path, callback) => {
  const dataRef = ref(database, path);
  return onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};
