import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";

export default function Screen() {
  const [logs, setLogs] = useState([]);

  // Función para imprimir como terminal
  const log = (msg) => {
    console.log(msg); // Terminal real (Metro)
    setLogs((prev) => [...prev, msg]); // Terminal en pantalla
  };

  const enviarDatos = async () => {
    const usuario = {
      name: "Alfredo",
      age: 20,
      email: "alfredo@example.com",
    };

    try {
      log("Enviando datos al ESP32...");

      // La IP depende de tu ESP32 (ejemplo: 192.168.4.1)
      const response = await fetch("http://192.168.4.1/datos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });

      const text = await response.text();
      log("Respuesta ESP32: " + text);
    } catch (err) {
      log("Error: " + err.message);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#111" }}>
      <Text style={{ color: "white", fontSize: 22, marginBottom: 20 }}>
        Envío de datos al ESP32
      </Text>

      {/* BOTÓN */}
      <TouchableOpacity
        onPress={enviarDatos}
        style={{
          backgroundColor: "#1E90FF",
          padding: 15,
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>
          Enviar Datos del Usuario
        </Text>
      </TouchableOpacity>

      {/* TERMINAL */}
      <View
        style={{
          backgroundColor: "black",
          padding: 15,
          borderRadius: 10,
          height: 250,
        }}
      >
        <Text
          style={{
            color: "#0f0",
            fontFamily: "monospace",
            fontSize: 14,
          }}
        >
          {logs.join("\n")}
        </Text>
      </View>
    </View>
  );
}
