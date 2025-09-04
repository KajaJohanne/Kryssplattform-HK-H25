import { PostData } from "@/types/post";
import { StyleSheet, Text, View } from "react-native";

// tar inn props av typen postprops
export type PostProps = {
  postData: PostData;
};

//måten man gjør input til en komponent, må definere type data, og at det skal inn gjennom funsjpnen
export default function Post({ postData }: PostProps) {
  return (
    <View style={styles.post}>
      <Text>{postData.title}</Text>
      <View>
        <Text>{postData.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
