import { CameraView, useCameraPermissions } from "expo-camera";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
//imppirt for cameraview

type SelectImageModalProps = {
  closeModal: VoidFunction;
  setImage: (image: string) => void;
};

export default function SelectImageModal({
  closeModal,
  setImage,
}: SelectImageModalProps) {
  //eksplisitt be om tilgang til kamera, trenger en hook fra expo kamera
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View></View>;
  }

  //hvis du ikke har permission, må spørre om tilgang
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>Vi trenger tillatelse til å bruke kameraet</Text>
        <Button onPress={requestPermission} title="Gi tillatelse" />
      </View>
    );
  }

  //hvus det finnes premission og man har det
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back" />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => closeModal()}>
          <Text style={styles.text}>Avbryt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 64,
    flexDirection: "row",
    backgroundColor: "transparent",
    width: "100%",
    paddingHorizontal: 64,
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    //color: "white",
  },
});
