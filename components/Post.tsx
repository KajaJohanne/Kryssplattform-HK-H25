import { PostData } from "@/types/post";
import { StyleSheet, Text, View } from "react-native";

// tar inn props av typen postprops
export type PostProps = {
  postData: PostData;
};

export default function Post({ postData }: PostProps) {
  return (
    <View style={styles.post}>
      <Text style={styles.postTitle}>{postData.title}</Text>
      <View style={styles.postDescriptionContainer}>
        <Text style={styles.postDescription}>{postData.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  postDescription: {
    fontSize: 16,
    color: "gray",
  },
  postDescriptionContainer: {
    marginTop: 16,
  },
});
