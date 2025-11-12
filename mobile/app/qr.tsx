import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Share,
} from "react-native";
import QRCODE from "../components/QRCODE";

const COMPANY_NAME = "Iriguchi";
const ACCENT = "#F97316";
const BG = "#071233";
const NAME = "Alfredo Valadez Gonzalez";

export default function QRScreen() {
  const token = "khbalabddbwqyoueqheuh613u23843ubodhhewihqwdhbwdbqv";

  const onShare = async (): Promise<void> => {
    try {
      await Share.share({ message: `Token: ${token} — ${NAME}` });
    } catch (err: any) {
      Alert.alert("Error al compartir", String(err));
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoWrap}>
          <Text style={styles.logoEmoji}>🔒</Text>
        </View>
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.company}>{COMPANY_NAME}</Text>
          <Text style={styles.subtitle}>Credencial digital</Text>
        </View>
      </View>

      {/* Tarjeta principal */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Código de acceso</Text>

        <View style={styles.qrWrap}>
          <QRCODE value={`${token}|${NAME}`} size={180} />
          <Text style={styles.name}>{NAME}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Válido hasta</Text>
          <Text style={styles.infoValue}>
            {new Date().toLocaleString("es-MX")}
          </Text>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity
            style={[styles.btn, styles.btnPrimary]}
            onPress={() =>
              Alert.alert(
                "Descarga",
                "Función simplificada — implementar según plataforma"
              )
            }
          >
            <Text style={styles.btnText}>Descargar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.btnOutline]}
            onPress={onShare}
          >
            <Text style={styles.btnOutlineText}>Compartir</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © {new Date().getFullYear()} {COMPANY_NAME}
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
  name: { color: "#fff", fontSize: 14, fontWeight: "700", marginTop: 8 },

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
    minWidth: 120,
    alignItems: "center",
  },
  btnPrimary: { backgroundColor: ACCENT },
  btnText: { color: "#071233", fontWeight: "700" },
  btnOutline: { borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  btnOutlineText: { color: "#fff", fontWeight: "700" },

  footer: { marginTop: 22, alignItems: "center" },
  footerText: { color: "rgba(255,255,255,0.45)", fontSize: 12 },
});
