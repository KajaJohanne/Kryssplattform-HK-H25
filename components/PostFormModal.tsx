import { PostData } from "@/types/post";
import { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export type PostModalProps = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  // Callback funksjon, vi bruker denne til å "flytte" innlegget vårt ut til foreldrekomponenten
  addPost: (post: PostData) => void;
};

export default function PostFormModal({
  isVisible,
  setIsVisible,
  addPost,
}: PostModalProps) {
  const [titleText, setTitleText] = useState("");
  const [descText, setDescText] = useState("");

  return (
    <Modal transparent visible={isVisible} animationType="slide">
      <View style={styles.modalVisible}>
        <View style={styles.titleContainer}>
          <Text style={{ fontSize: 24 }}>Lag et nytt innlegg!</Text>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            value={titleText}
            placeholder="Tittel"
            onChangeText={setTitleText}
          />
          <TextInput
            style={styles.textInput}
            value={descText}
            placeholder="Beskrivelse"
            onChangeText={setDescText}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, { borderWidth: 2, borderColor: "gray" }]}
            onPress={() => {
              const newPost: PostData = {
                title: titleText,
                description: descText,
              };
              // Huske å fjerne innholdet i tekstinput så vi får en ny start neste gang vi vil lage et innlegg
              addPost(newPost);
              setTitleText("");
              setDescText("");
              setIsVisible(false);
            }}
          >
            <Text>Legg til</Text>
          </Pressable>
          <Pressable
            onPress={() => setIsVisible(false)}
            style={[styles.button, { backgroundColor: "gray" }]}
          >
            <Text>Lukk</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalVisible: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "50%",
    justifyContent: "space-between",
    // paddingHorizontal: 30,
    marginTop: 16,
  },
  textInputContainer: {
    gap: 16,
    alignItems: "center",
    width: "100%",
  },
  textInput: {
    borderBottomWidth: 1,
    width: "75%",
    fontSize: 18,
  },
  button: {
    // backgroundColor: "red",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
