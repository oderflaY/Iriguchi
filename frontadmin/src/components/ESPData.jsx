import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ESPData() {
  const [accessList, setAccessList] = useState([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get("http://localhost:3000/datos");
        // Verificamos que haya datos y agregamos a la lista si es nuevo
        if (res.data.name && res.data.dateTime) {
          const exists = accessList.find(
            (item) => item.token === res.data.token
          );
          if (!exists) {
            setAccessList((prev) => [...prev, res.data]);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [accessList]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ color: "#F97316", marginBottom: "30px" }}>
        Dashboard de Accesos
      </h1>

      {accessList.length === 0 && (
        <p style={{ color: "#ccc" }}>Esperando datos del ESP32...</p>
      )}

      {accessList.map((user, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "#0a1a44",
            borderRadius: "16px",
            padding: "20px",
            width: "350px",
            marginBottom: "15px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
          }}
        >
          <p>
            <strong>Nombre:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Hora de acceso:</strong> {user.dateTime}
          </p>
        </div>
      ))}
    </div>
  );
}
