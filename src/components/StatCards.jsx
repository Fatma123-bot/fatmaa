// src/components/StatCards.jsx
import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import {
  FaCogs,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaLink,
} from "react-icons/fa";
import "./StatCards.css";

const StatCards = () => {
  const [stats, setStats] = useState({
    total: 0,
    assemblages: 0,
    conformes: 0,
    nonConformes: 0,
    erreurs: 0,
  });

  useEffect(() => {
    const db = getDatabase();
    const prodRef = ref(db, "productionData");

    const unsubscribe = onValue(prodRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setStats({
          total: data.total || 0,
          assemblages: data.assemblages || 0,
          conformes: data.conformes || 0,
          nonConformes: data.non_conformes || 0,
          erreurs: data.erreurs || 0,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="stat-cards">
      <Card icon={<FaCogs />} label="Total" value={stats.total} className="card total" />
      <Card icon={<FaLink />} label="Assemblages" value={stats.assemblages} className="card assemblages" />
      <Card icon={<FaCheckCircle />} label="Conformes" value={stats.conformes} className="card conformes" />
      <Card icon={<FaTimesCircle />} label="Non conformes" value={stats.nonConformes} className="card non-conformes" />
      <Card icon={<FaExclamationTriangle />} label="Erreurs" value={stats.erreurs} className="card erreurs" />
    </div>
  );
};

const Card = ({ icon, label, value, className }) => (
  <div className={className}>
    <div className="icon">{icon}</div>
    <h3>{label}</h3>
    <p>{value}</p>
  </div>
);

export default StatCards;



