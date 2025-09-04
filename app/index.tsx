import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import Post from "@/components/Post";
import PostFormModal from "@/components/PostFormModal";
import { PostData } from "@/types/post";
import { Stack } from "expo-router";
import { useState } from "react";

export default function HomeScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [posts, setPosts] = useState<PostData[]>([
    {
      title: "Mitt flrste innlegg",
      description: "Sensasjonelt!",
    },
    {
      title: "Mitt andre innlegg",
      description: "Ubeskrivelig flott",
    },
  ]);

  return (
    <View style={styles.mainContainer}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable onPress={() => setIsModalVisible(true)}>
              <Text>Nytt innlegg</Text>
            </Pressable>
          ),
        }}
      />
      <PostFormModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        // Det nye innlegget dukker opp her, og vi kan legge det til i lista over innlegg
        addPost={(newPost) => setPosts([...posts, newPost])}
      />
      <FlatList
        data={posts}
        ItemSeparatorComponent={() => <View style={{ height: 12 }}></View>}
        renderItem={(post) => <Post postData={post.item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  post: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});
