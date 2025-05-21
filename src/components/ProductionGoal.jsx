import React, { useEffect, useState } from "react";
import { ref, onValue, update } from "firebase/database";
import { database } from "../firebase"; // ton fichier firebase.js
import "../components/ProductionGoal.css"; // pour le style

const ProductionGoal = () => {
  const [objectif, setObjectif] = useState(0);
  const [newGoal, setNewGoal] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const goalRef = ref(database, "productionData/objectif");
    const unsubscribe = onValue(goalRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setObjectif(data);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = parseInt(newGoal);
    if (!isNaN(value)) {
      await update(ref(database, "productionData"), { objectif: value });
      setNewGoal("");
      setShowEdit(false);
    }
  };

  return (
    <div className="goal-container">
      <h2 className="goal-title">🎯 Objectif de production : <span className="goal-value">{objectif}</span> pièces</h2>
      <button className="goal-edit-btn" onClick={() => setShowEdit(!showEdit)}>
        {showEdit ? "Annuler" : "Modifier l’objectif"}
      </button>

      {showEdit && (
        <form className="goal-form" onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Nouvel objectif"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            className="goal-input"
          />
          <button type="submit" className="goal-save-btn">Enregistrer</button>
        </form>
      )}
    </div>
  );
};

export default ProductionGoal;
