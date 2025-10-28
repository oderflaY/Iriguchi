// App_QR_Security_Design.js
// Diseño estilo empresa de seguridad: pantalla elegante para mostrar un QR con información segura.
// Usa tu componente QRCODE en '@/components/QRCODE' — debe aceptar `value` y `getRef` para exportar la imagen (ej. react-native-qrcode-svg tiene toDataURL()).

import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Share,
  Image,
} from "react-native";
import QRCODE from "@/components/QRCODE";

// Si quieres copiar al portapapeles, instala @react-native-clipboard/clipboard
// import Clipboard from '@react-native-clipboard/clipboard';

const COMPANY_NAME = "Iriguchi";
const ACCENT = "#F97316"; // naranja de acento
const BG = "#071233"; // azul oscuro

const maskToken = (t = "") => {
  if (!t) return "";
  if (t.length <= 12) return t.replace(/.(?=.{4})/g, "•");
  return `${t.slice(0, 6)}••••${t.slice(-4)}`;
};

export default function App() {
  const fechaActual = new Date();
  const token = "khbalabddbwqyoueqheuh613u23843ubodhhewihqwdhbwdbqv";

  const initialItemState = {
    name: "Alfredo",
    expiryDate: fechaActual,
    token: token,
  };

  const [item] = useState(initialItemState);
  // useRef es mejor para refs de componentes que no necesitan re-render
  const productQRref = useRef(null);
  const [showToken, setShowToken] = useState(false);

  const payload = {
    name: item.name,
    expiry:
      item.expiryDate instanceof Date
        ? item.expiryDate.toISOString()
        : item.expiryDate,
    token: item.token,
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: `Código QR de ${COMPANY_NAME}: ${JSON.stringify(payload)}`,
      });
    } catch (err) {
      Alert.alert("Error al compartir", String(err));
    }
  };

  const onDownload = async () => {
    try {
      // Muchos componentes QR (ej. react-native-qrcode-svg) exponen toDataURL() en la ref
      if (productQRref.current && productQRref.current.toDataURL) {
        const data = await productQRref.current.toDataURL();
        // data es una imagen base64. Aquí puedes guardarla usando react-native-fs o subirla a tu backend.
        Alert.alert(
          "Éxito",
          "Se generó la imagen del QR (base64). Guardar/usar según tu flujo."
        );
      } else {
        Alert.alert(
          "No soportado",
          "El componente QRCODE no expone toDataURL(). Asegúrate de usar react-native-qrcode-svg o que tu componente soporte exportar imagen."
        );
      }
    } catch (err) {
      Alert.alert("Error", String(err));
    }
  };

  const onCopyToken = () => {
    try {
      // Descomenta e importa Clipboard si lo tienes instalado
      // Clipboard.setString(item.token);
      Alert.alert(
        "Copiado (simulado)",
        "Si instalas @react-native-clipboard/clipboard el token se copiará al portapapeles."
      );
    } catch (err) {
      Alert.alert("Error al copiar", String(err));
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={styles.logoWrap}>
          <Text style={styles.logoEmoji}>🔒</Text>
        </View>
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.company}>{COMPANY_NAME}</Text>
          <Text style={styles.subtitle}>
            Control de acceso · Credencial digital
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Identificación segura</Text>

        <View style={styles.qrWrap}>
          <QRCODE
            value={JSON.stringify(payload)}
            getRef={(c) => (productQRref.current = c)}
            size={200}
          />
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Nombre</Text>
          <Text style={styles.infoValue}>{item.name}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Válido hasta</Text>
          <Text style={styles.infoValue}>
            {new Date(item.expiryDate).toLocaleString("es-MX")}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Token</Text>
          <Text style={styles.infoValue}>
            {showToken ? item.token : maskToken(item.token)}
          </Text>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity
            style={[styles.btn, styles.btnPrimary]}
            onPress={onDownload}
            accessibilityLabel="Descargar QR"
          >
            <Text style={styles.btnText}>Descargar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.btnOutline]}
            onPress={onShare}
            accessibilityLabel="Compartir QR"
          >
            <Text style={styles.btnOutlineText}>Compartir</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.btnGhost]}
            onPress={() => setShowToken((s) => !s)}
            accessibilityLabel="Mostrar token"
          >
            <Text style={styles.btnGhostText}>
              {showToken ? "Ocultar token" : "Mostrar token"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 10 }}>
          <TouchableOpacity onPress={onCopyToken}>
            <Text style={styles.copyHint}>Copiar token</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © {new Date().getFullYear()} {COMPANY_NAME} · Todos los derechos
          reservados
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG, padding: 20 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 18 },
  logoWrap: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  logoEmoji: { fontSize: 28 },
  company: { color: "#fff", fontSize: 18, fontWeight: "700" },
  subtitle: { color: "rgba(255,255,255,0.7)", fontSize: 12 },

  card: {
    backgroundColor: "#081638",
    borderRadius: 14,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  cardTitle: {
    color: ACCENT,
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 12,
  },
  qrWrap: { alignItems: "center", marginBottom: 12 },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  infoLabel: { color: "rgba(255,255,255,0.6)", fontSize: 13 },
  infoValue: { color: "#fff", fontSize: 13, fontWeight: "600" },

  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    minWidth: 90,
    alignItems: "center",
  },
  btnPrimary: { backgroundColor: ACCENT },
  btnText: { color: "#071233", fontWeight: "700" },
  btnOutline: { borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  btnOutlineText: { color: "#fff", fontWeight: "700" },
  btnGhost: { backgroundColor: "transparent" },
  btnGhostText: { color: "rgba(255,255,255,0.8)", fontWeight: "700" },

  copyHint: {
    color: "rgba(255,255,255,0.6)",
    textDecorationLine: "underline",
    textAlign: "center",
  },

  footer: { marginTop: 22, alignItems: "center" },
  footerText: { color: "rgba(255,255,255,0.45)", fontSize: 12 },
});
