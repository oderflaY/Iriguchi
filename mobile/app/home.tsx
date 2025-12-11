import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, Animated } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function HomeScreen() {
  const { name, email, token } = useLocalSearchParams();
  const [logs, setLogs] = useState([]);
  const [dateTime, setDateTime] = useState("");

  // Animación del botón (pulse)
  const pulse = new Animated.Value(1);

  const startPulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.05,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    startPulse();
  }, []);

  // Actualizar fecha y hora
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setDateTime(now.toLocaleString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const log = (msg) => setLogs((prev) => [...prev, msg]);

  const enviarDatos = async () => {
    const usuario = { name, email, token, dateTime };

    try {
      log("→ Enviando datos al ESP32...");
      const res = await fetch("http://192.168.4.1/datos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });

      const txt = await res.text();
      log("✔ ESP32 respondió: " + txt);
      Alert.alert("Éxito", "Datos enviados correctamente");
    } catch (error) {
      log("✖ Error: " + error.message);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 28,
        backgroundColor: "#0a0f1f",
      }}
    >
      {/* Título */}
      <Text
        style={{
          color: "white",
          fontSize: 32,
          fontWeight: "800",
          textAlign: "center",
          marginTop: 25,
          marginBottom: 6,
          letterSpacing: 1.2,
          textShadowColor: "#3b82f6",
          textShadowRadius: 20,
        }}
      >
        Acceder a la Instalación
      </Text>

      {/* Fecha y hora */}
      <Text
        style={{
          color: "#7dd3fc",
          fontSize: 17,
          textAlign: "center",
          marginBottom: 38,
          opacity: 0.9,
        }}
      >
        {dateTime}
      </Text>

      {/* TARJETA DE INFORMACIÓN CON EFECTO GLASS */}
      <View
        style={{
          backgroundColor: "rgba(255,255,255,0.06)",
          borderRadius: 22,
          padding: 28,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.15)",
          shadowColor: "#4ea1ff",
          shadowOpacity: 0.4,
          shadowRadius: 25,
          shadowOffset: { height: 5 },
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 22,
            fontWeight: "700",
            marginBottom: 18,
          }}
        >
          👤 Datos del Usuario
        </Text>

        <Text style={{ color: "#cbd5e1", marginBottom: 8, fontSize: 16 }}>
          • Nombre:{" "}
          <Text style={{ color: "white", fontWeight: "600" }}>{name}</Text>
        </Text>
        <Text style={{ color: "#cbd5e1", marginBottom: 8, fontSize: 16 }}>
          • Email:{" "}
          <Text style={{ color: "white", fontWeight: "600" }}>{email}</Text>
        </Text>
        <Text style={{ color: "#cbd5e1", marginBottom: 8, fontSize: 16 }}>
          • Token:{" "}
          <Text style={{ color: "#38bdf8", fontWeight: "600" }}>{token}</Text>
        </Text>

        {/* BOTÓN ANIMADO */}
        <Animated.View style={{ transform: [{ scale: pulse }] }}>
          <TouchableOpacity
            onPress={enviarDatos}
            style={{
              marginTop: 30,
              backgroundColor: "#2563eb",
              paddingVertical: 16,
              borderRadius: 16,
              alignItems: "center",
              shadowColor: "#60a5fa",
              shadowOpacity: 0.8,
              shadowRadius: 18,
              shadowOffset: { height: 7 },
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 19,
                fontWeight: "700",
                letterSpacing: 1.1,
              }}
            >
              🚀 Enviar datos al ESP32
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* TERMINAL ESTILO HACKER */}
      <View
        style={{
          backgroundColor: "#000000",
          marginTop: 35,
          height: 170,
          borderRadius: 18,
          padding: 14,
          borderWidth: 1.4,
          borderColor: "#00ffcc",
          shadowColor: "#22ffdd",
          shadowOpacity: 1,
          shadowRadius: 28,
        }}
      >
        <Text
          style={{
            color: "#00ff9d",
            fontFamily: "monospace",
            fontSize: 15,
          }}
        >
          {logs.length === 0 ? ">> Esperando acción..." : logs.join("\n")}
        </Text>
      </View>
    </View>
  );
}
