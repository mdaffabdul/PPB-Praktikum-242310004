import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: true,
          drawerActiveTintColor: "#3b82f6", // Berbeda dengan tugas6 agar mudah dibedakan
          drawerInactiveTintColor: "gray",
          drawerStyle: {
            backgroundColor: "#f8fafc",
            width: 250,
          },
          headerStyle: {
            backgroundColor: "#3b82f6",
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
            title: "Home Catalog",
            drawerLabel: "Book Store",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="book-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="scanner"
          options={{
            title: "Scan Book QR",
            drawerLabel: "QR Scanner",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="qr-code-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            title: "Edit Profile",
            drawerLabel: "My Profile",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person-circle-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="books/[id]"
          options={{
            drawerItemStyle: { display: "none" },
            title: "Audiobook Details",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
