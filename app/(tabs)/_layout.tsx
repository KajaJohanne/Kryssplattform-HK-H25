import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs } from "expo-router";

//hver side i en tabs er tabs.screen
export default function TabBar() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Hjem",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
