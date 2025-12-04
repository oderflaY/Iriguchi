import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function HomeScreen() {
  const { name, email, token } = useLocalSearchParams();
  const [logs, setLogs] = useState([]);

  const log = (msg) => {
    console.log(msg);
    setLogs((prev) => [...prev, msg]);
  };

  const enviarDatos = async () => {
    const usuario = { name, email, token };

    try {
      log("Accediendo a la instalación...");
      log(`Enviando datos: ${JSON.stringify(usuario)}`);

      const res = await fetch("http://192.168.4.1/datos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });

      const txt = await res.text();
      log("Respuesta del ESP32: " + txt);
    } catch (error) {
      log("Error: " + error.message);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 25,
        backgroundColor: "#0f172a",
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 28,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        Acceder a la instalación
      </Text>

      <Text
        style={{
          color: "#94a3b8",
          fontSize: 16,
          textAlign: "center",
          marginBottom: 35,
        }}
      >
        Estos son tus datos enviados desde Login
      </Text>

      <View
        style={{
          backgroundColor: "rgba(255,255,255,0.05)",
          borderRadius: 20,
          padding: 25,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.1)",
          shadowColor: "#00eaff",
          shadowOpacity: 0.3,
          shadowRadius: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "600",
            marginBottom: 15,
          }}
        >
          Datos del Usuario
        </Text>

        <Text style={{ color: "#cbd5e1", marginBottom: 5 }}>
          • Nombre: {name}
        </Text>
        <Text style={{ color: "#cbd5e1", marginBottom: 5 }}>
          • Email: {email}
        </Text>
        <Text style={{ color: "#cbd5e1", marginBottom: 5 }}>
          • Token: {token}
        </Text>

        <TouchableOpacity
          onPress={enviarDatos}
          style={{
            marginTop: 25,
            backgroundColor: "#1d4ed8",
            paddingVertical: 14,
            borderRadius: 14,
            alignItems: "center",
            shadowColor: "#3b82f6",
            shadowOpacity: 0.7,
            shadowRadius: 15,
            shadowOffset: { height: 5 },
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "600",
              letterSpacing: 1,
            }}
          >
            Enviar datos al ESP32
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: "#000",
          marginTop: 30,
          height: 200,
          borderRadius: 16,
          padding: 14,
          borderWidth: 1,
          borderColor: "#00ffcc",
          shadowColor: "#00ffcc",
          shadowOpacity: 0.9,
          shadowRadius: 20,
        }}
      >
        <Text
          style={{ color: "#00ff9d", fontFamily: "monospace", fontSize: 14 }}
        >
          {logs.length === 0 ? "Esperando acción..." : logs.join("\n")}
        </Text>
      </View>
    </View>
  );
}
