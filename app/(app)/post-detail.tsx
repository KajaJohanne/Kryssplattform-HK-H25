//Dette er navigeringstypen hvor vi skriver mer på egenhpnd sammenlignet med tabs

import { StyleSheet, Text, View } from "react-native";

export default function PostDetails() {
  return (
    <View style={style.mainContainer}>
      <Text>Her kommer det detaljer om innlegg</Text>
    </View>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1, //tar all plassen den kan - hele skjermen i dette tilfelle
    justifyContent: "center",
    alignItems: "center",
  },
});
