const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
app.use(cors());
app.use(express.json());

// Guardar datos
app.post("/datos", (req, res) => {
  const { name, email, token, dateTime } = req.body;

  try {
    const stmt = db.prepare(
      "INSERT INTO registros (name, email, token, dateTime) VALUES (?, ?, ?, ?)"
    );
    stmt.run(name, email, token, dateTime);

    // ✔ Señal para el ESP32
    res.json({
      status: "ok",
      message: "Guardado correctamente",
    });
  } catch (error) {
    console.error("Error al guardar:", error);

    // ❌ Señal de error para el ESP32
    res.json({
      status: "error",
      message: "No se pudo guardar",
    });
  }
});

// Obtener el último registro
app.get("/datos", (req, res) => {
  const row = db
    .prepare("SELECT * FROM registros ORDER BY id DESC LIMIT 1")
    .get();
  res.json(row || {});
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
