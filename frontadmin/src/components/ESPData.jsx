import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ESPData() {
  const [accessList, setAccessList] = useState([]);
  const [daysAccessed, setDaysAccessed] = useState({});

  const getDay = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleDateString("es-MX", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const updateDays = (dateTime) => {
    const dayString = getDay(dateTime);

    setDaysAccessed((prev) => ({
      ...prev,
      [dayString]: (prev[dayString] || 0) + 1,
    }));
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get("http://localhost:3000/datos");

        if (res.data.name && res.data.dateTime) {
          const exists = accessList.find(
            (item) => item.token === res.data.token
          );

          if (!exists) {
            setAccessList((prev) => [...prev, res.data]);
            updateDays(res.data.dateTime);
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
        background: "linear-gradient(135deg, #0a0f1f, #1a1f36)",
        color: "white",
        fontFamily: "'Inter', sans-serif",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: "30px",
          textAlign: "center",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h1
          style={{
            fontSize: "45px",
            color: "#4ea1ff",
            textShadow: "0 0 20px rgba(78,161,255,0.7)",
            margin: 0,
            letterSpacing: "2px",
            fontWeight: "700",
          }}
        >
          Panel de accesos

        </h1>
      </header>

      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: "30px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "40px",
        }}
      >
        {/* Days Card */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            padding: "25px",
            borderRadius: "18px",
            boxShadow: "0 0 25px rgba(0,0,0,0.4)",
            width: "90%",
            maxWidth: "800px",
            border: "1px solid rgba(255,255,255,0.1)",
            animation: "fadeIn 0.7s ease",
          }}
        >
          <h2
            style={{
              color: "#4ea1ff",
              marginBottom: "10px",
              textAlign: "center",
              textShadow: "0 0 10px rgba(78,161,255,0.5)",
            }}
          >
            📅 Días con Acceso
          </h2>

          {Object.keys(daysAccessed).length === 0 ? (
            <p style={{ color: "#bbb", textAlign: "center" }}>
              Aún no hay registros...
            </p>
          ) : (
            Object.entries(daysAccessed).map(([day, count], index) => (
              <p
                key={index}
                style={{
                  fontSize: "17px",
                  margin: "8px 0",
                  color: "#dbe9ff",
                }}
              >
                <strong>{day}:</strong> {count} accesos
              </p>
            ))
          )}
        </div>

        {/* Access Cards */}
        <div
          style={{
            width: "90%",
            maxWidth: "800px",
            display: "flex",
            flexDirection: "column",
            gap: "25px",
          }}
        >
          {accessList.length === 0 && (
            <p style={{ color: "#bbb", textAlign: "center" }}>
              Esperando datos del ESP32...
            </p>
          )}

          {accessList.map((user, index) => (
            <div
              key={index}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "18px",
                padding: "25px",
                backdropFilter: "blur(12px)",
                boxShadow: "0 0 25px rgba(0,0,0,0.4)",
                transition: "0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <p>
                <strong style={{ color: "#4ea1ff" }}>Nombre:</strong>{" "}
                {user.name}
              </p>
              <p>
                <strong style={{ color: "#4ea1ff" }}>Email:</strong>{" "}
                {user.email}
              </p>
              <p>
                <strong style={{ color: "#4ea1ff" }}>Hora:</strong>{" "}
                {user.dateTime}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
