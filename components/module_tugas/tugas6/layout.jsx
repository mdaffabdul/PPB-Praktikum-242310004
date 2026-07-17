import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: true,
          drawerActiveTintColor: "#49745e",
          drawerInactiveTintColor: "gray",
          drawerStyle: {
            backgroundColor: "#fcfaf2",
            width: 250,
          },
          headerStyle: {
            backgroundColor: "#49745e",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: "Home",
            drawerLabel: "Home Screen",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="explore"
          options={{
            title: "Explore Store",
            drawerLabel: "Store Map",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="map-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            title: "My Profile",
            drawerLabel: "About Me",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="books/[id]"
          options={{
            drawerItemStyle: { display: "none" }, // Sembunyikan link detail buku dari drawer menu list
            title: "Book Detail",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
