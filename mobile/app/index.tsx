import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import QRCODE from "@/components/QRCODE";
const App = () => {
  const fechaActual = new Date();
  const token = "khbalabddbwqyoueqheuh613u23843ubodhhewihqwdhbwdbqv";

  const initialItemState = {
    name: "Alfredo",
    expiryDate: fechaActual,
    token: token,
  };

  const [item, setItem] = useState(initialItemState);
  const [productQRref, setProductQRref] = useState();

  return (
    <View>
      <QRCODE
        value={JSON.stringify({
          name: item.name,
          expiry: item.expiryDate,
          token: token,
        })}
        getRef={(c) => setProductQRref(c)}
      />
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
