import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Logo() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Iriguchi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 40,
  },
  text: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
});
