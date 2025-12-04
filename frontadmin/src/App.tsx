import React from "react";
import ESPData from "./components/ESPData.jsx";

function App() {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#071233",
        minHeight: "100vh",
        padding: "40px",
        color: "#fff",
      }}
    >
      <h1
        style={{ textAlign: "center", marginBottom: "40px", color: "#F97316" }}
      >
        Dashboard ESP32
      </h1>
      <ESPData />
    </div>
  );
}

export default App;
