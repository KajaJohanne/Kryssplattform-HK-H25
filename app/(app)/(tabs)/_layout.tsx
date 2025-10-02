import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Tabs } from "expo-router";
import React from "react";

//hver side i en tabs er tabs.screen
export default function TabBar() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Hjem",
          tabBarIcon: ({ color }) => (
            // Ikon hentet fra https://icons.expo.fyi/Index, en ikondatabase for expo. Prøv dere fram med egne ikoner ved å følge lenken!
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="postsMap"
        options={{
          title: "Kart",
          tabBarIcon: ({ color }) => (
            // Ikon hentet fra https://icons.expo.fyi/Index, en ikondatabase for expo. Prøv dere fram med egne ikoner ved å følge lenken!
            <FontAwesome5 name="map" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => (
            // Ikon hentet fra https://icons.expo.fyi/Index, en ikondatabase for expo. Prøv dere fram med egne ikoner ved å følge lenken!
            <AntDesign name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
