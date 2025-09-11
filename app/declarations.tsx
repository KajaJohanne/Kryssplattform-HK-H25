import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function DeclarationsPage() {
  return (
    <View style={style.mainContainer}>
      <View style={{ marginTop: 16 }}>
        <Text style={[style.text, { fontWeight: "700", fontSize: 20 }]}>
          Velkommen til vår revolusjonerende app!
        </Text>
        <View style={{ marginTop: 8 }}>
          <Text style={style.text}>
            Denne fantastiske kreasjonen er resultatet av et enestående
            samarbeid mellom foreleser og studenter i faget TDS200.
          </Text>
          <Text style={[style.text, { marginTop: 6 }]}>
            Funksjonaliteten som er på utstilling i denne appen er banebrytende
            på flere plan. Vi tar i bruk native funksjonalitet på måter man
            tidligere bare kunne drømme om.
          </Text>
          <Text style={style.text}>
            Måten vi integrerer mot Firebase er utenfor menneskets forståelse!
          </Text>
          <Text style={[style.text, { marginTop: 6 }]}>
            Vi advarer også om at hvis du graver i materien til denne appen kan
            bivirkninger slik som midlertidig blindhet som følge av hvor
            blendende fantastisk appen er, eller hjerteflimmer av hvor spennende
            det er å bruke appen.
          </Text>
          <Text style={style.text}>Bruk appen på eget ansvar.</Text>
          <Link href="https://github.com/studBrage">
            Les mer om skaperen bak appen her
          </Link>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  text: {
    textAlign: "left",
  },
});
