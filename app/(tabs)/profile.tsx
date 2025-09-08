import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ProfilePage() {
  return (
    <View style={style.mainContainer}>
      <Pressable
        style={({ pressed }) => [style.button, pressed && style.buttonPressed]}
        onPress={() => {
          router.push("/declerations");
          console.log("Du trykket på knappen!");
        }}
      >
        {({ pressed }) => (
          <Text style={[style.buttonText, pressed && style.buttonTextPressed]}>
            Trykk her for å se info
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1, //tar all den plassen den kan
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "navy",
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonPressed: {
    backgroundColor: "navy",
  },
  buttonText: {
    color: "navy",
    fontFamily: "sans-serif",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  buttonTextPressed: {
    color: "white",
  },
});
