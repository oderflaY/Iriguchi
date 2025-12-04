import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    if (!name || !email) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    const token = Math.random().toString(36).substring(2, 15);

    // Navegamos a la pantalla Home enviando los datos
    router.push({
      pathname: "/home",
      params: { name, email, token },
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#071233",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: 26,
          fontWeight: "700",
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        Login
      </Text>

      <TextInput
        placeholder="Nombre completo"
        placeholderTextColor="#ccc"
        value={name}
        onChangeText={setName}
        style={{
          backgroundColor: "#0a1a44",
          borderRadius: 10,
          padding: 14,
          color: "#fff",
          marginBottom: 14,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.1)",
        }}
      />

      <TextInput
        placeholder="Correo electrónico"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        style={{
          backgroundColor: "#0a1a44",
          borderRadius: 10,
          padding: 14,
          color: "#fff",
          marginBottom: 14,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.1)",
        }}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: "#F97316",
          borderRadius: 10,
          paddingVertical: 14,
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text style={{ color: "#071233", fontWeight: "700", fontSize: 16 }}>
          Acceder a la instalación
        </Text>
      </TouchableOpacity>
    </View>
  );
}
