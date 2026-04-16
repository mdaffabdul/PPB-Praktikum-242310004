import { StatusBar } from "expo-status-bar";
import { Button, Image, ScrollView, StyleSheet, Text } from "react-native";
import Filler from "./filler";

const latihan_3 = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Latihan 3</Text>
      <Image
        source={require("@/assets/images/icon.png")}
        style={styles.image}
      />

      <Filler />

      <Button
        title="Go to Latihan 2"
        onProgress={() => console.log("Go to Latihan 2")}
      />
      <StatusBar style="auto" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default latihan_3;
