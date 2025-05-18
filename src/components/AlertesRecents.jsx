import React, { useEffect, useState } from 'react';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { FaExclamationTriangle } from 'react-icons/fa';
import './AlertesRecents.css';

const AlertesRecents = () => {
  const [alertes, setAlertes] = useState([]);

  useEffect(() => {
    const alertesRef = ref(database, 'alertes');
    const unsubscribe = onValue(alertesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const alertesArray = Object.entries(data).map(([id, value]) => ({
          id,
          ...value
        }));

        // Tri par date décroissante
        const sortedAlertes = alertesArray.sort((a, b) =>
          new Date(b.timestamp) - new Date(a.timestamp)
        );

        // Garde seulement les 5 plus récentes
        setAlertes(sortedAlertes.slice(0, 5));
      } else {
        setAlertes([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const getBadgeClass = (type) => {
    switch (type) {
      case 'erreur':
        return 'badge badge-erreur';
      case 'avertissement':
        return 'badge badge-warning';
      case 'info':
        return 'badge badge-info';
      default:
        return 'badge badge-default';
    }
  };

  return (
    <div className="alertes-container">
      {alertes.length === 0 ? (
        <p>Aucune alerte récente.</p>
      ) : (
        <table className="alertes-table">
          <thead>
            <tr>
              <th><FaExclamationTriangle /></th>
              <th>Message</th>
              <th>Type</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {alertes.map(alerte => (
              <tr key={alerte.id}>
                <td><FaExclamationTriangle className="alert-icon" /></td>
                <td>{alerte.message || 'Alerte sans message'}</td>
                <td><span className={getBadgeClass(alerte.type)}>{alerte.type}</span></td>
                <td>{formatDate(alerte.timestamp)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AlertesRecents;



