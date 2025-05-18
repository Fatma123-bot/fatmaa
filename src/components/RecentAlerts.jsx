import React, { useEffect, useState } from 'react';
import { database } from '../firebase'; // ✅ Utilisation correcte de Realtime Database
import { ref, onValue } from 'firebase/database';

const RecentAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const alertsRef = ref(database, 'alertes');

    const unsubscribe = onValue(alertsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const alertList = Object.entries(data)
          .map(([id, alert]) => ({
            id,
            ...alert,
          }))
          .sort((a, b) => b.timestamp - a.timestamp) // Trier par date décroissante
          .slice(0, 5); // Prendre les 5 plus récents

        setAlerts(alertList);
      } else {
        setAlerts([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="alert-box">
      <h3>🔔 Alertes Récentes</h3>
      {alerts.length === 0 ? (
        <p>Aucune alerte pour le moment.</p>
      ) : (
        <ul>
          {alerts.map(alert => (
            <li key={alert.id}>
              <strong>{alert.type}</strong> - {alert.message} <br />
              <small>{new Date(alert.timestamp).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentAlerts;



