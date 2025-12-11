import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Animated,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);

  // Animaciones
  const scaleAnim = new Animated.Value(1);
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  const glowAnim = new Animated.Value(0);

  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulso del botón
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.03,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Glow pulsante
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const glowColor = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(37, 99, 235, 0.2)", "rgba(59, 130, 246, 0.6)"],
  });

  const handleLogin = () => {
    if (!name || !email) {
      Alert.alert(
        "⚠️ Campos incompletos",
        "Por favor completa todos los campos"
      );
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("⚠️ Email inválido", "Ingresa un email válido");
      return;
    }

    const token = Math.random().toString(36).substring(2, 15);

    router.push({
      pathname: "/home",
      params: { name, email, token },
    });
  };

  return (
    <View style={styles.container}>
      {/* Fondo con gradiente animado */}
      <LinearGradient
        colors={["#0a0e27", "#1a1f3a", "#0f172a"]}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Círculos decorativos animados */}
      <Animated.View
        style={[styles.circle, styles.circle1, { backgroundColor: glowColor }]}
      />
      <Animated.View
        style={[styles.circle, styles.circle2, { backgroundColor: glowColor }]}
      />

      {/* Contenido */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Logo/Icono */}
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>🚪</Text>
          </View>
          <Text style={styles.logoSubtext}>IRIGUCHI</Text>
        </View>

        {/* Título */}
        <Text style={styles.title}>Bienvenido de vuelta</Text>
        <Text style={styles.subtitle}>Ingresa tus datos para continuar</Text>

        {/* Card principal */}
        <View style={styles.card}>
          {/* Input Nombre */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>👤 Nombre completo</Text>
            <TextInput
              placeholder="Ej: Juan Pérez"
              placeholderTextColor="#64748b"
              value={name}
              onChangeText={setName}
              onFocus={() => setFocusedInput("name")}
              onBlur={() => setFocusedInput(null)}
              style={[
                styles.input,
                focusedInput === "name" && styles.inputFocused,
              ]}
            />
          </View>

          {/* Input Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>📧 Correo electrónico</Text>
            <TextInput
              placeholder="ejemplo@correo.com"
              placeholderTextColor="#64748b"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              onFocus={() => setFocusedInput("email")}
              onBlur={() => setFocusedInput(null)}
              style={[
                styles.input,
                focusedInput === "email" && styles.inputFocused,
              ]}
            />
          </View>

          {/* Botón Acceder */}
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
              onPress={handleLogin}
              activeOpacity={0.8}
              style={styles.button}
            >
              <LinearGradient
                colors={["#3b82f6", "#2563eb", "#1d4ed8"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Acceder ✨</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* Decoración inferior */}
          <View style={styles.footer}>
            <View style={styles.divider} />
            <Text style={styles.footerText}>Acceso seguro</Text>
            <View style={styles.divider} />
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  content: {
    width: "100%",
    maxWidth: 420,
    zIndex: 10,
  },
  circle: {
    position: "absolute",
    borderRadius: 999,
    opacity: 0.15,
  },
  circle1: {
    width: 300,
    height: 300,
    top: -150,
    right: -100,
  },
  circle2: {
    width: 250,
    height: 250,
    bottom: -100,
    left: -80,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(59, 130, 246, 0.15)",
    borderWidth: 2,
    borderColor: "rgba(59, 130, 246, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  logoText: {
    fontSize: 40,
  },
  logoSubtext: {
    color: "#60a5fa",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 3,
  },
  title: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
  },
  card: {
    backgroundColor: "rgba(15, 23, 42, 0.7)",
    borderRadius: 28,
    padding: 28,
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.2)",
    shadowColor: "#3b82f6",
    shadowOpacity: 0.3,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 10 },
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: "#cbd5e1",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    borderRadius: 16,
    padding: 16,
    color: "#ffffff",
    fontSize: 16,
    borderWidth: 2,
    borderColor: "rgba(71, 85, 105, 0.5)",
  },
  inputFocused: {
    borderColor: "#3b82f6",
    backgroundColor: "rgba(30, 41, 59, 0.8)",
    shadowColor: "#3b82f6",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  button: {
    marginTop: 8,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#3b82f6",
    shadowOpacity: 0.5,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
  },
  buttonGradient: {
    paddingVertical: 18,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    gap: 12,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(71, 85, 105, 0.3)",
  },
  footerText: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "600",
  },
});
