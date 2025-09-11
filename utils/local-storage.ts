import { PostData } from "@/types/post";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storeData(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
    console.log("Stored!");
  } catch (e) {
    console.log("Feil med storeData()" + e);
  }
}

//trenger kun en nøkkel, ikke verdi, skal hente data
export async function getData(key: string) {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data !== null) {
      console.log(data);

      return data;
    }
  } catch (e) {
    console.log("Feil med getData()" + e);
  }
}

//trenger en funksjon som kan hente ut alle innlegg fra local storage og filtrere på id, for å hente ut kun den vi velger
export async function getPostByLocalId(id: string) {
  try {
    const data = await AsyncStorage.getItem("postStore");
    if (data !== null) {
      const posts: PostData[] = JSON.parse(data);
      return posts.find((post) => post.id === id); //find looper gjennom alle innleggene helt til betingelsen stemmer
    }
  } catch (e) {
    console.log("Feil med getPostByLocalId()", e);
  }
}
