import { PostData } from "@/types/post";
import { getData } from "@/utils/local-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";

export default function PostsMap() {
  const [posts, setPosts] = useState<PostData[]>([]);

  const getPostsFromLocal = async () => {
    const posts = await getData("postStore");
    if (posts) {
      setPosts(JSON.parse(posts));
    }
  };

  useEffect(() => {
    getPostsFromLocal();
  }, []);

  return (
    <View>
      <MapView
        initialRegion={{
          latitude: 59.917104578,
          longitude: 10.727706144,
          latitudeDelta: 0.0422,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true} // Viser en blå prikk med din posisjon på kartet
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {posts.length > 0 &&
          posts.map((post) => (
            <Marker
              coordinate={{
                latitude: post.postCoordinates?.latitude ?? 0,
                longitude: post.postCoordinates?.longitude ?? 0,
              }}
              key={post.id}
            >
              <Callout
                onPress={() => {
                  router.navigate({
                    pathname: "/post-details/[id]",
                    params: { id: post.id },
                  });
                }}
              >
                <View style={styles.postPreviewContainer}>
                  <View style={{ paddingBottom: 16 }}>
                    <Image
                      style={styles.postImage}
                      source={{ uri: post.imageUri }}
                    />
                  </View>
                  <Text style={styles.postTitle}>{post?.title}</Text>
                  <Text>{post?.description}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  postPreviewContainer: {
    width: 200,
    height: 200,
  },
  postImage: {
    width: 200,
    height: 150,
    resizeMode: "cover",
  },
  postTitle: {
    fontWeight: "bold",
  },
  postDescription: {},
});
