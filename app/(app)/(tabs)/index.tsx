import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
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
  const [isDescending, setIsDescending] = useState(false);
  const [searchText, setSearchText] = useState("");

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

  async function getSortedPostsFromApi() {
    setIsRefreshing(true);
    const posts = await postApi.getSortedPosts(isDescending);
    setPosts(posts);
    setIsRefreshing(false);
  }

  async function searchForPosts() {
    setIsRefreshing(true);
    const posts = await postApi.getSearchedPosts(searchText);
    setPosts(posts);
    setIsRefreshing(false);
  }

  useEffect(() => {
    const delayBounce = setTimeout(() => {
      searchForPosts();
    }, 800);
    return () => clearTimeout(delayBounce);
  }, [searchText]);

  useEffect(() => {
    getSortedPostsFromApi();
  }, [isDescending]);

  useEffect(() => {
    // getPostsFromLocal();
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
          headerLeft: () => (
            <Pressable onPress={() => setIsDescending(!isDescending)}>
              <Text>{isDescending ? "Å-A" : "A-Å"}</Text>
            </Pressable>
          ),
        }}
      />
      <PostFormModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        // Nytt innlegg håndteres nå fra modalen, alt vi trenger her er å laste inn på nytt
        confirmPostAdded={async () => {
          await getPostsFromApi();
        }}
      />
      <View style={{ width: "100%", paddingHorizontal: 20 }}>
        <TextInput
          style={{ borderWidth: 1, padding: 10, width: "100%" }}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
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
