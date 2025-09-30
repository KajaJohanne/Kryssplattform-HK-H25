import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { PostData } from "@/types/post";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PostsMap() {
  const [posts, setPosts] = useState<PostData[]>([]);

  // For å hente alle poster til postMap taben
  async function getAllPosts(): Promise<PostData[]> {
    try {
      const data = await AsyncStorage.getItem("postStore");
      if (data !== null) {
        return JSON.parse(data) as PostData[];
      }
      return []; // hvis det ikke finnes posts ennå
    } catch (e) {
      console.log("Feil med getallPosts()", e);
      return [];
    }
  }

  useEffect(() => {
    async function loadPosts() {
      const allPosts = await getAllPosts();
      setPosts(allPosts);
    }
    loadPosts();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 59.91, //Oslo sentrum default
          longitude: 10.75,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        {posts.map((post) =>
          post.postCoordinates ? (
            <Marker
              key={post.id}
              coordinate={{
                latitude: post.postCoordinates.latitude,
                longitude: post.postCoordinates.longitude,
              }}
              title={post.title}
              description={post.description}
            />
          ) : null
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
