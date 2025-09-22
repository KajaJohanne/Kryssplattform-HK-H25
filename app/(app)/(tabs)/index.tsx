import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import Post from "@/components/Post";
import PostFormModal from "@/components/PostFormModal";
import { useAuthSession } from "@/providers/authctx";
import { PostData } from "@/types/post";
import { getData, storeData } from "@/utils/local-storage";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  //state som er i liste, må forhåndsdefinere type til state
  const [posts, setPosts] = useState<PostData[]>([]);
  const { userNameSession } = useAuthSession();

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

  //skal hentes når det åpens
  useEffect(() => {
    getPostsFromLocal();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable
              onPress={() => {
                if (!userNameSession) { //hvis brukeren ikke er logget inn, returner
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
        addPost={createPostLocal} //får det nye innlegget ut hit, spread ... på liste åpner opp hele lista -> lager ny liste og putter inn alt som var i post før + det siste elementet, da blir lista utvidet inne i en state
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
