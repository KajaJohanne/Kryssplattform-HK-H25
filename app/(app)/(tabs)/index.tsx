import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";

import * as postApi from "@/api/postApi";
import Post from "@/components/Post";
import PostFormModal from "@/components/PostFormModal";
import { useAuthSession } from "@/providers/authctx";
import { PostData } from "@/types/post";
import { getData, storeData } from "@/utils/local-storage";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";

export default function HomeScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  //state som er i liste, må forhåndsdefinere type til state
  const [posts, setPosts] = useState<PostData[]>([]);
  const { userNameSession } = useAuthSession();
  const [isRefreshing, setIsRefreshing] = useState(false);

  //det som er i state - vises på siden, macher det som er i localStorage
  async function createPostLocal(newPost: PostData) {
    const updatedPostList = [...posts, newPost]; //placeholder for staten vår ->
    storeData("postStore", JSON.stringify(updatedPostList));
    setPosts(updatedPostList);
    console.log(posts);
  }

  async function getPostsFromLocal() {
    const existingPosts = await getData("postStore"); //henter dataen
    //må være sikker på at vi har data
    if (existingPosts) {
      setPosts(JSON.parse(existingPosts)); //må parse fordi den tar ikke post data objekt
    }
  }

  async function getPostsFromApi() {
    setIsRefreshing(true);
    const posts = await postApi.getAllPosts();
    setPosts(posts);
    setIsRefreshing(false);
  }

  //skal hentes når det åpens
  useEffect(() => {
    //getPostsFromLocal();
    getPostsFromApi();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable
              onPress={() => {
                if (!userNameSession) {
                  //hvis brukeren ikke er logget inn, returner
                  console.log(
                    "Du må være logget inn for å gjøre denne handlingen"
                  );
                  return;
                }
                setIsModalVisible(true);
              }}
            >
              <Text>Nytt innlegg</Text>
            </Pressable>
          ),
        }}
      />
      <PostFormModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        // Det nye innlegget dukker opp her, og vi kan legge det til i lista over innlegg
        addPost={async (post) => {
          await postApi.createPost(post);
          await getPostsFromApi(); //viser nye innlegg med en gang
        }}
      />
      <FlatList
        data={posts}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={getPostsFromApi}
          />
        }
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
