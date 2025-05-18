import { useEffect, useState } from "react";
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";

const MachineStatus = () => {
  const [status, setStatus] = useState("Chargement...");

  useEffect(() => {
    const statusRef = ref(database, "statusMachine/etat");

    const unsubscribe = onValue(statusRef, (snapshot) => {
      const value = snapshot.val();
      if (value) {
        setStatus(value);
      } else {
        setStatus("Inconnu");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="status-box">
      <h3>⚙️ Statut Machine</h3>
      <p className={status === "En marche" ? "status-on" : "status-off"}>
        {status}
      </p>
    </div>
  );
};

export default MachineStatus;



