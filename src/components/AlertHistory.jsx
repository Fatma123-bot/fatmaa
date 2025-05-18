import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const AlertHistory = () => {
  const [alertHistory, setAlertHistory] = useState([]);

  useEffect(() => {
    const alertRef = ref(database, "productionData/alertHistory");

    onValue(alertRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formatted = Object.entries(data)
          .map(([date, alert]) => ({
            date,
            message: alert,
          }))
          .sort((a, b) => new Date(b.date) - new Date(a.date)); // ✅ Tri décroissant

        setAlertHistory(formatted);
      } else {
        setAlertHistory([]); // ✅ Réinitialise si aucune alerte
      }
    });
  }, []);

  // ✅ Export vers Excel
  const exportAlertsToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      alertHistory.map((entry) => ({
        Date: new Date(entry.date).toLocaleString(),
        Alerte: entry.message,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Alertes");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(data, "historique_alertes.xlsx");
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-700">Historique des alertes</h2>
        <button
          onClick={exportAlertsToExcel}
          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Exporter Excel
        </button>
      </div>

      <table className="w-full text-sm text-left text-gray-600">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Alerte</th>
          </tr>
        </thead>
        <tbody>
          {alertHistory.length === 0 ? (
            <tr>
              <td colSpan="2" className="text-center py-4 text-gray-400">
                Aucune alerte enregistrée.
              </td>
            </tr>
          ) : (
            alertHistory.map((entry, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">
                  {new Date(entry.date).toLocaleString()}
                </td>
                <td className="py-2 px-4 border-b">{entry.message}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AlertHistory;
