import Post from "@/components/Post";
import { PostData } from "@/types/post";
import { Stack } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function HomeScreen() {
  const [posts, setPosts] = useState<PostData[]>([
    //etter dette likhetstegnet er en liste en PostData
    //hardkode inn to innlegg for gøy
    {
      title: "Mitt første innlegg",
      description: "Sensasjonelt!",
    },
    {
      title: "Mitt andre innlegg",
      description: "Også sensasjonelt!",
    },
  ]);

  //klassisk state -> vise eller lukke komponment

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isList, setIsList] = useState(true);

  /*
  const onModalClose = () => {
    setIsModalVisible(false); 
  }
    */

  return (
    <View style={styles.mainContainer}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable
              onPress={() => setIsModalVisible(true)}
              style={styles.button}
            >
              <Text>Knapp?</Text>
            </Pressable>
          ),
        }}
      />

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Pressable
            onPress={() => setIsModalVisible(false)}
            style={styles.button}
          >
            <Text>Lukk modal</Text>
          </Pressable>
          <TextInput style={styles.input}>Tittel</TextInput>
          <TextInput style={styles.input}>Beskrivelse</TextInput>
          <Pressable>
            <Text>Legg til i lista</Text>
          </Pressable>
        </View>
      </Modal>

      <FlatList
        data={posts}
        ItemSeparatorComponent={() => <View style={{ height: 12 }}></View>}
        renderItem={(post) => <Post postData={post.item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 5,
    borderColor: "black",
    backgroundColor: "white",
    height: 30,
    width: 300,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    fontSize: 40,
  },
  mainContainer: {
    flex: 1, //tar all plass den har tilgang til
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  post: {
    backgroundColor: "pink",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});
