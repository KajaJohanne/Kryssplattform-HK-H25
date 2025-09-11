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
export async function getFromId(id: string) {}
