import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ESPData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get("http://localhost:3000/datos");
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#0a1a44",
          borderRadius: "16px",
          padding: "30px",
          minWidth: "300px",
          maxWidth: "400px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#F97316" }}>
          Acceder a la instalación
        </h2>
        {data && data.name && data.email ? (
          <div style={{ marginTop: "20px" }}>
            <p>
              <strong>Nombre:</strong> {data.name}
            </p>
            <p>
              <strong>Email:</strong> {data.email}
            </p>
            <p>
              <strong>Token:</strong> {data.token}
            </p>
          </div>
        ) : (
          <p style={{ textAlign: "center", marginTop: "20px", color: "#ccc" }}>
            Esperando datos del ESP32...
          </p>
        )}
      </div>
    </div>
  );
}
