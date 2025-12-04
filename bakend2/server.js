// server.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // Permite solicitudes desde cualquier origen (React)
app.use(express.json()); // Permite recibir JSON en POST

// Variable para guardar los datos del ESP32
let lastData = {};

// Ruta para que el ESP32 envíe datos
app.post("/datos", (req, res) => {
  const data = req.body; // ESP32 envía JSON con name, email, token, dateTime
  console.log("📥 Datos recibidos del ESP32:", data);

  // Guardamos los datos
  lastData = data;

  res.json({ message: "Datos guardados correctamente" });
});

// Ruta para que el frontend React lea los datos
app.get("/datos", (req, res) => {
  res.json(lastData);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
